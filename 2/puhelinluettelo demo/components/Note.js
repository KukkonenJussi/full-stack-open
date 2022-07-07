const Note = (props) => { // Sama kuin pistäisi tällä rivillä olevan propsin tilalle {note}
    const {note} = props // Ja poistaisit tämän rivin kokonaan
  
    return (
      <li>{note.content}</li>
    )
  }
  
  export default Note