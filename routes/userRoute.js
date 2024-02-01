const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

router.post("/signup", async (req, res) => {
    try {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(200).json({
          message: "User already exists",
          success: false,
        });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      const newUser = new User(req.body);
      await newUser.save();
      res.status(200).json({
        message: "Registration successful",
        success: true
      });
  
    } catch (error) {
      // console.log(error);
      res.status(500).send({
      message: error.message,
      succes: false,
    });
    }
  });

  module.exports = router;