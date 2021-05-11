import React, { useState } from 'react'
import CustomPopup from './CustomPopup'
import ReactMapGl from 'react-map-gl'
import { getWeatherAtLngLat } from '../lib/api'
const mapBoxAccessToken = 'pk.eyJ1Ijoiam9uYXNiZWUiLCJhIjoiY2tvaWtsMmgwMDJ6azJubndjNDAzaXRybiJ9.XUc9zeZ2A0vQs0CNJ8n1ig'

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 5,
    longitude: 5,
    altitude: 5,
    zoom: 1,
    bearing: 0,
    pitch: 0,
  })
  const [isError, setError] = useState(false)
  const [weatherAtClick, setWeatherAtClick] = useState(null)
  const [showPopup, setPopup] = useState(false)

  const getWeather = async (lngLat) => {
    try {
      const { data } = await getWeatherAtLngLat(lngLat)
      setWeatherAtClick(data)
      console.log('data', data)
      setPopup(true)
    } catch (error) {
      setError(true)
      console.log('There is no')
    }
  }

  const handleClick = (e) => {
    console.log(e)
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


// import mapboxgl from '!mapbox-gl'
// const mapContainer = useRef(null)
// const map = useRef(null)
// const [lng, setLng] = useState(0)
// const [lat, setLat] = useState(0)
// const [zoom, setZoom] = useState(1)

// if (!weatherAtClick) {
//   return
// } else {
//   ReactDOM.render(<WeatherCard
//     name={weatherAtClick.location.name}
//     tempC={weatherAtClick.current.temp_c}
//     icon={weatherAtClick.current.condition.icon}
//   />, 
//   popup.current
//     .setLngLat(e.lngLat)
//     .setDOMContent(popupRef.current)
//     .addTo(map)
//   )
// }


//console.log('render')

// useEffect(() => {
//   if (map.current) return // initialize map only once
//   map.current = new mapboxgl.Map({
//     container: mapContainer.current,
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [lng, lat],
//     zoom: zoom,
//   })
// })

// useEffect(() => {
//   if (!map.current) return // wait for map to initialize
//   map.current.on('move', () => {
//     setLng(map.current.getCenter().lng.toFixed(4))
//     setLat(map.current.getCenter().lat.toFixed(4))
//     setZoom(map.current.getZoom().toFixed(2))
//   })
// })

// useEffect(() => {
//   if (!map.current) { // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [lng, lat],
//       zoom: zoom,
//     })
//     map.current.on('click', handleClick)
//   }
// })

// useEffect(() => {
//   map.current.on('move', () => {
//     setLng(map.current.getCenter().lng.toFixed(4))
//     setLat(map.current.getCenter().lat.toFixed(4))
//     setZoom(map.current.getZoom().toFixed(2))

//     map.current.off('click', handleClick)
//     map.current.on('click', handleClick)
//   })

//   // return () => map.current.remove()
// })

  // const popup = new mapboxgl.Popup({ closeOnClick: true, closeButton: false })
//   .setLngLat(lngLat)
//   .setHTML(`<h1>${data.location.name}</h1><h3>${data.current.temp_c}°C</h3><img src="${data.current.condition.icon}">`)
//   .addTo(map.current)