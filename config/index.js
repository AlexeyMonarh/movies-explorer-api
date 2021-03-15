const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || '3000';

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/bitfilmsdb';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_TTL = process.env.JWT_TTL || '7d';

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
