const { dateToString, timeUntilNow } = require("../../helpers/date");

const transformPost = post => {
  return {
    ...post._doc,
    createdAt: dateToString(post.createdAt),
    updatedAt: dateToString(post.updatedAt),
    untilNow: timeUntilNow(post.createdAt)
  };
};

exports.transformPost = transformPost;
