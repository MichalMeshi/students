const express = require('express');
const router = express.Router();

const { addNewCourse,getCourses } = require('../controllers/course.controller');

// router.get('/', authMiddlware.auth, authMiddlware.restrictTo("admin"), userController.getUsers);
// router.get('/getUserInfo', authMiddlware.auth, userController.getUser);
// router.post('/', userController.register);
// router.post('/login', userController.login);
router.get('/',getCourses)
router.post('/',addNewCourse)
module.exports = router;