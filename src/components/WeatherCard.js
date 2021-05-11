import { Link } from 'react-router-dom'

function WeatherCard({ name, icon, tempC }) {

  return (
    <Link to={`/weather/${name}`}>
      <div className="weather-card">
        <p>{`${name} ${tempC}°C`}</p>
        <img src={icon} alt="icon" />
        <p>Hold down for forecast</p>
      </div>
    </Link>
  )
}

export default WeatherCard