var socket = io();
socket.on('connect', function(){
    console.log('connected to server');

    /*socket.emit('createEmail',{
        to:'toEmail@gmail.com',
        emailText :'Hello Sam how are you doing !'
    });

    socket.emit('createMessage',{
        from:'Sam',
        messageText:'Hello all wassup !'
    });*/
});

socket.on('newMessage', function(message){
    console.log('Message: ',message);
});
/*socket.on('newEmail', function(email){
    console.log('new email : ', email);
});*/

socket.on('disconnect', function(){
    console.log('Disconnect from server');
});