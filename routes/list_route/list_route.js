const express = require('express');
const {getList , getListById  , postlist , updatelist, deletelist} = require('../../controller/listcontrol');
express.json()
const router1 = express.Router();

/* GET home page. */

router1.get('/', getList);
router1.get('/:id', getListById)

router1.post('/' , postlist);
router1.patch('/:id' , updatelist);
router1.delete('/:id' , deletelist);

module.exports = router1;
