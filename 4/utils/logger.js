const info = (...params) => { // Normaaleja logiviestejä varten
    console.log(...params)
}

const error = (...params) => { // Virhetilanteita varten 
    console.log(...params)
}

module.exports = {
    info, error
}