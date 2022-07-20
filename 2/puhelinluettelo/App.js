import { useEffect, useState } from 'react'
import axios from 'axios'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]) // Tyhjä lista, johon välitetään tiedot hookin avulla
  const [newName, setNewName] = useState('') // Nimen lisäystä varten
  const [newNumber, setNewNumber] = useState('') // Numeron lisäystä varten
  const [filterName, setFilterName] = useState('') // Filtteröintiä varten

  // hook, joka kerää ja välittää datan palvelimelta
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])
  
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

  // Siirrä tämä omaksi komponentiksi ja tee muutokset! :)
  const Persons = (props) => {

    return (
      <div>
        {persons.map(person => 
          <Person key = {person.id} person = {person} /> 
        )}
      </div>
    )
  }


  const PersonForm = (props) => {
    
    return (
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
    )
  }

  const Filter = (props) => {

    // Tähän jotain koodia, jolla saat filtteröinnin toimimaan!

    return (
      <div>
        Filter shown with: <input />
      </div>
    )
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
      <Persons />
    </div>
  )
}

/*

Käytä alapuolella olevaa ensimmäistä return -blokkia., kun olet saanut kaiken toimimaan. 
Toimii muuten, paitsi yhden merkin jälkeen pitää hiirellä klikata input -kenttää syöttääkseen
toisen merkin. :/

return (
    <div>
      <h2>Phonebook</h2>
      <Filter />
      <h3>Add a new</h3>
      <PersonForm />
      <h3>Numbers</h3>
      <Persons />
    </div>
  )

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
      <Persons />
    </div>
  )


*/

export default App