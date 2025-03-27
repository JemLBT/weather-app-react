import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>
            <strong>Description: </strong>
            {weather.description}
          </li>
          <li>
            <strong>Temperature: </strong>
            {Math.round(weather.temperature)}°C
          </li>
          <li>
            <strong>Humidity: </strong>
            {Math.round(weather.humidity)}%
          </li>
          <li>
            <strong>Wind: </strong>
            {Math.round(weather.wind)}km/hr
          </li>
          <li>
            <img src={weather.icon} alt="Weather Icon" width="200" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
