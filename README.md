# 🌐 Crypto-Weather-Nexus

A modern, responsive Next.js application that provides:

- 🌤️ Real-time **Weather Updates**
- 💰 Latest **Cryptocurrency Prices**
- 📰 Trending **Global News**
- ❤️ Favourite Cities Feature

---

## 🚀 Live Preview

[🔗 Visit the App](https://your-live-deployment-url.com)

---

## 📸 Screenshots

<img src="public/screenshots/dashboard.png" alt="Dashboard Screenshot" width="600" />
<img src="public/screenshots/weather.png" alt="Weather Screenshot" width="600" />
<img src="public/screenshots/crypto.png" alt="Crypto Screenshot" width="600" />
<img src="public/screenshots/news.png" alt="News Screenshot" width="600" />

---

## 🛠️ Tech Stack

- ⚛️ React.js with Next.js (Frontend & Routing)
- 🌐 OpenWeather API for weather data
- 🪙 CoinGecko / CoinCap API for crypto info
- 🗞️ NewsAPI for latest news
- 🎨 Tailwind CSS + MUI for styling
- 💾 LocalStorage for saving favourites
- 🔐 Environment Variables for API keys


---

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/crypto-weather-nexus.git
cd crypto-weather-nexus
---
2. **Install Dependencies**
```bash
npm install
---
3. **Set Up Environment Variables**
Create a .env.local file in the root directory and add the following:
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
NEXT_PUBLIC_CRYPTO_API_URL=https://api.coingecko.com/api/v3/
---
4. **Run Development Server
npm run dev
