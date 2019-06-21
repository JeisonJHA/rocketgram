import gql from "graphql-tag";
export default gql`
  query($postID: ID) {
    post(postID: $postID) {
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
