import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createBlog = (props) => {

  const blog = {
    title: props.title,
    author: props.author,
    url: props.url
  }

  const configObject = {
    headers: {
      'Authorization': token
    }
  }

  const request = axios.post(baseUrl, blog, configObject)
  return request.then(response => response.data)

}

const updateBlog = (id, newObject) => {

  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {

  const configObject = {
    headers: {
      'Authorization': token
    }
  }

  const request = axios.delete(`${baseUrl}/${id}`, configObject)
  return request.then(response => response.status)

}

const blogService = { getAll, setToken, createBlog, updateBlog, deleteBlog }

export default blogService