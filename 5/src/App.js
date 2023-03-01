import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/Blogform'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [toggle, setToggle] = useState(false)
  const BlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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


  const addBlog = (blogObject) => {
    if (
      blogObject.title === '' ||
      blogObject.author === '' ||
      blogObject.url === ''
    ) {
      BlogFormRef.current.toggleVisibility()
      setMessage('Title, author and url needed!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    else {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          BlogFormRef.current.toggleVisibility()
          setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
    setUsername('')
    setPassword('')
  }



  return (
    <div>

      <h1>Blogs app</h1>
      <Notification message={message} />

      {!user && // Näkymä, mikäli ei ole kirjauduttu
        <Togglable buttonLabel="log in" buttonLabel2="cancel">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user && // Näkymä, mikäli kirjauduttu
        <div>
          <p>{user.name} logged in <button onClick={handleLogout} >logout</button></p>
          <Togglable buttonLabel="new blog" buttonLabel2="cancel" ref={BlogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
            />
          )}
        </div>
      }

    </div>
  )


} // App 

export default App