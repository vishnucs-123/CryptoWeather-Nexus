import axios from 'axios'

const API_KEY = '30c1228c5460a9f27108b4db3dd3c5c5'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const cities = ['New York', 'London', 'Tokyo']

export const fetchWeatherData = async () => {
  try {
    const promises = cities.map(city =>
      axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`)
    )
    const response = await Promise.all(promises)
    return response.map((res) => res.data)
  } catch (error) {
    console.error('Weather API Error:', error)
    throw error
  }
}
