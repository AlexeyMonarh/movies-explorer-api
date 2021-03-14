const router = require('express').Router();
const controllers = require('../controllers/movies');
const validId = require('../middlewares/validators/id');
const validCreateMovie = require('../middlewares/validators/createMovie');

router.get('/', controllers.getMovies);
router.post('/', validCreateMovie, controllers.postMovie);
router.delete('/:_id', validId, controllers.deleteMovie);

module.exports = router;
