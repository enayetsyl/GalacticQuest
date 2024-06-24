// src/components/APOD.js
import React, { useState, useEffect } from 'react';
import { fetchAPOD } from '../../services/apiServices';

const APOD = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(apodData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPOD('2023-06-21'); 
        setApodData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="apod-container">
      {apodData && (
        <>
          <h1>{apodData.title}</h1>
          <p>{apodData.date}</p>
          <img src={apodData.url} alt={apodData.title} />
          <p>{apodData.explanation}</p>
        </>
      )}
    </div>
  );
};

export default APOD;
