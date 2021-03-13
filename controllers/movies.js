const mongoose = require('mongoose');
const Movie = require('../models/movie');
const { NotFound, Forbidden } = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((Movies) => {
      if (!Movies.length) {
        throw new NotFound('Нет Фильмов!');
      }
      return res.send(Movies);
    })
    .catch(next);
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Фильм не найден!');
      }
      if (String(movie.owner) !== String(req.user._id)) {
        throw new Forbidden('Фильм не удален! Вы его не создавали!');
      }
      return movie.remove(movie._id).then(() => {
        res.send({ message: 'Фильм удален!' });
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        res.status(400).send({ message: 'Невалидный ID' });
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
