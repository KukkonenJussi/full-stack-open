const Person = (props) => {
  const {person, deleteContact} = props
  const label = "Delete"
  
  /* Toiminnallisuus buttonille! 
  <button onClick = {handleDeleteClick}>{label}</button> */
  return (
    <div>
      {person.name} {person.number} 
      <button onClick = {() => deleteContact(person.id)}>{label}</button>
    </div>
  )
}

export default Person