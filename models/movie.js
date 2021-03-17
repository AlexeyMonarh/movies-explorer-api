const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types.ObjectId;
const validator = require('validator');
const { notValidUrl } = require('../config/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          return validator.isURL(url);
        },
        message: notValidUrl,
      },
    },
    trailer: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          return validator.isURL(url);
        },
        message: notValidUrl,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          return validator.isURL(url);
        },
        message: notValidUrl,
      },
    },
    owner: {
      ref: 'user',
      type: ObjectId,
      required: true,
      unique: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
