const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }))
const router = require('./routes/main_route.js');


app.use('/', router);

app.get('/' , (req, res) => {

  res.redirect('/home')
  console.log("redirected to home sucessfully")
})

app.get("/home", (req, res) => {
  res.status(200).json("Welcome to home")
  console.log("Welcome to the home :)")
});


app.listen(port , ()=>
{
  console.log(`server running at http://localhost:${port}/`)
})