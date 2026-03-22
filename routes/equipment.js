const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { createEquipment } = require('../controller/equipment');


router.post('/create-equipment', upload.array('images', 2), createEquipment);


module.exports = router