const User = require("../models/user");
const ImageGallery = require("../models/image_gallery");
const path = require("path");
const fs = require("fs");

module.exports.upload = async function (req, res) {
  try {
    ImageGallery.uploadedImage(req, res, async function (err) {
      let user = await User.findById(req.body.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      if (err) {
        console.log("******multer Error: ", err);
      }

      if (!req.file) {
        return res.status(404).json({
          message: "Image file not found",
        });
      }

      let imageGallery = await ImageGallery.create({
        user: req.body.userId,
        category: req.body.category,
        name: req.body.name,
        title: req.body.title,
        url: ImageGallery.imagePath + "/" + req.file.filename,
      });

      console.log(imageGallery);
    });

    return res.status(200).json({
      message: "Image Uploaded Successfully!",
    });
  } catch (error) {
    console.log("Error in uploading image : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

module.exports.filter = async function (req, res) {
  try {
    const userId = req.params.id;
    const { title, category, startDate, endDate } = req.query;

    let query = {
      user: userId,
    };

    if (title) {
      query.title = title;
    }

    if (category) {
      query.category = category;
    }

    if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const images = await ImageGallery.find(query);

    const imageResponses = [];

    for (const image of images) {
      const imagePath = path.join(__dirname, "..", image.url);
      const imageBuffer = fs.readFileSync(imagePath);

      imageResponses.push({
        name: image.name,
        category: image.category,
        title: image.title,

        data: imageBuffer.toString("base64"),
      });
    }

    return res.status(200).json({
      message: "Success",
      data: imageResponses,
    });
  } catch (error) {
    console.log("Error in uploading image : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};
