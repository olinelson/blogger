import React from 'react'
import { Header } from 'semantic-ui-react'



export default function Posts(props) {

  const goToPostShow =() => {
    
  }

  return (
    <div>
      <Header as="h1">Posts</Header>
      {props.posts.map(p => 
        <a className="ui card" key={p.id} href={`${props.url}/posts/${p.id}`}>
          <div className="content">
          <h4 className="header">{p.title}</h4>
          <p className="meta">{p.author}</p>

          </div>

        </a>
        )}
    </div>
  )
}
