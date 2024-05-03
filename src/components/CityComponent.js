import React from "react";
import "./CityComponent.css";

const CityComponent = (props) => {
  const {
    updateCity,
    fetchWeatherByCity,
    setLatitude,
    setLongitude,
  } = props;

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      {/* <span>Find Weather of your city</span> */}
      <form onSubmit={fetchWeatherByCity}>
        <input
          onChange={(e) => updateCity(e.target.value)}
          placeholder="Find weather of your city"
        />
        <button type={"submit"}>Search</button>
      </form>
      <img src={"icons/perfect-day.svg"} alt="weather_image" />
      <button className="btn" onClick={getLocation}>
        Find Weather Near You
      </button>
    </>
  );
};
export default CityComponent;
