const router = require('express').Router();
const { upload } = require('../middleware/multer');

const { createOrganization } = require('../controller/organizationController');

router.post('/Organization', upload.single('logo'), createOrganization);

module.exports = router;