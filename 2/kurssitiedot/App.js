import Course from './components/Course'

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