const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const url = require('url');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function(ws, req) {
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  ws.send('something');
})

server.listen(8080, function() {
  console.log('Listening on %d', server.address().port);
});
