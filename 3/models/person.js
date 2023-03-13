const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url) // Avataan yhteys
  .then(() => { // Viestin onnistuneen yhteyden muodostamisessa
    console.log('connected to MongoDB')
  })
  .catch((error) => { // Viestin epäonnistuneen yhteyden muodostamisessa
    console.log('error connecting to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { // Nimi on kolmas indeksi eli neljäs argumentti
    type: String,
    required: true,
  },
  number: { // Numero on neljäs indeksi eli viides argumentti
    type: String,
    required: true,
  },
})

// Muotoillaan Mongoosen palauttamat oliot haluttuun muotoon (Jätetään pois kentät _id ja __v)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)