import { useState } from 'react'

// Määritellään tilastojen näyttämistä varten
const Statistics = ({ good, neutral, bad }) => {
  // Mikäli palautettta ei ole annettu
  if (good === 0 & neutral === 0 & bad === 0) {
    return (
      <p>No feedback given</p> // Palautetaan tämä teksti
    )
  }
  // Muussa tapauksessa palautetaan tilastot
  else {
    return (
      <table>
        <tbody>
          <StatisticsLine text="Good:" value={good} />
          <StatisticsLine text="Neutral:" value={neutral} />
          <StatisticsLine text="Bad:" value={bad} />
          <StatisticsLine text="All:" value={good + neutral + bad} />
          <StatisticsLine text="Average:" value={((good - bad) / (good + neutral + bad)) * 100} />
          <StatisticsLine text="Positive:" value={(good / (good + neutral + bad)) * 100 + "%"} />
        </tbody>
      </table>
    )
  }
}

// Määritellään StatisticsLine, joka hyödyntää Statisticsia.
const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

// Määritellään nappi. Napille annetaan toiminto ja nimi.
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App