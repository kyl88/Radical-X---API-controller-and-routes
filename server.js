const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');


// listen for requests
app.listen(8080);

app.get('/',(req, res)=>{

    const blogs = [
        {title: '', snippet: ''},
        {title: '', snippet: ''},
        {title: '', snippet: ''},

    ]

 res.render('index',{title:'Home', blogs});
 

});

app.get('/about',(req, res)=>{

 res.render('about',{title:'About'});

});

app.get('/blogs/create',(req, res)=>{
    res.render('create', {title: 'Create a new blog'});

});

app.get('/blogs/create',(req, res)=>{
    res.render('create');

});

// 404 page

// enter remaining code here


