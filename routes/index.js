const router = require('express').Router();
const auth = require('../middlewares/auth');
const { signout } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.use(require('./auth'));

router.use(auth);

router.post('/signout', signout);

router.use(require('./users'));
router.use(require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Not found'));
});

module.exports = router;
