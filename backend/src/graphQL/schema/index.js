const { buildSchema } = require("graphql");

module.exports = buildSchema(`
scalar Upload

type Post {
  _id:ID!
  author: String!
  place: String
  description: String
  hashtags: String
  image: String
  likes: Int
  comment: [Comment]
  createdAt: String!
  updatedAt: String!
  untilNow: String
}

type Comment {
  _id: ID!
  comment: String!
  likes: Int
}

input PostInput {
  author: String
  place: String
  description: String
  hashtags: String
  image: Upload
}

input CommentInput {
  postId: ID
  comment: String
}

type RootQuery{
  posts: [Post!]
  post(postID: ID): Post
}

type RootMutation {
  createPost(postInput: PostInput): Post
  likePost(postId: ID): Post
  likeComment(postId: ID): Comment
  createComment(commentInput: CommentInput): Post
  deleteComment(postId: ID): Post
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
