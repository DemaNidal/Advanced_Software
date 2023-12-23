// controllers/resourceController.js
const resourceModel = require('../Models/resourceModel');

function addResource(req, res) {
    const { user_id, date_time, title, content } = req.body;

    resourceModel.addResource(user_id, date_time, title, content, (err, resource_id) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(201).json({ message: 'Resource added successfully', resource_id });
    });
}

function getAllResources(req, res) {
    resourceModel.getAllResources((err, resources) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ resources });
    });
}

function getResourcesByUserId(req, res) {
    const user_id = req.params.user_id;

    resourceModel.getResourcesByUserId(user_id, (err, resources) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ resources });
    });
}

function updateResource(req, res) {
    try{
        const { id } = req.params;
        const { date_time, title, content } = req.body;

        resourceModel.updateResource(id, date_time, title, content, (err, success) => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (success) {
                res.status(200).json({ id, message: 'Data updated successfully' });
              } else {
                res.status(404).json({ error: 'Data not found' });
              }
        });

    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

async function deleteResource(req, res) {
    try {
        const {id} = req.params;
      
        resourceModel.deleteResource(id, (err, success) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (success) {
          res.status(204).json({ message: 'Resource deleted successfully' });
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
    addResource,
    getAllResources,
    getResourcesByUserId,
    updateResource,
    deleteResource,
};
