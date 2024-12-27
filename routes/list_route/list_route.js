const express = require('express');
const {getList , getListById  , postlist , updatelist, deletelist} = require('../../controller/listcontrol');
express.json()
const router1 = express.Router();

/* GET home page. */

router1.get('/list', getList);
router1.get('/list/:id', getListById)

router1.post('/list' , postlist);
router1.patch('/list/:id' , updatelist);
router1.delete('/list/:id' , deletelist);

module.exports = router1;
