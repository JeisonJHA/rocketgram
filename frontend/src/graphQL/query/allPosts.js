import gql from "graphql-tag";
export default gql`
  {
    posts {
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
