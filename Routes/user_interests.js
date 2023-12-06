// routes/interestRoute.js
const express = require('express');
const InterestController = require('../Controller/user_interestsController');

const router = express.Router();

router.post('/add-interest', InterestController.addInterest);

module.exports = router;
