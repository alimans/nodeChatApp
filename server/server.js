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

  socket.emit('newMessage',  {
    from: 'Admin',
    text: 'Welcome to the chat app!',
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit('newMessage',  {
    from: 'Admin',
    text: 'New user joined.',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (data) => {
    console.log(data);
    io.emit('newMessage', {
      from: data.from,
      text: data.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('one client disconnected');
  });
});
server.listen(port, () => {
  console.log(`Server started listeninig on port ${port}...`);
});
