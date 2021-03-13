const router = require('express').Router();
const userRouters = require('./users');
const moviesRouters = require('./movies');
const registerRouter = require('./register');
const loginRouter = require('./login');
const registerValidator = require('../middlewares/validators/register');
const loginValidator = require('../middlewares/validators/login');
const authMiddleware = require('../middlewares/auth');
const { NotFound } = require('../errors');

router.use('/signup', registerValidator, registerRouter);
router.use('/signin', loginValidator, loginRouter);
router.use(authMiddleware);
router.use('/users', userRouters);
router.use('/movies', moviesRouters);

router.use('*', () => {
  throw new NotFound('Непредвиденный запрос!');
});

module.exports = router;
