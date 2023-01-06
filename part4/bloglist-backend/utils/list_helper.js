const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs
    .map((blog) => {
      return blog.likes
    })
    .reduce((acc, curr) => {
      return(acc + curr)
    })

  return sum
}

const favoriteBlog = (blogs) => {
  const favorite = blogs
    .reduce((max, curr) => {
      return (curr.likes > max.likes
        ? curr
        : max)
    })

  return favorite
}

const mostBlogs = (blogs) => {
  let maxBlogs = 0
  let maxAuthor = ''
  const AuthMap = new Map()

  blogs.forEach(blog => {
    AuthMap.set(blog.author, (AuthMap.get(blog.author) + 1 || 1))
    if (AuthMap.get(blog.author) > maxBlogs) {
      maxBlogs = AuthMap.get(blog.author)
      maxAuthor = blog.author
    }
  })

  return ({
    'author': maxAuthor,
    'blogs': maxBlogs
  })

}

const mostLikes = (blogs) => {
  let maxLikes = 0
  let maxAuthor = ''
  const AuthMap = new Map()

  blogs.forEach(blog => {
    AuthMap.set(blog.author, (AuthMap.get(blog.author) + blog.likes || blog.likes))
    if (AuthMap.get(blog.author) > maxLikes) {
      maxLikes = AuthMap.get(blog.author)
      maxAuthor = blog.author
    }
  })

  return ({
    'author': maxAuthor,
    'likes': maxLikes
  })
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}