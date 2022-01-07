const express = require('express');
const bodyParser = require ('body-parser');

const Post = require ('./models/post');

const app = express();

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
  console.log (post);
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
