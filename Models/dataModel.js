const db = require('../dbConnection');

function addNewData(location, dateANDtime, source, content, callback){

    const sql = 'INSERT INTO data (location, dateANDtime, source, content) VALUES (?, ?, ?, ?)';
    db.query(sql, [location, dateANDtime, source, content], (err, result) => {
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

module.exports = {
    addNewData,
    viewAllData,
    // Other model functions...
  };