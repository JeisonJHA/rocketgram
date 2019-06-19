import gql from "graphql-tag";
export default gql`
  mutation(
    $postId: ID
    $comment: String
  ) {
    createComment(
      commentInput: {
        postId: $postId
        comment: $comment
      }
    ) {
      _id
      author
      place
      description
      hashtags
      image
      likes
      comment {
        _id
        comment
      }
      createdAt
      updatedAt
      untilNow
    }
  }
`;
