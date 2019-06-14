import React, { Component, Fragment } from "react";

require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");

import Editor from "react-medium-editor";
import editorStyles from "./editorStyles";
import debounce from "debounce";
import {
  Container,
  Input,
  Menu,
  Button,
  Dropdown,
  Icon
} from "semantic-ui-react";

const csrfToken = ReactOnRails.authenticityToken();

export default class PostShow extends Component {
  state = {
    body: this.props.post.body,
    title: this.props.post.title,
    editing: false,
    changesSaved: true
  };

  handleBodyChange = body => {
    this.setState(
      {
        body: body,
        changesSaved: false
      },
      this.patchPost()
    );
  };

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
        changesSaved: true
      })
    );
  }, 1000);

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

  deletePost = () => {
    fetch(`${this.props.url}/posts/${this.props.post.id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    })
  };

  publishPost = () => {
    fetch(`${this.props.url}/posts/publish`, {
      method: "POST",
      body: JSON.stringify({
        id: this.props.post.id
      }),
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(this.setState({ published: !this.state.published }));
  };

  createMarkup = () => {
    return { __html: this.state.body };
  };

  handleTitleChange = e => {
    this.setState(
      {
        title: e.target.value,
        changesSaved: false
      },
      this.patchPost()
    );
  };

  initialTitleValue = () => {
    if (this.state.title === null) return "New Post Title";
    else return this.state.title;
  };

  renderEditor = () => {
    return (
      <Fragment>
        <Input
          placeholder="Title"
          value={this.initialTitleValue()}
          onChange={this.handleTitleChange}
        />
        <Editor
          className="ui container text"
          text={this.state.body}
          onChange={this.handleBodyChange}
        />
      </Fragment>
    );
  };

  renderViewer = () => {
    return (
      <>
        <h4>{this.state.title}</h4>
        <Container
          text
          className="medium-editor-element"
          dangerouslySetInnerHTML={this.createMarkup()}
        />
      </>
    );
  };

  dropDownOptions = () => {
    return [
      { key: "publish", icon: "send", text: "Publish Post", value: "publish" },
      { key: "delete", icon: "remove", text: "Delete Post", value: "delete" }
    ];
  };

  dropDownHandler = input => {
    input = input.target.innerText;

    console.log(input);

    switch (input) {
      case "Publish Post":
        this.publishPost();
        break;
      case "Delete Post":
        this.deletePost();
        break;
      case "hide":
        console.log("hide");
        break;
    }
  };

  render() {
    return (
      <>
        <Menu secondary>
          <Menu.Item position="right">
            <Button.Group color="teal">
              <Button
                onClick={() => this.setState({ editing: !this.state.editing })}
              >
                {this.state.editing === true ? "Done" : "Edit"}
              </Button>
              <Dropdown
                className="button icon"
                floating
                options={this.dropDownOptions()}
                trigger={<React.Fragment />}
                onChange={this.dropDownHandler}
              />
            </Button.Group>
          </Menu.Item>
        </Menu>
        <Container>
          {this.state.changesSaved === false
            ? "unsaved changes"
            : "changes saved"}
          {this.showEditButton()}
          {this.state.editing === true
            ? this.renderEditor()
            : this.renderViewer()}
        </Container>
      </>
    );
  }
}
