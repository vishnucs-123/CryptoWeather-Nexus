import axios from 'axios'

const BASE_URL = 'https://api.coingecko.com/api/v3'

const cryptos = ['bitcoin', 'ethereum', 'dogecoin']

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: cryptos.join(','),
      },
    })
    return response.data
  } catch (error) {
    console.error('Crypto API Error:', error)
    throw error
  }
}
