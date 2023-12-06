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
};

module.exports = InterestModel;
