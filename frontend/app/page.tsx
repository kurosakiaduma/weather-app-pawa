'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { WeatherService } from './services/weatherApi';
import { WeatherData } from './interfaces/WeatherData';
import SearchCity from './components/Weather/SearchCity';
import CurrentWeather from './components/Weather/CurrentWeather';
import WeatherForecast from './components/Weather/WeatherForecast';
import WeatherStats from './components/Weather/WeatherStats';
import TemperatureToggle from './components/UI/TemperatureToggle';
import Header from './components/Header';
import Footer from './components/Footer';

const Home = () => {
  // State variables
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  
  // Default city on first load
  useEffect(() => {
    handleCitySearch('Nairobi');
  }, []);

  // Handle city search
  const handleCitySearch = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await WeatherService.getWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather forecast application" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Header />

      <main className="container px-4 py-6 mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <SearchCity onSearch={handleCitySearch} isLoading={loading} />
          <TemperatureToggle unit={unit} onChange={setUnit} />
        </div>
        
        {error && (
          <div className="bg-red-900 border border-red-700 text-white px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {loading && !weatherData && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <CurrentWeather
                temperature={weatherData.current.temp}
                description={weatherData.current.weather[0].description}
                iconCode={weatherData.current.weather[0].icon}
                city={weatherData.city}
                country={weatherData.country}
                timestamp={weatherData.current.dt}
                unit={unit}
              />
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">3-Day Forecast</h2>
              <WeatherForecast 
                forecast={weatherData.daily.slice(1, 4)} 
                unit={unit}
              />
              
              <h2 className="text-xl font-semibold mt-6 mb-4">Weather Details</h2>
              <WeatherStats
                windSpeed={weatherData.current.wind_speed}
                humidity={weatherData.current.humidity}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;