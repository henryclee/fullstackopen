const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require ('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs  = [
  {
    title: 'test1',
    author: 'author1',
    url: 'www.test1.com'
  },
  {
    title: 'test2',
    author: 'author2',
    url: 'www.test2.com'
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('correctly get the blogs as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are the correct number of blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body)
  expect (response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})