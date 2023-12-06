// controllers/interestController.js
const InterestModel = require('../Models/user-interestModel');

const InterestController = {
  addInterest: async (req, res) => {
    const { user_id, interest_name } = req.body;

    try {
      const interestId = await InterestModel.getInterestIdByName(interest_name);

      if (!interestId) {
        return res.status(404).json({ error: 'Interest not found' });
      }

      await InterestModel.addUserInterest(user_id, interestId);
      return res.status(200).json({ message: 'Interest added successfully' });
    } catch (error) {
      console.error('Error in addInterest:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = InterestController;
