const Person = (props) => {
    const {person} = props
    
    return (
      <div>{person.name}</div>
    )
  }

  export default Person