import axios from 'axios'

const API_KEY = 'pub_784799c95aa4ab4f3a22b243d29db1b5c848d'
const BASE_URL = 'https://newsdata.io/api/1/news'

export const fetchNewsData = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        q: 'cryptocurrency',
        language: 'en',
        category: 'business',
      },
    })
    return response.data.results.slice(0, 5)  // Top 5 News
  } catch (error) {
    console.error('News API Error:', error)
    throw error
  }
}
