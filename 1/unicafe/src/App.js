import { useState } from 'react'

// Määritellään tilastojen näyttämistä varten
const Statistics = ({good, neutral, bad}) => {
  // Mikäli palautettta ei ole annettu
  if (good === 0 & neutral === 0 & bad === 0) {
    return (
    <p>No feedback given</p> // Palautetaan tämä teksti
    )
  }
  // Muussa tapauksessa palautetaan tilastot
  else {
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