import Notification from './Notification'
import Blog from './Blog'
import {useState, useRef} from 'react'
import Togglable from './Togglable'

const BlogForm = ({
  notification,
  username,
  logout,
  addBlog,
  blogs,
  addLike
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
      {username} logged in
      <button onClick = {logout}>logout</button>
    </p>
    <Togglable buttonLabel = 'new blog' ref = {blogFormRef}>
    
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title: <input
            type = "text"
            value = {title}
            name = "Title"
            onChange = {({target}) => setTitle(target.value)}
          /><br/>
          author: <input
            type = "text"
            value = {author}
            name = "Title"
            onChange = {({target}) => setAuthor(target.value)}
          /><br/>
          url: <input
            type = "text"
            value = {url}
            name = "Title"
            onChange = {({target}) => setUrl(target.value)}
          /><br/>
        </div>
        <button type = "submit">create</button>
      </form>

    </Togglable>
    
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} addLike = {addLike} />
    )}
  </div>
  )
}

export default BlogForm