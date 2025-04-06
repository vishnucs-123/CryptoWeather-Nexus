import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardContent, Typography, CircularProgress, Box, Button } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const CityWeather = () => {
  const router = useRouter();
  const { city } = router.query;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (city) fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      if (!apiKey) {
        toast.error('API Key Missing');
        return;
      }
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      toast.error('City Not Found');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear':
        return <WbSunnyIcon sx={{ fontSize: 80, color: '#FFA500' }} />;
      case 'Clouds':
        return <CloudIcon sx={{ fontSize: 80, color: '#90A4AE' }} />;
      case 'Thunderstorm':
        return <ThunderstormIcon sx={{ fontSize: 80, color: '#555' }} />;
      default:
        return <WbSunnyIcon sx={{ fontSize: 80, color: '#FFA500' }} />;
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <ToastContainer />

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <CircularProgress />
          <Typography>Loading Weather Data...</Typography>
        </Box>
      ) : weatherData ? (
        <Card sx={{ maxWidth: 400, mx: 'auto', textAlign: 'center', p: 3 }}>
          {getWeatherIcon(weatherData.weather[0].main)}

          <CardContent>
            <Typography variant="h4">{weatherData.name}</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              {weatherData.weather[0].main}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Temperature: {weatherData.main.temp}°C
            </Typography>
            <Typography variant="body1">Humidity: {weatherData.main.humidity}%</Typography>
          </CardContent>

          <Button variant="outlined" sx={{ mt: 2 }} onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </Card>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          No Data Available
        </Typography>
      )}
    </Box>
  );
};

export default CityWeather;
