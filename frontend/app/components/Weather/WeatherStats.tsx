import React from 'react';

interface WeatherStatsProps {
  windSpeed: number;
  humidity: number;
}

/**
 * Component for displaying weather statistics
 */
const WeatherStats: React.FC<WeatherStatsProps> = ({ windSpeed, humidity }) => {
  const roundedHumidity = Math.round(humidity / 5) * 5;
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="weather-card p-4">
        <h3 className="text-sm text-gray-300 mb-2">Wind Status</h3>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-medium">{windSpeed} km/h</p>
          <div className="mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="weather-card p-4">
        <h3 className="text-sm text-gray-300 mb-2">Humidity</h3>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-medium">{humidity}%</p>
          <div className="w-full mt-4">
            <div className="humidity-bar">
              <div 
                className="humidity-fill"
                data-humidity={roundedHumidity.toString()}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-400">
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