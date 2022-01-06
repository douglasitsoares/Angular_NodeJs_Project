/* Manual listeners
const http = require('http');

const server = http.createServer((req, res) => {
  res.end ('This is testing of http');
})

server.listen(process.env.PORT || 3000);
*/

const http = require('http');
const app = require ('./backend/app');

const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
