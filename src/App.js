import React, { useEffect, useState } from "react";
import axios from "axios";
import CityComponent from "./components/CityComponent";
import WeatherComponent from "./components/WeatherComponent";
import "./App.css";

export const WeatherIcons = {
  "01d": "icons/sunny.svg",
  "01n": "icons/night.svg",
  "02d": "icons/day.svg",
  "02n": "icons/cloudy-night.svg",
  "03d": "icons/cloudy.svg",
  "03n": "icons/cloudy.svg",
  "04d": "icons/perfect-day.svg",
  "04n": "icons/cloudy-night.svg",
  "09d": "icons/rain.svg",
  "09n": "icons/rain-night.svg",
  "10d": "icons/rain.svg",
  "10n": "icons/rain-night.svg",
  "11d": "icons/storm.svg",
  "11n": "icons/storm.svg",
  "50d": "icons/mist.svg",
  "50n": "icons/mist.svg",
};

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const ApiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeatherByCity = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`
      );
      if (response.status === 200) {
        updateWeather(response.data);
        setError(false);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    const fetchWeatherByLatLong = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ApiKey}`
        );
        if (response.status === 200) {
          updateWeather(response.data);
          setError(false);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };

    if (latitude !== null && longitude !== null) {
      fetchWeatherByLatLong();
    }
  }, [latitude, longitude]);
  return (
    <div className="container">
      <span className="title">ClimaCheck</span>
      {weather ? (
        <WeatherComponent weather={weather} />
      ) : (
        <CityComponent
          updateCity={updateCity}
          fetchWeatherByCity={fetchWeatherByCity}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
      )}
      {error && <span className="error">City Not Found...</span>}
    </div>
  );
}

export default App;
