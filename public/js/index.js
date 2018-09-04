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

socket.on('disconnect', function(){
    console.log('Disconnect from server');
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        messageText: jQuery('[name=message]').val()
    }, function(data){
        console.log('message published',data);
    });
});