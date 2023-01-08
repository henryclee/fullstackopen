const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const testBlogs = [
  {
    _id: '1',
    title: '1',
    author: '1',
    url: '1',
    likes: 1,
    __v: 1
  },
  {
    _id: '3',
    title: '3',
    author: '1',
    url: '3',
    likes: 3,
    __v: 3
  },
  {
    _id: '4',
    title: '4',
    author: '4',
    url: '4',
    likes: 4,
    __v: 4
  },
  {
    _id: '2',
    title: '2',
    author: '1',
    url: '2',
    likes: 2,
    __v: 2
  }
]

describe('totalLikes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('correctly computes sum of several blogs', () => {
    const result = listHelper.totalLikes(testBlogs)
    expect(result).toBe(10)
  })

})

describe('favoriteBlog', () => {
  test('single blog list, return that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('correctly identifies the favorite blog', () => {
    const result = listHelper.favoriteBlog(testBlogs)
    expect(result).toEqual(testBlogs[2])
  })
})

describe('mostBlogs', () => {
  test('single blog list, return that blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      'author': 'Edsger W. Dijkstra',
      'blogs': 1
    })
  })

  test('multiple blogs, returns correct value', () => {
    const result = listHelper.mostBlogs(testBlogs)
    expect(result).toEqual({
      'author': '1',
      'blogs': 3
    })
  })
})

describe('mostLikes', () => {
  test('single blog list, return that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      'author': 'Edsger W. Dijkstra',
      'likes': 5
    })
  })

  test('multiple blogs, returns correct value', () => {
    const result = listHelper.mostLikes(testBlogs)
    expect(result).toEqual({
      'author': '1',
      'likes': 6
    })
  })
})