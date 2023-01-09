import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  // Notification
  const [notification, setNotification] = useState(['','red'])

  // Blogs
  const [blogs, setBlogs] = useState([])

  // Login states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Create blog states
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user =JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } 
    catch (exception) {
      setNotification([
        'wrong username or password',
        'red'
      ])
      setTimeout(() => {
        setNotification(['','red'])
      }, 3000)
      console.log('Wrong credentials')
    }
  }

  const logout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.createBlog({title, author, url})
      setBlogs(blogs.concat(newBlog))
      setNotification([
        `a new blog ${title} by ${author} added`,
        'green'
      ])
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(()=> {
        setNotification(['','red'])
      }, 3000)
    }
    catch (exception) {
      console.log('Error during blog creation')
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification notification ={notification}/>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type = "text"
            value = {username}
            name = "Username"
            onChange = {({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type = "password"
            value = {password}
            name = "Password"
            onChange = {({target}) => setPassword(target.value)}
          />
        </div>
        <button type = "submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification ={notification}/>
      <p>
        {user.name} logged in
        <button onClick = {logout}>logout</button>
      </p>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>

  )

  return (
    <div>
      {user === null
        ? loginForm()
        : blogForm()
      }
    </div>
  )
}

export default App
