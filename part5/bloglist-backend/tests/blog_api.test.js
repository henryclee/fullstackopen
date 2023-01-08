const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require ('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { post } = require('../app')

const api = supertest(app)

const initialBlogs  = [
  {
    title: 'test1',
    author: 'author1',
    url: 'www.test1.com',
    likes: 1
  },
  {
    title: 'test2',
    author: 'author2',
    url: 'www.test2.com',
    likes: 2
  }
]

const initialUsers = [
  {
    name: 'user1',
    username: 'user1',
    password: 'pass1'
  },
  {
    name: 'user2',
    username: 'user2',
    password: 'pass2'
  }
]

//Initialize the test database
//beforeEach(async () => {

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  // Create users
  for (let user of initialUsers) {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(user.password, saltRounds)

    let userObject = new User({
      name: user.name,
      username: user.username,
      passwordHash
    })
    await userObject.save()
  }

  // Get id of user 2
  const userList = await User.find({})
  const user2Id = userList[1]._id

  for (let blog of initialBlogs) {
    blog.user = user2Id
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe ('testing GET', () => {
  test('correctly get the blogs as json', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are the correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect (response.body).toHaveLength(initialBlogs.length)
  })

  test('each blog has an id field', async () => {
    const response = await api.get('/api/blogs')
    for (let blog of response.body) {
      expect (blog.id).toBeDefined()
    }
  })
})

describe('testing POST', () => {
  test('correctly post a new blog', async () => {

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user2', password: 'pass2' })

    const token = loginResponse.body.token

    const newBlog = {
      title: 'test3',
      author: 'author3',
      url: 'www.test3.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(response.body[2].likes).toEqual(3)

  })

  test('post missing likes defaults likes to zero', async () => {

    const newBlog = {
      title: 'test4',
      author: 'author4',
      url: 'www.test4.com',
    }

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user2', password: 'pass2' })

    const token = loginResponse.body.token

    await api
      .post('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .send(newBlog)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.filter((blog) => {
      return (blog.title === 'test4')
    })[0]
    expect (addedBlog.title).toBeDefined()
    expect (addedBlog.likes).toEqual(0)
  })

  test('post missing title is rejected', async () => {

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user2', password: 'pass2' })

    const token = loginResponse.body.token

    const noTitle = {
      author: 'author5',
      url: 'www.test5.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .send(noTitle)
      .expect(400)
  })

  test('post missing url is rejected', async () => {

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user2', password: 'pass2' })

    const token = loginResponse.body.token

    const noURL = {
      title: 'test6',
      author: 'author6',
      likes: 6
    }
    await api
      .post('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .send(noURL)
      .expect(400)
  })
})


describe('test DELETE', () => {
  test('able to delete a blog', async() => {
    const blogList = await api.get('/api/blogs')
    const blogToDelete = blogList.body[0]

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user2', password: 'pass2' })

    const token = loginResponse.body.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: 'bearer ' + token })
      .expect(204)

    const modifiedBlogList = await api.get('/api/blogs')
    expect(modifiedBlogList.body).toHaveLength(1)

    const contents = modifiedBlogList.body.map(blog => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
  })

  test('deleting a blog that doesn\'t exist also returns 204', async() => {
    const blogList = await api.get('/api/blogs')
    const blogToDelete = blogList.body[0]

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'user2', password: 'pass2' })

    const token = loginResponse.body.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: 'bearer ' + token })
      .expect(204)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: 'bearer ' + token })
      .expect(204)
  })

})

describe ('test PUT', () => {
  test('able to update likes', async() => {
    const blogList = await api.get('/api/blogs')
    const blogToUpdate = blogList.body[0]

    const updatedBlog = { ...blogToUpdate, likes: 99 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const updatedBlogList = await api.get('/api/blogs')
    const changedBlog = updatedBlogList.body[0]
    expect(changedBlog.likes).toEqual(99)
  })
})

afterAll(() => {
  mongoose.connection.close()
})