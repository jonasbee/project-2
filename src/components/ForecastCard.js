function ForecastCard({ date, condition, maxTemp, minTemp, tempUnit }) {
  return (
    <div  className="column is-third">
      <h5 className="title is-5">
        {date.split('-').reverse().join('/')}
      </h5>
      <div className="columns">
        <div className="column is-half">
          <p>{condition.text}</p>
          <img src={condition.icon} alt="icon" />
        </div>
        <div className="column is-half">
          <p>Max: {maxTemp}°{tempUnit.toUpperCase()}</p>
          <p>Min: {minTemp}°{tempUnit.toUpperCase()}</p>
        </div>
      </div>
    </div>
  )
}
export default ForecastCard