const info = (...params) => { // Normaaleja logiviestejä varten
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}

const error = (...params) => { // Virhetilanteita varten 
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}

module.exports = {
    info, error
}