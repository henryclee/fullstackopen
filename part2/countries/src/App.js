import {useEffect, useState} from 'react'

import axios from 'axios'


const App = () => {

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountryData(response.data)
      })

  },[])

  const api_key = process.env.REACT_APP_API_KEY

  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const [countryData, setCountryData] = useState([])

  const [oneCountry, setOneCountry] = useState(0)


  const SingleCountry = () => {

    if (oneCountry === 0) {
      return
    }

    console.log(oneCountry)

    const languages = []
    for (let key in oneCountry.languages) {
      languages.push(oneCountry.languages[key])
    }
    return (
      <div>
        <h3>{oneCountry.name.common}</h3>
        <p>
          capital {oneCountry.capital} <br></br>
          area {oneCountry.area}
        </p>
        <b>languages:</b>
        <ul>
          {languages.map(language => <li key = {language}>{language}</li>)}
        </ul>
        <img 
          src = {oneCountry.flags.svg}
          width="200"
          alt = "Flag" 
        />
        <h3>Weather in {oneCountry.capital}</h3>
        
      </div>
    )

  }

  const handleShow = (country) => {
    setOneCountry(country)
  }

  const ShowCountries = () => {

    let countryList = countryData

    useEffect(() =>{
      if (countryList.length === 1){
        setOneCountry(countryList[0])
      }
    },[countryList])

    useEffect(() =>{
      if (countryList.length >10){
        setOneCountry(0)
      }
    },[countryList.length])

    if (filter !== '') {
      countryList = countryData
        .filter (country => {
          if (country.name.common
              .toLowerCase()
              .includes(filter.toLowerCase())) {
            return true
          }
          return false
        })
    }

    if (countryList.length > 10) {
      console.log(api_key)
      return (
      <div>
        Too many matches, specify another filter
      </div>
      )
    }


    if (countryList.length === 1) {
      
      const country = countryList[0]
      const languages = []
      
      for (let key in country.languages) {
        languages.push(country.languages[key])
      }
      
      // Single country
      return (
        <div>
          <SingleCountry />
        </div>
      )
    }
    
    //List of countries
    return (
      <div>
        <ul>
          {countryList.map(country => <li key = {country.name.common}>
            {country.name.common} 
            <button onClick = {() => handleShow(country)}>
              show
            </button> 
          </li>)}
        </ul>
        <SingleCountry />
      </div>
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
