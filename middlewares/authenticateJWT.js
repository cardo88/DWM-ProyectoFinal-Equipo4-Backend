const express = require('express');
const jwt = require("jsonwebtoken");
const JwtPayload = require("jsonwebtoken").JwtPayload;
const dotenv = require("dotenv");
// import "dotenv/config";

const authMiddleware = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed, missing token" });
  }

  if (secretKey) {
    try {
      const decoded = jwt.verify(token, secretKey);
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Authentication failed, invalid token" });
    }
  }
};

module.exports = authMiddleware;
