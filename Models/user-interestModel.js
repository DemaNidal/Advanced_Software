// models/interestModel.js
const db = require('../dbConnection');

const InterestModel = {
  getInterestIdByName: (interestName) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT interest_id FROM interests WHERE aspect = ?';
      db.query(sql, [interestName], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.length > 0 ? result[0].interest_id : null);
        }
      });
    });
  },

  addUserInterest: (userId, interestId) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO user_interests (user_id, interest_id) VALUES (?, ?)';
      db.query(sql, [userId, interestId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  viewInterest(user_id, callback) {
    const sql = 'SELECT * FROM user_interests WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        return callback(null, results);
    });
  },

  deleteInterest(id, callback) {
    const sql = 'DELETE FROM user_interests WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return callback(err, null);
      }
      return callback(null, result.affectedRows > 0); // Check if any rows were affected
    });
  },

};


module.exports = InterestModel;