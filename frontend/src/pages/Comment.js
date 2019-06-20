import React from "react";
import { MainPost } from "../styledcomponents/MainPost";

import "./Comment.css";
import NewPost from "../components/NewPost";
import Actions from "../components/Actions";
import HeadPost from "../components/HeadPost";
import ShowLikes from "../components/ShowLikes";
import TimeAgo from "../components/TimeAgo";
import Comments from "../components/Comments";

const Comment = props => {
  const { post } = props.location.query;
  return (
    <div className="testemain">
      <div className="container_main_comment">
        <div className="container_image_comment">
          <MainPost>
            <img src={`http://localhost:3333/files/${post.image}`} alt="" />
          </MainPost>
        </div>
        <div className="container_data_comment">
          <HeadPost post={post} />
          <Comments post={post} />
          <Actions />
          <ShowLikes post={post} />
          <TimeAgo post={post} />
          <NewPost post={post} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
