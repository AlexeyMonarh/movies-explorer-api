const rateLimit = require('express-rate-limit');

const { PORT = 3000 } = process.env;

const { mongoConnect = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const JWT_SECRET = process.env.JWT_SECRET || 'default secret';
const JWT_TTL = process.env.JWT_SECRET || '7d';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  PORT,
  mongoConnect,
  JWT_SECRET,
  JWT_TTL,
  limiter,
};
