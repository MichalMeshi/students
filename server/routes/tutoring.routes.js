const express = require('express');
const router = express.Router();
const authMiddlware = require('../middlewares/auth')
const tutoringController = require('../controllers/tutoring.controller')

// router.get('/', authMiddlware.auth, authMiddlware.restrictTo("admin"), userController.getUsers);
router.post('/add-tutoring', authMiddlware.auth, tutoringController.addTutoring);
router.get('/tutoring-posts', authMiddlware.auth, tutoringController.getTutoringPosts);

module.exports = router;