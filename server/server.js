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

  socket.emit('newMessage', {
    from: 'somebody',
    text: 'some text from somebody',
    createdAt: 34523
  });

  socket.on('createMessage', (data) => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('one client disconnected');
  });
});
server.listen(port, () => {
  console.log(`Server started listeninig on port ${port}...`);
});
