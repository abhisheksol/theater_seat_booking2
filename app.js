const express = require('express');
const model1 = require('./mongodb.js');
const { model } = require('mongoose');
const port=5000

const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/views/project'));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")
app.use(express.json())

const map = {
  "10": "Avenger",
  "50": "pathan",
  "30": "URI"
}

app.get("/", (req, res) => {
  res.render("other/registration")
})
// ------------------------------login route------------------------------------------------

// --------------------------------------x---------x----------x-----------------------------

app.post("/login", async (req, res) => {

  const data = req.body
  const find1 = await model1.find(data)  //check email and password

  if (find1.length == 0) {
    const errorMessage = "  Wroung password or email address!!! ";

    // res.send(" res.render(`<h1>u have enter emty </h1>`)")
    res.send(` 
    <script>
    

            alert("${errorMessage}")
             window.location.href="/login"
             </script>
    `)
  }
  else {
    const email = data.email
    const result = await model1.findOne({ email });
    res.render("project/index", { result })  //email ani password
    // res.render("other/payment",{result})  //email ani password
    // res.send("u logined successfully")
  }
  // console.log(data.email); 
  // console.log(result);
})

// .....................................regisration route...........................

// ----------------------------x-------------------x------------------------------x------------
app.post("/registration", async (req, res) => {
  const data = req.body
  console.log(data.name);

  const check = await model1.find({ email: data.email });
  if (check.length === 0 && (data.name !== '' || data.phoneno !== '' || data.email !== '')) {
    res.send(`<h1>You have successfully registered !! Click login now </h1>
    <br>
    <a href="/login">Go to login</a>`)
    const modelsave = new model1(data)
    const save = await modelsave.save()
    console.log(save);
  }
  // else {
  //   res.send(`<h1>Email address is already in use. </h1>
  //   <br> 
  //   <h1>Or u have entered empty field</h1>`);
  // }
  else {
    const errorMessage = "Email address is already in use.  u have entered empty field ";
    const script = `
      <script>
          alert("${errorMessage}");
          window.location.href = "/registration"; // Redirect back to login page
      </script>
  `;
    res.send(script);
  }

})
// --------------------------------------------------x=x-------------------------------------

// -----------------------------------payment route----------------------------------------

app.post("/pay", async (req, res) => {


  const selectedMovieValue = req.body.movie_name; // Corrected line


  const data = req.body;
  const email = data.emaildb;
  const result = await model1.findOne({ email });
  console.log(data.emaildb);

  const data1 = req.body.Ticket_Price
  console.log(map[data1]);
  console.log(data1);
  const senddata = {               //movie name ,  total price
    Movie_Name: map[data1],
    Ticket_Price: data1
  }
  // ======================================================updating db======================================

  const filter = { email: data.emaildb };
  const update = { $set: data };

  const result2 = await model1.updateMany(filter, update);
  const update2 = { $set: senddata };
  const result3 = await model1.updateMany(filter, update2);
  // console.log("Update result 2:", result2);
  // console.log("Update result 3:", result3);
  // ======================================================end======================================


  // ----------------------------------
  // console.log("plz check to send in db ", data, senddata);
  res.render("other/payment", { data, result, senddata });

});

app.post("/payed", (req, res) => {


  res.render("other/pdf")

})

//  _id: new ObjectId("64dd157bc0e36b1bdced369a"),
// name: 'ajay',
// phoneno: 98220477,
// email: 'ajay@gmail.com',
// password: '123',
// datetime: '2023-08-01',



// ...---------------------------page request   get()------------------------------------------
app.get("/login", (req, res) => {
  res.render("login"); // Assuming "login.ejs" is in your "views" directory
});
app.get("/registration", (req, res) => {

  res.render("other/registration") // Assuming "login.ejs" is in your "views" directory
});

app.listen(process.env.PORT || port, ()=> console.log("listening to port 5000"))            