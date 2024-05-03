import React from "react";
import { WeatherIcons } from "../App";
import "./WeatherComponent.css";

export const WeatherInfoIcons = {
  sunset: "icons/temp.svg",
  sunrise: "icons/temp.svg",
  humidity: "icons/humidity.svg",
  wind: "icons/wind.svg",
  pressure: "icons/pressure.svg",
};

const WeatherInfoComponent = (props) => {
  const { name, value } = props;
  return (
    <div className="weatherInfoContainer">
      <img
        src={WeatherInfoIcons[name]}
        className="weatherInfoIcon"
        alt="weather_icon"
      />
      <span className="infoLabel">
        {value}
        <span>{name}</span>
      </span>
    </div>
  );
};
const WeatherComponent = (props) => {
  const { weather } = props;
  const isDay = weather?.weather[0].icon?.includes("d");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  return (
    <>
      <div className="container_weather">
        <span className="condition">
          <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
          {`  |  ${weather?.weather[0].description}`}
        </span>
        <img
          className="weather_icon"
          src={WeatherIcons[weather?.weather[0].icon]}
          alt="weather_icon"
        />
      </div>
      <span className="location">{`${weather?.name}, ${weather?.sys?.country}`}</span>

      <span className="weatherInfoLabel">Weather Info</span>
      <div className="info_conatiner">
        <WeatherInfoComponent
          name={isDay ? "sunset" : "sunrise"}
          value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}
        />
        <WeatherInfoComponent
          name={"humidity"}
          value={weather?.main?.humidity}
        />
        <WeatherInfoComponent name={"wind"} value={weather?.wind?.speed} />
        <WeatherInfoComponent
          name={"pressure"}
          value={weather?.main?.pressure}
        />
      </div>
    </>
  );
};

export default WeatherComponent;
