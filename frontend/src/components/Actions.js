import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";

import Defaultbtn from "./DefaultBtn";

import comment from "../assets/comment.svg";
import send from "../assets/send.svg";
import like from "../assets/like.svg";

import hitLike from "../graphQL/mutations/hitLike";

import "./Actions.css";

const Actions = props => {
  const { post } = props;
  return (
    <div className="actions">
      <Defaultbtn
        type="button"
        onClick={() => {
          props.hitLike({ variables: { postId: post._id } });
        }}
      >
        <img src={like} alt="" />
      </Defaultbtn>
      <Defaultbtn>
        <Link to={{ pathname: `/comment/${post._id}` }}>
          <img src={comment} alt="" />
        </Link>
      </Defaultbtn>
      <img src={send} alt="" />
    </div>
  );
};

export default graphql(hitLike, { name: "hitLike" })(Actions);
