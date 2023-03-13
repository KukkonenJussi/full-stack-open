const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

const morgan = require('morgan')
morgan.token('body', request => {
  return JSON.stringify(request.body)
})

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(cors())
app.use(express.json()) // Expressin tarjoama json-parseri. Tällä pääsee käsiksi pyynnön mukana lähetettyyn dataan käsiksi ja voidaan lisätä bodyyn resursseja.
app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))

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

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`
    <div> 
      Phonebook has info for ${persons.length} people <br />
      ${new Date}
    </div>
  `)
  })
})

app.get('/api/persons', (request, response) => { // Määritellään handleri (eli tapahtumakäsittelijä), joka hoitaa sovelluksen polkuun /api/persons tulevia HTTP GET -pyyntöjä
  Person.find({}).then(persons => {
    console.log(persons)
    response.json(persons)
  })
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

app.post('/api/persons', (request, response, next) => { // Määritellään uuden resurssin lisäys.
  const body = request.body

  const person = new Person({
    id: Math.floor(Math.random() * 9000) + 1,
    name: body.name,
    number: body.number,
  })

  const personExists = persons.find((person) => person.name === body.name)

  if (body.name === undefined) { // Mikäli nimi puuttuu, heitetään errori
    return response.status(400).json({ error: 'name missing!' })
  }

  if (body.number === undefined) { // Mikäli numero puuttuu, heitetään errori
    return response.status(400).json({
      error: 'number missing!'
    })
  }

  if (personExists) { // Mikäli numero puuttuu, heitetään errori
    return response.status(400).json({
      error: 'name must be unique!'
    })
  }


  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error)) // Validointisäännön rikkovan olion lisätessä (nimi tai numero puuttuu) heittää errorin, eikä ohjelma kaadu
})

app.delete('/api/persons/:id', (request, response, next) => { // Määritellään yksittäisen resurssin poistaminen.
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint) // Tärkeä olla käytössä vasta täällä lopussa, muutoin ei pääse esim. info -sivulle!
app.use(errorHandler)

const PORT = process.env.PORT // Määritetään sovellukselle portti. Portti määritelty process.envin avulla, eikä suoraan koodiin kirjoitettuna
app.listen(PORT, () => { // Sidotaan muuttujaan app sijoitettu http -palvelin kuuntelemaan porttiin tulevia HTTP -pyyntöjä
  console.log(`Server running on port ${PORT}`)
})