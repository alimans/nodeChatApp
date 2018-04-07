var socket = io();

function scrollToBottom () {
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  };
};
socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('newMessage', function (data) {
 var formattedTime = moment(data.createdAt).format('h:mm a');
 var template = $('#message-template').html();
 var html = Mustache.render(template, {
   text: data.text,
   from: data.from,
   createdAt: formattedTime
 });
 $('#messages').append(html);
 scrollToBottom();

  // var li = $('<li></li>');
  // li.text(`${data.from} ${formattedTime}: ${data.text}`);
  // $('#messages').append(li);
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