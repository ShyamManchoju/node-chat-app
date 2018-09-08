const express = require('express');
const hbs = require('hbs');
const path =require('path');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

const publicPath =path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connect',(socket)=>{
    console.log('New User connection');

    // Broadcast welcome message from Admin to the User
    socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat !'));
    // Broadcast welcome message from Admin to all Users
    socket.broadcast.emit('newMessage', generateMessage('Admin','New User added !'));

    // Create a message on emit from client 
    socket.on('createMessage', (message, callback)=>{
        console.log('Message :', message);
        io.emit('newMessage', generateMessage(message.from, message.messageText));
        callback();
    });

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));  
    });

    socket.on('disconnect',()=>{
        console.log('connection closed');
    });
    
});



app.get('/',(req, res)=>{
    res.send('welcome to chat app');
  });

server.listen(port,()=>{
    console.log('Server started on port 3000')
});
console.log(__dirname + '/../public');