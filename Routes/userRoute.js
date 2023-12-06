// userRoute.js
const express = require('express');
const UserController = require('../Controller/userController');

const router = express.Router();

router.post('/add-user', UserController.addUser);
router.get('/all-users', UserController.getAllUsers);
router.get('/:id', UserController.getUser);

module.exports = router;
