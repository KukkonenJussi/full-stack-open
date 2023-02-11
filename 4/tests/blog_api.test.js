const mongoose = require('mongoose')
const supertest = require('supertest')
// const { init } = require('../app')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
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
    // expect(response.body).toHaveLength(2) // Näin saadaan määritettyä tietty lukumäärä blogeja
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    
    const title = response.body.map(r => r.title) // Muodostetaan taulukko API:n palauttamien blogien authoreista
    expect(title).toContain('React patterns') // Näin saadaan mapatuista blogeista etsittyä (tässä tapauksessa) tietty title
    // expect(response.body[1].author).toBe('Rytkön Ville') // Jos halutaan spesifisti määritellä jokin attribuutti ja paikka listassa
})

// 4.9
test('identifier _id is defined', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0]._id).toBeDefined()
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
    // expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    //const response = await api.get('/api/blogs')
    //const title = response.body.map(r => r.title)

    // const title = blogsAtEnd.map(n => n.title)
    // expect(title).toContain('Hirvenpyytäjät')

})

// 4.11
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

// 4.12
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

/*
test('a blog without content is not added', async () => {
    const newBlog = {
        title: body.title
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    // const response = await api.get('/api/blogs')
    // expect(response.body).toHaveLength(helper.initialBlogs.length)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a specific note can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        expect(resultBlog.body).toEqual(blogToView)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs${blogToDelete.id}`)
        .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const contents = blogsAtEnd.map(r => r.title)

        expect(contents).not.toContain(blogToDelete.title)
})
*/

afterAll(async () => {
    await mongoose.connection.close()
})