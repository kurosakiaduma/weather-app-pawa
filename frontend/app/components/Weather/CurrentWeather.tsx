import React from 'react';
import WeatherIcon from './WeatherIcon';
import { formatTemperature } from '../../utils/tempConverter';
import { formatDate } from '../../utils/dateFormatter';

interface CurrentWeatherProps {
  temperature: number;
  description: string;
  iconCode: string;
  city: string;
  country: string;
  timestamp: number;
  unit: 'C' | 'F';
}

/**
 * Component for displaying current weather
 */
const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temperature,
  description,
  iconCode,
  city,
  country,
  timestamp,
  unit,
}) => {
  return (
    <div className="weather-card current-weather">
      <WeatherIcon iconCode={iconCode} description={description} size="lg" />
      <h1 className="text-4xl font-bold mt-2">{formatTemperature(temperature, unit)}</h1>
      <p className="text-xl capitalize text-gray-300 mt-1">{description}</p>
      <div className="mt-4 text-center">
        <p className="text-gray-300">{formatDate(timestamp)}</p>
        <p className="text-lg mt-1">{city}, {country}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;