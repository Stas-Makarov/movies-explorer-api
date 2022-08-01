const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const { login, createUser, signout } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
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

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signout', signout);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use((req, res, next) => {
  next(new NotFoundError('Not found'));
});

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
