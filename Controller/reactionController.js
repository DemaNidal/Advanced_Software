// controllers/reactionController.js
const reactionModel = require('../Models/reactionModel');



function addReaction(req, res) {
    const { report_id, data_id, resource_id, attribute_name, user_id} = req.body;

    reactionModel.AddReaction(report_id, data_id, resource_id, attribute_name, user_id, (err, reaction_id) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' , reaction_id});
        }

        res.status(201).json({ message: 'Reaction added successfully', reaction_id });
    });
}


///////////////////////////////////////////////////////////////////
async function viewUserReactions(req, res) {
    try {
      const { id } = req.params;
      const userData = reactionModel.viewReactions(id,(err, result) => {
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

//////////////////////////////////////////////////////////////////
async function removeReactions(req, res) {
    try {
      const { id } = req.params;
      
      reactionModel.deleteReaction(id, (err, success) => {
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


module.exports = {
    addReaction,
    viewUserReactions,
    removeReactions,
};
