// src/redux/newsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for News API
export const fetchNewsData = createAsyncThunk(
  'news/fetchNewsData',
  async () => {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

    const response = await axios.get(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&q=cryptocurrency&language=en`
    );

    return response.data.results.slice(0, 5); // Top 5 news only
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setNewsData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setNewsData } = newsSlice.actions;
export default newsSlice.reducer;
