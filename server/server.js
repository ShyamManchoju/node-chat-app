const express = require('express');
const hbs = require('hbs');
const path =require('path');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

const publicPath =path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.get('/',(req, res)=>{
    /*res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Site !!!'
    });*/
    res.send('welcome to chat app');
  });

app.listen(port,()=>{
    console.log('Server started on port 3000')
});
console.log(__dirname + '/../public');