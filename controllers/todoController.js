const express = require("express");
const authenticate = require("../config/middleware");
const router = express.Router();
const {
  createEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry
} = require("../services/todoService");

// POST /api/todo
router.post("/", authenticate, createEntry);

// GET /api/todo
router.get("/", authenticate, getEntries);

// GET /api/todo/:id
router.get("/:todoId", authenticate, getEntryById);

// PUT /api/todo/:id
router.put("/:todoId", authenticate, updateEntry);

// DELETE /api/todo/:id
router.delete("/:todoId", authenticate, deleteEntry);


module.exports = router;
