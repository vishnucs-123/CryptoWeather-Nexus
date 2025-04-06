import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  TextField,
  Autocomplete,
  Button,
  Box,
  Typography,
  Stack,
} from '@mui/material';

const WeatherHome = () => {
  const router = useRouter();

  const [cityInput, setCityInput] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favData = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(favData);
  }, []);

  const handleSearch = (value) => {
    setCityInput(value);
    if (value.length > 2) fetchCitySuggestions(value);
  };

  const fetchCitySuggestions = async (query) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    );
    const cityNames = response.data.map((item) => item.name);
    setCityOptions(cityNames);
  };

  const handleNavigate = (city) => {
    if (!city) return;
    router.push(`/weather/${city}`);
  };

  const addFavourite = () => {
    if (!selectedCity) return;
    const updatedFav = [...new Set([...favourites, selectedCity])];
    setFavourites(updatedFav);
    localStorage.setItem('favourites', JSON.stringify(updatedFav));
  };

  return (
    <Box className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-900 py-10 px-6 text-white">
      
      <Typography className="text-4xl font-extrabold text-center mb-10 animate__animated animate__fadeIn">
        Weather Forecast
      </Typography>

      {/* Search Section */}
      <Box sx={{ maxWidth: 400, mx: 'auto', mb: 6 }}>
        <Autocomplete
          freeSolo
          options={cityOptions}
          inputValue={cityInput}
          onInputChange={(e, value) => handleSearch(value)}
          onChange={(e, value) => setSelectedCity(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search City"
              variant="outlined"
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                },
              }}
            />
          )}
        />

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={() => handleNavigate(selectedCity)}>
            View Weather
          </Button>
          <Button variant="outlined" color="inherit" onClick={addFavourite}>
            Add Favourite
          </Button>
        </Stack>
      </Box>

      {/* Favourite Cities */}
      <Typography className="text-2xl font-bold text-center mb-4">
        Favourite Cities
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
        {favourites.length > 0 ? (
          favourites.map((city, index) => (
            <Button
              key={index}
              variant="outlined"
              color="inherit"
              onClick={() => handleNavigate(city)}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              {city}
            </Button>
          ))
        ) : (
          <Typography>No Favourites Added</Typography>
        )}
      </Stack>
    </Box>
  );
};

export default WeatherHome;
