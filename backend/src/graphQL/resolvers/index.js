const postResolver = require("./post");
const commentResolver = require("./comment");

const rootResolver = {
  ...postResolver,
  ...commentResolver
};

module.exports = rootResolver;
