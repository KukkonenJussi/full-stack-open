const reverse = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const average = (array) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    return array.length === 0 // Jos taulukon pituus on 0
        ? 0 // Palautetaan 0
        : array.reduce(reducer, 0) / array.length // Muussa tapauksessa palautetaan reduce -metodin avulla laskettu keskiarvo
}

module.exports = {
    reverse,
    average,
}