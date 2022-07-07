import { useState } from 'react'
import Note from './components/Note' // Otetaan Note moduuli käyttöön

const App = (props) => {
  const [notes, setNotes] = useState(props.notes) // useState saa muistiinpanojen listan propsien avulla.
  const [newNote, setNewNote] = useState('a new note...') // tila lomakkeen syötettä varten
  const [showAll, setShowAll] = useState(true) // 

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = { // Luodaan uutta muistiinpanoa vastaava olio,
      content: newNote, // jonka sisältökentän arvo saadaan newNote tilasta,
      date: new Date().toISOString(), // annetaan päivämäärä muistiinpanolle
      important: Math.random() > 0.5, // 50% todennäköisyydellä musitiinpano on tärkeä
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject)) // uusi muistiinpaano lisätään vanhojen joukkoon concat -metodilla
    setNewNote('')
    console.log('button clicked', event.target)
  }

  /*Tapahtumankäsittelijä, joka synkronoi syötekenttään
  tehdyt muutokset komponentin App tilaan*/ 
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
        <Note key = {note.id} note = {note} />
        )}
      </ul>
      <form onSubmit = {addNote}>
        <input value={newNote} 
        onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App