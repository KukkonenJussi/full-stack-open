import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {!visible && // Ilman lisätietoja (vain title ja author)
        <div>
          {blog.title} {blog.author} {" "}
          <button
            onClick={toggleVisibility}>{visible ? 'hide' : 'show'}
          </button>
        </div>
      }
      {visible && // Lisätietojen kanssa (title, url, likes, author)
        <div>
          Title: {blog.title} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button><br />
          Url: {blog.url} <br />
          Likes: {blog.likes} {" "} <button>like</button><br />
          Author: {blog.author} <br />
        </div>
      }
    </div>
  )
}

export default Blog