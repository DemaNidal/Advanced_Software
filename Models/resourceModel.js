// models/resourceModel.js
const db = require('../dbConnection');

function addResource(user_id, date_time, title, content, callback) {
    const sql = 'INSERT INTO resources (user_id, date_time, title, content) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, date_time, title, content], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        return callback(null, result.insertId);
    });
}

function getAllResources(callback) {
    const sql = 'SELECT * FROM resources';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        return callback(null, results);
    });
}

function getResourcesByUserId(user_id, callback) {
    const sql = 'SELECT * FROM resources WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        return callback(null, results);
    });
}

function updateResource(id, date_time, title, content, callback) {
    const sql = 'UPDATE resources SET date_time = ?, title = ?, content = ? WHERE resource_id = ?';

    const values = [date_time, title, content, id];

    // Check each parameter for undefined and replace with null
    const sanitizedValues = values.map((val) => (val === undefined ? null : val));

    db.query(sql, sanitizedValues , (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err);
        }
        return callback(null, result.affectedRows > 0);
    });
}

function deleteResource(resource_id, callback) {
    const sql = 'DELETE FROM resources WHERE resource_id = ?';
    db.query(sql, [resource_id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err);
        }
        return callback(null, result.affectedRows > 0);
    });
}


module.exports = {
    addResource,
    getAllResources,
    getResourcesByUserId,
    updateResource,
    deleteResource,
};
