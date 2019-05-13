import React from 'react'

export default function UserShow(props) {

  const ifLoggedInShowUnPublishedPosts = () => {
    if (props.current_user && props.current_user.id === props.user.id){
      return (
        <div>
          <h4>Unpublished Posts</h4>
          {mapPosts(props.unpublished_posts)}
        </div>
      )
    }

  }

  const mapPosts = (posts) => {
    return(
      posts.map(p =>
        <a className="ui card" key={p.id} href={`${props.url}/posts/${p.id}`}>
          <div className="content">
            <h4 className="header">{p.title}</h4>
            <p className="meta">{p.author}</p>

          </div>

        </a>
      )
    )
     
    }


  return (
    <div>
      <h1>{props.user.email}</h1>

      <h4>Posts</h4>

      {mapPosts(props.published_posts)}

      {ifLoggedInShowUnPublishedPosts()}

      
    </div>
  )
}
