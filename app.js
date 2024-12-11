const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }))
const router = require('./routes/main_route.js');



app.use('/', router);

app.get('/' , (req, res) => {

  res.redirect('/login')
  console.log("redirected to login sucessfully")
})

app.get("/login", (req, res) => {
  res.status(200).json("Welcome to log-in page")
  console.log("Welcome to the log-in-page :)")
  res.render('login')
});

app.get('/home' , (req, res) => {

  console.log("Welcome to the home-page :)")
})

app.listen(port , ()=>
{
  console.log(`server running at http://localhost:${port}/`)
})