import { useEffect, useState } from 'react'

export function StartClock(localtime) {

  const times = String(localtime).split(':')
  const [hours, minutes] = times

  // const [time, setTime] = useState({
  //   seconds: 1,
  //   minutes: minutes,
  //   hours: hours,
  // })
  const [ second, setSecond ] = useState(0)
  const [ minute, setMinute ] = useState(minutes)
  const [ hour, setHour] = useState(hours)

  const secondIncrement = () => {
    second < 60 ? setSecond(second + 1) : second = 0 && setTime(minute + 1)
    minute < 60 ? setTime(minute + 1) : minute = 0 && setTime(hours + 1)
    if (hours === 24) setTime(hours === 0)
  }

  useEffect(() => {
    const clock = setTimeout(() => {
      secondIncrement()
    }, 1000)
  }, [second])

  return (
    <h4 className="title is-4">
      Local Time: {`${time.hours}:${time.minutes}`}
    </h4>
  )
}

// as soon as WeatherShow is opened
// function to start timer should be triggered

{/* <h4 className="title is-4">Local Time: {location.localtime.split(' ')[1]}</h4> */ }