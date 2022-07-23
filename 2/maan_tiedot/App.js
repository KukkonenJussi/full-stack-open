import { useState } from "react"

/*HUOM HUOM! KARKEA MALLI, MISTÄ JATKAA! TARKISTA JOKAISEN
KOMPONENTIN SISÄLTÖ, KUN ALAT TEKEMÄÄN HOMMIA! :)*/

/* Komponentti, joka pitää sisällään ja renderöi maan tiedot.

HUOM! ul -tagien sisälle jotenkin maan kielet!
HUOM! ul -tagien jälkeen lippu! */
const Country = (props) => {
  const {country} = props

  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area} square kilometers</div>
      <div>Population: {country.population}</div>
      <h3>Languages:</h3>
      <ul>
        
      </ul>

    </div>
  )
}

const App = () => {
  const [country, setCountry] = useState([]) // Maiden lista. Haetaan tiedot verkkosivulta
  const [filter, setFilter] = useState('') // Maiden filtteröintiä varten.

  /* Hook tähän alapuolelle! eli mistä osoitteesta
  data haetaan ja asetetaan muuttujaan setCountry 

  HUOM! .get -kohtaan osoite!*/
  const hook = () => {
    axios
      .get('http://') 
      .then(response => {
        setCountry(response.data)
      })
  }

  /*Tapahtumankäsittelijä, joka synkronoi syötekenttään
  tehdyt muutokset komponentin App tilaan.

  HUOM! lisää vielä koodia, että filtteröinti onnistuu, 
  kun maan nimi on pienillä kirjaimilla kirjoitettuna*/ 
  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)

  }

  return (
    <div>
      
    </div>
  )
}

export default App