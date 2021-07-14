import React, { useState } from 'react'
import CustomPopup from './CustomPopup'
import ReactMapGl from 'react-map-gl'
import { getWeatherAtLngLat } from '../lib/api'
const mapBoxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 5,
    longitude: 5,
    altitude: 5,
    zoom: 1,
    bearing: 0,
    pitch: 0,
  })
  const [weatherAtClick, setWeatherAtClick] = useState(null)
  const [showPopup, setPopup] = useState(false)

  const getWeather = async (lngLat) => {
    try {
      const { data } = await getWeatherAtLngLat(lngLat)
      setWeatherAtClick(data)
      console.log('data', data)
      setPopup(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (e) => {
    getWeather(e.lngLat)
  }

  return (
    <div className="map-container">
      <ReactMapGl
        mapboxApiAccessToken={mapBoxAccessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        width="100%"
        height="100%"
        onViewportChange={(viewport => setViewport(viewport))}
        onClick={handleClick}
        {...viewport}
        className="is-fullheight-with-navbar"
      >
        {showPopup &&
          <CustomPopup
            latitude={weatherAtClick.location.lat}
            longitude={weatherAtClick.location.lon}
            altitude={viewport.altitude}
            setPopup={setPopup}
            weather={weatherAtClick}
          />
        }
      </ReactMapGl>
    </div>
  )
}

export default Map