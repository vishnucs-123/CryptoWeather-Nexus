// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';

import weatherReducer from './weatherSlice';
import cryptoReducer from './cryptoSlice';
import newsReducer from './newsSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools in dev
});

export default store;
