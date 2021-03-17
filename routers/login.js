const router = require('express').Router();
const controllers = require('../controllers/auth');

router.post('/', controllers.login);

module.exports = router;
