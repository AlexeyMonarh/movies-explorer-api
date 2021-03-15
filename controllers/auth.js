const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Conflict, Unauthorized } = require('../errors');
const { JWT_SECRET, JWT_TTL } = require('../config/index');
const { emailUsed, invaliEmailOnPass } = require('../config/constants');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict(emailUsed);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    // eslint-disable-next-line no-shadow
    .then(({ name, email }) => {
      res.send({
        name,
        email,
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(invaliEmailOnPass);
      }
      return bcrypt.compare(password, user.password).then((isValid) => {
        if (isValid) {
          return user;
        }
        throw new Unauthorized(invaliEmailOnPass);
      });
    })
    .then(({ _id }) => {
      const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: JWT_TTL });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
