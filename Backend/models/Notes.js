/** @format */

const mongoose = require("mongoose");
const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default:"general"
  },

  date: {
    type: Date,
    Default: Date.now,
  },
});

module.exports = mongoose.model("user", NotesSchema);
