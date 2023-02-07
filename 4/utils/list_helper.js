const dummy = (blogs) => { 
    return 1 // Tässä vaiheessa (4.3) funktio palauttaa AINA numeron 1
}

const totalLikes = (blogs) => {
    const likes = blogs.reduce((sum, current) => { // Parametreina tulleista blogeista tehdään lista. Sum muuttuja on kokonaissumma, current tarkoittaa listassa olevaa alkiota, jota käsitellään
        return sum + current.likes
    }, 0) // Nolla tarkoittaa aloitusarvoa summalle
    return likes // Palautetaan tykkäysten lukumäärä
}

const favoriteBlog = (blogs) => {
    const listOfLikes = blogs.map(blog => blog.likes) // Mapataan kaikki tykkäykset
    const max = (Math.max(...listOfLikes)) // Määritetään suurin arvo tykkäysten määrän suhteen
    const favorite = blogs[listOfLikes.indexOf(max)] // Määritetään suosituin blogi

    return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}