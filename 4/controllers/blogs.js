const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => { // Haetaan tietokannasta blogit käyttäen async -toimintoa
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!request.body.title && !request.body.url) {
        response.status(400).send('Bad Request')
    }
    else {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        })
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        response.json(blog)
    }
    else {
        response.status(404).end()
    }
})

// 4.13 Blogin poistaminen tämän pitäisi olla oikein, testin puolella häikkää
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter