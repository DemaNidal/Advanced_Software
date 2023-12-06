// routes/resourceRoute.js
const express = require('express');
const ResourceController = require('../Controller/resourceController');

const router = express.Router();

router.post('/add-resource', ResourceController.addResource);
router.get('/all-resources', ResourceController.getAllResources);
router.get('/user-resources/:user_id', ResourceController.getResourcesByUserId);
router.put('/update-resource/:resource_id', ResourceController.updateResource);
router.delete('/delete-resource/:resource_id', ResourceController.deleteResource);

module.exports = router;
