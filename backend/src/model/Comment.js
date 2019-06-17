const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: String,
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
