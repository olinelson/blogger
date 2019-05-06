import React, { Component, Fragment } from 'react'
import PostEdit from "./PostEdit"

export default class PostView extends Component {


    state = {
        title: this.props.post.title,
        body: this.props.post.body,
        current_user: this.props.current_user 
    }


    readerView = () => {
        return(
            <Fragment>
                <h1>hello</h1>
                <h4>{this.state.title}</h4>
                <p>{this.state.body}</p>
            </Fragment>
        )
    }

    showReaderOrAuthorView = () =>{
        if(this.state.current_user === null){

            return this.readerView() 
        }
        else if (this.state.current_user.id === this.props.post.user_id){
            // return this.authorView() 
            return <PostEdit {...this.props} />
        }
    }


  render() {

    return (
        <div>
        {this.showReaderOrAuthorView()}
        </div>
    )
  }
}
