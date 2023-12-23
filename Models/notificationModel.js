const db = require('../dbConnection');

function addNotification(user_id, data_id, title, body, callback) {
    const sql = 'INSERT INTO notifications (user_id, data_id, title, body) VALUES (?, ?, ?, ?)';
    const values = [user_id, data_id, title, body];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        return callback(null, result.insertId); // Return the ID of the newly inserted record
    });
}



function viewAllNotification(callback){

    const sql = 'SELECT * FROM notifications';
    db.query(sql, (err, result) => {
    if (err) {
        console.error('Database error:', err);
        return callback(err, null);
    }
    console.log('Fetched notification:', result);
    callback(null, result); // Return the ID of the newly inserted record
  });
}
function viewNotificationsByUserId(user_id, callback) {
    const sql = 'SELECT * FROM notifications WHERE user_id = ?';
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        console.log('Fetched notifications:', result);
        callback(null, result);
    });
}
module.exports = {
    addNotification,
    viewAllNotification,
    viewNotificationsByUserId
  };