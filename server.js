const http = require('http');

const server = http.createServer((req, res) => {
  res.end ('This is testing of http');
})

server.listen(process.env.PORT || 3000);
