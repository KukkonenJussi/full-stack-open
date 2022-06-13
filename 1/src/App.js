const Header = (props) => {
  return (
  <div>
    <h1>{props.course}</h1>
  </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Total of exercises {props.tot}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part parts = {props.cont} ex = {props.exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
      <p>{props.parts} {props.ex}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course} />
      <Content cont = {part1} exercises = {exercises1} />
      <Total tot = {exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App