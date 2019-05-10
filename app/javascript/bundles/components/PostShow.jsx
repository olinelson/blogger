import React, { Component, Fragment } from "react";

import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  createFromContent
} from "draft-js";

const csrfToken = ReactOnRails.authenticityToken();

const dummy = `{"blocks":[{"key":"74tgg","text":"One Fine day in the middle OF the night... Two dead men got up to fight.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":27,"length":3,"style":"BOLD"},{"offset":34,"length":9,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}`;

const rawContentFromDatabase = convertFromRaw(JSON.parse(dummy));
// const rawContentFromDatabase = convertFromRaw(JSON.parse(props.post.body))

export default class PostShow extends Component {
  constructor(props) {
    let db = convertFromRaw(JSON.parse(props.post.body));
    console.log("hello", db);
    // console.log("hello", db)
    super(props);

    this.state = {
      editorState: EditorState.createWithContent(db),
      title: props.post.title,
      editing: false
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

  patchPost = () => {
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
        savedBody: this.state.body,
        savedTitle: this.state.title
      })
    );
  };

  areChangesSaved = () => {
    if (
      this.state.body !== this.state.savedBody ||
      this.state.title !== this.state.savedTitle
    ) {
      return "unsaved changes";
    } else {
      return "changes saved";
    }
  };

  _onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  showRaw = () => {
    console.log(
      JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  };

  showEditButton = () => {
    if (
      this.props.current_user &&
      this.props.current_user.id === this.props.post.user_id
    ) {
      return (
        <button onClick={() => this.setState({ editing: !this.state.editing })}>
        {this.state.editing ? "done" : "edit"}</button>
      );
    }
  };

  showEditor = () => {
    if (this.state.editing === true) {
      return (
        <Fragment>
          <input
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <h4>{this.state.title}</h4>
          <Editor editorState={this.state.editorState} />
        </Fragment>
      );
    }
  };

  render() {
    // console.log(this.props.current_user.id === this.props.post.id);

    return (
      <div>
        {this.showEditButton()}

        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button onClick={this.showRaw}> show raw </button>
        <button onClick={this.patchPost}>save changes</button>

        {this.showEditor()}

        {/* {this.areChangesSaved()}
                <form>
                    <input
                        value={this.state.title}
                        onChange={(e) => this.setState({ title: e.target.value })}
                    ></input>
                    <input
                        value={this.state.body}
                        onChange={(e) => this.setState({ body: e.target.value })}

                    ></input>
                </form>
                <button
                    onClick={this.patchPost}
                >save changes</button> */}
      </div>
    );
  }
}
