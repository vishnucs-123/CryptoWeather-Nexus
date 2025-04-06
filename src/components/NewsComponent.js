// src/components/NewsComponent.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsData } from '../redux/newsSlice';

const NewsComponent = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNewsData()); // initial fetch

    const interval = setInterval(() => {
      dispatch(fetchNewsData());
    }, 2 * 60 * 1000); // every 2 minutes

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error fetching news: {error}</p>;

  return (
    <div>
      <h2>Latest Crypto News</h2>
      {data.slice(0, 5).map((article, index) => (
        <div key={index}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default NewsComponent;
