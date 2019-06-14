const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Post {
  _id:ID!
  author: String!
  place: String
  description: String
  hashtags: String
  image: String
  like: Int
  comment: [Comment!]
  createdAt: String!
  updatedAt: String!
}

type Comment {
  _id: ID!
  comment: String!
  like: Int
}

input PostInput {
  author: String!
  place: String
  description: String
  hashtags: String
  image: String!
}

type RootQuery{
  posts: [Post!]
}

type RootMutation {
  createPost(postInput: PostInput): Post
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
