import gql from "graphql-tag";
export default gql`
  mutation($postId: ID) {
    likePost(postId: $postId) {
      author
      likes
    }
  }
`;
