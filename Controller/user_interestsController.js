// controllers/interestController.js
const InterestModel = require('../Models/user-interestModel');


async function InterestController(req, res) {
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
}


///////////////////////////////////////////////////////////
async function viewUserInterest(req, res) {
  try {
    const { id } = req.params;
    const userData = InterestModel.viewInterest(id,(err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error'+'id:'+id });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ error: 'Data not found' });
      }
      res.json({ data: result });
    }); 
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//////////////////////////////////////////
async function removeInterest(req, res) {
  try {
    const { id } = req.params;
    
    InterestModel.deleteInterest(id, (err, success) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (success) {
        res.status(204).send(); 
      } else {
        res.status(404).json({ error: 'Data not found' });
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  InterestController,
  viewUserInterest,
  removeInterest,
};

