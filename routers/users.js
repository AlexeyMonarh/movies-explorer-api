const router = require('express').Router();
const controllers = require('../controllers/users');
const validUpUsInfo = require('../middlewares/validators/upUsInfo');

router.get('/me', controllers.getUser);
router.patch('/me', validUpUsInfo, controllers.patchUser);

module.exports = router;
