const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports.auth = (req, res, next) => {
  const userToken = req.cookies.jwt;
  if (!userToken) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(userToken, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};