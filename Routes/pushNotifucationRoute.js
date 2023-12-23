const express = require("express");
const router = express.Router();
const { pushNotification } = require("../Controller/pushNotificartionCtrl");
router.post("/", pushNotification);
module.exports = router;