// Määritellään Course osio, joka huolehtii yksittäisen kurssin muotoilusta.
// HUOM! LISÄÄ TÄHÄN VIELÄ TOTAL -laskuri kursseista
const Course = (props) => {
    const {course} = props
  
    return (
      <>
        <Header course = {course} />
        <Content course = {course} />
        <Total course = {course} />
      </>
    )
  }
  
  // Määritellään kurssin otsikko.
  const Header = (props) => {
    const {course} = props
  
    return (
        <h1>{course.name}</h1>
    )
  }
  
  // Määritellään Content -osio. Hakasuluissa oleva numero viittaa listassa olevaan indeksin arvoon.
  const Content = (props) => {
    const {course} = props
  
    return (
      <div>
        {course.parts.map(component =>
          <Part key = {component.id}
          part = {component.name} 
          exercises = {component.exercises} />
      )}
      </div>
    )
  }
  
  /*
  <div>
        {props.course.parts.map(part =>
          <Part key = {part.id} part = {part.name} exercises = {part.exercises} />
      )}
      </div>
  */
  
  /* Määritellään kurssin harjoitusten kokonaislukumäärä.
  Parts viittaa muuttujaan, joka on lista olioita.
  Hakasuluissa oleva numero viittaa listassa olevaan indeksin arvoon.
  
  HUOM! Kohdassa 2.2 Pitäisi ensin tehdä muuttuja, joka on arvoltaan nolla. 
  Tämän jälkeen lisätään harjoitukset siihen muuttujaan ja palautetaan muuttuja.
  */
  const Total = (props) => {
    const {course} = props
    let sum = 0 // Määritellään aloitussumma tehtävien laskemista varten
    const ex = course.parts.map // Määritellään taulukko, josta tiedot haeataan
  
    // Käydään loopissa taulukon luvut läpi ja lisätään ne muuttujaan sum
    for (let i = 0; i < ex; i++) {
      sum += ex[i]
    }
  
    // Palautetaan tehtävien yhteenlaskettu määrä
    return (
      <div>
        Number of exercises {sum}
      </div>
    )
  }
  
  // Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}
  
  // Määritellään Part -osio.
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises} 
      </p>
    )
  }

  export default Course