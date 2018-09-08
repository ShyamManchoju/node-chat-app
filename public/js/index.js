 var socket = io();
socket.on('connect', function(){
    console.log('connected to server');
});

socket.on('newMessage', function(message){
    console.log('Message: ',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.messageText}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank"> My Current Location </a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url );

    li.append(a);
    jQuery('#messages').append(li);
});

socket.on('disconnect', function(){
    console.log('Disconnect from server');
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage',{
        from:'User',
        messageText: messageTextBox.val()
    }, function(data){
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#sendLocation');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled','disabled').text('sending Location...');

    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
   });
});