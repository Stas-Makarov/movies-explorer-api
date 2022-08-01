const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

moviesRouter.get('/', getMovies);

moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Ссылка заполненна некорректно');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Ссылка заполненна некорректно');
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Ссылка заполненна некорректно');
    }),
    movieId: Joi.number().required(),
  }),
}), createMovie);

moviesRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi
      .string()
      .required()
      .alphanum()
      .length(24)
      .hex(),
  }),
}), deleteMovie);

module.exports = moviesRouter;