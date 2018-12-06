import { FETCH_POSTS, NEW_POST } from './types.js';

export const fetchPosts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};

export const createPost = post => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(post)
  })
    .then(res => res.json(post))
    .then(post =>
      dispatch({
        type: NEW_POST,
        payload: post
      })
    );
};
