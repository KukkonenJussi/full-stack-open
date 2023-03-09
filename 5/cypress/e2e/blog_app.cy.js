describe('Blog ', function () {

  describe('when not logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/test/reset')
      const user = {
        name: 'Testi Käyttäjä',
        username: 'testikayttaja',
        password: 'test123'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })

    // Etusivu avautumisen testaus
    it('front page can be opened', function () {
      cy.contains('Blogs app')
      cy.contains('log in')
    })

    // 5.17 Etusivulla voidaan avata kirjautumislomake
    it('login form can be opened', function () {
      cy.contains('log in').click()
      cy.contains('username')
      cy.contains('password')
    })

    // 5.18 Kirjautuminen on mahdollista kun tunnukset ovat oikein
    it('You can login to app with correct username and password', function () {
      cy.contains('log in').click()
      cy.get('#username').type('testikayttaja')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()

      cy.contains('Testi Käyttäjä logged in')
    })

    // 5.18 Kirjautuminen väärillä tunnuksilla antaa errorin
    it('Login fails with wrong username or password', function () {
      cy.contains('log in').click()
      cy.get('#username').type('kayttaja')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })

  }) // describe when not logged in

  describe('when logged in', function () {

    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/test/reset')
      const user = {
        name: 'Testi Käyttäjä',
        username: 'testikayttaja',
        password: 'test123'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.contains('log in').click()
      cy.get('#username').type('testikayttaja')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()
    })

    it('app shows form for creating a new blog', function () {
      cy.contains('new blog').click()
      cy.contains('Title')
      cy.contains('Author')
      cy.contains('Url')
    })

    // 5.19 Kirjautunut käyttäjä voi luoda blogin
    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Testiblogi cypress testausta varten')
      cy.get('#author').type('testikäyttäjä')
      cy.get('#url').type('www.testiblogi.org')
      cy.get('#save-button').click()
    })

  }) // describe when logged in

}) // describe blog