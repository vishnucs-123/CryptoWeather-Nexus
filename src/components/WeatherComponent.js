// src/components/WeatherComponent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const cities = ['New York', 'London', 'Tokyo'];

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeather = async () => {
    try {
      const responses = await Promise.all(
        cities.map((city) =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              q: city,
              appid: 'YOUR_API_KEY',
              units: 'metric',
            },
          })
        )
      );

      const data = responses.map((res) => res.data);

      data.forEach((city) => {
        if (city.main.temp > 35) {
          toast.warn(`🔥 Heat Alert in ${city.name}: ${city.main.temp}°C`, {
            position: 'top-right',
            autoClose: 4000,
          });
        }
      });

      setWeatherData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Weather Report <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse ml-2">Live</span></h2>
      <ToastContainer />
      {weatherData.map((city) => (
        <div key={city.id}>
          <h3>{city.name}</h3>
          <p>Temperature: {city.main.temp} °C</p>
          <p>Humidity: {city.main.humidity}%</p>
          <p>Condition: {city.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherComponent;
