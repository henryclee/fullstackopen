import {useEffect, useState} from 'react'

import axios from 'axios'


const App = () => {

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountryData(response.data)
        //console.log(response.data)
      })

  },[])

  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const [countryData, setCountryData] = useState([])

  const SingleCountry = ({country}) => {
    console.log(country)
    const languages = []
      console.log(country.languages)
      
      for (let key in country.languages) {
        languages.push(country.languages[key])
      }

      return (
        <div>
          <h3>{country.name.common}</h3>
          <p>
            capital {country.capital} <br></br>
            area {country.area}
          </p>
          <b>languages:</b>
          <ul>
            {languages.map(language => <li key = {language}>{language}</li>)}
          </ul>
          <img 
            src = {country.flags.svg}
            width="200"
            alt = "Flag" 
          />
          
        </div>
    )

  }

  const handleShow = () => {
    
  }

  const ShowCountries = () => {

    let countryList = countryData

    if (filter !== '') {
      countryList = countryData
        .filter (country => {
          if (country.name.common.toLowerCase().includes(filter.toLowerCase())) {
            return true
          }
          return false
        })
    }

    if (countryList.length > 10) {
      return (
      <div>
        Too many matches, specify another filter
      </div>
      )
    }

    if (countryList.length === 1) {
      const country = countryList[0]
      const languages = []
      console.log(country.languages)
      
      for (let key in country.languages) {
        languages.push(country.languages[key])
      }

      return (
        <div>
          <h3>{country.name.common}</h3>
          <p>
            capital {country.capital} <br></br>
            area {country.area}
          </p>
          <b>languages:</b>
          <ul>
            {languages.map(language => <li key = {language}>{language}</li>)}
          </ul>
          <img 
            src = {country.flags.svg}
            width="200"
            alt = "Flag" 
          />
          
        </div>
      )
    }

    return (
      <ul>
        {countryList.map(country => <li key = {country.name.common}>
          {country.name.common} <button onClick = {() => handleShow()} >show</button>
        </li>)}
      </ul>

    )

  }

  return (
    <div>
      <h2>Countries</h2>
      find countries 
      <input
         value = {filter}
         onChange = {handleFilterChange}
      />
      <ShowCountries />

    </div>
  )
}

export default App;
