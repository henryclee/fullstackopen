import Notification from './Notification'
import Blog from './Blog'
import { useState, useRef } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const BlogForm = ({
  notification,
  user,
  logout,
  addBlog,
  blogs,
  addLike,
  deleteBlog
}) => {

  // Create blog states
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog ({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification ={notification}/>
      <p>
        {user.name} logged in
        <button onClick = {logout}>logout</button>
      </p>
      <Togglable buttonLabel = 'new blog' ref = {blogFormRef}>

        <h2>create new</h2>
        <form onSubmit={createBlog}>
          <div>
          title: <input
              id = "title"
              type = "text"
              value = {title}
              name = "Title"
              placeholder = "Title"
              onChange = {({ target }) => setTitle(target.value)}
            /><br/>
          author: <input
              id = "author"
              type = "text"
              value = {author}
              name = "Author"
              placeholder = "Author"
              onChange = {({ target }) => setAuthor(target.value)}
            /><br/>
          url: <input
              id = "url"
              type = "text"
              value = {url}
              name = "Url"
              placeholder = "Url"
              onChange = {({ target }) => setUrl(target.value)}
            /><br/>
          </div>
          <button id = "create-button" type = "submit">create</button>
        </form>

      </Togglable>

      {blogs
        .sort((bloga,blogb) => (
          bloga.likes > blogb.likes
            ? -1
            : 1
        ))
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user = {user}
            addLike = {addLike}
            deleteBlog = {deleteBlog}
          />)
      }
    </div>
  )
}

BlogForm.propTypes = {
  notification: PropTypes.array.isRequired,
  user: PropTypes.any.isRequired,
  logout: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogForm