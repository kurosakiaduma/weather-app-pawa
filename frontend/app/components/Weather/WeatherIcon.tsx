import React from 'react';
import Image from 'next/image';

interface WeatherIconProps {
  iconCode: string;
  description: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Component for displaying weather icons
 */
const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, description, size = 'md' }) => {
  const sizes = {
    sm: 50,
    md: 70,
    lg: 120,
  };
  
  const pixelSize = sizes[size];
  
  return (
    <div className="weather-icon">
      <Image
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt={description}
        width={pixelSize}
        height={pixelSize}
      />
    </div>
  );
};

export default WeatherIcon;