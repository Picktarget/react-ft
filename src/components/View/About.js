import React, { Component } from 'react';
import PostForm from './PostForm';

export default class About extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      posts: []
    };
  }
  componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => this.setState({ posts: data }));
  }
  render() {
    const postItems = this.state.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <p>This is About Page.</p>
        <PostForm />
        <hr />
        {postItems}
      </div>
    );
  }
}
