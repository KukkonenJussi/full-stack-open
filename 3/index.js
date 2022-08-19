const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.static('build'))

app.use(express.json()) // Expressin tarjoama json-parseri. Tällä pääsee käsiksi pyynnön mukana lähetettyyn dataan käsiksi ja voidaan lisätä bodyyn resursseja.
app.use(cors())

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

const PORT = process.env.PORT || 3001 // Määritetään sovellukselle portti. Joko process.env tai portti 3001.
app.listen(PORT, () => { // Sidotaan muuttujaan app sijoitettu http -palvelin kuuntelemaan porttiin 3001 tulevia HTTP -pyyntöjä
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons/:id', (request, response) => { // Määritellään yksittäisen resurssin haku. Kaksoispiste tarkoittaa, että annetaan polulle (tässä tapauksessa id) parametreja
  const id = Number(request.params.id) // Ennen parametreja oleva Number tarkoittaa parametrin muuntamista numeroksi
  const person = persons.find(person => person.id === id) // find -metodilla haetaan taulukosta parametria vastaava tietue ja palautetaan se pyynnön tekijälle
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => { // Määritellään yksittäisen resurssin poistaminen.
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => { // Määritellään uuden resurssin lisäys.
  
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id)) // HUOM! Tehtävänannon mukaan pitäisi generoida joku riittävän iso arvoväli?
    : 0
  
  const person = request.body 
  person.id = maxId + 1

  persons = persons.concat(person)

  console.log(person)
  response.json(person)
})

app.get('/', (req, res) => { // Määritellään handleri (eli tapahtumakäsittelijä), joka hoitaa sovelluksen polkuun / tulevia HTTP GET -pyyntöjä
  res.send('<h1>Hello World!</h1>')
})