const db = require('../dbConnection');

function addNewUser(name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location, sustainability_score, callback) {
    const sql = 'INSERT INTO users (name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location, sustainability_score) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location, sustainability_score], (err, result) => {
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

async function updateSustainabilityScore(attribute_name, reaction_id) {
    try {
        // TODO: Implement logic to fetch user_id based on the provided reaction_id
        const userIdResult = await db.query('SELECT user_id FROM reactions WHERE reaction_id = ?', [reaction_id]);

        if (userIdResult.length === 0) {
            // TODO: Handle the case where no user is found for the provided reaction_id
            console.error('No user found for the provided reaction_id');
            return;
        }

        const userId = userIdResult[0].user_id;

        // TODO: Implement logic to update sustainability_score for the user
        // For example, you can increment sustainability_score by 2 for each reaction
        await db.query('UPDATE users SET sustainability_score = sustainability_score + 2 WHERE user_id = ?', [userId]);

        // TODO: Optionally, you can return a success message or handle as needed
        return 'Sustainability score updated successfully';
    } catch (error) {
        // TODO: Handle errors appropriately
        console.error('Error updating sustainability score:', error);
        throw error;
    }
}

module.exports = {
    updateSustainabilityScore,

    addNewUser,
    getAllUsers,
    getUserById
};
