function WeatherCard({ name, icon, tempC }) {
  return (
    <div className="weather-card">
      <p>{`${name} ${tempC}°C`}</p>
      <img src={icon} alt="icon" />
    </div>
  )
}

export default WeatherCard