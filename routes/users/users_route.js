const express = require('express');

const router3 = express.Router();

const {signUp} = require('../../controller/authentication');

const {signIn} = require('../../controller/authentication');

router3.post('/user/register' , signUp)

router3.post('/user/login', signIn)


module.exports = router3;