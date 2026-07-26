import React from 'react';

export default function WeatherLoading() {
  return (
    <div className="space-y-6 py-4 animate-pulse">
      {/* City & Date Shimmer */}
      <div className="flex flex-col items-center space-y-2">
        <div className="h-7 w-40 bg-slate-800 rounded-lg"></div>
        <div className="h-4 w-28 bg-slate-800/60 rounded-md"></div>
      </div>

      {/* Main Temperature & Icon Shimmer */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-slate-800"></div>
        <div className="h-14 w-24 bg-slate-800 rounded-xl"></div>
        <div className="h-5 w-32 bg-slate-800/80 rounded-md"></div>
      </div>

      {/* Details Grid Shimmer */}
      <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/40">
        <div className="h-20 bg-slate-800/50 rounded-2xl"></div>
        <div className="h-20 bg-slate-800/50 rounded-2xl"></div>
        <div className="h-20 bg-slate-800/50 rounded-2xl"></div>
      </div>
    </div>
  );
}
