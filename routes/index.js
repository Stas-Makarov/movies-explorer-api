const router = require('express').Router();
const auth = require('../middlewares/auth');
const { signout } = require('../controllers/users');

router.use(require('./auth'));

router.use(auth);

router.post('/signout', signout);

router.use(require('./users'));
router.use(require('./movies'));

module.exports = router;
