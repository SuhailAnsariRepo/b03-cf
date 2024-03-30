const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const authMiddleware = require('../middlewares/authMiddleware');

// Define routes
router.post('/createClassroom', authMiddleware.authenticateToken, tutorController.createClassroom);
router.post('/addStudentToClassroom', authMiddleware.authenticateToken, tutorController.addStudentToClassroom);
router.post('/shareFile', authMiddleware.authenticateToken, tutorController.shareFile);
router.post('/createFile', authMiddleware.authenticateToken, tutorController.createFile);
router.put('/updateFile', authMiddleware.authenticateToken, tutorController.updateFile);
router.delete('/deleteFile', authMiddleware.authenticateToken, tutorController.deleteFile);

module.exports = router;
