import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog"

describe('Blog', () => {
  test('Only renders title and author as default', () => {
    const blog = {
      title: "Metsän kuningas",
      url: "www.kuningas.net",
      likes: 7,
      author: "Jari"
    }

    render(<Blog blog={blog} />)

    screen.getByText(`${blog.title} ${blog.author}`) // Vaihtoehtoinen tapa tehtävän 5.13 suoritukselle :)
  })

  /*
  5.15 vielä työn alla :)
  test('Clicking the button calls event handler once', async () => {
    const blog = {
      title: "Otsikko22",
      url: "www.kekkosen-kirjat.com",
      likes: 11,
      author: "Kekkonen22"
    }
  
    const mockHandler = jest.fn()
  
    render(<Blog blog={blog} />)
  
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })
  */

})