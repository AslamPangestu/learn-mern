const express = require("express"); //import express
const router = express.Router(); //get class router from express
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Import User Model
const User = require("../../models/User");

// @route POST api/v1/users
// @desc Register new user
// @access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please insert all parameter"
    });
  }
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ message: "User already exist" });
    const newUser = new User({ name, email, password });
    //create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id }, //payload
            config.get("jwtSecret"), //secret token
            { expiresIn: 3600 }, //expire in sec
            (err, token) => {
              console.log("CALL");
              if (err) throw err;
              res.json({
                message: "Succes register",
                token: token,
                user: user
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
