import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { MOCK_WEATHER_DATA } from '../../data/mockData';
import { TempleId, WeatherCondition } from '../../types';
import { 
  Sun, CloudRain, CloudLightning, Wind, Droplets, 
  Sparkles, ShieldAlert, Fan, MapPin, Calendar, Clock, ArrowRight, 
  Compass, CloudSun, Flame
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export const WeatherForecast: React.FC = () => {
  const { selectedTempleId, setSelectedTempleId, temples, setCurrentView } = useSimulation();
  const [activeTab, setActiveTab] = useState<TempleId>(selectedTempleId);

  const currentWeather = MOCK_WEATHER_DATA[activeTab] || MOCK_WEATHER_DATA.somnath;

  const handleTempleSwitch = (id: TempleId) => {
    setActiveTab(id);
    setSelectedTempleId(id);
  };

  const getWeatherIcon = (condition: WeatherCondition, className = "w-6 h-6") => {
    switch (condition) {
      case 'clear':
        return <Sun className={`${className} text-amber-400`} />;
      case 'partly_cloudy':
        return <CloudSun className={`${className} text-amber-300`} />;
      case 'cloudy':
        return <CloudSun className={`${className} text-slate-300`} />;
      case 'rain':
        return <CloudRain className={`${className} text-cyan-400`} />;
      case 'thunderstorm':
        return <CloudLightning className={`${className} text-purple-400`} />;
      case 'breeze':
        return <Wind className={`${className} text-emerald-400`} />;
      case 'heatwave':
        return <Flame className={`${className} text-rose-400`} />;
      default:
        return <Sun className={`${className} text-amber-400`} />;
    }
  };

  const getHeatImpactBadge = (impact: string) => {
    switch (impact) {
      case 'comfortable':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Comfortable</span>;
      case 'moderate_heat':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">Moderate Heat</span>;
      case 'high_heat':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">High Heat</span>;
      case 'rain_risk':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Rain Warning</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner & Temple Switcher */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-amber-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold mb-3 border border-amber-500/20">
            <CloudSun className="w-3.5 h-3.5 text-amber-400" /> REAL-TIME CLIMATE & MICRO-WEATHER TELEMETRY
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pilgrim Weather Forecast & Thermal Index
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Live weather conditions, heat discomfort indices, misting fan status, and AI-predicted weather impact on queue wait times.
          </p>
        </div>

        {/* Temple Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 shrink-0">
          {temples.map((t) => {
            const isSelected = t.id === activeTab;
            return (
              <button
                key={t.id}
                onClick={() => handleTempleSwitch(t.id)}
                className={`px-3.5 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                {t.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Weather Alert Banner (If present) */}
      {currentWeather.weatherAlert && (
        <div className="glass-panel-glow p-4 rounded-2xl border-amber-500/40 flex items-center justify-between gap-4 bg-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">Live Climate Advisory</span>
              <p className="text-xs font-semibold text-white">{currentWeather.weatherAlert}</p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentView('route')}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-xl hover:bg-amber-300 transition-all shrink-0"
          >
            View Shaded Routes
          </button>
        </div>
      )}

      {/* HERO SECTION: LIVE WEATHER SUMMARY & 4 CORE METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Temperature & Thermal Comfort Hero Card */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Current Weather • {currentWeather.templeName}</span>
              <div className="flex items-baseline gap-4 mt-2">
                <span className="text-6xl font-black text-white tracking-tight">{currentWeather.currentTemp}°C</span>
                <div>
                  <span className="text-lg font-bold text-amber-300 block">{currentWeather.conditionText}</span>
                  <span className="text-xs text-slate-400">Feels like {currentWeather.feelsLike}°C</span>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800 flex items-center justify-center">
              {getWeatherIcon(currentWeather.condition, "w-12 h-12")}
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
            
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
                <Droplets className="w-3 h-3 text-cyan-400" /> Humidity
              </span>
              <span className="text-xl font-bold text-white mt-1 block">{currentWeather.humidity}%</span>
              <span className="text-[10px] text-slate-400">Rain risk: {currentWeather.rainProbability}%</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
                <Wind className="w-3 h-3 text-emerald-400" /> Wind Speed
              </span>
              <span className="text-xl font-bold text-white mt-1 block">{currentWeather.windSpeed} km/h</span>
              <span className="text-[10px] text-slate-400">{currentWeather.windDirection}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
                <Sun className="w-3 h-3 text-amber-400" /> UV Index
              </span>
              <span className="text-xl font-bold text-white mt-1 block">{currentWeather.uvIndex} / 11</span>
              <span className="text-[10px] text-amber-400 font-medium">{currentWeather.uvIndex > 6 ? 'High Exposure' : 'Moderate'}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
                <Fan className="w-3 h-3 text-purple-400" /> Misting Fans
              </span>
              <span className="text-xl font-bold text-purple-300 mt-1 block">{currentWeather.mistingStatus}</span>
              <span className="text-[10px] text-slate-400">Courtyard & Hall A</span>
            </div>

          </div>
        </div>

        {/* Right Side: Air Quality & Pilgrim Thermal Comfort Index */}
        <div className="space-y-6">
          
          {/* Thermal Comfort Card */}
          <div className="glass-panel p-6 rounded-3xl border-amber-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pilgrim Comfort Score</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <span className="text-xs text-slate-400 block font-medium">Thermal Comfort Status</span>
                <span className="text-2xl font-black text-amber-400 block mt-0.5">{currentWeather.thermalComfort}</span>
                <p className="text-[11px] text-slate-300 mt-2">
                  {currentWeather.thermalComfort === 'Ideal' 
                    ? 'Optimal thermal window for long queue standing. Misting fans maintaining 24°C micro-zone.' 
                    : 'Elevated ambient heat. Shaded canopy Route B recommended for elderly and children.'}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Air Quality Index (AQI):</span>
              <span className="font-mono font-bold text-emerald-400 px-2.5 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                {currentWeather.aqi} AQI ({currentWeather.aqiLevel})
              </span>
            </div>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => setCurrentView('booking')}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Book Cool Evening Darshan Slot <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* HOURLY WEATHER FORECAST & TEMPERATURE CHART */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" /> 24-Hour Hourly Weather & Crowd Impact Trend
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Forecasted temperature, humidity, precipitation, and pilgrim heat advisory levels throughout today.
            </p>
          </div>
          <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            Live Telemetry Sync
          </span>
        </div>

        {/* Temperature Area Chart */}
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentWeather.hourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} domain={['dataMin - 2', 'dataMax + 2']} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '0.75rem' }}
                labelStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                formatter={(val: any) => [`${val}°C`, 'Temperature']}
              />
              <Area type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#tempGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Timeline Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-800">
          {currentWeather.hourly.map((h, i) => (
            <div key={i} className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all text-center space-y-2">
              <span className="text-[11px] font-bold text-slate-300 block">{h.time}</span>
              <div className="flex justify-center my-1">
                {getWeatherIcon(h.condition, "w-6 h-6")}
              </div>
              <div>
                <span className="text-base font-black text-white">{h.temp}°C</span>
                <span className="text-[10px] text-slate-400 block">Rain: {h.rainChance}%</span>
              </div>
              <div className="pt-1">
                {getHeatImpactBadge(h.crowdHeatImpact)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-DAY EXTENDED FORECAST & WEATHER-TO-CROWD ADVISORY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: 7-Day Extended Forecast */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" /> 7-Day Extended Pilgrimage Weather Outlook
            </h3>
            <span className="text-xs text-slate-400">Gujarat Meteorological Department Sync</span>
          </div>

          <div className="space-y-3">
            {currentWeather.daily.map((d, idx) => (
              <div key={idx} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800/80 hover:border-amber-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Day & Date */}
                <div className="flex items-center gap-4 sm:w-44">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400">
                    {getWeatherIcon(d.condition, "w-5 h-5")}
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-white block">{d.day} <span className="text-xs font-medium text-slate-400">({d.date})</span></span>
                    <span className="text-[11px] text-slate-400">{d.summary}</span>
                  </div>
                </div>

                {/* Rain & Temp strip */}
                <div className="flex items-center justify-between sm:justify-end gap-6 flex-1">
                  <div className="text-right">
                    <span className="text-xs font-bold text-cyan-300 block">{d.rainChance}% Rain Risk</span>
                    <span className="text-[10px] text-slate-400">{d.humidity}% Humidity</span>
                  </div>

                  <div className="text-right w-24">
                    <span className="text-sm font-black text-white">{d.tempMax}° / <span className="text-slate-400">{d.tempMin}°C</span></span>
                  </div>
                </div>

                {/* Pilgrimage Advisory */}
                <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-amber-300/90 sm:max-w-xs">
                  💡 {d.advisory}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Weather-to-Crowd AI Advisory & Safety Amenities */}
        <div className="space-y-6">
          
          {/* AI Microclimate Insights */}
          <div className="glass-panel p-6 rounded-3xl border-cyan-500/30 space-y-4">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" /> AI Weather & Crowd Advisory
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-amber-500/20 text-xs text-slate-300 space-y-1">
                <strong className="text-amber-400 block font-bold">🌡️ Thermal Comfort Recommendation:</strong>
                <p>
                  Current ambient temp is {currentWeather.currentTemp}°C. Peak afternoon heat typically increases queue weariness by 35%. Take <strong>Route B East Canopy</strong> for 100% shade coverage.
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-cyan-500/20 text-xs text-slate-300 space-y-1">
                <strong className="text-cyan-400 block font-bold">💧 Hydration & Misting Status:</strong>
                <p>
                  Misting fans are currently operating at <strong>{currentWeather.mistingStatus}</strong> across Main Queue Hall A & Prasad Plaza. 8 free drinking water counters are active.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Route & Map Links */}
          <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-3">
            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Climate-Smart Actions</h4>

            <button
              onClick={() => setCurrentView('route')}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-left text-xs font-bold text-white flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Navigate Shaded Route B</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => setCurrentView('map')}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-left text-xs font-bold text-white flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-2">
                <Fan className="w-4 h-4 text-purple-400" />
                <span>Locate Misting & Water Points</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
