const Router = require('express');

const deviceController = require('../controllers/deviceController');

const router = new Router();

router.post('/', deviceController.createDevice);
router.get('/', deviceController.getAllDevices);
router.get('/:id', deviceController.getDeviceById);

module.exports = router;
