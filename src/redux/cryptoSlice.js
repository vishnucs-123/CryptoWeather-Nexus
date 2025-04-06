// src/redux/cryptoSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for API Call
export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async () => {
    const apiUrl = process.env.NEXT_PUBLIC_CRYPTO_API_URL;

    const response = await axios.get(
      `${apiUrl}?vs_currency=usd&ids=bitcoin,ethereum,solana`
    );

    return response.data;
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCryptoData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCryptoData } = cryptoSlice.actions;
export default cryptoSlice.reducer;
