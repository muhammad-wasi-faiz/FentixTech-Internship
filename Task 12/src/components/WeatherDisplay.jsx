import React from 'react';

// Maps Open-Meteo weather codes to conditions and icons
export const getWeatherConfig = (code, isDay = 1) => {
  const configs = {
    0: { label: 'Clear Sky', icon: isDay ? 'fa-sun text-amber-400 animate-spin-slow' : 'fa-moon text-slate-300', bg: 'from-sky-500 to-indigo-700' },
    1: { label: 'Partly Cloudy', icon: isDay ? 'fa-cloud-sun text-slate-300' : 'fa-cloud-moon text-slate-400', bg: 'from-blue-600 to-slate-800' },
    2: { label: 'Partly Cloudy', icon: isDay ? 'fa-cloud-sun text-slate-300' : 'fa-cloud-moon text-slate-400', bg: 'from-blue-600 to-slate-800' },
    3: { label: 'Overcast', icon: 'fa-cloud text-slate-400', bg: 'from-slate-700 to-slate-900' },
    45: { label: 'Foggy', icon: 'fa-smog text-slate-400', bg: 'from-zinc-700 to-slate-800' },
    48: { label: 'Depositing Rime Fog', icon: 'fa-smog text-slate-400', bg: 'from-zinc-700 to-slate-800' },
    51: { label: 'Light Drizzle', icon: 'fa-cloud-rain text-sky-400', bg: 'from-cyan-700 to-slate-900' },
    53: { label: 'Moderate Drizzle', icon: 'fa-cloud-rain text-sky-400', bg: 'from-cyan-700 to-slate-900' },
    55: { label: 'Heavy Drizzle', icon: 'fa-cloud-rain text-sky-400', bg: 'from-cyan-700 to-slate-900' },
    61: { label: 'Slight Rain', icon: 'fa-cloud-showers-heavy text-sky-400', bg: 'from-blue-700 to-slate-900' },
    63: { label: 'Moderate Rain', icon: 'fa-cloud-showers-heavy text-blue-400', bg: 'from-blue-800 to-slate-950' },
    65: { label: 'Heavy Rain', icon: 'fa-cloud-showers-heavy text-blue-500', bg: 'from-indigo-900 to-slate-950' },
    71: { label: 'Light Snow', icon: 'fa-snowflake text-sky-200', bg: 'from-sky-900 via-slate-800 to-indigo-950' },
    73: { label: 'Moderate Snow', icon: 'fa-snowflake text-sky-200', bg: 'from-sky-900 via-slate-800 to-indigo-950' },
    75: { label: 'Heavy Snow', icon: 'fa-snowflake text-white', bg: 'from-sky-950 via-slate-900 to-indigo-950' },
    80: { label: 'Rain Showers', icon: 'fa-cloud-showers-water text-sky-300', bg: 'from-blue-800 to-slate-950' },
    81: { label: 'Rain Showers', icon: 'fa-cloud-showers-water text-sky-300', bg: 'from-blue-800 to-slate-950' },
    82: { label: 'Violent Rain Showers', icon: 'fa-cloud-showers-water text-blue-400', bg: 'from-indigo-900 to-slate-950' },
    95: { label: 'Thunderstorm', icon: 'fa-cloud-bolt text-yellow-400', bg: 'from-violet-950 via-slate-900 to-zinc-950' },
    96: { label: 'Thunderstorm with Hail', icon: 'fa-cloud-bolt text-yellow-400', bg: 'from-violet-950 via-slate-900 to-zinc-950' },
    99: { label: 'Thunderstorm with Hail', icon: 'fa-cloud-bolt text-yellow-400', bg: 'from-violet-950 via-slate-900 to-zinc-950' }
  };

  return configs[code] || { label: 'Unknown Condition', icon: 'fa-question text-slate-400', bg: 'from-slate-800 to-slate-950' };
};

export default function WeatherDisplay({ weather }) {
  const { cityName, country, temp, weatherCode, isDay } = weather;
  const config = getWeatherConfig(weatherCode, isDay);

  const formattedDate = new Date().toLocaleDateString([], {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="text-center mb-6">
      {/* City and Date */}
      <h2 className="text-3xl font-bold font-outfit text-white mb-0.5 tracking-tight">
        {cityName}
      </h2>
      <p className="text-xs text-indigo-300/80 font-medium mb-6 uppercase tracking-wider">
        {country} // {formattedDate}
      </p>

      {/* Main Temperature and Icon */}
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="w-24 h-24 rounded-full bg-slate-950/20 flex items-center justify-center mb-4 shadow-inner">
          <i className={`fa-solid ${config.icon} text-5xl`}></i>
        </div>
        <div className="flex items-start justify-center">
          <span className="text-7xl font-black font-outfit text-white tracking-tighter">
            {Math.round(temp)}
          </span>
          <span className="text-2xl font-bold font-outfit text-indigo-400 mt-1">°C</span>
        </div>
      </div>

      {/* Condition Description */}
      <p className="text-lg font-semibold text-slate-200 capitalize">
        {config.label}
      </p>
    </div>
  );
}
