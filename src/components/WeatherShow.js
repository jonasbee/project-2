import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { get3DayForecastAtCity } from '../lib/api.js'
import { StartClock } from './Clock.js'
import ForecastCard from './ForecastCard.js'

function WeatherShow() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [location, setLocation] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [isError, setIsError] = useState(false)

  const [selectedUnits, setSelectedUnits] = useState(0)

  const units = [{
    system: 'Metric',
    temp: 'c',
    wind: 'kph',
  }, {
    system: 'Imperial',
    temp: 'f',
    wind: 'mph',
  }]

  const { name } = useParams()
  // console.log(units)
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await get3DayForecastAtCity(name)
        setForecast(data.forecast)
        setCurrentWeather(data.current)
        setLocation(data.location)
      } catch (err) {
        setIsError(true)
        console.log(err)
      }
    }
    getData()
  }, [name])

  const changeUnits = () => {
    setSelectedUnits(selectedUnits ? 0 : 1)
    console.log(units[selectedUnits].system)
  }

  return (
    <section className="section">
      {isError ?
        <h1 className="title is-1">Oops, we failed to find the forecast here :(</h1>
        :
        <div className="container">
          {(location && currentWeather) &&
            <>
              <div className="columns">
                <div className="column is-two-thirds">
                  <h1 className="title is-1">{location.name}</h1>
                </div>
                <div className="column is-one-third">
                  <button className="button is-warning" onClick={changeUnits}>Change to {units[selectedUnits ? 0 : 1].system}</button>
                </div>
              </div>
              <hr />
              <div className="columns">
                <div className="column is-third">
                  <h4 className="title is-4">Country: {location.country}</h4>
                  <hr />
                  <h4 className="title is-4">Region: {location.region}</h4>
                  <hr />
                  <StartClock localtime={location.localtime.split(' ')[1]} />
                </div>
                <div className="column is-third">
                  <h4 className="title is-4">{currentWeather.condition.text}</h4>
                  <hr />
                  <h4 className="title is-4">{currentWeather[`temp_${units[selectedUnits].temp}`]}°{units[selectedUnits].temp.toUpperCase()}</h4>
                  <hr />
                  <h4 className="title is-4">Wind: {currentWeather[`wind_${units[selectedUnits].wind}`]} {units[selectedUnits].wind} {currentWeather.wind_dir}
                  </h4>
                  <hr />
                </div>
                <div className="column is-third">
                  <h4 className="title is-4">UV: {currentWeather.uv}</h4>
                  <hr />
                  <h4 className="title is-4">Humidity: {currentWeather.humidity}%</h4>
                  <hr />
                  <img src={currentWeather.condition.icon} />
                </div>
              </div>
            </>
          }
          {forecast ?
            <>
              <h2 className="title is-2">3 Day Forecast</h2>
              <hr />
              <div className="columns">
                {forecast.forecastday.map(day => (
                  <ForecastCard
                    key={day.date}
                    date={day.date}
                    maxTemp={day.day[`maxtemp_${units[selectedUnits].temp}`]}
                    minTemp={day.day[`mintemp_${units[selectedUnits].temp}`]}
                    condition={day.day.condition}
                    tempUnit={units[selectedUnits].temp}
                  />
                ))}
              </div>
            </>
            :
            <h2>Loading Forecast...</h2>
          }
        </div>
      }
    </section>
  )
}

export default WeatherShow