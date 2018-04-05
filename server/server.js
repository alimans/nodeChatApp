const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage } = require('./util/message');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('a client connected:');

  socket.emit('newMessage',  generateMessage('Admin', 'Welcome to the chat app!'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

  socket.on('createMessage', (data) => {
    console.log(data);
    io.emit('newMessage', generateMessage(data.from, data.text));
  });

  socket.on('disconnect', () => {
    console.log('one client disconnected');
  });
});
server.listen(port, () => {
  console.log(`Server started listeninig on port ${port}...`);
});
