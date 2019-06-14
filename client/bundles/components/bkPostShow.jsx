import React, { Component, Fragment } from 'react';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

// ES module
import Editor from 'react-medium-editor';

import editorStyles from "./editorStyles"

// CommonJS enviroment
// var Editor = require('react-medium-editor').default;

 class PostShow extends Component {

    state = {
        text: 'Fusce dapibus, tellus ac cursus commodo'
    }

     handleChange = (text, medium) => {
         this.setState({ text: text });
     }

    render() {

        return (
            <div className="app">
                <Editor
                text={this.state.text} onChange={this.handleChange} />
            </div>
        )
    }

    
}


export default PostShow