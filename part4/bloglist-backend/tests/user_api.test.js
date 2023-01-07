const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

describe('initial state with one user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pass1', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('can create a new user', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test1',
      name: 'test 1',
      password: 'pass1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect (usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect (usernames).toContain(newUser.username)
  })

  test('reject user with short or missing name', async() => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser1 = {
      name: 'no username',
      password: 'pass'
    }

    const result = await api
      .post('/api/users')
      .send(invalidUser1)
      .expect(400)

    expect (result.body.error).toContain('User validation failed')

    const invalidUser2 = {
      username: 'ab',
      name: 'short username',
      password: 'pass'
    }

    const result2 = await api
      .post('/api/users')
      .send(invalidUser2)
      .expect(400)

    expect (result2.body.error).toContain('User validation failed')

    const usersAtEnd = await helper.usersInDb()
    expect (usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test ('reject user with short or missing password', async() => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser1 = {
      username: 'test2',
      name: 'test 2',
    }

    const result = await api
      .post('/api/users')
      .send(invalidUser1)
      .expect(400)

    expect (result.body.error).toContain('password must be at least 3')

    const invalidUser2 = {
      username: 'abcd',
      name: 'short password',
      password: 'pa'
    }

    const result2 = await api
      .post('/api/users')
      .send(invalidUser2)
      .expect(400)

    expect (result2.body.error).toContain('password must be at least 3')

    const usersAtEnd = await helper.usersInDb()
    expect (usersAtEnd).toHaveLength(usersAtStart.length)
  })

})