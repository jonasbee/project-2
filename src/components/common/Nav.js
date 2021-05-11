import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getWeatherAtCity } from '../../lib/api'
import CustomPopup from '../CustomPopup'
import ReactMapGl from 'react-map-gl'
import Map from '../Map'
const mapBoxAccessToken = 'pk.eyJ1Ijoiam9uYXNiZWUiLCJhIjoiY2tvaWtsMmgwMDJ6azJubndjNDAzaXRybiJ9.XUc9zeZ2A0vQs0CNJ8n1ig'

function Nav() {

  const [searchValue, setSearchValue] = useState(null)
  const [isError, setError] = useState(false)
  const [isSubmitted, setSubmit] = useState(false)
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    zoom: 1,
    bearing: 0,
    pitch: 0,
  })
  const [weather, setWeather] = useState(null)
  const [showPopup, setPopup] = useState(false)

  const handleChange = (e) => {
    setSearchValue(e.target.value)
    console.log(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await getWeatherAtCity(searchValue)

      setSubmit(true)
      setWeather(res.data)
      setViewport({
        latitude: res.data.location.lat,
        longitude: res.data.location.lon,
        zoom: 1,
        bearing: 0,
        pitch: 0,
      })

    } catch (error) {
      setError(true)
    }
  }

  console.log(weather)

  return (
    <>
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              World Map
            </Link>
          </div>
          <div>
            <form type="search" onSubmit={handleSubmit}>
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="search"
                    placeholder="City name"
                    onKeyUp={handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <button type="submit" className="button is-warning">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
      {isSubmitted &&
        <div className="map-container">
          <ReactMapGl
            mapboxApiAccessToken={mapBoxAccessToken}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            width="100%"
            height="100%"
            // onViewportChange={(viewport => setViewport(viewport))}
            onClick={<Map />}
          >
            <CustomPopup
              latitude={viewport.lat}
              longitude={viewport.lon}
              weather={weather}
              setPopup={setPopup}
            />
          </ReactMapGl>
        </div>
      }
    </>
  )
}

export default Nav