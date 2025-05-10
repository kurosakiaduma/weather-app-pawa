import React from 'react';
import { Wind, Droplets, Compass, Info, AlertTriangle, CheckCircle } from 'lucide-react';

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
 * Get wind status description based on wind speed
 * @param speed Wind speed in km/h
 * @returns Description and severity level
 */
const getWindStatus = (speed: number): { description: string; severity: 'low' | 'moderate' | 'high' } => {
  if (speed < 5) {
    return { 
      description: 'Calm to Light Air: Smoke rises vertically or drifts slightly. Leaves barely move.',
      severity: 'low'
    };
  } else if (speed < 12) {
    return { 
      description: 'Light Breeze: You can feel wind on your face. Leaves rustle and small twigs move.',
      severity: 'low'
    };
  } else if (speed < 20) {
    return { 
      description: 'Gentle to Moderate Breeze: Small branches move. Dust and loose paper may be raised.',
      severity: 'moderate'
    };
  } else if (speed < 30) {
    return { 
      description: 'Fresh to Strong Breeze: Small trees begin to sway. May be uncomfortable for walking.',
      severity: 'moderate'
    };
  } else if (speed < 40) {
    return { 
      description: 'Near Gale: Whole trees in motion. Effort needed to walk against the wind.',
      severity: 'high'
    };
  } else {
    return { 
      description: 'Gale or Higher: Twigs break off trees. Progress on foot is seriously impeded.',
      severity: 'high'
    };
  }
};

/**
 * Get humidity status description
 * @param humidity Humidity percentage
 * @returns Description and comfort level
 */
const getHumidityStatus = (humidity: number): { description: string; comfort: 'comfortable' | 'moderate' | 'uncomfortable' } => {
  if (humidity < 30) {
    return { 
      description: 'Low Humidity: Air feels dry which can cause dry skin, static electricity, and respiratory discomfort.',
      comfort: 'moderate'
    };
  } else if (humidity < 60) {
    return { 
      description: 'Comfortable Humidity: Ideal range for human comfort and respiratory health.',
      comfort: 'comfortable'
    };
  } else if (humidity < 80) {
    return { 
      description: 'Moderately High Humidity: Air begins to feel sticky or muggy. Can be uncomfortable in warmer weather.',
      comfort: 'moderate'
    };
  } else {
    return { 
      description: 'Very High Humidity: Air feels very moist and oppressive. Can make hot weather feel hotter due to reduced evaporation.',
      comfort: 'uncomfortable'
    };
  }
};

/**
 * Component for displaying weather statistics with flip cards
 */
const WeatherStats: React.FC<WeatherStatsProps> = ({ windSpeed, humidity, windDeg = 0 }) => {
  const windDirection = getWindDirection(windDeg);
  const windStatus = getWindStatus(windSpeed);
  const humidityStatus = getHumidityStatus(humidity);
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Wind Status Card */}
      <div className="weather-card flip-card h-64">
        <div className="flip-card-inner">
          {/* Front of card */}
          <div className="flip-card-front p-4 rounded flex flex-col items-center justify-center">
            <h4 className="text-sm mb-3 flex items-center">
              <Wind className="mr-1 h-4 w-4" />
              Wind Status
            </h4>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-medium">{windSpeed} km/h</p>
              <div className="flex items-center mt-4">
                <div 
                  className="h-8 w-8 bg-black rounded-full flex items-center justify-center mr-2"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-white" 
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
                      d="M12 8v16" 
                    />
                  </svg>
                </div>
                <span className="text-lg font-medium">{windDirection}</span>
              </div>
              <div className="flex items-center mt-4">
                <p className="text-xs text-center flex gap-1 items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span>Tap or hover for details</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Back of card with additional info */}
          <div className="flip-card-back p-4 rounded flex flex-col">
            <h4 className="text-sm mb-3 flex items-center justify-center">
              <Compass className="mr-1 h-4 w-4" />
              Wind Details
            </h4>
            <hr className='w-5 self-center'/>
            
            <div className="flex-1 flex flex-col justify-between mt-4">
              <div>
                <div className="flex justify-center items-center mt-2">
                  {windStatus.severity === 'low' && (
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <p className="text-sm font-medium">Mild Conditions</p>
                    </div>
                  )}
                  {windStatus.severity === 'moderate' && (
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                      <p className="text-sm font-medium">Moderate Conditions</p>
                    </div>
                  )}
                  {windStatus.severity === 'high' && (
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <p className="text-sm font-medium">Strong Winds</p>
                    </div>
                  )}
                </div>
                <p className="text-xs leading-tight mt-4">{windStatus.description}</p>
              </div>
              
              <div className="pt-3 border-t border-gray-700 mt-2">
                <p className="text-xs font-medium">Direction: {windDirection}</p>
                <p className="text-xs mt-1 leading-tight">
                  {/* More descriptive wind direction components */}
                  {windDirection.includes('N') && windDirection.includes('S') ? 
                  'Variable N-S component' : 
                  windDirection.includes('N') ? 'From the North' : 
                  windDirection.includes('S') ? 'From the South' : ''}
                  
                  {windDirection.includes('E') && windDirection.includes('W') ? 
                  ' with variable E-W component' : 
                  windDirection.includes('E') ? ' with Easterly component' : 
                  windDirection.includes('W') ? ' with Westerly component' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Humidity Card */}
      <div className="weather-card flip-card h-64">
        <div className="flip-card-inner">
          {/* Front of card */}
          <div className="flip-card-front p-4 rounded flex flex-col items-center justify-center">
            <h4 className="text-sm mb-3 flex items-center">
              <Droplets className="mr-1 h-4 w-4" />
              Humidity
            </h4>
            <div className="flex flex-col items-center w-full">
              <p className="text-3xl font-medium">{humidity}%</p>
              <div className="w-full mt-4">
                <div className="w-full rounded-full h-2.5 bg-gray-700">
                  <div 
                    className={`h-2.5 rounded-full ${
                      humidity < 30 ? 'bg-blue-400' : 
                      humidity < 60 ? 'bg-green-500' : 
                      humidity < 80 ? 'bg-yellow-400' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${humidity}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <p className="text-xs text-center  flex gap-1 items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span>Tap or hover for details</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Back of card with additional info */}
          <div className="flip-card-back p-4 rounded flex flex-col">
            <h4 className="text-sm mb-3 flex items-center justify-center">
              <Droplets className="mr-1 h-4 w-4" />
              Humidity Details
            </h4>
            <hr className='w-5 self-center'/>

            
            <div className="flex-1 flex flex-col justify-between mt-4">
              <div>
                <div className="flex justify-center items-center mt-2">
                  {humidityStatus.comfort === 'comfortable' && (
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <p className="text-sm font-medium">Comfortable</p>
                    </div>
                  )}
                  {humidityStatus.comfort === 'moderate' && (
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                      <p className="text-sm font-medium">Moderately Comfortable</p>
                    </div>
                  )}
                  {humidityStatus.comfort === 'uncomfortable' && (
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <p className="text-sm font-medium">Uncomfortable</p>
                    </div>
                  )}
                </div>
                <p className="text-xs leading-tight mt-4">{humidityStatus.description}</p>
              </div>
              
              <div className="pt-3 border-t border-gray-700 mt-3">
                <p className="text-xs font-medium">Health Impact:</p>
                <p className="text-xs mt-1 leading-tight">
                  {humidity < 30 && 'May cause dry skin and respiratory irritation.'}
                  {humidity >= 30 && humidity < 60 && 'Optimal for respiratory health and comfort.'}
                  {humidity >= 60 && humidity < 80 && 'May cause slight discomfort in warm weather.'}
                  {humidity >= 80 && 'Can contribute to heat stress and discomfort.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherStats;