// models/reactionModel.js
const db = require('../dbConnection');
const userModel = require('./userModel');

// ...

async function AddReaction(report_id, data_id, resource_id, attribute_name,user_id, callback) {
  const sql = 'INSERT INTO reactions (report_id, data_id, resource_id, attribute_name, user_id) VALUES (?, ?, ?, ?, ?)';

  try {

    const result = await new Promise((resolve, reject) => {
        db.query(sql, [report_id, data_id, resource_id, attribute_name, user_id], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(result);
        });
    });

    // Fetch the user ID associated with the data ID
    const userId = await getUserIdByDataId(data_id);
    

    // Update the user's sustainability score by adding 2
    const newScore = await userModel.updateUserSustainabilityScore(userId, (err, updatedScore)=>{
      if (err) {
        console.error('Error updating sustainability score:', err);
        // Handle the error appropriately
      } else {
        console.log('Updated sustainability score:', updatedScore);
      }
    });

    //console.log(newScore);

    return callback(null, { reactionId: result.insertId, newScore });
} catch (error) {
    console.error('Error in AddReaction:', error);
    return callback(error, null);
}
}

// ...


// Function to get user ID by data ID
async function getUserIdByDataId(dataId) {
  const sql = 'SELECT user_id FROM data WHERE data_id = ?';
  return new Promise((resolve, reject) => {
      db.query(sql, [dataId], (err, result) => {
          if (err) {
              console.error('Database error:', err);
              return reject(err);
          }
          // Assuming the result is an array with one element
          const userId = result.length > 0 ? result[0].user_id : null;
          resolve(userId);
      });
  });
}


// Read data details
function viewReactions(id, callback) {
  
    const sql = 'SELECT * FROM reactions WHERE user_id = ?';
  
    db.query(sql, [id] , (err, result) => {
  
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

// Delete data
function deleteReaction(id, callback) {
    const sql = 'DELETE FROM reactions WHERE reaction_id = ?';
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return callback(err, null);
      }
      return callback(null, result.affectedRows > 0); // Check if any rows were affected
    });
  }


module.exports = {
    AddReaction,
    viewReactions,
    deleteReaction,
};
