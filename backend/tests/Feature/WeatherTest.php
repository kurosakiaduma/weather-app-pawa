namespace Tests\Feature;

use App\Services\WeatherService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class WeatherTest extends TestCase
{
    /**
     * Test the weather endpoint with a valid city.
     *
     * @return void
     */
    public function test_can_get_weather_for_valid_city()
    {
        // Mock the WeatherService to avoid actual API calls
        $this->mock(WeatherService::class, function ($mock) {
            $mock->shouldReceive('getCoordinates')
                ->once()
                ->with('Nairobi')
                ->andReturn([
                    'lat' => -1.292066,
                    'lon' => 36.821945,
                    'country' => 'KE',
                ]);

            $mock->shouldReceive('getWeatherByCoordinates')
                ->once()
                ->andReturn([
                    'current' => [
                        'temp' => 25.4,
                        'humidity' => 65,
                        'wind_speed' => 3.6,
                        'weather' => [
                            [
                                'description' => 'scattered clouds',
                                'icon' => '03d',
                            ],
                        ],
                        'dt' => 1652345678,
                    ],
                    'daily' => [
                        [
                            'dt' => 1652345678,
                            'temp' => [
                                'day' => 25.4,
                            ],
                            'weather' => [
                                [
                                    'description' => 'scattered clouds',
                                    'icon' => '03d',
                                ],
                            ],
                        ],
                    ],
                    'city' => 'Nairobi',
                    'country' => 'KE',
                ]);
        });

        // Clear cache to ensure a fresh test
        Cache::flush();

        // Make request to the API
        $response = $this->get('/api/weather?city=Nairobi');

        // Assert response
        $response->assertStatus(200)
            ->assertJsonStructure([
                'current' => [
                    'temp',
                    'humidity',
                    'wind_speed',
                    'weather' => [
                        [
                            'description',
                            'icon',
                        ],
                    ],
                    'dt',
                ],
                'daily',
                'city',
                'country',
            ]);
    }

    /**
     * Test the weather endpoint with an invalid city.
     *
     * @return void
     */
    public function test_returns_error_for_invalid_city()
    {
        // Mock the WeatherService to return null for coordinates
        $this->mock(WeatherService::class, function ($mock) {
            $mock->shouldReceive('getCoordinates')
                ->once()
                ->with('InvalidCityName')
                ->andReturn(null);
        });

        // Clear cache to ensure a fresh test
        Cache::flush();

        // Make request to the API
        $response = $this->get('/api/weather?city=InvalidCityName');

        // Assert response
        $response->assertStatus(500)
            ->assertJson([
                'success' => false,
                'message' => 'City not found',
            ]);
    }

    /**
     * Test the weather endpoint with missing city parameter.
     *
     * @return void
     */
    public function test_requires_city_parameter()
    {
        // Make request to the API without city parameter
        $response = $this->get('/api/weather');

        // Assert response
        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Validation error',
            ]);
    }
}
