const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { addOrder, getOrders, getOrder } = require('../controller/orderController');

router.post('/add-order', upload.array('images', 3), addOrder);

router.get('/getOrders', getOrders);

router.get('/getOrder/:id', getOrder)

module.exports = router