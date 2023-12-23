const express = require("express");
const router = express.Router();
const controller = require('../Controller/notificationCtrl');

router.get("/Notifications", controller.viewNotification);
router.get("/Notifications/:user_id", controller.viewNotificationforuser);

module.exports = router;
