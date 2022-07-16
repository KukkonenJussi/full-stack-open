import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([ // Lista henkilöistä
    { name: 'Arto Hellas', id: 1, number: '040-123456'},
    { name: 'Ada Lovelace', id: 2, number: '39-44-5323523'},
    { name: 'Dan Abramov', id: 3, number: '12-43-234345'},
    { name: 'Mary Poppendieck', id: 4, number: '39-23-6423122'},
  ]) 
  
  const [newName, setNewName] = useState('') // Nimen lisäystä varten
  const [newNumber, setNewNumber] = useState('') // Numeron lisäystä varten
  // const [filterName, setFilterName] = useState('') // Filtteröintiä varten

  /*Osio, jonka avulla lisätään henkilöitä puhelinluetteloon*/
  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    }

    // Henkilöä lisätessä tarkistetaan, löytyykö uusi nimi jo olemassa olevasta listasta
    persons.find(person => person.name === newName)
      ? alert(`${newName} is already added to phonebook`) // Annetaan varoitus (ja ei anneta lisätä nimeä uudelleen), mikäli nimi on jo listassa
      : // Muussa tapauksessa lisätään uusi nimi listalle
    // Lisää henkilön listalle. Henkilölle tulee nimi ja id
    setPersons(persons.concat(personObject)) // uusi henkilö lisätään luetteloon
    setNewName('') // Kenttä tyhjenee add -napin painamisen jälkeen
    setNewNumber('') // Kenttä tyhjenee add -napin painamisen jälkeen
    console.log('button clicked', event.target)
  }

  /*Tapahtumankäsittelijä, joka synkronoi syötekenttään
  tehdyt muutokset komponentin App tilaan*/ 
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with: <input />
      </div>
      <h3>Add a new</h3>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value = {newName}
          onChange = {handlePersonChange} />
        </div>
        <div>
          number: <input value = {newNumber}
          onChange = {handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <div>
        {persons.map(person => 
          <Person key = {person.id} person = {person} /> 
        )} 
      </div>
    </div>
  )
}

export default App