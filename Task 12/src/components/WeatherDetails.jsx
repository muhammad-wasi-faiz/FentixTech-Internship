import React from 'react';

export default function WeatherDetails({ weather }) {
  const { humidity, windSpeed, feelsLike } = weather;

  return (
    <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/40 text-center">
      {/* Feels Like Temp */}
      <div className="bg-slate-950/30 border border-slate-800/20 rounded-2xl p-3 flex flex-col items-center">
        <i className="fa-solid fa-temperature-half text-indigo-400 text-sm mb-1.5"></i>
        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Feels Like</span>
        <span className="text-sm font-bold text-slate-200 mt-0.5">{Math.round(feelsLike)}°C</span>
      </div>

      {/* Humidity */}
      <div className="bg-slate-950/30 border border-slate-800/20 rounded-2xl p-3 flex flex-col items-center">
        <i className="fa-solid fa-droplet text-cyan-400 text-sm mb-1.5"></i>
        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Humidity</span>
        <span className="text-sm font-bold text-slate-200 mt-0.5">{humidity}%</span>
      </div>

      {/* Wind Speed */}
      <div className="bg-slate-950/30 border border-slate-800/20 rounded-2xl p-3 flex flex-col items-center">
        <i className="fa-solid fa-wind text-teal-400 text-sm mb-1.5"></i>
        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Wind Speed</span>
        <span className="text-sm font-bold text-slate-200 mt-0.5">{windSpeed} km/h</span>
      </div>
    </div>
  );
}
