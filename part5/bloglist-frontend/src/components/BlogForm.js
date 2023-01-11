import Notification from './Notification'
import Blog from './Blog'
import {useState, useRef} from 'react'
import Togglable from './Togglable'

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

export default BlogForm