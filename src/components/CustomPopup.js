import { Popup } from 'react-map-gl'
import WeatherCard from './WeatherCard'

function CustomPopup({ latitude, longitude, altitude, weather, setPopup }) {

  return (
    <div>
      <Popup
        latitude={latitude}
        longitude={longitude}
        altitude={altitude}
        offsetTop={-30}
        onClose={() => setPopup(false)}
        closeButton={false}
      >
        <WeatherCard
          name={weather.location.name}
          tempC={weather.current.temp_c}
          icon={weather.current.condition.icon}
        />
      </Popup>
    </div>
  )
}

export default CustomPopup