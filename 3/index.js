require('dotenv').config()
const Person = require('./models/person')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(express.static('build'))
app.use(express.json()) // Expressin tarjoama json-parseri. Tällä pääsee käsiksi pyynnön mukana lähetettyyn dataan käsiksi ja voidaan lisätä bodyyn resursseja.
app.use(cors())
 
//const Person = mongoose.model('Person', personSchema)

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
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

const PORT = process.env.PORT // Määritetään sovellukselle portti. Portti määritelty process.envin avulla, eikä suoraan koodiin kirjoitettuna
app.listen(PORT, () => { // Sidotaan muuttujaan app sijoitettu http -palvelin kuuntelemaan porttiin 3001 tulevia HTTP -pyyntöjä
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons/:id', (request, response, next) => { // Määritellään yksittäisen resurssin haku. Kaksoispiste tarkoittaa, että annetaan polulle (tässä tapauksessa id) parametreja
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else { // Jos kannasta haettua oliota ei löydy, muuttuja arvo on null
        response.status(404).end() // Vastataan statuskoodilla 404
      }
  }) 
    .catch(error => { // Jos id ei ole hyväksyttävässä muodossa
      console.log(error) // Vastataan kyselyyn statuskoodilla 400
      response.status(400).send({ errro: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (request, response, next) => { // Määritellään yksittäisen resurssin poistaminen.
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  
  /*
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
  */
})

app.post('/api/persons', (request, response) => { // Määritellään uuden resurssin lisäys.
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.content,
    number: body.content,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

  /*
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id)) // HUOM! Tehtävänannon mukaan pitäisi generoida joku riittävän iso arvoväli?
    : 0
  
 
  const person = request.body 
  person.id = maxId + 1

  persons = persons.concat(person)

  console.log(person)
  response.json(person)
  */

})

app.get('/', (req, res) => { // Määritellään handleri (eli tapahtumakäsittelijä), joka hoitaa sovelluksen polkuun / tulevia HTTP GET -pyyntöjä
  res.send('<h1>Hello World!</h1>')
})