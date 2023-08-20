const express = require('express');
const model = require('./mongodb.js');
const app = express();
const email = 'abhisheksolapure2003@gmail.com';

app.get('/', async (req, res) => {
    
        // const result = await model.findOne({ email: email }, 'name');
        const result = await model.findOne({email});
        
        
            console.log('Name:', result.name);
            module.exports=result
        
    
});

app.listen(3000);
