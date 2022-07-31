const express = require('express')
const app = express()

app.use(express.json()) // Expressin tarjoama json-parseri. Tällä pääsee käsiksi pyynnön mukana lähetettyyn dataan käsiksi ja voidaan lisätä bodyyn resursseja.

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelance",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-64223122"
  }
]

app.get('/api/persons', (req, res) => { // Määritellään handleri (eli tapahtumakäsittelijä), joka hoitaa sovelluksen polkuun /api/persons tulevia HTTP GET -pyyntöjä
  res.json(persons)
})

const PORT = 3001 // Määritetään sovellukselle portti 3001, johon sovellus käynnistyy
app.listen(PORT, () => { // Sidotaan muuttujaan app sijoitettu http -palvelin kuuntelemaan porttiin 3001 tulevia HTTP -pyyntöjä
  console.log(`Server running on port ${PORT}`)
})