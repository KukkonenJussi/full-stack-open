// Määritellään Course osio, joka huolehtii yksittäisen kurssin muotoilusta.
// HUOM! LISÄÄ TÄHÄN VIELÄ TOTAL -laskuri kursseista
const Course = (props) => {
  return (
    <>
      <Header course = {props.course} />
      <Content course = {props.course} />
    </>
  )
}

// Määritellään kurssin otsikko.
const Header = (props) => {
  return (
      <h1>{props.course.name}</h1>
  )
}

// Määritellään Content -osio. Hakasuluissa oleva numero viittaa listassa olevaan indeksin arvoon.
const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part =>
        <Part key = {part.id} part = {part.name} exercises = {part.exercises} />
    )}
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

/* Määritellään kurssin harjoitusten kokonaislukumäärä.
Parts viittaa muuttujaan, joka on lista olioita.
Hakasuluissa oleva numero viittaa listassa olevaan indeksin arvoon.
KORJAA TÄMÄ OSIO VIELÄ NIIN, ETTÄ SE LASKEE KURSSIN TEHTÄVIEN YHTEENLASKETUN LUKUMÄÄRÄN!

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}
    </p>
  )
}
*/

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      { // Olio 1 [taulukossa indeksi 0]
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      { // Olio 2 [taulukossa indeksi 1]
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      { // Olio 3 [taulukossa indeksi 2]
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course = {course} />
    </div>
  )
} 

export default App