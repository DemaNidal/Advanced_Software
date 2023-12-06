const express = require('express');
const {addUser, getAllUsers, getaUser} = require('../Controller/userController');

const router = express.Router();



router.post("/", addUser);
router.get("/", getAllUsers);
router.get("/:id", getaUser);


module.exports = router;

