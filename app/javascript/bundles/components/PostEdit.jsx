import React, { Component, Fragment } from 'react'

const csrfToken = ReactOnRails.authenticityToken()

export default class PostEdit extends Component {


    state = {
        savedTitle: this.props.post.title,
        savedBody: this.props.post.body,
        title: this.props.post.title,
        body: this.props.post.body,
        current_user: this.props.current_user
    }

    patchPost = () => {
        fetch(`${this.props.url}/posts/${this.props.post.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                title: this.state.title,
                body: this.state.body
            }),
            headers: {
                "X-CSRF-Token": csrfToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(e => this.setState({
            savedBody: this.state.body,
            savedTitle: this.state.title
        }))
    }

    areChangesSaved = () => {
        if (this.state.body !== this.state.savedBody || this.state.title !== this.state.savedTitle) {
            return "unsaved changes"
        } else {
            return "changes saved"
        }
    }


    render() {

        return (
            <div>
                {this.areChangesSaved()}
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
                >save changes</button>
            </div>
        )
    }
}
