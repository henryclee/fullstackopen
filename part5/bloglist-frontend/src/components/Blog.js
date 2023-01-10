import {useState} from 'react'

const Blog = ({blog, addLike}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [showDetails, setShowDetails] = useState(false)
  
  const Details = () => {
    if (showDetails) {
      return (
      <div>
        {blog.url} <br/>
        {blog.likes}
        <button onClick = {() => addLike(blog)}>
          like
        </button> <br/>
        {blog.user.username}
      </div>
      )
    }
  }

  return (
  <div style={blogStyle}>
    {blog.title} &nbsp;
    {blog.author}
    <button onClick= {() => setShowDetails(!showDetails)}>
      {showDetails ? 'hide' : 'view'}
    </button>
    <br/>
    <Details/>
  </div>  
  )
}
export default Blog