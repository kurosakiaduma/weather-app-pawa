/**
 * Interface for Weather data from backend API
 */
export interface WeatherData {
    current: {
      temp: number;
      humidity: number;
      wind_speed: number;
      weather: {
        description: string;
        icon: string;
      }[];
      dt: number; // timestamp
    };
    daily: {
      dt: number; // timestamp
      temp: {
        day: number;
      };
      weather: {
        description: string;
        icon: string;
      }[];
    }[];
    city: string;
    country: string;
  }
  