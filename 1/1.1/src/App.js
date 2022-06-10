const Header = (props) => {
  return (
    <div>
      <h>
        props.
      </h>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
        <part1></part1>
        <part2></part2>
        <part3></part3>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Total: {}
      </p>
    </div>
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
      <Content content = {course} />
      <Total total = {course} />
    </div>
  )
}

export default App