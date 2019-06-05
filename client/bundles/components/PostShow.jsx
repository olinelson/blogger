import React, { Component, Fragment } from 'react';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

// ES module
import Editor from 'react-medium-editor';

import editorStyles from "./editorStyles"

import debounce from "debounce"

const csrfToken = ReactOnRails.authenticityToken();

export default class PostShow extends Component {


  state = {
    body: this.props.post.body
  }

  handleChange = (body) => {
    this.setState({ body: body })
    this.patchPost()
  }

  

  // onTitleChange = e => {
  //   this.setState({
  //     title: e.target.value,
  //     unsavedChanges: true
  //   });
  //   this.patchPost();
  // };

 

  

  patchPost = debounce(e => {
    

    fetch(`${this.props.url}/posts/${this.props.post.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body
      }),
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(e =>
      this.setState({
        unsavedChanges: false
      })
    );
  }, 2000);

  showEditButton = () => {
    if (
      this.props.current_user &&
      this.props.current_user.id === this.props.post.user_id
    ) {
      return (
        <button onClick={() => this.setState({ editing: !this.state.editing })}>
          {this.state.editing ? "done" : "edit"}
        </button>
      );
    }
  };

  publishPost = (boolean) => {
    fetch(`${this.props.url}/posts/publish`, {
      method: "POST",
      body: JSON.stringify({
        id: this.props.post.id,
      }),
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then( this.setState({published: !this.state.published}))
  }



  render() {
    console.log(this.props)
    return (
      <div className="app">
        {this.showEditButton()}



        <Editor
          text={this.state.body} 
          tag="pre"
          onChange={this.handleChange}
          editingDisabled
           />
      </div>
    )
  }

  
}
