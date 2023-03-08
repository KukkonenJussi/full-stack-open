const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const morgan = require('morgan')


app.use(express.json()) // Expressin tarjoama json-parseri. Tällä pääsee käsiksi pyynnön mukana lähetettyyn dataan käsiksi ja voidaan lisätä bodyyn resursseja.

app.use(morgan(function (tokens, request, response) {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    JSON.stringify(request.body),
  ].join(' ')
}))

app.use(cors())

app.use(express.static('build'))
 
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

app.get('/', (request, response) => { // Määritellään handleri (eli tapahtumakäsittelijä), joka hoitaa sovelluksen polkuun / tulevia HTTP GET -pyyntöjä
  response.send('<h1>Hello World!</h1>')
})

/*
// Joko näin yhdellä rivillä (alapuolella useammalla rivillä. Huomaa '' ja `` ero)
app.get('/info', (req, res) => {
  res.send('<div>Phonebook has info for ${persons.length} people <br />${new Date}</div>')
})
*/

// Tai näin `` käyttäen
app.get('/info', (request, response) => {
  response.send(`
    <div> 
      Phonebook has info for ${persons.length} people <br />
      ${new Date}
    </div>
  `)
})

app.post('/api/persons', (request, response) => { // Määritellään uuden resurssin lisäys.
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 9000) + 1 
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})
  

app.get('/api/persons', (request, response) => { // Määritellään handleri (eli tapahtumakäsittelijä), joka hoitaa sovelluksen polkuun /api/persons tulevia HTTP GET -pyyntöjä
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.delete('/api/persons/:id', (request, response, next) => { // Määritellään yksittäisen resurssin poistaminen.
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
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
    .catch(error => {
      next(error)
    }) // Virhetilanteen käsittely siirretään eteenpäin funktiolla next
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatePerson => {
      response.json(updatePerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT // Määritetään sovellukselle portti. Portti määritelty process.envin avulla, eikä suoraan koodiin kirjoitettuna
app.listen(PORT, () => { // Sidotaan muuttujaan app sijoitettu http -palvelin kuuntelemaan porttiin tulevia HTTP -pyyntöjä
  console.log(`Server running on port ${PORT}`)
})