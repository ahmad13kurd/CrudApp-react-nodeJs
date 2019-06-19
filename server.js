const express = require('express');
const mongoose = require("mongoose");
const Model = require ("./model/model");
const bodyParser = require("body-parser");
const logger = require("morgan");
const secret = require("./secret").dbUri;
const cors = require("cors");
const app = express();
const port = 5000;


// backend connection to MongoDB database
mongoose.connect(secret, {useNewUrlParser: true, useFindAndModify: false});

//* Check if database is connected succesfully
let db = mongoose.connection;
db.once("open", ()=> console.log("Connected to MongoDB"));
db.on("error", ()=> console.log("Connection error"));


// bodyparser to parse the request body in json format
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// Use this library for cross origin requests
app.use(cors({ credentials: true, origin: true }));



// This is our READ method
// This method is to fetch all data from database
app.get("/getData", (req,res)=>{
    Model.find((err,data) =>{
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});


// This is UPDATE method
// It overwrites existing data in our database
app.post("/updateData", (req, res) => {
    console.log(req.body.name)
    console.log(req.body.id);
    
    const {id, name} = req.body;
    //const name = req.body.name;

    Model.findOneAndUpdate ({_id:id}, {$set:{name}}, err => {
        if (err) return res,json ({success: false, error: err});
        return res.json({success: true});
    });
});


// This is our DELETE method
// This method removes existing data from our database
app.post("/deleteData", (req,res) => {
    const id = req.body.id;
    console.log(id)
    Model.findOneAndDelete({_id:id }, err => {
        if (err) return res.json ({success: false, error: err});
        return res.json({success: true});
    });
});


// This is our CREATE method
// This method adds new data in our database
app.post("/addData", (req,res) =>{
    let data = new Model();
    const {name} = req.body;

    data.name = name;

    data.save(err => {
        if (err) return res.json({success: false , error: err});
        return res.json({success: true});
    });
});




app.listen(port,()=> console.log(`Server started on port ${port}`));