const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => { // Haetaan tietokannasta blogit käyttäen async -toimintoa
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    // 4.12 Jos titleä tai urlia ei ole, palautetaan koodi 400
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
        // 4.10
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    
        blog.save().then(savedBlog => {
            response.status(201).json(savedBlog)
        })
        .catch(error => next(error))
    }
    /*
    Täällä keulitaan vielä, kirjotin esimerkkejä eteenpäin katsomatta tehtäviä :)

    try { // Mikäli POST-pyyntöä käsitellessään aiheuttaa jonkinlaisen ajonaikaisen virheen
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } // Catch-lohkossa siis ainoastaan kutsutaan funktiota next, joka siirtää poikkeuksen käsittelyn virheidenkäsittelymiddlewarelle
    catch(excetion) {
        next(excetion)
    }
    */
  
})

/*
Täällä keulitaan vielä, kirjotin esimerkkejä eteenpäin katsomatta tehtäviä :)

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)

        if (blog) {
            response.json(blog)
        }
        else {
            response.status(404).end()
        }
    }
    catch(exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    catch (exception) {
        next(exception)
    }
})
*/

module.exports = blogsRouter