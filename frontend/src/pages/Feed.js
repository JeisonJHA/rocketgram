import React, { useEffect, useState } from "react";
// import api from "../services/api";
import io from "socket.io-client";
import { graphql, compose } from "react-apollo";

import "./Feed.css";

import more from "../assets/more.svg";
import comment from "../assets/comment.svg";
import send from "../assets/send.svg";
import like from "../assets/like.svg";

import hitLike from "../graphQL/mutations/hitLike";
import hitLikeCmt from "../graphQL/mutations/hitLikeCmt";
import createComment from "../graphQL/mutations/createComment";
import allPosts from "../graphQL/query/allPosts";

import Defaultbtn from "../components/DefaultBtn";

const Feed = (props) => {
  const [commentState, setCommentState] = useState("");
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

  const newComment = (e, id) => {
    e.preventDefault();
    props.createComment(
      { variables: { postId: id, comment: commentState } });
  }
  return (
    <section id="post-list">
      {!props.allPosts.loading && (
        props.allPosts.posts.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>
              <img src={more} alt="Mais" />
            </header>
            <img
              src={`http://localhost:3333/files/${post.image}`}
              alt=""
            />
            <footer>
              <div className="actions">
                <Defaultbtn
                  type="button"
                  onClick={() => {
                    props.hitLike({ variables: { postId: post._id } });
                  }}>

                  <img src={like} alt="" />
                </Defaultbtn>
                <Defaultbtn className="defaultBtn">
                  <img src={comment} alt="" />
                </Defaultbtn>
                <img src={send} alt="" />
              </div>
              <div className="likes">
                <strong>
                  <span>{post.likes}</span> curtidas
                      </strong>
              </div>
              <div >
                <div className="comments">
                  <span>
                    {post.comment.length > 0 &&
                      post.comment.length + " comentários"}
                  </span>
                  {post.comment &&
                    post.comment.map(obj => (
                      <div key={obj._id} className="comment">
                        <span>{obj.comment}</span>
                        <Defaultbtn
                          type="button"
                          onClick={() => {
                            props.hitLikeCmt({ variables: { postId: obj._id } });
                          }}
                        >
                          <img className="likeCmt" src={like} alt="" />
                        </Defaultbtn>
                      </div>
                    ))}
                </div>
                <p>
                  {post.description}
                  <span>{post.hashtags}</span>
                </p>
              </div>
              <div className="timeAGO">{post.untilNow}</div>
            </footer>
            <section className="newPost">
              <form>
                <textarea
                  className="commentArea"
                  placeholder="Add a comment"
                  value={commentState}
                  onChange={(e) => { setCommentState(e.target.value) }} />
                <button type="submit" onClick={e => { newComment(e, post._id) }}>Post</button>
              </form>
            </section>
          </article>
        ))
      )}
    </section>
  );
}

export default compose(
  graphql(allPosts, { name: "allPosts" }),
  graphql(hitLike, { name: "hitLike" }),
  graphql(hitLikeCmt, { name: "hitLikeCmt" }),
  graphql(createComment, { name: "createComment" })
)(Feed);
