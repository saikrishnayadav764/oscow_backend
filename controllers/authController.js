// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authenticate = require("../config/middleware");
const { register, login,updatePreferences,checkReviewedBrewery } = require("../services/authService");

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

module.exports = router;
