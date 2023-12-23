// userRoute.js
const express = require('express');
const chatController = require('../Controller/chatController');

const router = express.Router();

router.post('/Messages', chatController.sendMessage);
router.get('/Messages', chatController.getAllMessages);
router.get('/User_Messages/:id', chatController.getUserMessages);

module.exports = router;
