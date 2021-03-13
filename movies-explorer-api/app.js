const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter, PORT, mongoConnect } = require('./config/index');

const router = require('./routers');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(requestLogger);
app.use(cors());
app.use(limiter);
mongoose.connect(mongoConnect, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(helmet());
app.use(bodyParser.json());
app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Подключено к ${PORT} порту`);
});
