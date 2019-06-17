import gql from "graphql-tag";
export default gql`
  mutation(
    $author: String
    $place: String
    $description: String
    $hashtags: String
    $image: Upload
  ) {
    createPost(
      postInput: {
        author: $author
        place: $place
        description: $description
        hashtags: $hashtags
        image: $image
      }
    ) {
      author
      likes
    }
  }
`;
