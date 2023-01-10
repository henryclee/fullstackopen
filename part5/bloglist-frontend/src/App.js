import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  // Notification
  const [notification, setNotification] = useState(['','red'])

  // Blogs
  const [blogs, setBlogs] = useState([])

  // Login states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
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

  const addBlog = async (blogObject) => {
    const newBlog = await blogService.createBlog(blogObject)
    setBlogs(blogs.concat(newBlog))
    setNotification([
      `a new blog ${blogObject.title} by ${blogObject.author} added`,
      'green'
    ])
    setTimeout(()=> {
      setNotification(['','red'])
    }, 3000)
  }

  const addLike = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }
    const response = await blogService.updateBlog(blog.id, updatedBlog)
    const newBlogList = blogs.map((blog) => {
      if (blog.id === response.id) return response
      return blog
    })
    setBlogs(newBlogList)
  }

  const loginFormRef = useRef()

  const loginForm = () => (
    <Togglable buttonLabel = 'login' ref = {loginFormRef}>
      <LoginForm
          notification = {notification}
          handleLogin = {handleLogin}
          username = {username}
          setUsername = {setUsername}
          password = {password}
          setPassword = {setPassword}
      />
    </Togglable>
  )

  const blogForm = () => (
    
    <BlogForm 
      notification = {notification}
      username = {user.name}
      logout = {logout}
      addBlog = {addBlog}
      blogs = {blogs}
      addLike = {addLike}
    />
      
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
