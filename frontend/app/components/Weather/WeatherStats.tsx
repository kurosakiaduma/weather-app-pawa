import React from 'react';

interface WeatherStatsProps {
  windSpeed: number;
  humidity: number;
  windDeg?: number; 
}

/**
 * Get wind direction (N, NE, E, etc.) from degrees
 * @param degrees Wind direction in degrees
 * @returns Wind direction abbreviation
 */
const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Component for displaying weather statistics
 */
const WeatherStats: React.FC<WeatherStatsProps> = ({ windSpeed, humidity, windDeg = 0 }) => {
  const humidityPercentage = `${humidity}%`;
  const windDirection = getWindDirection(windDeg);
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="weather-card p-4">
        <h3 className="text-sm mb-2">Wind Status</h3>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-medium">{windSpeed} km/h</p>
          <div className="flex items-center mt-4">
            <div 
              className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center mr-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                style={{ transform: `rotate(${windDeg}deg)` }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 15l7-7m0 0l7 7" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v8" 
                />
              </svg>
            </div>
            <span className="text-lg font-medium">{windDirection}</span>
          </div>
        </div>
      </div>
      
      <div className="weather-card p-4">
        <h3 className="text-sm mb-2">Humidity</h3>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-medium">{humidity}%</p>
          <div className="w-full mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: humidityPercentage }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherStats;