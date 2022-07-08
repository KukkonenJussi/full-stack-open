const Person = (props) => {
  const {person} = props
  
  return (
    <div>{person.name} {person.number}</div>
  )
}

export default Person