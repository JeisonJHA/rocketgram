import React from "react";
import { graphql } from "react-apollo";

import Defaultbtn from "./DefaultBtn";

import like from "../assets/like.svg";

import hitLikeCmt from "../graphQL/mutations/hitLikeCmt";

import "./Comments.css";

const Comments = props => {
  const { post } = props;
  const linkButtonToComments = post => {
    if (post.comment.length <= 3) return;
    return (
      <button className="viewCount">
        View all {post.comment.length} comments
      </button>
    );
  };
  return (
    <div className="comments">
      {linkButtonToComments(post)}
      {post.comment &&
        post.comment.slice(0, 3).map(obj => (
          <div key={obj._id} className="comment">
            <span>{obj.comment}</span>
            <Defaultbtn
              type="button"
              onClick={() => {
                props.hitLikeCmt({
                  variables: { postId: obj._id }
                });
              }}
            >
              <img className="likeCmt" src={like} alt="" />
            </Defaultbtn>
          </div>
        ))}
    </div>
  );
};

export default graphql(hitLikeCmt, { name: "hitLikeCmt" })(Comments);
