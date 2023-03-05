import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from "./Blog"

test('Only renders title and author as default', () => {
  const blog = {
    title: "Metsän kuningas",
    url: "www.kuningas.net",
    likes: 7,
    author: "Jari"
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Metsän kuningas Jari')
  expect(element).toBeDefined()
})