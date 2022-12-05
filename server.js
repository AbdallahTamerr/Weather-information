// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Require body-parser
const bodyParser = require('body-parser');
// Require Cors
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5000;
const server = app.listen(port, ()=> {
    console.log(`Running on localhost:${port}`);
})

app.post('/saveData', (req, res)=>{
    projectData = {...req.body}
    res.send();
    
});
// The get request the second argument is a callback function to return the JS object
app.get('/showData', (req, res)=> {
    res.send(projectData);
})