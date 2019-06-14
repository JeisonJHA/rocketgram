const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
      type: Number,
      default: 0
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
