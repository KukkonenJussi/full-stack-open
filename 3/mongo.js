const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2] // Tällä pääsee käsiksi komentoriviparametriin salasanan antamista varten.

// MongoDB:n URI -osoite, onka avulla sovelluksemme käyttämä MongoDB-kirjasto saa yhteyden kantaan.
const url = `mongodb+srv://Jussi:${password}@cluster0.f6hib1k.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url) // Avataan yhteys

/* Yhteyden avaamisen jälkeen määritellään skeema. 
Määritetään nimi neljänneksi ja numero viidenneksi argumentiksi, 
koska salasana on kolmas argumentti.*/
const personSchema = new mongoose.Schema({
    name: String, // Nimi on kolmas indeksi eli neljäs argumentti
    number: String, // Numero on neljäs indeksi eli viides argumentti
})

// Määritellään skeemaa vastaava model.
const Person = mongoose.model('Person', personSchema)

/* Määritetään oliomuuttuja person uudelleen, jotta argumenttien tiedot
voidaan laittaa nimen ja numeron muuttujien kohdalle.*/
const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

/* Haetaan tallennetut henkilöt tietokannasta,
tulostetaan heidän nimi ja puhelinnumero konsoliin*/
if (process.argv.length === 3) {
    Person
        .find({}) // Haetaan oliot kannasta Person metodin find avulla. Koska find -metodin parametri on tyhjä olio {}, kaikki kokoelman Person oliot haetaan.
        .then(result => {
        console.log('Phonebook:\n- - - - -')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        });
        mongoose.connection.close()
    })
}

/* Tallennetaan olio ja annetaan ilmoitus, jos käynnistettäessä on annettu kolme komentoparametria. */
if (process.argv.length === 5) {
    person
        .save() // Tallennetaan olio
        .then(result => { // Olion tallettamisen jälkeen kutsutaan parametrina olevaa tapahtumakäsittelijää,
        console.log(`added ${person.name} number ${person.number} to phonebook`) // Tulostetaan konsoliin teksti henkilön lisäyksestä.
        mongoose.connection.close() // Suljetaan yhteys tietokantaan. Tärkeää, koska muutoin ohjelman suoritus EI pääty.
    })
}

/* Mikäli parametreja ei ole oikea määrä
(joko numero puuttuu tai henkilön koko nimi ei ole hipsuissa),
tulostetaan konsoliin virheilmoitus.*/
if (process.argv.length === 4 || process.argv.length >= 6) {
    console.log('If there are spaces in the name, enclose the name in quotation marks.') // Tulostetaan konsoliin teksti.
    mongoose.connection.close() // Suljetaan yhteys tietokantaan. Tärkeää, koska muutoin ohjelman suoritus EI pääty.
}