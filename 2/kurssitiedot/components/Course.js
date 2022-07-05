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

const Total = (props) => {
const {course} = props

/* Tehtävien yhteenlaskettu lukumäärä reducen avulla. Total muuttuja
saaarvon nolla, johon sitten lisätään loopissa kaikki ex muuttujat*/
let total = course.parts.reduce((total, ex) => {
  return total + ex.exercises
}, 0) 

// Palautetaan tehtävien yhteenlaskettu määrä
return (
  <div>
    Number of exercises {total}
  </div>
)
}

// Määritellään Part -osio.
const Part = (props) => {
return (
  <p>
    {props.part} {props.exercises} 
  </p>
)
}

export default Course