const express = require('express');
const hbs = require('hbs');
const path =require('path');
const socketIO = require('socket.io');
const http = require('http');

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
    socket.on('disconnect',()=>{
        console.log('connection closed');
    });
});



app.get('/',(req, res)=>{
    /*res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Site !!!'
    });*/
    res.send('welcome to chat app');
  });

server.listen(port,()=>{
    console.log('Server started on port 3000')
});
console.log(__dirname + '/../public');