const express = require('express');
const router = express.Router();

const { addNewCourse } = require('../controllers/course.controller');

// router.get('/', authMiddlware.auth, authMiddlware.restrictTo("admin"), userController.getUsers);
// router.get('/getUserInfo', authMiddlware.auth, userController.getUser);
// router.post('/', userController.register);
// router.post('/login', userController.login);
router.post('/',addNewCourse)
module.exports = router;