
// const { router } = require('express')
const {createOrganization, getOrganizations, getOrganization}= require('../controller/organizationController')
const router = require('express').Router();
const upload  = require('../middleware/multer');



router.post('/Organization', upload.single('Logo'), createOrganization);

router.get('/Organization', getOrganizations);

router.get('/Organization/:id', getOrganization)

module.exports = router;