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

  const handleFavoriteClick = () => {};

  return (
    <tr className="weather-card" data-testid={`weather-card-${weather.id}`}>
      <td>Moscow</td>
      <td>5°C</td>
      <td>Snowy</td>
      <td>
        <button onClick={handleFavoriteClick} data-testid={`weather-card-action-${weather.id}`}>
          Add to favorites
        </button>
      </td>
    </tr>
  );
};

export default WeatherCard;

