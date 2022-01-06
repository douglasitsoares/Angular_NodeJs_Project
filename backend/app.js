const express = require('express');
const app = express();

app.use ((req, res, next) => {
  console.log ('First midleware');
  next();
});


app.use ((req, res, next) => {
  res.send('Hello midleware');
});


module.exports = app;
