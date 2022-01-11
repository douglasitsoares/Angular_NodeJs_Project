const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

const postsRoutes = require("./routes/posts");
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
   next();
});


app.use('/api/posts', postsRoutes);

module.exports = app;
