const { CelebrateError } = require('celebrate');
const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CelebrateError) {
    return res
      .status(400)
      .send({ message: err.details.get('body').details[0].message });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.details.get('body'));
  }
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  res.status(500).send({ message: err.message });
  return next();
};

module.exports = errorHandler;
