import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test ('check that sending form has correct props', async() => {

  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm
    notification = {[]}
    user = {{ name: 'jon' }}
    logout = {() => {}}
    addBlog = {addBlog}
    blogs = {[]}
    addLike = {() => {}}
    deleteBlog = {() => {}}
  />)

  //screen.debug()

  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('Url')

  const sendButton = screen.getByText('create')

  await user.type(title, 'fake blog')
  await user.type(author, 'john doe')
  await user.type(url, 'www.abc.com')

  await user.click(sendButton)

  expect (addBlog.mock.calls).toHaveLength(1)
  expect (addBlog.mock.calls[0][0].title).toBe('fake blog')
  expect (addBlog.mock.calls[0][0].author).toBe('john doe')
  expect (addBlog.mock.calls[0][0].url).toBe('www.abc.com')

})