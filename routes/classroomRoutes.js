// classroomRoutes.js
const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');
const authMiddleware = require('../middlewares/authMiddleware');

// Define routes
router.post('/addStudent', authMiddleware.authenticateToken, classroomController.addStudent);
router.post('/shareFile', authMiddleware.authenticateToken, classroomController.shareFile);

module.exports = router;
