// models/resourceModel.js
const db = require('../dbConnection');

function addResource(user_id, title, content, callback) {
    const sql = 'INSERT INTO resources (user_id, title, content) VALUES (?, ?, ?)';
    db.query(sql, [user_id, title, content], (err, result) => {
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

function updateResource(resource_id, title, content, callback) {
    const sql = 'UPDATE resources SET title = ?, content = ? WHERE resource_id = ?';
    db.query(sql, [title, content, resource_id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err);
        }
        return callback(null);
    });
}

function deleteResource(resource_id, callback) {
    const sql = 'DELETE FROM resources WHERE resource_id = ?';
    db.query(sql, [resource_id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err);
        }
        return callback(null);
    });
}

module.exports = {
    addResource,
    getAllResources,
    getResourcesByUserId,
    updateResource,
    deleteResource,
};
