const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/login',userController.login)
router.post('/register',userController.register)
// router.get('/', authMiddlware.auth, authMiddlware.restrictTo("admin"), userController.getUsers);
// router.get('/getUserInfo', authMiddlware.auth, userController.getUser);
// router.post('/', userController.register);
// router.post('/login', userController.login);

module.exports = router;