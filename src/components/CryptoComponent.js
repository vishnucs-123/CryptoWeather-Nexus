// src/components/CryptoComponent.js

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData } from '../redux/cryptoSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CryptoComponent = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.crypto);

  const prevData = useRef([]);

  useEffect(() => {
    dispatch(fetchCryptoData());

    const interval = setInterval(() => {
      dispatch(fetchCryptoData());
    }, 15000); // update every 15s

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (prevData.current.length && data.length) {
      data.forEach((coin, index) => {
        const prev = prevData.current[index];
        if (prev && coin.current_price) {
          const diff = coin.current_price - prev.current_price;
          const percent = (diff / prev.current_price) * 100;
          if (Math.abs(percent) >= 2) {
            toast.info(`${coin.name} price changed by ${percent.toFixed(2)}%`, {
              position: 'top-right',
              autoClose: 5000,
            });
          }
        }
      });
    }
    prevData.current = data;
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Cryptocurrency Prices <span className="text-red-500 animate-pulse text-sm ml-2">🔴 Live</span></h2>
      <ToastContainer />
      {data.map((coin) => (
        <div key={coin.id}>
          <h3>{coin.name}</h3>
          <p>Price: ${coin.current_price}</p>
        </div>
      ))}
    </div>
  );
};

export default CryptoComponent;
