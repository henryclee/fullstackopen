import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe ('Blog tests', () => {

  beforeEach(() => {
    const blog = {
      title: 'test blog',
      author: 'john smith',
      url: 'www.test.com',
      likes: 4,
      user: {
        username: 'blog creator'
      }
    }

    const user = {
      username: 'reader'
    }

    render (<Blog
      blog ={blog}
      user = {user}
    />)
  })

  test('Blog initially only shows title and author', async () => {

    await screen.findByText('test blog', { exact:false })
    await screen.findByText('john smith', { exact:false })

    const element = screen.queryByText('www.test.com', { exact: false })
    expect(element).toBeNull()

    const element2 = screen.queryByText(4, { exact: false })
    expect(element2).toBeNull()

  })

  test('url and likes are shown after show button presseed', async () => {

    const user = userEvent.setup()
    const button = screen.getByPlaceholderText('show/hide')

    await user.click(button)

    //screen.debug()

    await screen.findByText('test blog', { exact:false })
    await screen.findByText('john smith', { exact:false })
    await screen.findByText('www.test.com', { exact:false })
    await screen.findByText('4', { exact:false })

  })
})

test('clicking like button twice will call the handler 2x', async () => {

  const blog = {
    title: 'test blog',
    author: 'john smith',
    url: 'www.test.com',
    likes: 4,
    user: {
      username: 'blog creator'
    }
  }

  const fakeUser = {
    username: 'reader'
  }

  const mockHandler = jest.fn()

  render (<Blog
    blog ={blog}
    user = {fakeUser}
    addLike = {mockHandler}
  />)

  const user = userEvent.setup()

  const detailButton = screen.getByPlaceholderText('show/hide')
  await user.click(detailButton)

  const likeButton = screen.getByPlaceholderText('likeButton')
  await user.click(likeButton)
  await user.click(likeButton)

  expect (mockHandler.mock.calls).toHaveLength(2)
})


