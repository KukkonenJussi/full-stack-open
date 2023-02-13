const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/users')

beforeEach(async () => {
    await Blog.deleteMany({}) // Tyhjennetään tietokanta
    await Blog.insertMany(helper.initialBlogs) // Helpoin tapa selvitä async/await -syntaksin yllätyksiltä! Viedään kaikki initialBlogit tietokantaan (odotetaan samalla promise valmistumiset jne.)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length) // Näin saamme tietää, palautuuko kaikki blogit vai ei
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    
    const title = response.body.map(r => r.title) // Muodostetaan taulukko API:n palauttamien blogien authoreista
    expect(title).toContain('React patterns') // Näin saadaan mapatuista blogeista etsittyä (tässä tapauksessa) tietty title
})

test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

expect(resultBlog.body).toEqual(blogToView)
})

// 4.9
test('identifier _id is defined', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0]._id).not.toBeDefined()
})

// 4.10
test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'Hirvenpyytäjät',
        author: "Rytkön Ville",
        url: "https://www.hirvenpyytajat.net",
        likes: 420,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

})

// 4.11 Like 0, jos ei ole annettu
test('Like equals 0 if undefined', async () => {
    const newBlog2 = {
        title: 'Iltani hirvipeijaisissa',
        author: "Rytkön Ville",
        url: "https://www.hirvipeijaiset.net",
    }

    await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(201)

    const response = await api.get('/api/blogs')
    const blogs = response.body.map(r => r.blogs)

    if (blogs.title === newBlog2.title) {
        expect(blogs.likes).toEqual(0)
    }

})

// 4.12 Statuskoodin 400 antaminen jos url tai title puuttuu
test('if a blog does not include a title or an url', async () => {
    const newBlog3 = {
        author: "Rytkön Ville",
        likes: 9000
    }

    await api
        .post('/api/blogs')
        .send(newBlog3)
        .expect(400)
        .expect('Bad Request')
})


// 4.13 Blogien poistamisen testaus. Antaa statuskoodin 500 "Internal server error"
test('a blog can be deleted with statuscode 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
})


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'rville',
            name: 'Rytkön Ville',
            password: 'hirvi',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
    })

})


afterAll(async () => {
    await mongoose.connection.close()
})