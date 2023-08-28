const express = require("express");
const router = express.Router();
const imageGalleryController = require("../../../controllers/image_gallery_controller");

router.post("/upload", imageGalleryController.upload);
router.get("/:id", imageGalleryController.filter);

module.exports = router;
