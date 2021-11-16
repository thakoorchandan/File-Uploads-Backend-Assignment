const express=require("express");
const app=express();

const bodyParser=require("body-parser");


const userController=require("./controllers/user.controller");
const gallaryController=require("./controllers/gallary.controller");

app.use(express.json());
// app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));

app.use("/user", userController);
app.use("/gallary", gallaryController);

module.exports=app;