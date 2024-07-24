import React, { useState } from "react";
import { Weather, weatherData } from "../../data/weatherData";
import WeatherCard from "../WeatherCard";
import "./index.css";

type temperatureUnit = "C" | "F";

const WeatherList: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [data, setData] = useState(weatherData);
  const [unit, setUnit] = useState<temperatureUnit>("C");
  const [search, setSearch] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleUnitChange = () => {
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const handleAddFavorite = (cityId: number) => {
    setFavorites((prevFavorites) => new Set(prevFavorites).add(cityId));
    console.log(favorites);
  };

  const handleRemoveFavorite = (cityId: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      newFavorites.delete(cityId);
      return newFavorites;
    });
    console.log(favorites);
  };

  console.log(data);

  return (
    <div
      className="layout-column align-items-center justify-content-start weather-list"
      data-testid="weather-list"
    >
      <h3>Dashboard</h3>
      <p className="city-details">
        Search for Current Temperature in cities like: New York, London, Paris
        etc.
      </p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            onChange={(e) => handleSearch(e)}
            value={search || ""}
            data-testid="search-input"
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {search.length !== 0 &&
              data
                .filter((city) =>
                  city.city.toLowerCase().includes(search.toLowerCase()),
                )
                .map((city) => (
                  <WeatherCard
                    key={city.id}
                    weather={city}
                    onAddFavorite={() => handleAddFavorite(city.id)}
                    onRemoveFavorite={() => handleRemoveFavorite(city.id)}
                    unit={unit}
                    isFavorite={favorites.has(city.id)}
                  />
                ))}
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button
            onClick={handleUnitChange}
            data-testid="unit-change-button"
            className="outlined"
          >
            Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((city) => favorites.has(city.id))
              .map((city) => (
                <>
                  <WeatherCard
                    key={`${city.id}-fav`}
                    weather={city}
                    onAddFavorite={() => handleAddFavorite(city.id)}
                    onRemoveFavorite={() => handleRemoveFavorite(city.id)}
                    unit={unit}
                    isFavorite={true}
                  />
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
