// pages/dashboard.js
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <Box className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-900 py-10 px-4 text-white">
      <Typography className="text-3xl sm:text-4xl font-extrabold text-center mb-10 animate__animated animate__fadeInDown">
        Welcome to Crypto-Weather-Nexus Dashboard
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Reusable Card Component */}
        {[
          { title: 'Weather', desc: 'Get real-time weather updates of your city.', link: '/weather' },
          { title: 'Crypto', desc: 'View the latest cryptocurrency prices and trends.', link: '/crypto' },
          { title: 'News', desc: 'Stay updated with trending global news.', link: '/news' },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-500 animate__animated animate__fadeInUp"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h2>
            <p className="text-gray-600 mb-6">{item.desc}</p>
            <Link href={item.link}>
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(to right, #4f46e5, #3b82f6)',
                  color: 'white',
                  fontWeight: 600,
                  paddingY: 1.5,
                  paddingX: 3,
                  borderRadius: 2,
                  '&:hover': {
                    background: 'linear-gradient(to right, #6366f1, #60a5fa)',
                  },
                }}
              >
                Explore {item.title}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default Dashboard;
