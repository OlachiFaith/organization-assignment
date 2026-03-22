const express = require('express');
const router = express.Router();

const { createDelivery } = require('../controller/delivertTableController');

router.post('/Delivery', createDelivery)

module.exports = router