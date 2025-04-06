import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiRefreshCw } from 'react-icons/fi'; // Refresh Icon

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://newsdata.io/api/1/latest', {
        params: {
          apikey: 'pub_784796bc88a2fd704abc45ef04e20d9fb0275',
          country: 'in',
          language: 'en',
        },
      });
      setNews(response.data.results);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 to-indigo-900 py-10 px-6 text-white relative">
      
      {/* Heading with Refresh Icon */}
      <div className="flex justify-center items-center mb-10 relative">
        <h1 className="text-4xl font-extrabold text-center animate__animated animate__fadeIn">
          Latest News
        </h1>

        {/* Refresh Button */}
        <button
          onClick={fetchNews}
          className="absolute right-0 bg-white text-blue-700 p-2 rounded-full hover:rotate-180 transition-all duration-500"
          title="Refresh News"
        >
          <FiRefreshCw size={22} />
        </button>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {news.map((article) => (
            <div
              key={article.article_id}
              className="border border-white rounded-xl p-4 hover:scale-105 transition-all duration-300"
            >
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>

              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}

              <p className="text-sm text-gray-300">{article.description}</p>

              <a
                href={article.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-blue-300 hover:text-white underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
