import React from 'react'


export default function Posts(props) {

  const goToPostShow =() => {
    
  }

  return (
    <div>
      <h4>Posts</h4>
      {props.posts.map(p => 
        <div onClick={goToPostShow} key={p.id}>
          <h4>{p.title}</h4>
          <p>{p.author}</p>
        </div>
        )}
    </div>
  )
}
