const express = require('express');

const router3 = express.Router();

const {signUp} = require('/controller/auth');

const {signIn} = require('/controller/auth');

router3.post('/register' , signUp)

router3.post('/login', signIn)

module.exports = router3;