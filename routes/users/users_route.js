const express = require('express');

const router3 = express.Router();

const {signUp, signIn} = require('../../controller/authentication');


router3.post('/register' , signUp)
router3.get('/register' , signUp)
router3.get('/user/login', signIn)

router3.post('/user/login', signIn)


module.exports = router3;