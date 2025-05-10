import React from 'react';
import { MapPin, Calendar, Sunrise, Sunset } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { formatTemperature } from '../../utils/tempConverter';
import { formatDate } from '../../utils/dateFormatter';
import { titleCase } from '../../utils/titleCaseFormatter';

interface CurrentWeatherProps {
  temperature: number;
  description: string;
  iconCode: string;
  city: string;
  country: string;
  timestamp: number;
  unit: 'C' | 'F';
  feelsLike?: number;
  sunrise?: number;
  sunset?: number;
}

/**
 * Enhanced component for displaying current weather with additional details
 */
const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temperature,
  description,
  iconCode,
  city,
  country,
  timestamp,
  unit,
  sunrise,
  sunset,
}) => {
  
  // Convert description to title case
  const capitalizedDescription = description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return (
    <div className="weather-card flex flex-col items-center justify-center p-6 text-center mt-1 rounded-lg relative overflow-hidden">
      {/* Weather condition badge */}
      <div className="absolute top-0 right-0">
        <div className={`py-1 px-3 text-xs font-medium rounded-bl-lg ${
          description.includes('rain') || description.includes('drizzle') ? 'bg-blue-500' :
          description.includes('cloud') ? 'bg-gray-500' :
          description.includes('clear') ? 'bg-amber-500' :
          description.includes('snow') ? 'bg-indigo-200 text-indigo-800' :
          description.includes('thunder') ? 'bg-purple-600' :
          description.includes('fog') || description.includes('mist') ? 'bg-gray-400' :
          'bg-gray-600'
        }`}>
          {capitalizedDescription}
        </div>
      </div>
      
      <div className="mb-2">
        <WeatherIcon iconCode={iconCode} description={description} size="lg" />
      </div>
      
      <h1 className="text-6xl font-bold mb-2">{formatTemperature(temperature, unit)}</h1>
      
      {/* Date with calendar icon */}
      <div className="flex items-center mb-1 text-sm">
        <Calendar className="h-4 w-4 mr-1" />
        <p>{formatDate(timestamp)}</p>
      </div>
      
      {/* Location with pin icon */}
      <div className="flex items-center text-lg font-medium">
        <MapPin className="h-5 w-5 mr-1" />
        <p>{titleCase(city)}, {country}</p>
      </div>
      
      {/* Sunrise/Sunset section - only show if provided */}
      {sunrise && sunset && (
        <div className="mt-4 pt-4 border-t border-gray-700 w-full grid grid-cols-2 gap-2">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Sunrise className="h-4 w-4 mr-1 text-amber-400" />
              <span className="text-xs">Sunrise</span>
            </div>
            <p className="text-sm">
              {new Date(sunrise * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Sunset className="h-4 w-4 mr-1 text-orange-500" />
              <span className="text-xs">Sunset</span>
            </div>
            <p className="text-sm">
              {new Date(sunset * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;