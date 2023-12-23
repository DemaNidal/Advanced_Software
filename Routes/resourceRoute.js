// routes/resourceRoute.js
const express = require('express');
const ResourceController = require('../Controller/resourceController');

const router = express.Router();

router.post('/Resources', ResourceController.addResource);

router.get('/Resources', ResourceController.getAllResources);
router.get('/User_Resources/:user_id', ResourceController.getResourcesByUserId);

router.put('/Resources/:id', ResourceController.updateResource);
router.delete('/Resources/:id', ResourceController.deleteResource);

module.exports = router;
