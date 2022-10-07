const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


// express app
const app = express();

//connect to MongoDB
const dbURI ='mongodb+srv://kyle1988:Laracroft97@cluster0.of4ofmv.mongodb.net/course-app?retryWrites=true&w=majority';
//            mongodb+srv://kyle1988:Laracroft97@cluster0.of4ofmv.mongodb.net/course-app?retryWrites=true&w=majority
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=>console.log('connect to db'))
.catch ((err)=> console.log(err));



// register view engine
app.set('view engine', 'ejs');


// listen for requests
app.listen(9000);



//middleware & static files

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

//mongoose and mongo sandbox routes

app.get('/add-blog',(req, res)=>{
    const blog = new Blog({
     title: 'web dev',
     snippet: 'react JS',
     body: 'more about my new blog'

    });

    blog.save()
     .then((result)=> {
       res.send(result)

     })
     .catch((err) => {

        console.log(err);
     });
});

// all blogs

app.get('/all-blogs', (req, res)=>{

  Blog.find()
    .then((result) => {
      res.send(result);

    })
    .catch((err)=>{
      console.log(err);

    });


});

app.get('/single-blog',(req, res)=>{
 Blog.findById('5eb415667fcf2d644fc162a')
  .then((result) => {
    res.send(result)
  })
   .catch((err) => {
    console.log(err);

  });


});

//routes
app.get('/',(req, res)=>{

    const blogs = [
        {title: 'Web Dev', snippet: 'HTML 5,CSS,JS'},
        {title: 'Mobile Engineer', snippet: 'Kotlin Java'},
        {title: 'Product Dev', snippet: 'React JS, Node JS, Firebase'},

    ];

 res.render('index',{title:'Home', blogs});
 

});



app.get('/about',(req, res)=>{

 res.render('about',{title:'About'});

});

// post request

app.post ('/blogs', (req, res)=>{

   const blog = new Blog(req.body);

   blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })

    .catch((err) => {
        console.log(err);


    });
    

})

// vanilla Javascript

app.delete('/blogs/:id', (req, res)=> {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs'})
      })
      .catch(err => {
        console.log(err);

      })

})


// blog routes


app.get('/blogs/create',(req, res)=>{
    res.render('create', {title: 'Create a new blog'});

});



// 404 page

app.use((req, res) => {
  res.status(404).render('404', {title: '404'});

});

// enter remaining code here


