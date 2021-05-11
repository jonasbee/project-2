// import React, { useRef, useEffect, useState } from 'react'
// import ReactDOM from 'react-dom'
// import mapboxgl from '!mapbox-gl'
// import ReactMapGl from 'react-map-gl'
// import WeatherCard from './WeatherCard'
// import { getWeatherAtLngLat } from '../lib/api'
// mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXNiZWUiLCJhIjoiY2tvaWtsMmgwMDJ6azJubndjNDAzaXRybiJ9.XUc9zeZ2A0vQs0CNJ8n1ig'

// function Map() {
//   const mapContainer = useRef(null)
//   const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
//   const map = useRef(null)
//   const [lng, setLng] = useState(0)
//   const [lat, setLat] = useState(0)
//   const [zoom, setZoom] = useState(1)
//   const [isError, setError] = useState(false)
//   const [weatherAtClick, setWeatherAtClick] = useState(null)

//   const getWeather = async (lngLat) => {
//     try {
//       const { data } = await getWeatherAtLngLat(lngLat)
//       setWeatherAtClick(data)
//       

// if (!weatherAtClick) {
//   return
// } else {
//   const popupNode = document.createElement("div")
//   ReactDOM.render(<WeatherCard
//     name={weatherAtClick.location.name}
//     tempC={weatherAtClick.current.temp_c}
//     icon={weatherAtClick.current.condition.icon}
//   />, popupNode)
//   popup.current
//     .setLngLat(e.lngLat)
//     .setDOMContent(popupNode)
//     .addTo(map)

//    } catch (error) {
//       setError(true)
//       console.log('There is no')
//     }
//   }
//   if (weatherAtClick) console.log(weatherAtClick.current.condition.icon)

//   const handleClick = (e) => {
//     getWeather(e.lngLat)
//   }

//   useEffect(() => {
//     if (!map.current) { // initialize map only once
//       map.current = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [lng, lat],
//         zoom: zoom,
//       })
//       map.current.on('click', handleClick)
//     }
//   })

//   useEffect(() => {
//     map.current.on('move', () => {
//       setLng(map.current.getCenter().lng.toFixed(4))
//       setLat(map.current.getCenter().lat.toFixed(4))
//       setZoom(map.current.getZoom().toFixed(2))

//       map.current.off('click', handleClick)
//       map.current.on('click', handleClick)
//     })

//     // return () => map.current.remove()
//   })

//   return (
//     <div>
//       <div ref={mapContainer} className="map-container" />
//     </div>
//   )
// }

// export default Map


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