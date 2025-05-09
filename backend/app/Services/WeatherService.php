<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WeatherService
{
    /**
     * The base URL for OpenWeatherMap API.
     */
    protected string $baseUrl = 'https://api.openweathermap.org/';

    /**
     * OpenWeatherMap API key.
     */
    protected string $apiKey;

    /**
     * Create a new service instance.
     */
    public function __construct()
    {
        $this->apiKey = config('services.openweathermap.key');

        if (empty($this->apiKey)) {
            Log::error('OpenWeatherMap API key is not set');
            throw new \RuntimeException('OpenWeatherMap API key is not set.');
        }

        Log::info('WeatherService initialized with API key');
    }

    /**
     * Get coordinates for a city using Geocoding API.
     *
     * @param string $city
     * @return array|null
     */
    public function getCoordinates(string $city): ?array
    {
        try {
            $url = $this->baseUrl . 'geo/1.0/direct';
            Log::info("Making Geocoding API request", [
                'url' => $url,
                'city' => $city
            ]);

            $response = Http::get($url, [
                'q' => $city,
                'limit' => 1,
                'appid' => $this->apiKey,
            ]);

            Log::info("Geocoding API response received", [
                'status' => $response->status(),
                'headers' => $response->headers(),
            ]);

            if (!$response->successful() || empty($response->json())) {
                Log::error('Failed to get coordinates for city', [
                    'city' => $city,
                    'status' => $response->status(),
                    'response' => $response->body(),
                ]);
                return null;
            }

            $data = $response->json()[0];
            Log::info("Coordinates found for city", [
                'city' => $city,
                'lat' => $data['lat'],
                'lon' => $data['lon'],
                'country' => $data['country'] ?? 'Unknown'
            ]);

            return [
                'lat' => $data['lat'],
                'lon' => $data['lon'],
                'country' => $data['country'] ?? 'Unknown',
            ];
        } catch (\Exception $e) {
            Log::error('Exception while getting coordinates', [
                'city' => $city,
                'exception' => get_class($e),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return null;
        }
    }

    /**
     * Get weather data by coordinates.
     *
     * @param float $lat
     * @param float $lon
     * @param string $cityName
     * @param string $countryCode
     * @return array
     */
    public function getWeatherByCoordinates(float $lat, float $lon, string $cityName, string $countryCode): array
    {
        try {
            $url = $this->baseUrl . 'data/3.0/onecall';
            Log::info("Making Weather API request", [
                'url' => $url,
                'lat' => $lat,
                'lon' => $lon
            ]);

            $response = Http::get($url, [
                'lat' => $lat,
                'lon' => $lon,
                'exclude' => 'minutely,hourly,alerts',
                'units' => 'metric', // Using metric units (Celsius)
                'appid' => $this->apiKey,
            ]);

            Log::info("Weather API response received", [
                'status' => $response->status(),
                'headers' => $response->headers(),
            ]);

            if (!$response->successful()) {
                Log::error('Failed to get weather data', [
                    'city' => $cityName,
                    'lat' => $lat,
                    'lon' => $lon,
                    'status' => $response->status(),
                    'response' => $response->body(),
                ]);
                throw new \Exception('Failed to get weather data from OpenWeatherMap');
            }

            $weatherData = $response->json();

            // Add city and country information to the response
            $weatherData['city'] = $cityName;
            $weatherData['country'] = $countryCode;

            Log::info("Weather data processed successfully", [
                'city' => $cityName,
                'country' => $countryCode,
                'temp' => $weatherData['current']['temp'] ?? 'N/A',
                'weather' => $weatherData['current']['weather'][0]['description'] ?? 'N/A',
            ]);

            return $weatherData;
        } catch (\Exception $e) {
            Log::error('Exception while getting weather data', [
                'city' => $cityName,
                'lat' => $lat,
                'lon' => $lon,
                'exception' => get_class($e),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
}