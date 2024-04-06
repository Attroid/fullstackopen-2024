import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    weatherService.getByQuery(props.query).then((data) => {
      setWeatherData(data);
    });
  }, [props.query]);

  if (weatherData === null) {
    return "Loading weather data...";
  }

  const temp = weatherData.main.temp - 273.15;

  return (
    <div>
      <h3>Weather in {props.query}</h3>
      <p>temperature {temp.toFixed(2)} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
      />
      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
