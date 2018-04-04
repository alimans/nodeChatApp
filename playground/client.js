var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){
  console.log('connected to server');
});
socket.on('event', function(data){});
socket.on('disconnect', function(){
  console.log('disconnected from server');
});

setInterval(() => {
  socket.emit('SaySth', 'Say clt to srv1');
}, 2000);

setTimeout(() => {
  socket.emit('SaySth', 'Say 6s to all');
}, 6000);

socket.on('Mes', (msg) => {
  console.log(msg);
});
