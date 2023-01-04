import { useEffect, useState } from "react"
import Person from "./components/Person"
import personService from "./services/personService"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [showAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  const deleteContact = (id) => {
    const confirmDelete = window.confirm("Delete this contact?")
    const person = persons.find((p) => p.id === id)
    
    if (confirmDelete) {
      personService
        .remove(id).then(returnedPerson => {
          persons.map(p => p.id !== id ? p : returnedPerson)
        // Jos tähän laittaa .catch -lohkon, poistaminen toimii vasta toisella kerralla? ekalla kerralla ei mitään ilmoitusta.
          setErrorMessage(`Contact ${person.name} deleted`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000);
          setPersons(persons.filter(p => p.id !== id))
      })
    }

  } // deleteContact

  const updateContact = (id, numberChanged) => {
    const person = persons.find(p => p.name === newName)

    personService
        .update(person.id, numberChanged).then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          // Tähän jos laittaa .catch -lohkon, niin numero vaihtuu, mutta ilmoitusta ei tule?
          setErrorMessage(`Number from ${person.name} changed.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000);
        })

  } // updateContact

  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    const person = persons.find((p) => p.name === newName)
    
    if (person) {
      const person = persons.find((p) => p.name === newName)
      const changedNumber = {...person, number: newNumber} // Henkilön nimi säilyy, vaihdetaan numero
      const confirmChange = window.confirm(`${newName} is already added to phonebook, replace the number?`)

      if(confirmChange)
        updateContact(person.id, changedNumber)
        setNewName("")
        setNewNumber("")
    } 
    else {
      personService
        .create(personObject).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          // Tähän jos laittaa .catch -lohkon, niin henkilö luodaan, mutta ilmoitusta ei tule?
          setErrorMessage(`Contact ${personObject.name} added.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000) // Aika (millisekunteina), minkä jälkeen ilmoitus häviää

          setNewName("") // Tyhjennetään input -kentät
          setNewNumber("")
        })
    }

  } // addPerson

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter((p) => p.name.toLowerCase().includes(filter))

  return (
    <div>
      <Notification message={errorMessage}/>
      <h2>Phonebook</h2>
      <div>Filter: <input onChange={handleFilterChange}></input></div>
      <h2>Add a new contact</h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handlePersonChange} /></div>
        <div> phone: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((p) => (
            <Person 
              key={p.name} 
              person={p} 
              deleteContact={deleteContact} 
            />
          ))}
      </div>
    </div>
  )
}

export default App;
