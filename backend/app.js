const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

const Post = require ('./models/post');

const app = express();

mongoose.connect("mongodb+srv://admin:21jhz5eWLufdeIYu@cluster0.zchzj.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() =>{
  console.log('Connected to Mongo');
})
.catch(() => {
  console.log ('connection failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use((req, res, next) =>{
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers",
   "Origin, X-Request-With, Content-Type, Accept"
   );
   res.setHeader("Access-Control-Allow-Mehtods",
     "GET, POST, PATCH, OPTIONS");
   next();
});


app.post('/api/posts',(req, res, next) => {
  const post = new Post({
   title: req.body.title,
   content: req.body.content
  });
  //console.log (post);

  post.save();


  res.status(201).json({
    message: 'Post added sucessfully'
  });

});


app.get ('/api/posts',(req, res, next) => {

  const posts = [

    {id:'douglasSilva@', title:'Developer System', content:'System Analysis'},
    {id:'danielsousas@', title:'Bebe', content:'Gosta de brincar'}
  ];

  res.status(200).json({
    message : 'Posts is fetched as successfully!',
    posts:posts
  });
});




module.exports = app;
