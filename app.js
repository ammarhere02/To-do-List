const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }))
const router = require('./routes/main_route.js');

app.use(express.static(__dirname + '/views'));

app.use('/api/user', router);



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