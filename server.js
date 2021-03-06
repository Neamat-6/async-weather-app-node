

// Setup empty JS object to act as endpoint for all routes
const projectData = {};
// Require Express to run server and routes
const express = require('express');
const app = express ();
// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));



app.post('/add', (req,res)=>{
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.feeling = req.body.feeling
    projectData.description = req.body.description
    console.log(projectData) ;

});

app.get('/all', (req,res)=>{
    res.send(projectData);
});


// Setup Server

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});





















