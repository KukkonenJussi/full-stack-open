import { useState } from 'react'

const Person = (props) => {
  const {person} = props
  
  return (
    <div>{person.name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1}
  ]) 
  const [newName, setNewName] = useState('')

  /*Osio, jonka avulla lisätään henkilöitä puhelinluetteloon*/
  const addPerson = (event) => {
    event.preventdefault()
    
    const personObject = {
      name: newName,
      id: persons.length + 1,
    }
    
    setPersons(persons.concat(personObject)) // uusi henkilö lisätään luetteloon
    setNewName('')
    console.log('button clicked', event.target)
  }

  /*Tapahtumankäsittelijä, joka synkronoi syötekenttään
  tehdyt muutokset komponentin App tilaan*/ 
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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