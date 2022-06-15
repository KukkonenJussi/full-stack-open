import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
        Good {good} <br/>
        Neutral {neutral} <br/>
        Bad {bad} <br/>
        All {good + neutral + bad} <br/>
        Average {((good - bad) / (good + neutral + bad)) * 100} <br/>
        Positive {(good / (good + neutral + bad)) * 100} %
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      
      <button onClick = {() => setGood(good + 1)}>
        Good 
      </button>
      
      <button onClick = {() => setNeutral(neutral + 1)}>
        Neutral
      </button>
      
      <button onClick = {() => setBad(bad + 1)}>
        Bad
      </button> 
      
      <h1>Statistics</h1>
      
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App