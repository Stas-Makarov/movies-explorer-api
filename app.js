const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/rate-limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000, DB_PATH = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const allowedCors = [
  'http://localhost:3000',
  'https://s.d.domainname.students.nomoredomains.xyz',
  'https://api.s.d.domainname.students.nomoredomains.xyz',
];
app.use(
  cors({
    origin: allowedCors,
    credentials: true,
  }),
);

mongoose
  .connect(DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.use(helmet());
app.use(limiter);

app.use(require('./routes/index'));

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка сервера' : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('App listening on port:', PORT);
});
