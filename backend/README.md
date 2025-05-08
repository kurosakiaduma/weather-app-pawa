# Weather App Setup and Deployment Guide

This document provides comprehensive instructions for setting up, configuring, and deploying the Weather App project, which consists of a NextJS frontend and Laravel backend.

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- PHP 8.1 or higher
- Composer
- Git
- A free OpenWeatherMap API key (sign up at [OpenWeatherMap](https://openweathermap.org/api))

## Project Structure

The project is divided into two main components:

1. **Frontend**: NextJS application with TypeScript and Tailwind CSS
2. **Backend**: Laravel API application

## Setting Up the Backend (Laravel)

### 1. Clone the Repository

```bash
git clone https://github.com/kurosakiaduma/weather-app-pawa
cd weather-app/backend
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Generate application key
php artisan key:generate
```

Edit the `.env` file and set your OpenWeatherMap API key:

```
OPENWEATHERMAP_API_KEY=your_api_key_here
```

### 4. Start the Development Server

```bash
php artisan serve
```

This will start the Laravel development server on http://localhost:8000.

## Setting Up the Frontend (NextJS)

### 1. Navigate to the Frontend Directory

If you're in the project root:

```bash
cd ../frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the frontend directory:

```
BACKEND_API_URL=http://localhost:8000
```

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

This will start the NextJS development server on http://localhost:3000.

## Testing the Application

1. Ensure both the backend and frontend servers are running
2. Open http://localhost:3000 in your browser
3. You should see the Weather App interface
4. Search for a city to test the functionality

## Deployment

### Backend Deployment

#### Preparing for Deployment

1. Update the `.env` file for production:
   ```
   APP_ENV=production
   APP_DEBUG=false
   ```

2. Optimize Laravel for production:
   ```bash
   php artisan config:cache
   php artisan route:cache
   ```

#### Deployment Options

**Option 1: Shared Hosting**

1. Upload the project files to your server (excluding the `node_modules` and `vendor` directories)
2. Run `composer install --optimize-autoloader --no-dev` on the server
3. Set up a `.env` file with your production settings
4. Configure your web server (Apache/Nginx) to point to the `public` directory

**Option 2: Laravel Forge**

Laravel Forge provides a simplified deployment process:

1. Connect your server to Forge
2. Set up a new site and link your repository
3. Configure environment variables
4. Deploy the application

**Option 3: Docker**

If using Docker:

1. Build the Laravel Docker image:
   ```bash
   docker build -t weather-app-backend .
   ```

2. Run the container:
   ```bash
   docker run -p 8000:80 -e "OPENWEATHERMAP_API_KEY=your_api_key_here" weather-app-backend
   ```

### Frontend Deployment

#### Preparing for Deployment

1. Build the NextJS application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. This creates an optimized production build in the `.next` directory.

#### Deployment Options

**Option 1: Vercel (Recommended for NextJS)**

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the application:
   ```bash
   vercel
   ```

3. Follow the prompts to complete the deployment

**Option 2: Static Export**

For static hosting platforms (Netlify, GitHub Pages, etc.):

1. Add the following to `next.config.js`:
   ```js
   module.exports = {
     // other configs...
     output: 'export',
   }
   ```

2. Build the static export:
   ```bash
   npm run build
   ```

3. The static files will be in the `out` directory, which can be deployed to any static hosting service.

**Option 3: Docker**

If using Docker:

1. Build the NextJS Docker image:
   ```bash
   docker build -t weather-app-frontend .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 -e "BACKEND_API_URL=https://your-backend-url.com" weather-app-frontend
   ```

## Connecting Frontend to Backend in Production

When deploying to production, update the `.env.local` file in the frontend project with your production backend URL:

```
BACKEND_API_URL=https://your-backend-api-url.com
```

Or set this as an environment variable in your hosting platform.

## Troubleshooting

### Common Backend Issues

1. **OpenWeatherMap API key not working**
   - Verify the key is correct
   - Check if you've exceeded the API limits
   - Ensure the API endpoints being used are available on your plan

2. **CORS errors**
   - Update your Laravel CORS configuration in `config/cors.php`
   - Ensure your frontend domain is in the allowed origins

### Common Frontend Issues

1. **API connection errors**
   - Check that the `BACKEND_API_URL` is set correctly
   - Verify that the backend is running and accessible
   - Check browser console for specific error messages

2. **Build errors**
   - Clear the `.next` directory and node_modules: `rm -rf .next node_modules`
   - Reinstall dependencies: `npm install`
   - Try building again: `npm run build`

## Maintenance and Updates

1. **Keeping dependencies updated**

   For backend:
   ```bash
   composer update
   ```

   For frontend:
   ```bash
   npm update
   # or
   yarn upgrade
   ```

2. **Monitoring**
   - Set up logging in Laravel (consider using a service like Papertrail)
   - Use an error tracking service (like Sentry) for frontend errors

3. **Backup**
   - Regularly backup your environment configuration

## Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
