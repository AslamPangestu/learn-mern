const express = require("express"); //import express
const router = express.Router(); //get class router from express
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//Import User Model
const User = require("../../models/User");

// @route POST api/v1/auth
// @desc Authenticate user
// @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Pleas inser all parameter"
    });
  }
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ message: "User not register" });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({
          message: "Password not correct"
        });
      }
      jwt.sign(
        { id: user.id }, //payload
        config.get("jwtSecret"), //secret token
        { expiresIn: 3600 }, //expire in sec
        (err, token) => {
          if (err) throw err;
          res.json({
            message: "Succes Login",
            token: token,
            user: user
          });
        }
      );
    });
  });
});

// @route GET api/v1/auth/user
// @desc Get user data
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
