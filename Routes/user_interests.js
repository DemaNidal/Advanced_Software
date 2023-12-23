// routes/interestRoute.js
const express = require('express');
const InterestController = require('../Controller/user_interestsController');

const router = express.Router();

router.post('/Interest', InterestController.InterestController);

router.get('/User_Interest/:id', InterestController.viewUserInterest);//view a users interests
router.delete('/Interest/:id', InterestController.removeInterest);//remove interest

module.exports = router;
