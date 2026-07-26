import React, { useState, useEffect } from 'react';
import WeatherSearch from './components/WeatherSearch';
import WeatherDisplay, { getWeatherConfig } from './components/WeatherDisplay';
import WeatherDetails from './components/WeatherDetails';
import WeatherLoading from './components/WeatherLoading';
import WeatherError from './components/WeatherError';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Core API Fetch Function
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Query the Geocoding API to get coordinates (lat, lon, country name)
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
      const geoResponse = await fetch(geoUrl);
      if (!geoResponse.ok) {
        throw new Error('Geocoding service unavailable');
      }

      const geoData = await geoResponse.json();
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${cityName}" not found. Please verify spelling.`);
      }

      const location = geoData.results[0];
      const { latitude, longitude, name, country } = location;

      // Step 2: Fetch current weather metrics using the coordinates
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto`;
      const weatherResponse = await fetch(weatherUrl);
      if (!weatherResponse.ok) {
        throw new Error('Weather forecast service unavailable');
      }

      const weatherData = await weatherResponse.json();
      const current = weatherData.current;

      setWeather({
        cityName: name,
        country: country || 'Unknown Country',
        temp: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        feelsLike: current.apparent_temperature,
        weatherCode: current.weather_code,
        isDay: current.is_day
      });
    } catch (err) {
      console.error("Fetch weather error:", err);
      setError(err.message || 'An unexpected error occurred.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a default city on mount
  useEffect(() => {
    fetchWeather('London');
  }, []);

  // Determine background gradient dynamically based on weather status
  const getBackgroundGradient = () => {
    if (loading || !weather) {
      return 'from-slate-900 to-slate-950'; // Default dark theme while loading or error
    }
    return getWeatherConfig(weather.weatherCode, weather.isDay).bg;
  };

  return (
    <div className={`w-full min-h-[520px] bg-gradient-to-br ${getBackgroundGradient()} border border-slate-800/40 rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-1000 flex flex-col justify-between relative overflow-hidden`}>
      
      {/* Subtle decorative overlays */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-slate-950/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main card content */}
      <div className="relative z-10">
        
        {/* Header Branding */}
        <header className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-md">
              <i className="fa-solid fa-cloud-sun-rain text-white text-sm"></i>
            </div>
            <h1 className="font-outfit font-black text-xl tracking-tight text-white">
              SkyCast
            </h1>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-200/50">Realtime Weather</span>
        </header>

        {/* Search Input component */}
        <WeatherSearch onSearch={fetchWeather} />

        {/* Loader, Error, or Weather Display components */}
        {loading && <WeatherLoading />}
        
        {!loading && error && <WeatherError message={error} />}
        
        {!loading && !error && weather && (
          <>
            <WeatherDisplay weather={weather} />
            <WeatherDetails weather={weather} />
          </>
        )}

      </div>

    </div>
  );
}
