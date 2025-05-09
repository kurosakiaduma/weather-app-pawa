import { WeatherData } from '../interfaces/WeatherData';

/**
 * API service for weather data
 */
export const WeatherService = {
    /**
     * Fetch weather data for a city
     * @param city Name of the city
     * @returns Promise with weather data
     */
    async getWeatherByCity(city: string): Promise<WeatherData> {
      try {
        // Fetch from our backend API
        const response = await fetch(`${process.env.BACKEND_API_URL}/api/weather?city=${encodeURIComponent(city)}`);
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
        throw error;
      }
    }
  };
  