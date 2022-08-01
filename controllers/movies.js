const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NoRightsError = require('../errors/NoRightsError');
const ValidationError = require('../errors/ValidationError');

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;
  return Movie.find({ owner: _id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new ValidationError('Переданы некорректные данные'),
        );
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  return Movie.findOne({ _id })
    .orFail(new NotFoundError(`Фильм с указанным id:${_id} не найден`))
    .then((movie) => {
      if (movie) {
        // приведём к строке поле owner карточки
        const owner = movie.owner.toString();
        // сравним наш id со значением owner у фильма
        if (owner === req.user._id) {
          return movie.remove();
        }
        return Promise.reject(new NoRightsError('Запрещено удалять чужие фильмы!'));
      }
      return Promise.reject(new NotFoundError('Фильм не найден'));
    })
    .then(() => res.status(200).send({ message: 'Фильм удалён навсегда!' }))
    .catch(next);
};
