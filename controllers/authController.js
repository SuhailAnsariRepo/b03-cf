const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.authenticate = async (req, res) => {
    // For simplicity, accept any username/password
    const { username, password } = req.body;
    
    // Execute SQL query to validate user
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // If user does not exist, return error
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // User exists, generate JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        res.json({ token });
    });
};
