const userModel = require('../Models/userModel');

function addUser(req, res) {
    const { name, pass, address, phone, alerts, sustainability, score } = req.body;

    userModel.addNewUser(name, pass, address, phone, alerts, sustainability, score, (err, data_id) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(201).json({ data_id, message: 'user added successfully' });
        console.log('Received Request Body:', req.body);
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

function getaUser(req, res) {
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
module.exports = {
    addUser,
    getAllUsers,
    getaUser
};
