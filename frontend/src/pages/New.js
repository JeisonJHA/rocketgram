import React, { Component } from "react";
import { Mutation } from "react-apollo";

import "./New.css";

import createPost from "../mutations/createPost";

class New extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleSubmit = async (e, newPost) => {
    e.preventDefault();
    newPost({
      variables: {
        author: this.state.author,
        place: this.state.place,
        description: this.state.description,
        hashtags: this.state.hashtags,
        image: this.state.image
      }
    });

    this.props.history.push("/");
  };

  handleImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation mutation={createPost}>
        {(newPost, { data }) => (
          <form id="new-post" onSubmit={e => this.handleSubmit(e, newPost)}>
            <input type="file" onChange={this.handleImageChange} />
            <input
              type="text"
              name="author"
              placeholder="Autor do post"
              onChange={this.handleChange}
              value={this.state.author}
            />
            <input
              type="text"
              name="place"
              placeholder="Local do post"
              onChange={this.handleChange}
              value={this.state.place}
            />
            <input
              type="text"
              name="description"
              placeholder="Descrição do post"
              onChange={this.handleChange}
              value={this.state.description}
            />
            <input
              type="text"
              name="hashtags"
              placeholder="Hashtags do post"
              onChange={this.handleChange}
              value={this.state.hashtags}
            />
            <button type="submit">Enviar</button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default New;
