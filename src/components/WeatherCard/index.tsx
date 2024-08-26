import React from 'react';
import { Weather } from '../../data/weatherData';

interface WeatherCardProps {
  weather: Weather;
  unit: 'C' | 'F';
  onAddFavorite: (cityId: number) => void;
  onRemoveFavorite: (cityId: number) => void;
  isFavorite: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  unit,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {

  const handleFavoriteClick = () => {
    if (isFavorite) {
      console.log('handling is favorite')
      onRemoveFavorite(weather.id)
    } else {
      console.log('handling isn"t favorite')
      console.log(weather.id)
      onAddFavorite(weather.id)
    }
  };

  let convertedTemp = weather.temperature

  const celciusToFahrenheit = (degrees: number) => {
    return degrees * (9/5) + 32;
  }

  if (unit === "F") {
    convertedTemp = celciusToFahrenheit(weather.temperature)
  }

  return (
    <tr className="weather-card" data-testid={`weather-card-${weather.id}`}>
      <td>{weather.city}</td>
      <td>{`${convertedTemp.toFixed(1)}°${unit}`}</td>
      <td>{weather.description}</td>
      <td>
        <button onClick={handleFavoriteClick} data-testid={`weather-card-action-${weather.id}`}>
          {!isFavorite ? "Add to favorites" : "Remove from favorites"}
        </button>
      </td>
    </tr>
  );
};

export default WeatherCard;

