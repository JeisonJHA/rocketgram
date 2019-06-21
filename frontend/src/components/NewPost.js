import React, { useState } from "react";
import { graphql } from "react-apollo";

import createComment from "../graphQL/mutations/createComment";

import "./NewPost.css";

const NewPost = props => {
  const [commentState, setCommentState] = useState("");
  const { post } = props;

  const newComment = (e, id) => {
    e.preventDefault();
    if (commentState === "") return;
    props.createComment({ variables: { postId: id, comment: commentState } });
    setCommentState("");
  };

  return (
    <section className="newPost">
      <form>
        <textarea
          className="commentArea"
          placeholder="Add a comment"
          value={commentState}
          onChange={e => {
            setCommentState(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={e => {
            newComment(e, post._id);
          }}
        >
          Post
        </button>
      </form>
    </section>
  );
};

export default graphql(createComment, { name: "createComment" })(NewPost);
