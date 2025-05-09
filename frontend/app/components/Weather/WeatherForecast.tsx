import React from 'react';
import ForecastDay from './ForecastDay';

interface WeatherForecastProps {
  forecast: {
    dt: number;
    temp: { day: number };
    weather: { description: string; icon: string }[];
  }[];
  unit: 'C' | 'F';
}

/**
 * Component for displaying multiple days forecast
 */
const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, unit }) => {
  return (
    <div className="forecast-container">
      {forecast.slice(0, 3).map((day) => (
        <ForecastDay
          key={day.dt}
          timestamp={day.dt}
          temperature={day.temp.day}
          iconCode={day.weather[0].icon}
          description={day.weather[0].description}
          unit={unit}
        />
      ))}
    </div>
  );
};

export default WeatherForecast;