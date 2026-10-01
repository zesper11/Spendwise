const router = require('express').Router();
const { signup, login, getMe, updateAvatar } = require('../controller/auth');
const auth = require('../middleware/auth');

router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.get('/auth/me', auth, getMe);
router.patch('/auth/avatar', auth, updateAvatar);

module.exports = router;