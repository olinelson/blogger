import React from 'react'
import { Header } from 'semantic-ui-react'


export default function Posts(props) {

  const goToPostShow =() => {
    
  }

  return (
    <div>
      <h4 className="ui huge header">Posts</h4>
      <Header as="h1">Posts</Header>
      {props.posts.map(p => 
        <a key={p.id} href={`${props.url}/posts/${p.id}`}>
        <div >
          <h4>{p.title}</h4>
          <p>{p.author}</p>
        </div>
        </a>
        )}
    </div>
  )
}
