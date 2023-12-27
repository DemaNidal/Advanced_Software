// userRoute.js
const express = require('express');
const UserController = require('../Controller/userController');

const router = express.Router();

router.post('/User', UserController.addUser);//add user

router.get('/User', UserController.getAllUsers);//view all users
router.get('/User/:id', UserController.getUser);//view a user

router.put("/User/:id", UserController.editUser);//id here is the user id //edit user info
router.delete("/User/:id", UserController.deleteUser);//delete user

router.get('/External/:id', UserController.getUserWithWeather);

module.exports = router;
