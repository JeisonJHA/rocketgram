import React from "react";

import "./ShowLikes.css";

export default function ShowLikes(props) {
  const { post } = props;
  return (
    <div className="likes">
      <strong>
        <span>{post.likes}</span> likes
      </strong>
    </div>
  );
}
