const userModel = require('../Models/userModel');
//const userModel = require('../models/userModel');

function addUser(req, res) {
    const { name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location, sustainability_score } = req.body;

    userModel.addNewUser(name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location, sustainability_score, (err, data_id) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(201).json({ message: 'User added successfully', user_id: data_id });
    });
}

function getAllUsers(req, res) {
    userModel.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ users });
    });
}

function getUser(req, res) {
    const userId = req.params.id; // Assuming you have the user id in the request parameters

    userModel.getUserById(userId, (err, user) => {
        if (err) {
            if (err.message === 'User not found') {
                return res.status(404).json({ error: 'User not found' });
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }

        res.status(200).json({ user });
    });
}


//////////////////////////////////////////////////////////////////////
async function editUser(req, res) {
    try {
      const { id } = req.params;//user_id
      const { name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location } = req.body;
      
      userModel.updateUser(id, name, air_quality_threshold, temperature_threshold, humidity_threshold, water_quality_threshold, location, (err, success) => {
          if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          if (success) {
            res.status(200).json({ id, message: 'Data updated successfully' });
          } else {
            res.status(404).json({ error: 'Data not found' });
          }
        }
      );
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
    
  }
  
  async function deleteUser(req, res) {
    try {
      const { id } = req.params;
      
      userModel.deleteuser(id, (err, success) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (success) {
          res.status(204).send(); // No content for successful deletion
          //res.status(204).json({ message: 'data added successfully' });
        } else {
          res.status(404).json({ error: 'Data not found' });
        }
      });
  
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
  }

  async function increaseUserScore(userId, increaseAmount) {
    try {
        // TODO: Implement logic to update sustainability_score for the user
        // For example, you can increase sustainability_score by the specified amount
        await userModel.increaseSustainabilityScore(userId, increaseAmount);

        // TODO: Optionally, you can return a success message or handle as needed
        return 'Sustainability score updated successfully';
    } catch (error) {
        // TODO: Handle errors appropriately
        console.error('Error updating sustainability score:', error);
        throw error;
    }
}

async function getUserWithWeather(req, res) {
  const { id } = req.params; // Assuming you have the user id in the request parameters

  userModel.ById( id , (err, user) => {
      if (err) {
          if (err.message === 'User not found') {
              return res.status(404).json({ error: 'User not found' });
          } else {
              return res.status(500).json({ error: 'Internal Server Error' });
          }
      }

      res.status(200).json({ user });
  });
}


module.exports = {
    addUser,
    getAllUsers,
    getUser,
    editUser,
    deleteUser,
    increaseUserScore,
    getUserWithWeather,
};
