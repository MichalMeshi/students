const express = require('express');
const router = express.Router();
const authMiddlware = require('../middlewares/auth')

const { addNewCourse, getCourses, getMyCourses, addFavoriteCourse, removeFavoriteCourse, searchCourse } = require('../controllers/course.controller');

// router.get('/', authMiddlware.auth, authMiddlware.restrictTo("admin"), userController.getUsers);
router.get('/my-courses', authMiddlware.auth, getMyCourses);
router.post('/add-favorite-course/:courseId', authMiddlware.auth, addFavoriteCourse);
router.delete('/remove-favorite-course/:courseId', authMiddlware.auth, removeFavoriteCourse);
router.get('/', getCourses);
router.get('/search-course/:searchInput', authMiddlware.auth, searchCourse);
router.post('/', authMiddlware.auth, authMiddlware.restrictTo("admin"), addNewCourse);

module.exports = router;