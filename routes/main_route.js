const express = require('express');
const listroute = require('../routes/list_route/list_route.js')
const statusroute = require('../routes/status_route/status_route.js')

const router = express.Router();

router.use('/' , listroute)
router.use('/' , statusroute)

module.exports = router;