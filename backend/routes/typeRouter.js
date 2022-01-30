const Router = require('express');

const typeController = require('../controllers/typeController');

const router = new Router();

router.post('/', typeController.createType);
router.get('/', typeController.getAllTypes);

module.exports = router;
