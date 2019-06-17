const { dateToString } = require("../../helpers/date");

const transformPost = post => {
  return {
    ...post._doc,
    createdAt: dateToString(post.createdAt),
    updatedAt: dateToString(post.updatedAt)
  };
};

exports.transformPost = transformPost;
