const bcrypt = require('bcryptjs');
const process = require('process');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const EmailUniqueError = require('../errors/EmailUniqueError');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports.getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new EmailUniqueError('Емейл занят'));
      } if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при создании пользователя.'));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    _id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(
      new NotFoundError('Пользователь с указанным id не найден'),
    )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new EmailUniqueError('Емейл занят'));
      } if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при создании пользователя.'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports.signout = (req, res) => {
  res
    .status(200)
    .clearCookie('jwt', {
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : '',
    })
    .send({ message: 'Выход из системы' });
};
