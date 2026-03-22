const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { addOrder } = require('../controller/orderController');

router.post('/add-order', upload.array('images', 3), addOrder);


module.exports = router