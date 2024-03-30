// fileController.js
const db = require('../config/database');

// Controller methods
exports.uploadFile = async (req, res, next) => {
    try {
        // Extract necessary data from request body
        const { tutorId, fileName } = req.body;

        // Perform database query to upload file
        const result = await db.query('INSERT INTO files (tutor_id, name) VALUES (?, ?)', [tutorId, fileName]);

        res.status(201).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.renameFile = async (req, res, next) => {
    try {
        // Extract necessary data from request body
        const { fileId, updatedFileName } = req.body;

        // Perform database query to rename file
        const result = await db.query('UPDATE files SET name = ? WHERE id = ?', [updatedFileName, fileId]);

        // Check if file was renamed successfully
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.status(200).json({ message: 'File renamed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteFile = async (req, res, next) => {
    try {
        // Extract necessary data from request body
        const { fileId } = req.body;

        // Perform database query to delete file
        const result = await db.query('DELETE FROM files WHERE id = ?', [fileId]);

        // Check if file was deleted successfully
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.viewFile = async (req, res, next) => {
    try {
        // Extract necessary data from request parameters
        const { fileId } = req.params;

        // Perform database query to fetch file details
        const [file] = await db.query('SELECT * FROM files WHERE id = ?', [fileId]);

        // Check if file exists
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Return file details to the student
        res.status(200).json({ file });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
