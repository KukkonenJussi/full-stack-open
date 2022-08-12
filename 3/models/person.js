const mongoose = require('mongoose')

// MongoDB:n URI -osoite, onka avulla sovelluksemme käyttämä MongoDB-kirjasto saa yhteyden kantaan.
// `mongodb+srv://Jussi:${password}@cluster0.f6hib1k.mongodb.net/phonebookApp?retryWrites=true&w=majority` tietokannan osoite
// HUOM! muuta alapuolella oleva url muotoon const url = process.env.MONGODB_URI
const url = `mongodb+srv://Jussi:${password}@cluster0.f6hib1k.mongodb.net/phonebookApp?retryWrites=true&w=majority` // Tietokannan osoitetta EI kannata kirjoittaa koodiin tietoturvasyistä johtuen. Osoite annetaan sovellukselle ympäristömuuttujan MONGODB_URI välityksellä

console.log('connecting to', url)
mongoose.connect(url) // Avataan yhteys
    .then(result => { // Viestin onnistuneen yhteyden muodostamisessa
        console.log('connected to MongoDB') 
    })
    .catch((error) => { // Viestin epäonnistuneen yhteyden muodostamisessa
        console.log('error connecting to MongoDB', error.message)
    })

/* Yhteyden avaamisen jälkeen määritellään skeema. 
Määritetään nimi neljänneksi ja numero viidenneksi argumentiksi, 
koska salasana on kolmas argumentti.*/
const personSchema = new mongoose.Schema({
  name: String, // Nimi on kolmas indeksi eli neljäs argumentti
  number: String, // Numero on neljäs indeksi eli viides argumentti
})

/* Muotoillaan Mongoosen palauttamien olioiden ulkoasua */
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/* Moduulin ulos näkyvä osa määritellään arvo muuttujalle module.exports.
Tässä tapauksessa modelin arvo on Person. Muut moduulin sisällä määritellyt
asiat, esim. muuttujat mongoose ja url EIVÄT näy moduulin käyttäjälle.*/
module.exports = mongoose.model('Person', personSchema)