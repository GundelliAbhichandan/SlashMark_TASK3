import React, { useState, useEffect } from 'react';

const WeatherForecast = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'bd5e378503939ddaee76f12ad7a97608';

  const fetchWeatherData = async () => {
    try {
      let url;
      if (location.trim() !== '') {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            setWeatherData(data);
          });
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }

      if (url) {
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error fetching weather data: ', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); // This will run fetchWeatherData on component mount

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h2>Weather Forecast</h2>
          <p>Location: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
