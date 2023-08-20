const mongoose = require('mongoose');
const { Schema } = require('mongoose');
mongoose.pluralize(null)

// mongoose.connect( "mongodb://127.0.0.1:27017/login_signup") 
mongoose.connect(process.env.MONGO_URI) 

const sch= mongoose.Schema({
    name:String,
    phoneno:Number,
    email:String,
    Movie_Name: String,
    Total_Seats_Selected: String,
    Ticket_Price: Number,
    Total_Price: Number,
    password:String,
    datetime:String

})
module.exports=mongoose.model("logindata",sch)

