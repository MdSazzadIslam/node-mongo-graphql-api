"use strict";
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRECT_KEY, { expiresIn: "1day" });

module.exports = generateToken;
