import React, { useState, useEffect } from 'react';

const Watchlist = () => {
  const [watchlistData, setWatchlistData] = useState({
    agePercent: 0,
    genderPercent: 0,
    totalCoverage: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setWatchlistData({
        agePercent: Math.random() * 100,
        genderPercent: Math.random() * 100,
        totalCoverage: Math.random() * 100,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Vaccination Watchlist</h2>
      <div>
        <p>Age Group Vaccination Coverage: {watchlistData.agePercent.toFixed(2)}%</p>
        <p>Gender Vaccination Coverage: {watchlistData.genderPercent.toFixed(2)}%</p>
        <p>Total Vaccination Coverage: {watchlistData.totalCoverage.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default Watchlist;
