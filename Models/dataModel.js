const connection = require('../dbConnection');

// Create data
function addNewData(user_id, date_time, location, source, air_quality, temperature, humidity, water_quality, callback) {
  const sql = 'INSERT INTO data (user_id, date_time, location, source, air_quality, temperature, humidity, water_quality) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  const values = [user_id, date_time, location, source, air_quality, temperature, humidity, water_quality];

  // Check each parameter for undefined and replace with null
  const sanitizedValues = values.map((val) => (val === undefined ? null : val));

  connection.query(sql, sanitizedValues, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return callback(err, null);
    }
    return callback(null, result.insertId);
  });
}

// Read data
function viewAllData(callback) {
  const sql = 'SELECT * FROM data';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return callback(err, null);
    }
    console.log('Fetched data:', result);
    callback(null, result);
  });
}

// Read users data
function viewOneData(id, callback) {
  
  const sql = 'SELECT * FROM data WHERE user_id = ?';

  connection.query(sql, [id] , (err, result) => {

    if (err) {
      console.error('Database error:', err);
      return callback(err, null);
    }

    if (!result || result.length === 0) {
      return callback(null, null); // No error, but data not found
    } 

    console.log('Fetched data:', result);
    callback(null, result);
  });
}

// Read data details
function viewOneData2(id, callback) {
  
  const sql = 'SELECT * FROM data WHERE data_id = ?';

  connection.query(sql, [id] , (err, result) => {

    if (err) {
      console.error('Database error:', err);
      return callback(err, null);
    }

    if (!result || result.length === 0) {
      return callback(null, null); // No error, but data not found
    } 

    console.log('Fetched data:', result);
    callback(null, result);
  });
}

// Update data
function updateData(data_id, user_id, date_time, location, source, air_quality, temperature, humidity, water_quality, callback) {
  const sql =
    'UPDATE data SET user_id = ?, date_time = ?, location = ?, source = ?, air_quality = ?, temperature = ?, humidity = ?, water_quality = ? WHERE data_id = ?';

  const values = [user_id, date_time, location, source, air_quality, temperature, humidity, water_quality, data_id];

  // Check each parameter for undefined and replace with null
  const sanitizedValues = values.map((val) => (val === undefined ? null : val));

  connection.query(sql, sanitizedValues, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return callback(err, null);
    }
    return callback(null, result.affectedRows > 0); // Check if any rows were affected
  });
}

// Delete data
function deleteData(id, callback) {
  const sql = 'DELETE FROM data WHERE data_id = ?';

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return callback(err, null);
    }
    return callback(null, result.affectedRows > 0); // Check if any rows were affected
  });
}

module.exports = {
  addNewData,
  viewAllData,
  viewOneData,
  viewOneData2,
  updateData,
  deleteData,
};
