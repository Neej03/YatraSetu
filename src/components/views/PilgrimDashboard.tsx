import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { MOCK_WEATHER_DATA } from '../../data/mockData';
import { Compass, Clock, Navigation, Calendar, Sun, ShieldAlert, Sparkles, ArrowRight, CheckCircle2, Ticket, MapPin, CloudSun } from 'lucide-react';

export const PilgrimDashboard: React.FC = () => {
  const { selectedTempleId, temples, zones, setCurrentView, activePasses, t } = useSimulation();

  const currentTemple = temples.find(t => t.id === selectedTempleId) || temples[0];
  const activePass = activePasses[0];
  const templeWeather = MOCK_WEATHER_DATA[selectedTempleId] || MOCK_WEATHER_DATA.somnath;


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Personalized Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold mb-3 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {t('pilgrim.title')}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t('pilgrim.title')} 👋
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            {t('pilgrim.subtitle')} <span className="text-amber-400 font-bold">{currentTemple.name}</span>.
          </p>
        </div>

        {/* Quick Travel Advisory Card */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-amber-500/30 text-right shrink-0">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Recommended Arrival</span>
          <span className="text-2xl font-black text-amber-400">5:30 PM Today</span>
          <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">✨ 42% Shorter Queue Window</span>
        </div>
      </div>

      {/* TOP 5 PILGRIM METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Current Crowd */}
        <div className="glass-panel p-5 rounded-2xl border-amber-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">{t('common.crowd_level')}</span>
            <Compass className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-white">{currentTemple.currentCrowd.toLocaleString()}</span>
            <span className="text-[11px] font-bold ml-2 text-amber-400 uppercase">({currentTemple.riskLevel})</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Capacity: {currentTemple.totalCapacity.toLocaleString()} max</p>
        </div>

        {/* Waiting Time */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">{t('common.avg_wait')}</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-cyan-300">{currentTemple.avgWaitMinutes} min</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Garbhagriha Inner Queue</p>
        </div>

        {/* Darshan Slot */}
        <div className="glass-panel p-5 rounded-2xl border-purple-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Darshan Slot</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-3">
            <span className="text-base font-extrabold text-purple-300">
              {activePass ? activePass.timeSlot : 'Not Booked'}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Gate 3 Canopy Entry</p>
        </div>

        {/* Weather */}
        <div 
          onClick={() => setCurrentView('weather')}
          className="glass-panel p-5 rounded-2xl border-orange-500/20 hover:border-orange-500/50 cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 group-hover:text-orange-300 transition-all">Weather Index</span>
            <CloudSun className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-all" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-orange-300">{templeWeather.currentTemp}°C</span>
            <span className="text-[10px] font-bold text-amber-400 underline">7-Day Forecast</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">{templeWeather.conditionText}, Misting {templeWeather.mistingStatus}</p>
        </div>


        {/* Recommended Route */}
        <div className="glass-panel p-5 rounded-2xl border-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Best Route</span>
            <Navigation className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <span className="text-base font-extrabold text-emerald-300">Route B East</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">42% lower density</p>
        </div>

      </div>

      {/* MAIN TWO-COL CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Digital Ticket Pass & Smart Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Digital Ticket Pass */}
          {activePass ? (
            <div className="glass-panel-glow p-6 rounded-3xl border-amber-500/40 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-amber-400" />
                  <h3 className="font-extrabold text-base text-white">Your Confirmed Darshan Pass</h3>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  ACTIVE PASS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Booking Ref</span>
                  <span className="font-mono text-sm font-bold text-amber-300">{activePass.bookingId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Time Slot</span>
                  <span className="font-bold text-sm text-white">{activePass.timeSlot}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Assigned Gate</span>
                  <span className="font-bold text-sm text-cyan-300">{activePass.assignedGate}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-300 font-medium">Primary Pilgrim: <strong className="text-white">{activePass.primaryVisitorName}</strong> ({activePass.visitorCount} visitors)</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">Please arrive 15 mins prior to slot window.</p>
                </div>
                <button
                  onClick={() => setCurrentView('booking')}
                  className="px-3 py-1.5 text-xs font-bold text-amber-300 bg-amber-500/20 rounded-xl hover:bg-amber-500/30"
                >
                  View QR Pass
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-3xl text-center border-amber-500/20">
              <Calendar className="w-10 h-10 text-amber-400 mx-auto mb-2" />
              <h3 className="font-bold text-white text-base">No Active Darshan Slot</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Book an AI-recommended low-crowd slot to bypass heavy queue delays.
              </p>
              <button
                onClick={() => setCurrentView('booking')}
                className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-md"
              >
                Book Darshan Slot Now
              </button>
            </div>
          )}

          {/* Smart AI Guidance Rationale */}
          <div className="glass-panel p-6 rounded-3xl border-cyan-500/30">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" /> AI Pilgrimage Insights & Safety Tip
            </h3>
            
            <div className="mt-4 space-y-3">
              <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-amber-500/20 text-xs text-slate-300">
                <strong className="text-amber-400">Queue Advisory:</strong> Gate 1 is experiencing peak congestion (94%). We strongly advise taking <strong>Route B East Canopy Way</strong> directly to Gate 3.
              </div>

              <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-cyan-500/20 text-xs text-slate-300">
                <strong className="text-cyan-400">Weather & Hydration:</strong> Temperature is 29°C. Free water hydration stations are available at Zone 4 (Food Plaza) and Zone 7 (West Corridor).
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Quick Pilgrim Actions & Emergency Assist */}
        <div className="space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border-slate-800">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => setCurrentView('booking')}
                className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-left flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Book Darshan Slot</h4>
                    <p className="text-[10px] text-slate-400">Select low-crowd time window</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => setCurrentView('route')}
                className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-left flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Smart Route Planner</h4>
                    <p className="text-[10px] text-slate-400">Find safest, least crowded path</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => setCurrentView('map')}
                className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-left flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Live Crowd Heatmap</h4>
                    <p className="text-[10px] text-slate-400">Explore zone floor plan</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          {/* Emergency SOS Banner */}
          <div className="glass-panel-red p-6 rounded-3xl text-center">
            <ShieldAlert className="w-8 h-8 text-rose-400 mx-auto mb-2 animate-bounce" />
            <h3 className="font-extrabold text-sm text-white">Need Emergency Assistance?</h3>
            <p className="text-xs text-rose-200 mt-1">
              Medical distress, lost child, or crowd panic? Trigger instant response.
            </p>
            <button
              onClick={() => setCurrentView('emergency')}
              className="mt-4 w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 transition-all"
            >
              Open Emergency Center 🚨
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
