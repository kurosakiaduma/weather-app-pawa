<?php

namespace App\Http\Controllers;

use App\Services\WeatherService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class WeatherController extends Controller
{
    /**
     * The weather service instance.
     */
    protected WeatherService $weatherService;

    /**
     * Create a new controller instance.
     */
    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }

    /**
     * Get weather data for a specific city.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getWeatherByCity(Request $request): JsonResponse
    {
        Log::info('Weather request received', [
            'ip' => $request->ip(),
            'params' => $request->all()
        ]);

        try {
            // Validate request
            $validator = Validator::make($request->all(), [
                'city' => 'required|string|max:100',
            ]);

            if ($validator->fails()) {
                Log::warning('Weather request validation failed', [
                    'errors' => $validator->errors()->toArray()
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $city = $request->input('city');
            Log::info("Fetching weather data for city: {$city}");

            // Cache key based on city name
            $cacheKey = 'weather_' . strtolower(str_replace(' ', '_', $city));

            // Check if data exists in cache
            $cacheHit = Cache::has($cacheKey);
            Log::info($cacheHit ? "Cache hit for city: {$city}" : "Cache miss for city: {$city}");

            // Get data from cache or API
            $weatherData = Cache::remember($cacheKey, 1800, function () use ($city) {
                Log::info("Fetching coordinates for city: {$city}");

                // Get city coordinates using geocoding API
                $coordinates = $this->weatherService->getCoordinates($city);

                if (!$coordinates) {
                    Log::error("City coordinates not found for: {$city}");
                    throw new \Exception("City not found");
                }

                Log::info("Coordinates found for city: {$city}", [
                    'lat' => $coordinates['lat'],
                    'lon' => $coordinates['lon'],
                    'country' => $coordinates['country']
                ]);

                // Get weather data using coordinates
                Log::info("Fetching weather data for coordinates", [
                    'lat' => $coordinates['lat'],
                    'lon' => $coordinates['lon']
                ]);

                $data = $this->weatherService->getWeatherByCoordinates(
                    $coordinates['lat'],
                    $coordinates['lon'],
                    $city,
                    $coordinates['country']
                );

                Log::info("Weather data successfully retrieved for: {$city}");
                return $data;
            });

            Log::info("Returning weather data for: {$city}");
            return response()->json($weatherData);

        } catch (ValidationException $e) {
            Log::error('Weather request validation exception', [
                'exception' => $e->getMessage(),
                'errors' => $e->errors()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            Log::error('Weather request error', [
                'exception' => get_class($e),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}