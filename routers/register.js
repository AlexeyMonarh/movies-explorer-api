const router = require('express').Router();
const controllers = require('../controllers/auth');

router.post('/', controllers.createUser);

module.exports = router;
