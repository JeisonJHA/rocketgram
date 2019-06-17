import React, { Component } from "react";
// import api from "../services/api";
import io from "socket.io-client";
import { graphql, compose, Mutation } from "react-apollo";
import gql from "graphql-tag";

import "./Feed.css";

import more from "../assets/more.svg";
import comment from "../assets/comment.svg";
import send from "../assets/send.svg";

import like from "../assets/like.svg";

import hitLike from "../mutations/hitLike";

class Feed extends Component {
  async componentDidMount() {
    this.registerToSocket();
  }

  registerToSocket = () => {
    const socket = io("http://localhost:3333");
    socket.on("post", newPost => {
      this.props.allPosts.refetch();
    });
    socket.on("like", likedPost => {
      this.props.allPosts.refetch();
    });
  };

  render() {
    return (
      <section id="post-list">
        {!this.props.allPosts.loading && (
          <Mutation
            mutation={hitLike}
            // refetchQueries={[{ query: allPosts }]}
          >
            {(likePost, { data }) =>
              this.props.allPosts.posts.map(post => (
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
                      <button
                        type="button"
                        onClick={() => {
                          likePost({ variables: { postId: post._id } });
                        }}
                      >
                        <img src={like} alt="" />
                      </button>
                      <button>
                        <img src={comment} alt="" />
                      </button>
                      <img src={send} alt="" />
                    </div>
                    <strong>{post.likes} curtidas</strong>
                    <p>
                      {post.description}
                      <span>{post.hashtags}</span>
                    </p>
                  </footer>
                </article>
              ))
            }
          </Mutation>
        )}
      </section>
    );
  }
}

const allPosts = gql`
  {
    posts {
      _id
      author
      place
      description
      hashtags
      image
      likes
      comment {
        comment
      }
      createdAt
      updatedAt
    }
  }
`;

export default compose(graphql(allPosts, { name: "allPosts" }))(Feed);
