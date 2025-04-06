import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';

const CryptoList = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
            },
          }
        );
        setCoins(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

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
      <Typography className="text-4xl font-extrabold text-center mb-10 animate__animated animate__fadeIn">
        Cryptocurrency Market
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {coins.map((coin) => (
          <Grid item xs={12} sm={6} md={4} key={coin.id}>
            <Box className="border border-white rounded-xl p-4 hover:scale-105 transition-all duration-300">
              <Typography className="text-2xl font-bold">{coin.name}</Typography>

              <Typography className="text-sm text-gray-300">
                Symbol: {coin.symbol.toUpperCase()}
              </Typography>

              <Typography className="text-lg font-semibold mt-1">
                ${coin.current_price.toFixed(2)}
              </Typography>

              <Typography
                className={`${
                  coin.price_change_percentage_24h > 0
                    ? 'text-green-400'
                    : 'text-red-400'
                } mt-1`}
              >
                24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
              </Typography>

              <Typography className="text-sm font-medium mt-1">
                Market Cap: ${coin.market_cap.toLocaleString()}
              </Typography>

              <Link href={`/crypto/${coin.id}`} passHref>
                <Button
                  variant="contained"
                  className="mt-3 bg-white text-black hover:bg-gray-300 transition-all"
                  fullWidth
                >
                  View Details
                </Button>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CryptoList;
