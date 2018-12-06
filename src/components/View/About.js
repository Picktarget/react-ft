import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../state/actions/postActions';
import PropTypes from 'prop-types';
import PostForm from './PostForm.js';

class About extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    const postItems = this.props.posts.map(post => (
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
About.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(About);
