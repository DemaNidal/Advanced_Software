const db = require('../dbConnection');

function addNewUser(name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location, sustainability_score, callback) {
    const sql = 'INSERT INTO users (name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location, sustainability_score) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location, sustainability_score], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        return callback(null, result.insertId); // Return the ID of the newly inserted record
    });
}

function getAllUsers(callback) {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        return callback(null, results);
    });
}

function getUserById(userId, callback) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        
        if (results.length === 0) {
            // User with the specified id was not found
            return callback({ message: 'User not found' }, null);
        }

        // User found, return the user data
        return callback(null, results[0]);
    });
}


module.exports = {
    addNewUser,
    getAllUsers,
    getUserById
};
