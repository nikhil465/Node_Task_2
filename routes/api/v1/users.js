const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/user_controller");

router.post("/create", userController.create);

router.get("/:id", userController.getUser);
module.exports = router;
