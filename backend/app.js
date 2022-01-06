const express = require('express');
const app = express();


app.use((req, res, next) =>{
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Header",
   "Origin, X-Request-With, Content-Type, Accept"
   );
   res.setHeader("Access-Control-Allow-Mehtods",
     "GET, POST, PATCH, OPTIONS");
   next();
});

app.use ('/api/posts',(req, res, next) => {

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
