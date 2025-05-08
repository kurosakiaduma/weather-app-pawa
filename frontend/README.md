# Weather App Frontend

A modern weather application built with Next.js, TypeScript, and Tailwind CSS with RippleUI components.

## Features

- Search for weather by city name using OpenWeatherMap's Geocoding API
- Display current weather conditions
- Show 3-day weather forecast
- Toggle between Celsius and Fahrenheit
- Display wind and humidity information
- Responsive design for all screen sizes

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Typed JavaScript for enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **RippleUI**: Tailwind CSS component library
- **Fetch API**: For making AJAX requests

## Prerequisites

- Node.js 16.x or higher
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kurosakiaduma/weather-app-pawa
   cd weather-app-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   BACKEND_API_URL=http://localhost:8000
   ```

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Build for Production

Build the application for production:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

```
weather-app-frontend/
├── src/
│   ├── components/         # UI components
│   │   ├── UI/             # Generic UI components
│   │   │   └── TemperatureToggle.tsx
│   │   └── Weather/        # Weather-specific components
│   │       ├── CurrentWeather.tsx
│   │       ├── ForecastDay.tsx
│   │       ├── SearchCity.tsx
│   │       ├── WeatherForecast.tsx
│   │       ├── WeatherIcon.tsx
│   │       └── WeatherStats.tsx
│   ├── interfaces/         # TypeScript interfaces
│   │   └── WeatherData.ts
│   ├── pages/              # Next.js pages
│   │   ├── api/
│   │   │   └── weather.ts  # API route to proxy backend requests
│   │   ├── _app.tsx
│   │   └── index.tsx       # Main page
│   ├── services/           # API services
│   │   └── weatherApi.ts
│   ├── styles/             # Global styles
│   │   └── globals.css
│   └── utils/              # Utility functions
│       ├── dateFormatter.ts
│       └── tempConverter.ts
├── public/                 # Static files
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Component Details

### UI Components

- **TemperatureToggle**: Toggle switch for changing between Celsius and Fahrenheit units

### Weather Components

- **CurrentWeather**: Displays current weather conditions, temperature, and location
- **ForecastDay**: Individual day forecast card
- **SearchCity**: Search form for looking up cities
- **WeatherForecast**: Container for 3-day forecast
- **WeatherIcon**: Displays weather condition icons
- **WeatherStats**: Shows additional weather details (wind, humidity)

### Services

- **weatherApi**: Service for making API requests to the backend

### Utilities

- **dateFormatter**: Functions for formatting dates and timestamps
- **tempConverter**: Functions for converting between temperature units

## API Integration

The frontend communicates with the Laravel backend through a Next.js API route (`pages/api/weather.ts`), which proxies requests to the Laravel API. This approach prevents CORS issues and keeps the API key secure.

## Styling

The application uses Tailwind CSS with RippleUI components for a modern look and feel. The design is fully responsive and follows a clean, intuitive layout.

## Testing

Run the linter:

```bash
npm run lint
# or
yarn lint
```

Run type checking:

```bash
npm run type-check
# or
yarn type-check
```

## License

This project is licensed under the MIT License.
