const db = require('../config/database');

// Controller methods
exports.addStudent = async (req, res, next) => {
    try {
        // Extract necessary data from request body
        const { classroomId, studentId } = req.body;

        // Check if the current user is a tutor
        if (req.user.userType !== 'Tutor') {
            return res.status(403).json({ error: 'Forbidden - Only tutors can add students to classrooms' });
        }

        // Perform database query to check if the current user is the tutor of the classroom
        const classroom = await db.query('SELECT * FROM Classrooms WHERE ClassroomID = ? AND TutorID = ?', [classroomId, req.user.userId]);

        if (classroom.length === 0) {
            return res.status(403).json({ error: 'Forbidden - You do not have access to add students to this classroom' });
        }

        // Perform database query to add student to classroom
        const result = await db.query('INSERT INTO ClassroomStudents (ClassroomID, StudentID) VALUES (?, ?)', [classroomId, studentId]);

        res.status(201).json({ message: 'Student added to classroom successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.shareFile = async (req, res, next) => {
    try {
        // Extract necessary data from request body
        const { fileId, classroomId } = req.body;

        // Check if the current user is a tutor
        if (req.user.userType !== 'Tutor') {
            return res.status(403).json({ error: 'Forbidden - Only tutors can share files with classrooms' });
        }

        // Perform database query to check if the tutor owns the file
        const file = await db.query('SELECT * FROM Files WHERE FileID = ? AND UploadedBy = ?', [fileId, req.user.userId]);

        if (file.length === 0) {
            return res.status(403).json({ error: 'Forbidden - You do not have access to share this file' });
        }

        // Perform database query to check if the tutor owns the classroom
        const classroom = await db.query('SELECT * FROM Classrooms WHERE ClassroomID = ? AND TutorID = ?', [classroomId, req.user.userId]);

        if (classroom.length === 0) {
            return res.status(403).json({ error: 'Forbidden - You do not have access to share files in this classroom' });
        }

        // Perform database query to share file with classroom
        const result = await db.query('INSERT INTO ClassroomFiles (ClassroomID, FileID) VALUES (?, ?)', [classroomId, fileId]);

        res.status(201).json({ message: 'File shared with classroom successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
