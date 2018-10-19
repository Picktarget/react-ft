import React, { Component } from 'react';

export default class PostForm extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      title: '',
      body: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    };
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => this.setState({ posts: data }));
  }
  render() {
    return (
      <div>
        <h2>Add Post.</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title:</label>
            <br />
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>body:</label>
            <br />
            <textarea
              name="body"
              value={this.state.body}
              onChange={this.onChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
