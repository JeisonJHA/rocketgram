const Post = require("../../model/Post");
const Comment = require("../../model/Comment");
const { transformPost } = require("./merge");

module.exports = {
  createComment: async args => {
    const post = await Post.findById(args.commentInput.postId).populate(
      "comment"
    );
    const { comment } = args.commentInput;
    const commentObj = await Comment.create({ comment });
    post.comment.push(commentObj);

    await post.save();
    try {
      return transformPost(post);
    } catch (err) {
      throw err;
    }
  },
  deleteComment: async args => {
    const post = await Post.findById(args.postId).populate("comment");
    const deletedComment = post.comment.pop();
    console.log(deletedComment._id);
    const comment = await Comment.findById(deletedComment._id);
    comment.remove();
    await post.save();
    await comment.save();
    try {
      return transformPost(post);
    } catch (err) {
      throw err;
    }
  }
};
