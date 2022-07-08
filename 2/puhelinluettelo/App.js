import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([ // Lista henkilöistä
    { name: 'Arto Hellas', id: 1}
  ]) 
  const [newName, setNewName] = useState('') // Nimen lisäystä varten
  const [newNumber, setNewNumber] = useState('') // Numeron lisäystä varten

  /*Osio, jonka avulla lisätään henkilöitä puhelinluetteloon*/
  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    }
    
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
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <Person key = {person.id} person = {person} /> 
        )} 
      </div>
    </div>
  )
}

export default App