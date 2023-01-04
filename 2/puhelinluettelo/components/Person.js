const Person = ({ person, deleteContact }) => {
  const label = 'Delete'
  
  return (
      <div>
          <li className="person">
          {person.name} {person.number}
          <button onClick={() => deleteContact(person.id)}>{label}</button>
          </li>
      </div>
  ) 
}

export default Person