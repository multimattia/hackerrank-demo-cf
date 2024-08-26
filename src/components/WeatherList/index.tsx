import React, { useState } from 'react';
import { Weather, weatherData } from '../../data/weatherData';
import WeatherCard from '../WeatherCard';
import "./index.css";

type TemperatureUnit = "C" | "F";

const WeatherList: React.FC = () => {


  const [search, setSearch] = useState("")
  const [data, setData] = useState(weatherData);
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [unit, setUnit] = useState<TemperatureUnit>("C");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearch("")
   };

  const handleUnitChange = () => {
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const handleAddFavorite = (cityId: number) => {
    setFavorites((prevFavorites) =>
      new Set(prevFavorites).add(cityId)
    );
  };

  const handleRemoveFavorite = (cityId: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      newFavorites.delete(cityId);
      return newFavorites
    })
   };

  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            onChange={handleSearch}
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
          data.filter((city) => city.city.toLowerCase().includes(search.toLowerCase()))
          .map((item) =>
            <WeatherCard
              key={item.id}
              weather={item}
              unit={unit}
              onAddFavorite={() => handleAddFavorite(item.id)}
              onRemoveFavorite={() => handleRemoveFavorite(item.id)}
              isFavorite={favorites.has(item.id)}
            />
          )}
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={handleUnitChange} data-testid="unit-change-button" className="outlined">
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
          {data.filter((city) => favorites.has(city.id))
          .reverse()
          .map((city) =>
          <WeatherCard
          key={city.id}
          weather={city}
          onAddFavorite={() => handleAddFavorite(city.id)}
          onRemoveFavorite={() => handleRemoveFavorite(city.id)}
          unit={unit}
          isFavorite={true}
          />
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
