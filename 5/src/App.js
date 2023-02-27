import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
    console.log(event)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
    console.log(event)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
    console.log(event)
  }


  const addBlog = async (event) => {
    event.preventDefault()
    
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    if (
      blogObject.title === '' || 
      blogObject.author === '' || 
      blogObject.url === ''
      ) {
      setMessage('Title, author and url needed!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } 
    else {
      blogService
        .create(blogObject)
          .then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
            setTitle('')
            setAuthor('')
            setUrl('')
          })
    }
  }
  

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)
  
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  
  }
  
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    // window.localStorage.clear() // Vaihtoehtoinen tapa: local storagen tilan kokonaan nollaava komento.
    setUsername('')
    setPassword('')
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
      Title: <input
        name='title'
        value={title}
        onChange={handleTitleChange}
        />
      </div>
      <div>
      Author: <input
        name='author'
        value={author}
        onChange={handleAuthorChange}
        />
      </div>
      <div>
      Url: <input
        name='url'
        value={url}
        onChange={handleUrlChange}
        />
      </div>

      <button type="submit">save</button>
    </form>  
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification message={message} />
        
        {!user && loginForm()}
        
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={message} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogout} >logout</button></p>
        {blogForm()}
      </div>
    } 

      {blogs
      .map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App