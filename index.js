require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const fileRoutes = require('./routes/fileRoutes');
const tutorRoutes = require('./routes/tutorRoutes');

const app = express();
app.use(bodyParser.json());


app.use
// Routes
app.use('/auth', authRoutes);
app.use('/tutors', tutorRoutes);
app.use('/classrooms', classroomRoutes);
app.use('/files', fileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});