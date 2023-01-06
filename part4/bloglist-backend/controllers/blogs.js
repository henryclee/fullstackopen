const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async(request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  //console.log('from controller:', request.body)

  const blog = {
    likes: body.likes
  }

  const updatedBlog =
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter