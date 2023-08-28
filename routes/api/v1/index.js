const express = require("express");
const router = express.Router();

router.use("/user", require("./users"));
router.use("/gallery", require("./images_gallery"));
module.exports = router;
