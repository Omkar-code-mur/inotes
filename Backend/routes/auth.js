/** @format */

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const JWT_SECRET = "thisIsInotebook"

// Create a User using POST "/api/atuh/". No login Required
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 2 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be atleast 5 character").isLength({
      min: 5,
    }),
  ],                                   
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
     
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user :{
          id : user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET)
      res.json({authToken});
    } catch (error) {
      console.error(error.message);
      res.json({ error: error.message});
    }
  }
);

module.exports = router;
