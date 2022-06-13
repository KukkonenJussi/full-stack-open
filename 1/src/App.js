// Määritellään kurssin otsikko
const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}

// Määritellään Content -osio. Hakasuluissa oleva numero viittaa listassa olevaan arvoon
const Content = (props) => {
  return (
    <div>
      <Part part = {props.parts[0].name} exercises = {props.parts[0].exercises} />
      <Part part = {props.parts[1].name} exercises = {props.parts[1].exercises} />
      <Part part = {props.parts[2].name} exercises = {props.parts[2].exercises} />
    </div>
  )
}

// Määritellään Part -osio
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises} 
    </p>
  )
}

// Määritellään kurssin harjoitusten kokonaislukumäärä.
// Parts viittaa muuttujaan, joka on lista olioita.
// Hakasuluissa oleva numero viittaa listassa olevaan arvoon.
const Total = (props) => {
  return (
    <p>
      Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [ // (taulukko) muuttuja, jota pakko referoida, jotta pääsee käsiksi olioihin
    { // Olio 0
      name: 'Fundamentals of React',
      exercises: 10
    },
    { // Olio 1
      name: 'Using props to pass data',
      exercises: 7
    },
    { // Olio 2
      name: 'State of a component',
      exercises: 14
    }
  ]

  // Käytetään vain muuttujia 'course' ja 'parts', koska ei ole muita vaihtoehtoja.
  return (
    <div>
      <Header course = {course} />
      <Content parts = {parts} />
      <Total parts = {parts}/>
    </div>
  )
}

export default App