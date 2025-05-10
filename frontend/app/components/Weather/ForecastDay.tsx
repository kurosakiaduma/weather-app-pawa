import React from 'react';
import { ArrowUp, ArrowDown, Calendar } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { formatTemperature } from '../../utils/tempConverter';
import { getDayName } from '../../utils/dateFormatter';

interface ForecastDayProps {
  timestamp: number;
  temperature: number;
  iconCode: string;
  description: string;
  unit: 'C' | 'F';
  minTemp?: number;
  maxTemp?: number;
  pop?: number; // Probability of precipitation
}

/**
 * Enhanced component for displaying a single forecast day with additional details
 */
const ForecastDay: React.FC<ForecastDayProps> = ({
  timestamp,
  temperature,
  iconCode,
  description,
  unit,
  minTemp,
  maxTemp,
  pop = 0, // Default to 0% if not provided
}) => {
  // Convert description to title case
  const capitalizedDescription = description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return (
    <div className="forecast-day p-4 rounded-lg hover:transform hover:scale-105 transition-all duration-300 relative">
      {/* Day badge */}
      <div className="flex justify-center items-center mb-2">
        <Calendar className="h-4 w-4 mr-1" />
        <p className="font-medium">{getDayName(timestamp)}</p>
      </div>
      
      {/* Weather icon */}
      <div className="flex justify-center">
        <WeatherIcon iconCode={iconCode} description={description} size="sm" />
      </div>
      
      {/* Temperature */}
      <p className="text-xl font-bold mt-2 text-center">{formatTemperature(temperature, unit)}</p>
      
      {/* Min/Max temperatures - only display if provided */}
      {(minTemp !== undefined && maxTemp !== undefined) && (
        <div className="flex justify-center gap-4 mt-2 text-sm">
          <div className="flex items-center text-blue-400">
            <ArrowDown className="h-3 w-3 mr-1" />
            <span>{formatTemperature(minTemp, unit)}</span>
          </div>
          <div className="flex items-center text-red-400">
            <ArrowUp className="h-3 w-3 mr-1" />
            <span>{formatTemperature(maxTemp, unit)}</span>
          </div>
        </div>
      )}
      
      {/* Weather description */}
      <p className="text-xs text-center mt-2">{capitalizedDescription}</p>
      
      {/* Precipitation probability - only show if greater than 0 */}
      {pop > 0 && (
        <div className="mt-3 text-center">
          <div 
            className={`text-xs inline-flex items-center px-2 py-1 rounded-full ${
              pop < 30 ? 'bg-blue-900 text-blue-200' :
              pop < 60 ? 'bg-blue-800 text-blue-100' :
              'bg-blue-700 text-white'
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14.5l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
            {Math.round(pop * 100)}% chance
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastDay;