import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel='show'>
        <div className='testDiv'>
          Title: Otsikko22
          Url: www.kekkosen-kirjat.com
          Likes: 11
          Author: Kekkonen22
        </div>
      </Togglable>
    ).container
  }) // beforeEach

  // 5.14
  test('renders its children', () => {
    screen.getByText('Title: Otsikko22 Url: www.kekkosen-kirjat.com Likes: 11 Author: Kekkonen22')
  })

  // Togglablen sisältämä lapsikomponentti on alussa näkymättömissä. Vaihtoehtoinen tapa tehtävälle 5.13?
  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  // Togglablen sisältämä lapsikomponentti näkyy nappia painettaessa.
  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

}) // describe