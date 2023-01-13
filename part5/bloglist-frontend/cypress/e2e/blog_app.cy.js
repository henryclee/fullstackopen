describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request({
      url: 'http://localhost:3003/api/users',
      method: 'POST',
      body: { username: 'user', name: 'test user', password: 'pass' }
    })
    cy.request({
      url: 'http://localhost:3003/api/users',
      method: 'POST',
      body: { username: 'user2', name: 'test user2', password: 'pass2' }
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('user')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()

      cy.contains('test user logged in')

    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain','wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request({
        url: 'http://localhost:3003/api/login',
        method: 'POST',
        body: { username: 'user', password: 'pass' }
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('This is a Blog')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('www.abc.com')
      cy.get('#create-button').click()

      cy.contains('new blog').click()
      cy.get('#title').type('This is another Blog')
      cy.get('#author').type('Tom Doe')
      cy.get('#url').type('www.xyz.com')
      cy.get('#create-button').click()

      cy.contains('This is a Blog')
      cy.contains('John Doe')
    })

    describe('When a blog exists', function () {
      beforeEach(function() {
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          headers: { Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`},
          method: 'POST',
          body: { title: 'Blog1', author: 'Author 1', url: 'url1.com' }
        })
        cy.visit('http://localhost:3000')
      })

      it('Users can like a specific blog', function() {
        cy.contains('view').click()
        cy.get('#addLikes-button').as('LikeButton')
        cy.get('@LikeButton').click()
        cy.contains('1')

        cy.get('@LikeButton').click()
        cy.contains('2')
      })

      it('The user who created the blog can delete it', function() {
        cy.contains('view').click()
        cy.get('#remove-button').click()
        cy.should('not.contain', 'Blog1')
      })

      it('But a different user cannot delete the blog', function() {
        cy.contains('logout').click()
        cy.request({
          url: 'http://localhost:3003/api/login',
          method: 'POST',
          body: { username: 'user2', password: 'pass2' }
        }).then(response => {
          localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
        cy.contains('view').click()
        cy.contains('Blog1')
          .should('not.contain','remove')
          .and('contain', 'url1.com')
      })
    })

    describe('When several blogs exist', function() {
      beforeEach(function() {
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          headers: { Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`},
          method: 'POST',
          body: { title: 'Blog1', author: 'Author 1', url: 'url1.com' }
        })
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          headers: { Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`},
          method: 'POST',
          body: { title: 'Blog2', author: 'Author 2', url: 'url2.com' }
        })
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          headers: { Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`},
          method: 'POST',
          body: { title: 'Blog3', author: 'Author 3', url: 'url3.com' }
        })
        cy.visit('http://localhost:3000')
      })

      it.only('Should order the blogs by likes', function() {

        cy.get('.blogDiv').eq(0).contains('view').click()
        cy.get('.blogDiv').eq(1).contains('view').click()
        cy.get('.blogDiv').eq(2).contains('view').click()


        cy.get('.blogDiv').eq(1).find('#addLikes-button').click()
        cy.get('.blogDiv').eq(0).should('contain','1')

        cy.get('.blogDiv').eq(2).find('#addLikes-button').click()
        cy.get('.blogDiv').eq(1).should('contain','1')

        cy.get('.blogDiv').eq(1).find('#addLikes-button').click()
        cy.get('.blogDiv').eq(0).should('contain','2')

        cy.get('.blogDiv').eq(0).should('contain','Blog3')
      })



    })


  })


})