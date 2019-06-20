const Post = require("../../model/Post");
const Comment = require("../../model/Comment");
const { transformPost } = require("./merge");

module.exports = {
  createComment: async (args, req) => {
    const { postId } = args.commentInput;
    if (postId === null) return;
    const post = await Post.findById(postId).populate("comment");
    const { comment } = args.commentInput;
    if (comment === null) return;
    const commentObj = await Comment.create({ comment });
    post.comment.push(commentObj);
    req.io.emit("post", post);
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
    const comment = await Comment.findById(deletedComment._id);
    comment.remove();
    await post.save();
    await comment.save();
    try {
      return transformPost(post);
    } catch (err) {
      throw err;
    }
  },
  likeComment: async args => {
    const { postId } = args;
    const comment = await Comment.findById(postId);
    comment.likes += 1;
    comment.save();
    return comment;
  }
};
