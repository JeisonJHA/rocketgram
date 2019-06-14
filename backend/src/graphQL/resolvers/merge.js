const { dateToString } = require("../../helpers/date");

const transformPost = post => {
  console.log(post);
  console.log(post._doc);
  return {
    ...post._doc,
    createdAt: dateToString(post.createdAt),
    updatedAt: dateToString(post.updatedAt)
  };
};

exports.transformPost = transformPost;
