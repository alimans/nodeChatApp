var socket = io();

socket.on('connect', () => {
  console.log('connected to server');
  socket.emit('createMessage', {
    to: 'somebody',
    text: 'some text for somebody'
  });
});

socket.on('newMessage', function (data) {
  console.log(data);
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});
