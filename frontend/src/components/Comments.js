import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

import Defaultbtn from "./DefaultBtn";

import like from "../assets/like.svg";

import hitLikeCmt from "../graphQL/mutations/hitLikeCmt";

import "./Comments.css";

const Comments = props => {
  const { post, nshow, showall } = props;
  const linkButtonToComments = post => {
    if (post.comment.length <= 3 || showall) return;
    return (
      <Link to={{ pathname: `/comment/${post._id}` }} className="viewCount">
        View all {post.comment.length} comments
      </Link>
    );
  };

  const likeComment = id => {
    props.hitLikeCmt({
      variables: { postId: id }
    });
  };
  return (
    <ul className="comments">
      {linkButtonToComments(post)}
      {post.comment &&
        post.comment.slice(0, nshow).map(obj => (
          <li key={obj._id} className="comment">
            <span>{obj.comment}</span>
            <Defaultbtn
              type="button"
              onClick={() => {
                likeComment(obj._id);
              }}
            >
              <img className="likeCmt" src={like} alt="" />
            </Defaultbtn>
          </li>
        ))}
    </ul>
  );
};

export default graphql(hitLikeCmt, { name: "hitLikeCmt" })(Comments);
