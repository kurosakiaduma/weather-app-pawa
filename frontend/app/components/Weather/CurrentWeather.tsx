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
    <div className="weather-card flex flex-col items-center justify-center p-6 text-center mt-5">
      <WeatherIcon iconCode={iconCode} description={description} size="lg" />
      <h1 className="text-6xl font-bold mt-3 mb-2">{formatTemperature(temperature, unit)}</h1>
      <p className="text-xl capitalize text-gray-300 mb-4">{description}</p>
      <p className="text-gray-400 mb-1">{formatDate(timestamp)}</p>
      <p className="text-lg font-medium">{city}, {country}</p>
    </div>
  );
};

export default CurrentWeather;