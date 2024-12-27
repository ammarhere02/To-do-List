const express = require('express');
const router3 = express.Router();

const {signUp, signIn} = require('../../controller/authentication');


router3.post('/auth/register', signUp)

router3.post('/auth/login', signIn)




module.exports = router3;