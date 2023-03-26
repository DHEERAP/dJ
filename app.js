//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _ = require("lodash");


const aboutContent = "The main focus of a daily journal website is to record daily thoughts, experiences, and reflections. You can encourage users to write about their day, their feelings, and their goals. You can also provide prompts or questions to help users get started with their writing.";
const contactContent = "";

const app = express();


const homeStartingContent = " Welcome to My Daily Journal Here, I record my daily thoughts, experiences, and observations. It's a great way to reflect on my life and keep track of my personal growth.Each day, I try to write something meaningful, whether it's a personal story, a lesson I learned, or a goal I want to achieve. I also include photos, quotes, and other inspirations that help me stay motivated and inspired.I hope you enjoy reading my journal and find some inspiration for your own life. Remember, every day is a new opportunity to learn, grow, and make a difference."
;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let postpush= [];//   



app.get("/", function(req, res) {
  res.render("home", {
     content : homeStartingContent ,
     posts: postpush//
  });
});

app.get("/about", function(req, res) {
  res.render("about"  , { about:  aboutContent });
});

app.get("/contact", function(req, res) {
  res.render("contact" , { contact :  contactContent });
});

app.get("/compose", function(req, res) {
res.render("compose" , {cont: postpush});//
});

app.post("/compose", function(req, res) {

const post = {
title:req.body.titlebody ,
content: req.body.postbody
};


postpush.push(post);//
//console.log(postpush);
res.redirect("/");
});


app.get("/postpush/:topic" , function(req , res){
  const requestedtitle =   _.lowerCase(req.params.topic);

 postpush.forEach(function(post){  

  const storetitle = _.lowerCase(post.title);

    if (storetitle === requestedtitle){
     
        res.render("post" , {
         title: post.title,
    content : post.content
        
        });
   
    }
 }); 
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
