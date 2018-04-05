var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('newMessage', function (data) {
  console.log(data);

  var li = $('<li></li>');
  li.text(`${data.from}: ${data.text}`);
  $('#messages').append(li);
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'Ali',
    text: $('[name = message]').val()
  }, function () {
    text: $('[name = message]').val('')
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Your browser does not support location!')
  }
  locationButton.attr('disabled', 'disabled');
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    alert(position);
  }, function () {
    alert('Can not fetch location!')
  });
});