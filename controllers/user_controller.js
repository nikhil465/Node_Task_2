const User = require("../models/user");
const env = require("../config/environment");

module.exports.create = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        message: "User already Exists",
      });
    }

    user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });

    return res.status(200).json({
      message: "User Registered Successfully!",
      data: {
        user: user.id,
      },
    });
  } catch (error) {
    console.log("Error in creating a user : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

module.exports.getUser = async function (req, res) {
  try {
    let user = await User.findById(req.params.id).select("-__v -_id");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Success",
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.log("Error in finding a user by ID : ", error);
    return res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};
