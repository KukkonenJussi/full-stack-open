const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2] // Tällä pääsee käsiksi komentoriviparametriin salasanan antamista varten.

// MongoDB:n URI -osoite, onka avulla sovelluksemme käyttämä MongoDB-kirjasto saa yhteyden kantaan.
const url = `mongodb+srv://Jussi:${password}@cluster0.f6hib1k.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url) // Avataan yhteys

// Yhteyden avaamisen jälkeen määritellään skeema.
const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})

// Määritellään skeemaa vastaava model.
const Person = mongoose.model('Person', personSchema)

// Tehdään esimerkki, joka lisätään tietokantaan
const person = new Person ({
    id: 5,
    name: "Rytkön Ville",
    number: "0400-111222"
})

/* Tallettaminen tapahtuu metodilla save. Metodi palauttaa promisen,
jolle voidaan rekisteröidä then -metodin avulla tapahtumakäsittelijä.

person.save().then(result => { // Olion tallettamisen jälkeen kutsutaan parametrina olevaa tapahtumakäsittelijää,
    console.log('person added!')
    mongoose.connection.close() // joka sulkee yhteyden tietokantaan. Tärkeää, koska muutoin ohjelman suoritus EI pääty.
})
*/

// Haetaan tallennetut henkilöt tietokannasta ja tulostetaan ne konsoliin
Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    });
    mongoose.connection.close()
})