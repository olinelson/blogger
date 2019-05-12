import React, {Component} from 'react'

const csrfToken = ReactOnRails.authenticityToken()

export default class NewPost extends Component {
    state = {
        title: "",
        body: ""
    }

    createPost = (e) => {
        e.preventDefault()
       let url = this.props.url

        fetch(`${url}/posts`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "X-CSRF-Token": csrfToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        console.log(this.props)
    }


    render(){
        return (
            <div>
                <h1>new post</h1>

                <form>
                    <input 
                        placeholder="post title"
                        value={this.state.title}
                        onChange={(e)=> this.setState({title: e.target.value})}
                    ></input>

                    <textarea 
                        placeholder="your words go here..."
                        value={this.state.body}
                        onChange={(e) => this.setState({ body: e.target.value })}
                    ></textarea>

                    <button
                        onClick={this.createPost}
                    > Create </button>

                </form>
            </div>
        )
    }
 
}
