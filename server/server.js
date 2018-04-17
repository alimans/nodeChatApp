const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage } = require('./util/message');
const {isRealString} = require('./util/validation');
const {Users} = require('./util/users');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('a client connected:');

  // socket.emit('newMessage',  generateMessage('Admin', 'Welcome to the chat app!'));
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    socket.join(params.room);
    // socket.leave('The Office Fans');

    // io.emit -> io.to('The Office Fans').emit
    // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
    // socket.emit
    
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name , params.room);

    io.to(params.room).emit('updateUsersList', users.getUserList(params.room))

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (data, callback) => {
    console.log(data);
    io.emit('newMessage', generateMessage(data.from, data.text));
    callback();
  });

  socket.on('disconnect', () => {
    console.log('one client disconnected');
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});
server.listen(port, () => {
  console.log(`Server started listeninig on port ${port}...`);
});
