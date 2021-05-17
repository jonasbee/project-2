import axios from 'axios'
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY
const baseUrl = 'https://api.weatherapi.com/v1'

export function getWeatherAtLngLat([ lng, lat ]) {
  return axios.get(`${baseUrl}/current.json?key=${weatherApiKey}&q=${lat},${lng}&aqi=no`)
}

export function getWeatherAtCity(city) {
  return axios.get(`${baseUrl}/current.json?key=${weatherApiKey}&q=${city}&aqi=no`)
}

export function get3DayForecastAtCity(city) {
  return axios.get(`${baseUrl}/forecast.json?key=${weatherApiKey}&q=${city}&days=3&aqi=no`)
}