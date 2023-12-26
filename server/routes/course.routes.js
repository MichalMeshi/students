const express = require('express');
const router = express.Router();
const authMiddlware = require('../middlewares/auth')

const { addNewCourse, getCourses, getMyCourses, addFavoriteCourse, removeFavoriteCourse } = require('../controllers/course.controller');

// router.get('/', authMiddlware.auth, authMiddlware.restrictTo("admin"), userController.getUsers);
router.get('/my-courses', authMiddlware.auth, getMyCourses);
router.post('/add-favorite-course/:courseId', authMiddlware.auth, addFavoriteCourse);
router.delete('/remove-favorite-course/:courseId', authMiddlware.auth, removeFavoriteCourse);
router.get('/', getCourses)
router.post('/', addNewCourse)
module.exports = router;