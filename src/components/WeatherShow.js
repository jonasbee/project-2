import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getWeatherAtCity } from '../lib/api.js'

function WeatherShow() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState(null)
  const [isError, setIsError] = useState(false)
  const { name } = useParams()
  console.log(name)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getWeatherAtCity(name)
        setWeather(data.current)
        setLocation(data.location)
        console.log(data)
      } catch (err) {
        setIsError(true)
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <div className="weather-show"> 
      <div className="container">
        {(location && weather) && 
          <>
            <h1 className="title is-1 centered">{location.name}</h1>
            <hr />
            <div className="columns">
              <div className="column is-third">
                <h4 className="title is-4">Country: {location.country}</h4>
                <hr />
                <h4 className="title is-4">Region: {location.region}</h4>
                <hr />
                <h4 className="title is-4">Local Time: {location.localtime.split(' ')[1]}</h4>
              </div>
              <div className="column is-third">
                <h4 className="title is-4">{weather.condition.text}</h4>
                <hr />
                <h4 className="title is-4">{weather.temp_c}°C</h4>
                <hr />
                <h4 className="title is-4">Wind: {weather.wind_kph}kph {weather.wind_dir}</h4>
                <hr />
              </div>
              <div className="column is-third">
                <h4 className="title is-4">UV: {weather.uv}</h4>
                <hr />
                <h4 className="title is-4">Humidity: {weather.humidity}%</h4>
                <hr />
                <img src={weather.condition.icon} />
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default WeatherShow