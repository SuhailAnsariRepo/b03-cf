const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middlewares/authMiddleware');

// Define routes
router.post('/uploadFile', authMiddleware.authenticateToken, fileController.uploadFile);
router.put('/renameFile', authMiddleware.authenticateToken, fileController.renameFile);
router.delete('/deleteFile', authMiddleware.authenticateToken, fileController.deleteFile);
router.get('/:fileId', authMiddleware.authenticateToken, fileController.viewFile);

module.exports = router;
