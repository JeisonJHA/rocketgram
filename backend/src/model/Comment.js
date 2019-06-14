const mongoose = require("mongoose");

const commentSchema = new commentSchema({
  comment: String,
  likes: {
    type: Number,
    default: 0
  }
});
