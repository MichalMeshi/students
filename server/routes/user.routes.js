const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddlware = require('../middlewares/auth')
router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/get-user-data/:userId', userController.getUserData)
router.get('/get-user', authMiddlware.auth, userController.getUser)
router.get('/get-all-users', authMiddlware.auth, userController.getAllUsers)
router.patch('/update-user', authMiddlware.auth, userController.updateUser)
router.post("/forgot-password", authMiddlware.forgotPassword);
router.post("/verify/:resetToken", authMiddlware.verifyToken);
router.post("/reset-password/:resetToken", authMiddlware.resetPassword);
router.post("/contact", authMiddlware.auth, userController.contact);


module.exports = router;