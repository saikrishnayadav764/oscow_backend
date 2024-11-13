const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
      (error, token) => {
        if (error) throw error;
        res.json({ token, username: username });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
      (error, token) => {
        if (error) throw error;
        res.json({ token, username: user.username });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

async function updatePreferences(req, res) {
  try {
    const { username, likedBreweries, dislikedBreweries, reviewedBreweries } = req.body;
    console.log(reviewedBreweries)

    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (likedBreweries) {
      user.likedBreweries = likedBreweries;
    }

    if (dislikedBreweries) {
      user.dislikedBreweries = dislikedBreweries;
    }

    if (reviewedBreweries) {
      user.reviewedBreweries = [...reviewedBreweries];
    }

    await user.save();
    res.json({ message: "Preferences updated successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

async function checkReviewedBrewery(req, res) {
  try {
    const { username, breweryId } = req.query;

    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isReviewed = user.reviewedBreweries.includes(breweryId);
    res.json({likedBreweries: user.likedBreweries,dislikedBreweries: user.dislikedBreweries, reviewedBreweries:user.reviewedBreweries, reviewed: isReviewed });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}



module.exports = { register, login, updatePreferences,checkReviewedBrewery };
