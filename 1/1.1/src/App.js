const Header = (props) => {
  return (
  <div>
    <h1>{props.course}</h1>
  </div>
  )
}

const Total = () => {
  return(
    <div>
      <p>

      </p>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>
        {props.parts}
      </p>
    </div>
  )

}

const Content = (props) => {
  return(
    <div>
      <p>
        
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
      <Part parts = {part1 + exercises1} />
      <Part parts = {part2 + exercises2} />
      <Part parts = {part3 + exercises3} />
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App