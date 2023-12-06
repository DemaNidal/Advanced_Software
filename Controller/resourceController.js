// controllers/resourceController.js
const resourceModel = require('../Models/resourceModel');

function addResource(req, res) {
    const { user_id, title, content } = req.body;

    resourceModel.addResource(user_id, title, content, (err, resource_id) => {
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
    const resource_id = req.params.resource_id;
    const { title, content } = req.body;

    resourceModel.updateResource(resource_id, title, content, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'Resource updated successfully' });
    });
}

function deleteResource(req, res) {
    const resource_id = req.params.resource_id;

    resourceModel.deleteResource(resource_id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'Resource deleted successfully' });
    });
}

module.exports = {
    addResource,
    getAllResources,
    getResourcesByUserId,
    updateResource,
    deleteResource,
};
