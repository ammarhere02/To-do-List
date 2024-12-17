const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }))
const router = require('./routes/main_route.js');

app.use(express.static(__dirname + '/views'));

app.use('/', router);

app.get('/' , (req, res) =>
{
  res.redirect('/home');
})

app.get('/register', function(req, res ) {
  res.sendFile(__dirname + '/views/signup.html');
})

app.get('/user/login', function(req, res) {
  res.sendFile(__dirname + '/views/login.html');
});


app.get('/home' , (req, res) => {

  console.log("Welcome to the home-page :)")
  res.send("HOMEPAGE ")
})

app.listen(port , ()=>
{
  console.log(`server running at http://localhost:${port}/`)
})