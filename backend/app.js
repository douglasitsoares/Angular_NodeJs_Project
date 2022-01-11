const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

const Post = require ('./models/post');
const { title } = require('process');

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
   "Origin, X-Request-With, Content-Type, Accept");
   res.setHeader('Access-Control-Allow-Methods','GET, POST, DELETE, PATCH, PUT, OPTIONS');
  // res.setHeader('Access-Control-Allow-Methods','DELETE');
   next();
});


app.post('/api/posts',(req, res, next) => {
  const post = new Post({
   title: req.body.title,
   content: req.body.content
  });
  //console.log (post);

  post.save().then(createdPost =>{
    res.status(201).json({
      postId: createdPost._id,
      message: 'Post added sucessfully'
    });
  });
});

app.put('/api/posts/:id', (req, res, next) =>{

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

   Post.updateOne({_id:req.params.id}, post).then(result =>{
     console.dir(result);
     res.status(200).json({message:'Post Updated'});
   });
});

app.get ('/api/posts',(req, res, next) => {
  /* Dummy Data
  const posts = [

    {id:'douglasSilva@', title:'Developer System', content:'System Analysis'},
    {id:'danielsousas@', title:'Bebe', content:'Gosta de brincar'}
  ];
  */
  Post.find()
  .then(documents =>{
    res.status(200).json({
      message : 'Posts is fetched as successfully!',
      posts:documents
    });
    //console.log(documents);
  });
});

//the solution is responsible to refresh and keep information in case id is applied
app.get('/api/posts/:id',(req, res, next) => {

  Post.findById(req.params.id).then(post => {
    if (post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message: 'Post not found !'});
    }
  });
});


app.delete('/api/posts/:id',(req, res, next) =>{
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:"Posted "+ req.params.id + " was deleted as sucess !"});
  });
});

module.exports = app;
