const mongoose = require('mongoose')
const supertest = require('supertest')
const { init } = require('../app')
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


afterAll(async () => {
    await mongoose.connection.close()
})