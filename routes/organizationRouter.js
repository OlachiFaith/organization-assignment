
const router = require('express').Router();
const upload  = require('../middleware/multer');

// const router = require('express').Router()
// const upload  = require('../middleware/multer')


const { createOrganization } = require('../controller/organizationController');

// router.post('/Organization', upload.single('logo'), createOrganization);

router.post('/Organization', upload.single('Logo'), createOrganization)

module.exports = router;