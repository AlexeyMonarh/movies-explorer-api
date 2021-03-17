const User = require('../models/user');
const { NotFound } = require('../errors');
const { noUserId } = require('../config/constants');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound(noUserId);
      }
      return res.send(user);
    })
    .catch(next);
};

const patchUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFound(noUserId);
    })
    .catch(next);
};

module.exports = {
  getUser,
  patchUser,
};
