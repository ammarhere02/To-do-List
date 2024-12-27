const express = require('express');
const listroute = require('../routes/list_route/list_route.js')
const statusroute = require('../routes/status_route/status_route.js')
const authroute  = require('./auth_route/auth_route');
const userroute = require('../routes/users_route/users_route')

const router = express.Router();

router.use('/' , listroute)

router.use('/' , statusroute)

router.use('/' , authroute)

router.use('/' , userroute)



module.exports = router;