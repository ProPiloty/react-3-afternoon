import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseURL: 'https://practiceapi.devmountain.com/api',
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios
      .get(`${this.state.baseURL}/posts`)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch( err => alert(err));
  }

  updatePost( id, text ){
    axios
      .put(`${ this.state.baseURL }/posts?id=${ id }`, { text })
      .then( res => {
        this.setState({ posts: res.data });
      })
      .catch( err => alert(err));
  }

  deletePost(id) {
    axios
      .delete(`${this.state.baseURL}/posts?id=${ id }`)
      .then( res => {
        this.setState({ posts: res.data });
      })
      .catch( err => alert(err));
  }

  createPost(text) {
    axios
      .post(`${this.state.baseURL}/posts`, { text })
      .then( res => {
        this.setState({ posts: res.data });
      })
      .catch( err => alert(err));
  }

  render() {
    const { posts } = this.state;
    const mappedPosts = posts.map( post => (
    <Post key={post.id} 
          id={post.id} 
          text={post.text} 
          date={post.date} 
          updatePostFn={this.updatePost}
          deletePostFn={this.deletePost} />
    ));

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />

          {mappedPosts}
          
        </section>
      </div>
    );
  }
}

export default App;
