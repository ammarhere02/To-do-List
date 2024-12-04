const express = require('express');
const router2 = express.Router();
const {getstatuswithid , updatestatus} = require('../../controller/statuscontrol');

router2.get('/:id/status', getstatuswithid)
router2.delete('/:id/status/', updatestatus)

module.exports = router2;
