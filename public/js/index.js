var socket = io();

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('newMessage', function (data) {
  console.log(data);
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});
