<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Client\ConnectionException;

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
     * Cache TTL in minutes.
     */
    protected int $cacheTtl = 30;

    /**
     * Create a new service instance.
     *
     * @throws \RuntimeException When API key is not set
     */
    public function __construct()
    {
        $this->apiKey = '2fbc03e42518a5af5d6619e3905a43f5';

        if (empty($this->apiKey)) {
            Log::error('OpenWeatherMap API key is not set');
            throw new \RuntimeException('OpenWeatherMap API key is not set.');
        }
    }

    /**
     * Get weather data for a city.
     *
     * @param string $city
     * @return array
     * @throws \Exception
     */
    public function getWeatherByCity(string $city): array
    {
        $cacheKey = "weather_data_{$city}";

        // Try to get from cache first
        if (Cache::has($cacheKey)) {
            Log::info("Returning cached weather data for city", ['city' => $city]);
            return Cache::get($cacheKey);
        }

        // Get coordinates for the city
        $coordinates = $this->getCoordinates($city);

        if (!$coordinates) {
            throw new \Exception("Could not find location: {$city}");
        }

        // Get weather data using coordinates
        $weatherData = $this->getWeatherByCoordinates(
            $coordinates['lat'],
            $coordinates['lon'],
            $city,
            $coordinates['country']
        );

        // Cache the result
        Cache::put($cacheKey, $weatherData, now()->addMinutes($this->cacheTtl));

        return $weatherData;
    }

    /**
     * Get coordinates for a city using Geocoding API.
     *
     * @param string $city
     * @return array|null
     */
    public function getCoordinates(string $city): ?array
    {
        $cacheKey = "coordinates_{$city}";

        // Try to get from cache first
        if (Cache::has($cacheKey)) {
            Log::info("Returning cached coordinates for city", ['city' => $city]);
            return Cache::get($cacheKey);
        }

        try {
            $url = $this->baseUrl . 'geo/1.0/direct';

            $response = Http::timeout(15)
                ->retry(3, 1000)
                ->get($url, [
                    'q' => $city,
                    'limit' => 1,
                    'appid' => $this->apiKey,
                ]);

            if (!$response->successful()) {
                $this->logApiError('Geocoding API error', $city, null, null, $response);
                return null;
            }

            $data = $response->json();

            if (empty($data)) {
                Log::warning('No location found for city', ['city' => $city]);
                return null;
            }

            $location = $data[0];
            $coordinates = [
                'lat' => $location['lat'],
                'lon' => $location['lon'],
                'country' => $location['country'] ?? 'Unknown',
                'name' => $location['name'] ?? $city,
                'state' => $location['state'] ?? null,
            ];

            // Cache the coordinates (longer TTL since they rarely change)
            Cache::put($cacheKey, $coordinates, now()->addDays(7));

            Log::info("Coordinates found for city", [
                'city' => $city,
                'lat' => $coordinates['lat'],
                'lon' => $coordinates['lon'],
                'country' => $coordinates['country']
            ]);

            return $coordinates;
        } catch (ConnectionException $e) {
            Log::error('Connection error while getting coordinates', [
                'city' => $city,
                'exception' => get_class($e),
                'message' => $e->getMessage()
            ]);
            throw new \Exception('Could not connect to weather service. Please try again later.');
        } catch (\Exception $e) {
            Log::error('Exception while getting coordinates', [
                'city' => $city,
                'exception' => get_class($e),
                'message' => $e->getMessage()
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
     * @throws \Exception
     */
    public function getWeatherByCoordinates(float $lat, float $lon, string $cityName, string $countryCode): array
    {
        try {
            $url = $this->baseUrl . 'data/3.0/onecall';

            $response = Http::timeout(15)
                ->retry(3, 1000)
                ->get($url, [
                    'lat' => $lat,
                    'lon' => $lon,
                    'exclude' => 'minutely,hourly,alerts',
                    'units' => 'metric', // Using metric units (Celsius)
                    'appid' => $this->apiKey,
                ]);

            if (!$response->successful()) {
                $this->logApiError('Weather API error', $cityName, $lat, $lon, $response);
                throw new \Exception('Unable to fetch weather data. Please try again later.');
            }

            $weatherData = $response->json();

            // Validate response structure
            if (!isset($weatherData['current']) || !isset($weatherData['daily'])) {
                Log::error('Invalid weather data format', [
                    'city' => $cityName,
                    'response' => $response->body()
                ]);
                throw new \Exception('Received invalid data format from weather service.');
            }

            // Add city and country information to the response
            $weatherData['city'] = $cityName;
            $weatherData['country'] = $countryCode;
            $weatherData['timestamp'] = now()->timestamp;

            Log::info("Weather data processed successfully", [
                'city' => $cityName,
                'country' => $countryCode,
                'temp' => $weatherData['current']['temp'] ?? 'N/A',
                'weather' => $weatherData['current']['weather'][0]['description'] ?? 'N/A',
            ]);

            return $weatherData;
        } catch (ConnectionException $e) {
            Log::error('Connection error while getting weather data', [
                'city' => $cityName,
                'lat' => $lat,
                'lon' => $lon,
                'exception' => get_class($e),
                'message' => $e->getMessage()
            ]);
            throw new \Exception('Could not connect to weather service. Please try again later.');
        } catch (\Exception $e) {
            if (!($e instanceof \Exception && $e->getMessage() === 'Unable to fetch weather data. Please try again later.')) {
                Log::error('Exception while getting weather data', [
                    'city' => $cityName,
                    'lat' => $lat,
                    'lon' => $lon,
                    'exception' => get_class($e),
                    'message' => $e->getMessage()
                ]);
            }
            throw $e;
        }
    }

    /**
     * Log API errors with consistent format.
     *
     * @param string $message
     * @param string $city
     * @param float|null $lat
     * @param float|null $lon
     * @param \Illuminate\Http\Client\Response $response
     * @return void
     */
    protected function logApiError(string $message, string $city, ?float $lat, ?float $lon, $response): void
    {
        $context = [
            'city' => $city,
            'status' => $response->status(),
            'response' => $response->body(),
        ];

        if ($lat !== null && $lon !== null) {
            $context['lat'] = $lat;
            $context['lon'] = $lon;
        }

        Log::error($message, $context);
    }
}