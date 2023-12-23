const express = require("express");
const router = express.Router();

const controller = require('../Controller/dataController');

router.post("/Data", controller.addData);

router.get("/Data", controller.viewData);
router.get("/Data/:id", controller.viewoneData);//id = item id
router.get("/User_Data/:id", controller.userData);//id = user id

router.put("/Data/:id", controller.editData);
router.delete("/Data/:id", controller.deleteData);


module.exports = router;