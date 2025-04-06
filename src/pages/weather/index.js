import { useEffect, useState } from 'react';
import { Box, Typography, Grid, TextField, Button, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

const WeatherList = () => {
  const [cities, setCities] = useState([
    'New York',
    'London',
    'Tokyo',
    'Paris',
    'Dubai',
    'Mumbai',
  ]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);

  const fetchWeatherData = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      const promises = cities.map((city) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        )
      );
      const results = await Promise.all(promises);
      setWeatherData(results.map((res) => res.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [cities]);

  const handleSearch = () => {
    if (search.trim() && !cities.includes(search)) {
      setCities([search, ...cities]);
      setSearch('');
    }
  };

  const toggleFavorite = (cityName) => {
    if (favorites.includes(cityName)) {
      setFavorites(favorites.filter((city) => city !== cityName));
    } else {
      setFavorites([...favorites, cityName]);
    }
  };

  if (loading)
    return (
      <Typography align="center" className="text-white mt-10 text-xl">
        Loading...
      </Typography>
    );

  if (error)
    return (
      <Typography color="error" align="center">
        Error: {error}
      </Typography>
    );

  return (
    <Box className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-900 py-10 px-6 text-white">
      <Typography className="text-4xl font-extrabold text-center mb-8">
        Weather Forecast
      </Typography>

      {/* Search Section */}
      <Box className="flex justify-center gap-4 mb-10">
        <TextField
          variant="outlined"
          placeholder="Search City..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
          sx={{
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: '#ccc',
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          className="bg-pink-600 hover:bg-pink-500"
        >
          Search
        </Button>
      </Box>

      {/* Weather Cards */}
      <Grid container spacing={4} justifyContent="center">
        {weatherData.map((data) => (
          <Grid item xs={12} sm={6} md={4} key={data.id}>
            <Box className="border border-white rounded-xl p-4 hover:scale-105 transition-all duration-300 relative">
              <IconButton
                onClick={() => toggleFavorite(data.name)}
                className="absolute top-2 right-2"
              >
                <FavoriteIcon
                  className={favorites.includes(data.name) ? 'text-pink-500' : 'text-white'}
                />
              </IconButton>

              <Typography className="text-2xl font-bold">{data.name}</Typography>
              <Typography className="text-sm text-gray-300">
                {data.weather[0].description}
              </Typography>
              <Typography className="text-lg font-semibold mt-1">
                Temp: {data.main.temp}°C
              </Typography>
              <Typography className="text-lg font-semibold">
                Humidity: {data.main.humidity}%
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeatherList;
