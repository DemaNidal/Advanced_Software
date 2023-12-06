const express = require("express");
const router = express.Router();

const controller = require('../Controller/dataController');

router.post("/addData", controller.addData);
router.get("/viewData", controller.viewData);
// router.get("/editData", controller.editData);

module.exports = router;
