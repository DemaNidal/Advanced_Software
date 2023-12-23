// models/reportModel.js
const db = require('../dbConnection');

function addReport(user_id, description, issue_type, location, date_time, callback) {
    const sql = 'INSERT INTO reports (user_id, description, issue_type, location, date_time) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [user_id, description, issue_type, location, date_time], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        return callback(null, result.insertId);
    });
}

function getAllReports(callback) {
    const sql = 'SELECT * FROM reports';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        return callback(null, results);
    });
}

function getReportsByUserId(user_id, callback) {
    const sql = `
        SELECT 
            reports.*,
            users.name,
            users.air_quality_threshold,
            users.temperature_threshold,
            users.humidity_threshold,
            users.water_quality_threshold,
            interests.aspect AS user_interest
        FROM reports
        JOIN users ON reports.user_id = users.user_id
        LEFT JOIN user_interests ON users.user_id = user_interests.user_id
        LEFT JOIN interests ON user_interests.interest_id = interests.interest_id
        WHERE reports.user_id = ?
    `;

    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }

        const userReports = results.map((row) => {
            return {
                report_id: row.report_id,
                user_id: row.user_id,
                description: row.description,
                issue_type: row.issue_type,
                location: row.location,
                date_time: row.date_time,
                user: {
                    name: row.name,
                    air_quality_threshold: row.air_quality_threshold,
                    temperature_threshold: row.temperature_threshold,
                    humidity_threshold: row.humidity_threshold,
                    water_quality_threshold: row.water_quality_threshold,
                },
                user_interest: row.user_interest,
            };
        });

        return callback(null, userReports);
    });
}


function deleteReport(id, callback) {
    const sql = 'DELETE FROM reports WHERE report_id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        return callback(null, result.affectedRows > 0);
    });
}


function updateReport(report_id, description, issue_type, location, date_time, callback) {

    const sql = 'UPDATE reports SET description = ?, issue_type = ?, location = ?, date_time = ? WHERE report_id = ?';

    const values = [description, issue_type, location, date_time, report_id];
     // Check each parameter for undefined and replace with null
    const sanitizedValues = values.map((val) => (val === undefined ? null : val));

    
    db.query(sql, sanitizedValues, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err);
        }
        return callback(null, result.affectedRows > 0); 
    });
}

module.exports = {
    updateReport,
    deleteReport,
    addReport,
    getAllReports,
    getReportsByUserId,
};
