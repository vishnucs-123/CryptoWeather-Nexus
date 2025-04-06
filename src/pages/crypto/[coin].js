import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Paper, Grid } from '@mui/material';

const CoinDetails = () => {
  const router = useRouter();
  const { coin } = router.query;
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (coin) {
      const fetchCoinData = async () => {
        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin}`
          );
          setCoinData(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCoinData();
    }
  }, [coin]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {coinData.name} Details
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Current Price</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              ${coinData.market_data.current_price.usd}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">24h Change</Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: coinData.market_data.price_change_percentage_24h > 0 ? 'green' : 'red',
              }}
            >
              {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Market Cap</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              ${coinData.market_data.market_cap.usd}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoinDetails;
