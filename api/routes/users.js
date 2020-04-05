const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

router.post('/login', UsersController.login);

router.post('/signup', UsersController.signUp);

router.get('/', checkAuth, UsersController.getAllUsers);

router.get('/:userId', checkAuth, UsersController.getUser);

router.delete('/:userId', checkAuth, UsersController.deleteUser);

module.exports = router;