// src/apiService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchAPOD = async (date) => {
  const response = await fetch(`${API_BASE_URL}/planetary/apod?api_key=${API_KEY}&date=${date}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchMarsRoverPhotos = async (rover, date) => {
  const response = await fetch(`${API_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos?api_key=${API_KEY}&earth_date=${date}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Add more functions for other APIs

export {
  fetchAPOD,
  fetchMarsRoverPhotos,
  // Export other API functions here
};
