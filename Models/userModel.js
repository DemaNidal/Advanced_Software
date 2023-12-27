const db = require('../dbConnection');
const axios = require('axios');



function addNewUser(name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location, sustainability_score, callback) {
    const sql = 'INSERT INTO users (name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        return callback(null, result.insertId); // Return the ID of the newly inserted record
    });
}

function getAllUsers(callback) {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }
        return callback(null, results);
    });
}

function getUserById(userId, callback) {
    const sql = `
        SELECT 
            users.user_id,
            users.name,
            users.air_quality_threshold,
            users.temperature_threshold,
            users.humidity_threshold,
            users.water_quality_threshold,
            users.location,
            users.sustainability_score,
            interests.aspect
        FROM users
        LEFT JOIN user_interests ON users.user_id = user_interests.user_id
        LEFT JOIN interests ON user_interests.interest_id = interests.interest_id
        WHERE users.user_id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err, null);
        }

        if (results.length === 0) {
            // User with the specified id was not found
            return callback({ message: 'User not found' }, null);
        }

        // Group interests for the user
        const userInterests = results.map((row) => row.aspect).filter((aspect) => aspect !== null);

        // Remove duplicate columns and create the final user object
        const user = {
            user_id: results[0].user_id,
            name: results[0].name,
            air_quality_threshold: results[0].air_quality_threshold,
            temperature_threshold: results[0].temperature_threshold,
            humidity_threshold: results[0].humidity_threshold,
            water_quality_threshold: results[0].water_quality_threshold,
            location: results[0].location,
            sustainability_score: results[0].sustainability_score,
            interests: userInterests,
        };

        return callback(null, user);
    });
}

// async function updateSustainabilityScore(attribute_name, reaction_id) {
//     try {
//         // TODO: Implement logic to fetch user_id based on the provided reaction_id
//         const userIdResult = await db.query('SELECT user_id FROM reactions WHERE reaction_id = ?', [reaction_id]);

//         if (userIdResult.length === 0) {
//             // TODO: Handle the case where no user is found for the provided reaction_id
//             console.error('No user found for the provided reaction_id');
//             return;
//         }

//         const userId = userIdResult[0].user_id;

//         // TODO: Implement logic to update sustainability_score for the user
//         // For example, you can increment sustainability_score by 2 for each reaction
//          db.query('UPDATE users SET sustainability_score = sustainability_score + 2 WHERE user_id = ?', [userId]);

//         // TODO: Optionally, you can return a success message or handle as needed
//         return 'Sustainability score updated successfully';
//     } catch (error) {
//         // TODO: Handle errors appropriately
//         console.error('Error updating sustainability score:', error);
//         throw error;
//     }
// }

///////////////////////////////////
////////////////////////////////////
///////////////////////////////////////
function updateUserSustainabilityScore(user_id, callback) {
    if (typeof callback !== 'function') {
        console.error('Callback is not a function');
        return;
    }

    const sqlSelect = 'SELECT sustainability_score FROM users WHERE user_id = ?';
    const sql = 'UPDATE users SET sustainability_score = IFNULL(sustainability_score, 0) + 2 WHERE user_id = ?';


    if(user_id){
        db.query(sql, [user_id], (err) => {
            if (err) {
                console.error('Database error:', err);
                return callback(err);
            }

            db.query(sqlSelect, [user_id], (selectErr, result) => {
                if (selectErr) {
                    console.error('Database error:', selectErr);
                    return callback(selectErr);
                }
    
                // Assuming the result is an array with one element
                const updatedScore = result.length > 0 ? result[0].sustainability_score : null;
                return callback (null, updatedScore) ;
            });
    
            // Return the updated user's sustainability score
            // getUserById(user_id, (getUserErr, user) => {
            //     if (getUserErr) {
            //         return callback(null, getUserErr);
            //     }
            //     return callback(null, user.sustainability_score);
            // });
        });
    }
    
}

// Update data
function updateUser(user_id, name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location, callback) {
    
    const sql =
      'UPDATE users SET name=?, air_quality_threshold=?, temperature_threshold=?, humidity_threshold=?, water_quality_threshold=?, location=? WHERE user_id = ?';
  
    const values = [name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location, user_id];
    
    // Check each parameter for undefined and replace with null
    const sanitizedValues = values.map((val) => (val === undefined ? null : val));
    

    db.query(sql, sanitizedValues, (err, result) => {
       
      if (err) {
        console.error('Database error:', err);
        return callback(err, null);
      }
      
      return callback(null, result.affectedRows > 0); // Check if any rows were affected
    });
  }
  
  // Delete data
  function deleteuser(id, callback) {
    const sql = 'DELETE FROM users WHERE user_id = ?';
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return callback(err, null);
      }
      return callback(null, result.affectedRows > 0); // Check if any rows were affected
    });
  }

  async function increaseSustainabilityScore(userId, increaseAmount) {
    try {

        const sql = 'UPDATE users SET sustainability_score = sustainability_score + ? WHERE user_id = ?';
         db.query(sql, [increaseAmount, userId]);
        
        return 'Sustainability score updated successfully';
    } catch (error) {
        // TODO: Handle errors appropriately
        console.error('Error updating sustainability score:', error);
        throw error;
    }
}

async function ById(userId, callback) {
    const userSql = 'SELECT * FROM users WHERE user_id = ?'; // Corrected the SQL syntax

    try {
        db.query(userSql, [userId], async (error, userResults, fields) => {
            if (error) {
                console.error('Error executing user query:', error);
                return callback(error, null);
            }

            if (userResults.length === 0) {
                // User with the specified id was not found
                return callback({ message: 'User not found' }, null);
            }

            // Fetch weather information for the user's city
            const user = {
                user_id: userResults[0].user_id,
                name: userResults[0].name,
                air_quality_threshold: userResults[0].air_quality_threshold,
                temperature_threshold: userResults[0].temperature_threshold,
                humidity_threshold: userResults[0].humidity_threshold,
                water_quality_threshold: userResults[0].water_quality_threshold,
                location: userResults[0].location,
                sustainability_score: userResults[0].sustainability_score,
                interests: userResults.map((row) => row.aspect).filter((aspect) => aspect !== null),
            };

            // Fetch weather information for the user's city
            const weatherApiKey = '6f928ca94039fc990b4b999c10dfb81b'; // Replace with your OpenWeatherMap API key
            const weatherEndpoint = 'http://api.openweathermap.org/data/2.5/weather';

            try {
                const weatherResponse = await axios.get(weatherEndpoint, {
                    params: {
                        q: user.location,
                        appid: weatherApiKey,
                    },
                });

                const weatherData = weatherResponse.data;

                // Add weather information to the user object
                user.weather = {
                    description: weatherData.weather[0].description,
                    temperature: weatherData.main.temp,
                    humidity: weatherData.main.humidity,
                    wind_speed: weatherData.wind.speed,
                };

                return callback(null, user);
            } catch (weatherError) {
                console.error('Error fetching weather data:', weatherError);
                return callback(weatherError, null);
            }
        });
    } catch (dbError) {
        console.error('Error executing user query:', dbError);
        return callback(dbError, null);
    }
}

module.exports = {
    updateUserSustainabilityScore,
   // updateSustainabilityScore,
    updateUser,
    deleteuser,
    addNewUser,
    getAllUsers,
    getUserById,
    increaseSustainabilityScore,
    ById,
};
