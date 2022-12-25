import {useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({country}) => {

  const api_key = process.env.REACT_APP_API_KEY
  const [weatherData, setWeather] = useState('')

  const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?' +
    'lat=' + String(country.capitalInfo.latlng[0]) +
    '&lon=' + String(country.capitalInfo.latlng[1]) +
    '&appid=' + String(api_key)

  //console.log(weatherURL)

  useEffect(() => {
    axios
      .get(weatherURL)
      .then(response => {
        setWeather(response.data)
      })
  },[])

  console.log("Weather data",weatherData)

  if (weatherData !== '') {

    const temp = (weatherData.main.temp - 273.15).toFixed(2)
    const weatherIcon = 'http://openweathermap.org/img/wn/' + 
      weatherData.weather[0].icon + '@2x.png'
    const windSpeed = weatherData.wind.speed

    return (
      <div>
        <h3>Weather in {country.capital}</h3>
        temperature {temp} Celsius <br></br>
        <img src = {weatherIcon}
          alt = "Weather icon"
        ></img><br></br>
        wind {windSpeed} m/s
      </div>
    )
  }
}


const CountryDetails = ({country}) => {
  
  const api_key = process.env.REACT_APP_API_KEY

  if (country === '') {
    return (<div></div>)
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital}<br></br>
      area {country.area}<br></br>
      <br></br>
      <b>languages:</b>
      <ul>
        {Object.entries(country.languages).map(([key,value]) =>
          <li key = {key}>
            {value}
          </li>
        )}
      </ul>
      <img src = {country.flags.png}
        alt = "Country Flag"
        height = "150px"
      ></img>
      <Weather country = {country} />
    </div>
  )
}

const ShowCountries = ({countryData, filter}) => {

  const [oneCountry, setOneCountry] = useState('')
  
  const countryFilter = countryData.filter(country => (
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  ))

  if (countryFilter.length > 10) {
    return (<div>
      Too many matches, specify another filter
    </div>)
  }

  if (countryFilter.length > 1) {
    return (
    <div>
      {countryFilter.map(country =>
        <div key = {country.name.common}>
          {country.name.common} 
          <button onClick = {() => setOneCountry(country)}>
            show
          </button>
        </div>)}
      <CountryDetails country = {oneCountry} />
    </div>
    )
  }

  if (countryFilter.length === 1) {
    const country = countryFilter[0]
    return (
      <CountryDetails country = {country} />
    )
  }
}


const App = () => {

  
  const [filter, setFilter] = useState('')
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log(response.data)
        setCountryData(response.data)
      })
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }



  return (
    <div>
      <h1>Countries</h1>
      <form>
        <div>
          find countries <input value = {filter}
            onChange = {handleFilterChange}
          />
        </div>
      </form>
      <div>
        <ShowCountries filter = {filter} countryData = {countryData}/>
      </div>    
    </div>
  )
}

export default App;
