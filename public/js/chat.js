var socket = io();

function scrollToBottom(){
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
};
socket.on('connect', function(){
    console.log('connected to server');
});

socket.on('newMessage', function(message){
    console.log('Message: ',message);
    var formattedDate = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    Mustache.parse(template); 
    var html = Mustache.render(template, {
        from: message.from,
        text: message.messageText,
        createdAt: formattedDate
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    var formattedDate = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    Mustache.parse(template); 
    
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedDate
    });
    jQuery('#messages').append(html);
    scrollToBottom();
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