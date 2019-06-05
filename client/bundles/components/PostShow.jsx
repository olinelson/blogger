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
    body: this.props.post.body,
    editing: false
  }

  handleChange = (body) => {
    this.setState({ body: body })
    this.patchPost()
  }

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
          {/* {this.state.disableEditing ? "done" : "edit"} */}
          edit
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

  createMarkup = () => {
  return { __html: this.state.body };
}


  render() {
    console.log(this.state.editing)

    
   
    return (
      <div className="app">
        {this.showEditButton()}


        {this.state.editing === true ? 
          <Editor
            text={this.state.body}
            onChange={this.handleChange}
          />

          :
          <div className="medium-editor-element" dangerouslySetInnerHTML={this.createMarkup()} />}


        




        
   
          
      </div>
    )
  }

  
}
