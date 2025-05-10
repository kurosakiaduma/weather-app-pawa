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
        // $this->apiKey = config('services.openweathermap.key');
        $this->apiKey = '2fbc03e42518a5af5d6619e3905a43f5';

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
        // CHANGE THE URL to use the free endpoint
        $url = $this->baseUrl . 'data/2.5/weather'; // Change from 'data/3.0/onecall'
        Log::info("Making Weather API request", [
            'url' => $url,
            'lat' => $lat,
            'lon' => $lon
        ]);

        $currentWeatherResponse = Http::get($url, [
            'lat' => $lat,
            'lon' => $lon,
            'units' => 'metric', // Using metric units (Celsius)
            'appid' => $this->apiKey,
        ]);

        // Get forecast data from free endpoint
        $forecastUrl = $this->baseUrl . 'data/2.5/forecast';
        $forecastResponse = Http::get($forecastUrl, [
            'lat' => $lat,
            'lon' => $lon,
            'units' => 'metric',
            'appid' => $this->apiKey,
        ]);

        if (!$currentWeatherResponse->successful() || !$forecastResponse->successful()) {
            Log::error('Failed to get weather data', [
                'city' => $cityName,
                'lat' => $lat,
                'lon' => $lon,
                'current_status' => $currentWeatherResponse->status(),
                'current_response' => $currentWeatherResponse->body(),
                'forecast_status' => $forecastResponse->status(),
                'forecast_response' => $forecastResponse->body(),
            ]);
            throw new \Exception('Failed to get weather data from OpenWeatherMap');
        }

        $currentData = $currentWeatherResponse->json();
        $forecastData = $forecastResponse->json();

        // Format the response to match our expected structure
        $weatherData = [
            'current' => [
                'temp' => $currentData['main']['temp'],
                'humidity' => $currentData['main']['humidity'],
                'wind_speed' => $currentData['wind']['speed'],
                'weather' => $currentData['weather'],
                'dt' => $currentData['dt'],
            ],
            'daily' => [],
            'city' => $cityName,
            'country' => $countryCode,
        ];

        // Process forecast data to get daily forecasts (one per day)
        $processedDays = [];
        foreach ($forecastData['list'] as $forecast) {
            // Get the date part only (ignore time)
            $date = date('Y-m-d', $forecast['dt']);

            // Only take one forecast per day
            if (!isset($processedDays[$date])) {
                $processedDays[$date] = true;

                $weatherData['daily'][] = [
                    'dt' => $forecast['dt'],
                    'temp' => [
                        'day' => $forecast['main']['temp'],
                    ],
                    'weather' => $forecast['weather'],
                ];

                // Stop after we have 4 days (including today)
                if (count($weatherData['daily']) >= 4) {
                    break;
                }
            }
        }

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