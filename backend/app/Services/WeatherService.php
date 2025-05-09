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
            throw new \RuntimeException('OpenWeatherMap API key is not set.');
        }
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
            $response = Http::get($this->baseUrl . 'geo/1.0/direct', [
                'q' => $city,
                'limit' => 1,
                'appid' => $this->apiKey,
            ]);

            if (!$response->successful() || empty($response->json())) {
                Log::error('Failed to get coordinates for city: ' . $city, [
                    'status' => $response->status(),
                    'response' => $response->body(),
                ]);
                return null;
            }

            $data = $response->json()[0];

            return [
                'lat' => $data['lat'],
                'lon' => $data['lon'],
                'country' => $data['country'] ?? 'Unknown',
            ];
        } catch (\Exception $e) {
            Log::error('Exception while getting coordinates: ' . $e->getMessage());
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
            $response = Http::get($this->baseUrl . 'data/3.0/onecall', [
                'lat' => $lat,
                'lon' => $lon,
                'exclude' => 'minutely,hourly,alerts',
                'units' => 'metric', // Using metric units (Celsius)
                'appid' => $this->apiKey,
            ]);

            if (!$response->successful()) {
                Log::error('Failed to get weather data', [
                    'status' => $response->status(),
                    'response' => $response->body(),
                ]);
                throw new \Exception('Failed to get weather data from OpenWeatherMap');
            }

            $weatherData = $response->json();

            // Add city and country information to the response
            $weatherData['city'] = $cityName;
            $weatherData['country'] = $countryCode;

            return $weatherData;
        } catch (\Exception $e) {
            Log::error('Exception while getting weather data: ' . $e->getMessage());
            throw $e;
        }
    }
}