import { useState } from 'react'

// Määritellään Header -osio.
const Header = (props) => {
  return(
    <h3>{props.text}</h3>
  )
}

// Määritellään nappi. Napille annetaan toiminto ja nimi.
const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

// Määritellään anekdootti. Anekdootilla on teksti ja äänten määrä
const Anectode = (props) => {
  return (
    <>
      {props.anectode} <br />
      Has {props.vote} votes
    </>
  )
}

// Tehdään otsikko eniten ääniä saaneelle anekdootille, palautetaan anekdootti ja sen äänet
const MostVotedAnectode = (props) => {

  return (
    <div>
      <h3>{props.text} </h3>
    	{props.anectode} <br />
      Has {props.vote} votes
    </div>
  )
}

const App = (props) => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const points = new Uint8Array(7) // Taulukko seitsemällä alkiolla, jossa jokaisen arvo on nolla
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(points) // Äänen antamista ja tallettamista varten
  const mostVotes = vote.indexOf(Math.max(...vote)) // Haetaan eniten ääniä saanut alkio (anekdootti)

  // Määritellään seuraava sattumanvarainen anekdootti
  const RandomAnecdote = () => {
    let index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }
  
  // Määritellään funktio, joka kasvattaa anekdootin ääntä yhdellä, kun nappia painetaan
  const handleVote = () => {
    const copy = [...vote] // Kopioidaan taulukon alkioiden arvot (eli nollat)
    copy[selected] += 1 // Kasvatetaan alkion (anekdootin) arvoa yhdellä
    setVote(copy)
  }

  return (
    <div>
      <Header text = "Anectode of the day"/> 
      <Anectode anectode = {anecdotes[selected]} vote = {vote[selected]} /> <br />
      <Button handleClick = {RandomAnecdote} text = "Next anecdote" />
      <Button handleClick = {handleVote} text = "Vote" /> <br />
      <MostVotedAnectode 
        text = "Anectode with most votes"
        anectode = {anecdotes[mostVotes]}
        vote = {vote[mostVotes]}
        />
    </div>
  )
}

export default App