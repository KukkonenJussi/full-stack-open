const Blog = require('../models/blog')
const User = require('../models/users')

const initialBlogs = [ // Useamman blogin sisältävä lista
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }, 
]

const nonExistinId = async () => {
    const blog = new Blog({ title: 'willremovethissoon '})
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

// Tämän avulla voidaan tarkastaa sovelluksen tietokannassa olevat blogit
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

// Tämän avulla voidaan tarkastaa sovelluksen tietokannassa olevat käyttäjät
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistinId,
    blogsInDb,
    usersInDb,
}