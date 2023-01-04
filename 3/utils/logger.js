/* Normaaleja logiviestejä varten tarkoitetttu funktio */
const info = (...params) => {
    console.log(...params)
}

/* Virhetilanteita varten tarkoitetttu funktio */
const error = (...params) => {
    console.log(...params)
}

module.exports = {
    info, error
}