import React from "react";

import more from "../assets/more.svg";

import "./HeadPost.css";

export default function HeadPost(props) {
  const { post } = props;
  return (
    <header>
      <div className="user-info">
        <span>{post.author}</span>
        <span className="place">{post.place}</span>
      </div>
      <img src={more} alt="Mais" />
    </header>
  );
}
