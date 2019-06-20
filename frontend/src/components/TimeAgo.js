import React from "react";

import "./TimeAgo.css";

export default function TimeAgo(props) {
  const { post } = props;
  return <div className="timeAGO">{post.untilNow}</div>;
}
