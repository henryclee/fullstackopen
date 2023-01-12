import { useState } from 'react'

const Blog = ({ user, blog, addLike, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeStyle = {
    backgroundColor: 'lightblue'
  }

  const [showDetails, setShowDetails] = useState(false)

  const Details = () => {
    if (showDetails) {
      return (
        <div>
          {blog.url} <br/>
          {blog.likes}
          <button
            onClick = {() => addLike(blog)}
            placeholder = 'likeButton'
          >
          like
          </button> <br/>
          {blog.user.username} <br/>
          {user.username === blog.user.username ?
            <button
              style = {removeStyle}
              onClick = {() => deleteBlog(blog)}
            >
            remove
            </button>
            : null
          }

        </div>
      )
    }
  }

  return (
    <div style={blogStyle} className = 'blogDiv'>
      {blog.title} &nbsp;
      {blog.author}
      <button
        onClick= {() => setShowDetails(!showDetails)}
        placeholder = 'show/hide'
      >
        {showDetails ? 'hide' : 'view'}
      </button>
      <br/>
      <Details/>
    </div>
  )
}
export default Blog