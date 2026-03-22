const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { addStaff } = require('../controller/staffController');

router.post('/add-staff',upload.fields([
    { name: 'staffDp', maxCount: 1 },
    { name: 'profilePhotos', maxCount: 5 }
  ]),
  addStaff
);


module.exports = router