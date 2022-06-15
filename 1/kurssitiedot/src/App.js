// Määritellään kurssin otsikko
const Header = (props) => {
  return (
      <h1>{props.course.name}</h1>
  )
}

// Määritellään Content -osio. Hakasuluissa oleva numero viittaa listassa olevaan indeksin arvoon
const Content = (props) => {
  return (
    <div>
      <Part part = {props.course.parts[0].name} exercises = {props.course.parts[0].exercises} />
      <Part part = {props.course.parts[1].name} exercises = {props.course.parts[1].exercises} />
      <Part part = {props.course.parts[2].name} exercises = {props.course.parts[2].exercises} />
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

/* Määritellään kurssin harjoitusten kokonaislukumäärä. Parts viittaa muuttujaan,
joka on lista olioita. Hakasuluissa oleva numero viittaa listassa olevaan indeksin arvoon. */
const Total = (props) => {
  return (
    <p>
      Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [ 
      { // Olio 1 [taulukossa indeksi 0]
        name: 'Fundamentals of React',
        exercises: 10
      },
      { // Olio 2 [taulukossa indeksi 1]
        name: 'Using props to pass data',
        exercises: 7
      },
      { // Olio 3 [taulukossa indeksi 2]
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  // Käytetään vain muuttujaa 'course', koska ei ole muita vaihtoehtoja.
  return (
    <div>
      <Header course = {course} />
      <Content course = {course} />
      <Total course = {course}/>
    </div>
  )
}

export default App