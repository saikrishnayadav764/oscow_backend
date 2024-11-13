const mongoose = require("mongoose");

const todoEntrySchema = new mongoose.Schema({
  todoId: {
    type: String,
    required: true,
  },
  userId:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  alert: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("TodoEntry", todoEntrySchema);
