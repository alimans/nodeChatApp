const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('a client connected:');

//
  socket.on('SaySth', (saying) => {
    console.log(saying);
    socket.emit('Mes', `got your data `);
  });
//

  socket.on('disconnect', () => {
    console.log('one client disconnected');
  });
});
server.listen(port, () => {
  console.log(`Server started listeninig on port ${port}...`);
});
