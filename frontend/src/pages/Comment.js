import React from "react";
import { graphql } from "react-apollo";

import onePost from "../graphQL/query/onePost";

import "./Comment.css";

import NewPost from "../components/NewPost";
import Actions from "../components/Actions";
import HeadPost from "../components/HeadPost";
import ShowLikes from "../components/ShowLikes";
import TimeAgo from "../components/TimeAgo";
import Comments from "../components/Comments";

const Comment = props => {
  const { post } = props.onePost;
  return (
    <div className="testemain">
      {!props.onePost.loading && (
        <div className="container_main_comment">
          <div className="container_image_comment">
            <img src={`http://localhost:3333/files/${post.image}`} alt="" />
          </div>
          <div className="container_data_comment">
            <HeadPost post={post} />
            <Comments post={post} nshow={12} showall={true} />
            <Actions post={post} />
            <ShowLikes post={post} />
            <TimeAgo post={post} />
            <NewPost post={post} />
          </div>
        </div>
      )}
    </div>
  );
};

export default graphql(onePost, {
  name: "onePost",
  options: props => ({
    variables: { postID: props.match.params.ID }
  })
})(Comment);
