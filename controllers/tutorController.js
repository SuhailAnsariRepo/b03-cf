const db = require('../config/database');

// Controller methods
exports.createClassroom = async (req, res, next) => {
    try {
        // Extract necessary data from request body
        const { tutorId, classroomName } = req.body;

        // Check if the current user is a tutor
        if (req.user.userType !== 'Tutor') {
            return res.status(403).json({ error: 'Forbidden - Only tutors can create classrooms' });
        }

        // Perform database query to create classroom
        const result = await db.query('INSERT INTO Classrooms (TutorID, ClassName) VALUES (?, ?)', [req.user.userId, classroomName]);

        res.status(201).json({ message: 'Classroom created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addStudentToClassroom = async (req, res, next) => {
    try {
        // Extract necessary data from request body
        const { classroomId, studentId } = req.body;

        // Check if the current user is a tutor
        if (req.user.userType !== 'Tutor') {
            return res.status(403).json({ error: 'Forbidden - Only tutors can add students to classrooms' });
        }

        // Perform database query to check if the tutor owns the classroom
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

exports.createFile = async (req, res, next) => {
    try {
        // Extract necessary data from request body
        const { fileName } = req.body;

        // Check if the current user is a tutor
        if (req.user.userType !== 'Tutor') {
            return res.status(403).json({ error: 'Forbidden - Only tutors can create files' });
        }

        // Perform database query to create file
        const result = await db.query('INSERT INTO Files (FileName, UploadedBy, FileType) VALUES (?, ?, ?)', [fileName, req.user.userId, req.user.userType]);

        res.status(201).json({ message: 'File created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateFile = async (req, res, next) => {
    try {
        // Extract necessary data from request body
        const { fileId, updatedFileName } = req.body;

        // Check if the current user is a tutor
        if (req.user.userType !== 'Tutor') {
            return res.status(403).json({ error: 'Forbidden - Only tutors can update files' });
        }

        // Perform database query to update file
        const result = await db.query('UPDATE Files SET FileName = ? WHERE FileID = ? AND UploadedBy = ?', [updatedFileName, fileId, req.user.userId]);

        // Check if file was updated successfully
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'File not found or unauthorized' });
        }

        res.status(200).json({ message: 'File updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteFile = async (req, res, next) => {
    try {
        // Extract necessary data from request body
        const { fileId } = req.body;

        // Check if the current user is a tutor
        if (req.user.userType !== 'Tutor') {
            return res.status(403).json({ error: 'Forbidden - Only tutors can delete files' });
        }

        // Perform database query to delete file
        const result = await db.query('DELETE FROM Files WHERE FileID = ? AND UploadedBy = ?', [fileId, req.user.userId]);

        // Check if file was deleted successfully
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'File not found or unauthorized' });
        }

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
