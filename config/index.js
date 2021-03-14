const rateLimit = require('express-rate-limit');

const { PORT } = process.env;

const { MONGODB_URL } = process.env;

const { JWT_SECRET } = process.env;
const { JWT_TTL } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  PORT,
  MONGODB_URL,
  JWT_SECRET,
  JWT_TTL,
  limiter,
};
