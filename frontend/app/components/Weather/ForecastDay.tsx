import React from 'react';
import WeatherIcon from './WeatherIcon';
import { formatTemperature } from '../../utils/tempConverter';
import { getDayName } from '../../utils/dateFormatter';

interface ForecastDayProps {
  timestamp: number;
  temperature: number;
  iconCode: string;
  description: string;
  unit: 'C' | 'F';
}

/**
 * Component for displaying a single forecast day
 */
const ForecastDay: React.FC<ForecastDayProps> = ({
  timestamp,
  temperature,
  iconCode,
  description,
  unit,
}) => {
  return (
    <div className="forecast-day">
      <p className="font-medium mb-1">{getDayName(timestamp)}</p>
      <WeatherIcon iconCode={iconCode} description={description} size="sm" />
      <p className="text-lg font-bold mt-2">{formatTemperature(temperature, unit)}</p>
    </div>
  );
};

export default ForecastDay;