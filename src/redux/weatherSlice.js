// src/redux/weatherSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for Weather API
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async () => {
    const cities = ['New York', 'London', 'Tokyo'];
    const API_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    if (!API_KEY) {
      throw new Error("Weather API Key is missing in .env.local file");
    }

    const responses = await Promise.all(
      cities.map((city) =>
        axios.get(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
      )
    );

    return responses.map((res) => res.data);
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
