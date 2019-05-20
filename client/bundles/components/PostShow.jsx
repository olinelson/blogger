import React, { Component, Fragment } from "react";
import { debounce } from "debounce";

// react dropzone
import Dropzone from 'react-dropzone'

import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  createFromContent
} from "draft-js";

const csrfToken = ReactOnRails.authenticityToken();

export default class PostShow extends Component {

  constructor(props) {
    let db = convertFromRaw(JSON.parse(props.post.body));

    super(props);

    this.state = {
      editorState: EditorState.createWithContent(db),
      title: props.post.title,
      editing: false,
      unsavedChanges: false,
      published: props.post.published
    };
    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  _onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  _onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  _onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  _onH1Click = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "heading1")
    );
  };

  showRaw = () => {
    console.log(
      JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  };

  onTitleChange = e => {
    this.setState({
      title: e.target.value,
      unsavedChanges: true
    });
    this.patchPost();
  };

  onEditorChange = editorState => {
    this.setState({
      editorState,
      unsavedChanges: true
    });
    this.patchPost();
  };

  patchPost = debounce(e => {
    let rawBody = JSON.stringify(
      convertToRaw(this.state.editorState.getCurrentContent())
    );

    fetch(`${this.props.url}/posts/${this.props.post.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: this.state.title,
        body: rawBody
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

  onDropAction = (acceptedFiles) => {
    console.log(acceptedFiles[0])
    let formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("post_id", this.props.post.id,);


    fetch(`${this.props.url}/posts/add_image`, {
      method: "POST",
      body: formData,

      headers: {
        "X-CSRF-Token": csrfToken,
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    })
  }

  showEditor = () => {

      return (
        <Fragment>
          <button onClick={(e) => this.publishPost()}>
          {this.state.published === true ? "unpublish" : "publish"}
          </button>
         
          {this.state.unsavedChanges === true ? "unsaved changes" : "saved"}
          <input
            value={this.state.title}
            onChange={e => this.onTitleChange(e)}
          />
          <div className="style-bar">
            <button className="alert alert-info" onClick={this._onBoldClick.bind(this)}>Bold</button>
            <button onClick={this._onItalicClick.bind(this)}>Italic</button>
            <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>
            <button onClick={this._onH1Click.bind(this)}>H1</button>
          </div>

          <Editor
            className="ui text container"
            editorState={this.state.editorState}
            onChange={this.onEditorChange}
            handleKeyCommand={this.handleKeyCommand}
          />
          <Dropzone onDrop={acceptedFiles => (this.onDropAction(acceptedFiles))}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </Fragment>
      );
    
  };

  render() {


    return (
      <div>
        {this.showEditButton()}

        {this.state.editing === true ? this.showEditor() : 
          <Fragment>
            <h4>{this.state.title}</h4>
            <Editor editorState={this.state.editorState} />
          </Fragment>
        }

        {/* <img src={}/> */}

      </div>
    );
  }
}
