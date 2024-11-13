// app.js

const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./utils/errorHandler");
const authController = require("./controllers/authController");
const todoController = require("./controllers/todoController");
const cors = require("cors");

// Loading environment variables
require("dotenv").config();

// Connectning to the database
connectDB();

// Initializing Express app
const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authController);
app.use("/api/todos", todoController);

// Error handling middleware
app.use(errorHandler);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
