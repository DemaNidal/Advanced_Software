const db = require('../dbConnection');

function addNewData(user_id, date_time, location, source, air_quality, temperature, humidity, water_quality, callback){

    const sql = 'INSERT INTO data (user_id, date_time, location, source, air_quality, temperature, humidity, water_quality) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [user_id, date_time, location, source, air_quality, temperature, humidity, water_quality], (err, result) => {
    if (err) {
        console.error('Database error:', err);
        return callback(err, null);
    }
    return callback(null, result.insertId); // Return the ID of the newly inserted record
  });
}

function viewAllData(callback){

    const sql = 'SELECT * FROM data';
    db.query(sql, (err, result) => {
    if (err) {
        console.error('Database error:', err);
        return callback(err, null);
    }
    console.log('Fetched data:', result);
    callback(null, result); // Return the ID of the newly inserted record
  });
}

// function editTheData(callback){

//   const sql = 'SELECT * FROM data';
//   db.query(sql, (err, result) => {
//   if (err) {
//       console.error('Database error:', err);
//       return callback(err, null);
//   }
//   console.log('Fetched data:', result);
//   callback(null, result); // Return the ID of the newly inserted record
// });
// }

module.exports = {
    addNewData,
    viewAllData,
    // Other model functions...
  };