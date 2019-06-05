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
        console.log(this.state)
        return (
            <div className="app">
                <h1>react-medium-editor</h1>
                <h3>Html content</h3>
                <div>{this.state.text}</div>

                <h3>Editor #1 (&lt;pre&gt; tag)</h3>
                <Editor
                    tag="pre"
                    text={this.state.text}
                    onChange={this.handleChange}
                    options={{ toolbar: { buttons: ['bold', 'italic', 'underline'] } }}
                    
                />
                <h3>Editor #2</h3>
                <Editor
                text={this.state.text} onChange={this.handleChange} />
            </div>
        )
    }

    
}


export default PostShow