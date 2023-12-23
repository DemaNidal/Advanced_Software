// routes/reactionRoute.js
const express = require('express');
const ReactionController = require('../Controller/reactionController');

const router = express.Router();

router.post('/Reactions', ReactionController.addReaction);

router.get('/User_Reactions/:id', ReactionController.viewUserReactions);
router.delete('/Reactions/:id', ReactionController.removeReactions);


module.exports = router;
