const express = require('express');
const hbs = require('hbs');
const path =require('path');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');


const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var rooms = new Rooms();

const publicPath =path.join(__dirname, '../public');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(publicPath));

io.on('connect',(socket)=>{
    console.log('New User connection');

    //Join room 
    socket.on('join', (params, callback)=>{
        
        var usersExist = users.getUserAvailability(params);
        
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback("Please provide valid Name and Room info.");
        }
        
        if( usersExist.length > 0){
            callback("User Name already exists.");
        }

        // To join the specified room 
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        //socket.leave(params.room);
        //io.emit();
        //socket.broadcast.emit();
        //socket.emit();
        // Broadcast welcome message from Admin to the User
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin',`Welcome to the ${params.room} Chat !`));
        // Broadcast welcome message from Admin to all Users except for user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));

        callback();
    });

    // Create a message on emit from client 
    socket.on('createMessage', (message, callback)=>{
        var user = users.getUser(socket.id);
        if(user && isRealString(message.messageText)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.messageText));
        }
       
        callback();
    });   

    socket.on('createLocationMessage', (coords)=>{
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));  
        }
    });

    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
    
});


app.get('/',(req, res)=>{   
    //var params = jQuery.deparam(window.location.search);
    var roomsList = rooms.getRooms();
    res.render('home.hbs', {roomsList});
  });

server.listen(port,()=>{
    console.log('Server started on port 3000')
});
console.log(__dirname + '/../public');