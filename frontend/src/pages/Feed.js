import React, { useEffect } from "react";
import io from "socket.io-client";
import { graphql } from "react-apollo";

import "./Feed.css";

import allPosts from "../graphQL/query/allPosts";

import { MainPost } from "../styledcomponents/MainPost";
import Comments from "../components/Comments";
import HeadPost from "../components/HeadPost";
import NewPost from "../components/NewPost";
import Actions from "../components/Actions";
import ShowLikes from "../components/ShowLikes";
import TimeAgo from "../components/TimeAgo";

const Feed = props => {
  useEffect(() => {
    registerToSocket();
  });

  const registerToSocket = () => {
    const socket = io("http://localhost:3333");
    socket.on("post", () => {
      props.allPosts.refetch();
    });
    socket.on("like", () => {
      props.allPosts.refetch();
    });
  };
  return (
    <section id="post-list">
      {!props.allPosts.loading &&
        props.allPosts.posts.map(post => (
          <MainPost key={post._id}>
            <HeadPost post={post} />
            <img src={`http://localhost:3333/files/${post.image}`} alt="" />
            <footer>
              <Actions post={post} />
              <ShowLikes post={post} />
              <div>
                <p>
                  <strong>{post.author} </strong>
                  {post.description}
                  <span> {post.hashtags}</span>
                </p>
                <Comments post={post} nshow={3} showall={false} />
              </div>
              <TimeAgo post={post} />
            </footer>
            <NewPost post={post} />
          </MainPost>
        ))}
    </section>
  );
};

export default graphql(allPosts, { name: "allPosts" })(Feed);
