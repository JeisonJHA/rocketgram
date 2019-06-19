import gql from "graphql-tag";
export default gql`
  mutation($postId: ID) {
    likeComment(postId: $postId) {
      author
      likes
    }
  }
`;
