import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { MOCK_ROUTES } from '../../data/mockData';
import { RouteOption } from '../../types';
import { Navigation, Compass, Sparkles, Accessibility, Clock, ShieldCheck, CheckCircle2, ArrowRight, MapPin, AlertTriangle } from 'lucide-react';

export const SmartRoutePlanner: React.FC = () => {
  const { selectedTempleId, temples } = useSimulation();
  const [startPoint, setStartPoint] = useState<string>('North Parking & Bus Terminal');
  const [endPoint, setEndPoint] = useState<string>('Garbhagriha Inner Shrine');
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(MOCK_ROUTES[1]); // Route B AI Recommended

  const currentTemple = temples.find(t => t.id === selectedTempleId) || temples[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-xs font-bold mb-2 border border-orange-500/30">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" /> REAL-TIME DENSITY REROUTING ENGINE
        </div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Navigation className="w-7 h-7 text-amber-400" /> Smart Route Planner
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Calculate safe, low-congestion walking corridors from parking bays and entry plazas directly to the Garbhagriha.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT 2 COLS: ROUTE SELECTION & VISUAL PATHWAY */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Start & End Point Selector */}
          <div className="glass-panel p-6 rounded-3xl border-amber-500/30 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Starting Location
              </label>
              <select
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
              >
                <option value="North Parking & Bus Terminal">North Parking & Bus Terminal</option>
                <option value="Main Gate 1 Security Plaza">Main Gate 1 Security Plaza</option>
                <option value="East Promenade Bus Stop">East Promenade Bus Stop</option>
                <option value="VIP Guest House Complex">VIP Guest House Complex</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-400" /> Destination
              </label>
              <select
                value={endPoint}
                onChange={(e) => setEndPoint(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
              >
                <option value="Garbhagriha Inner Shrine">Garbhagriha Inner Shrine</option>
                <option value="Prasad & Food Court Plaza">Prasad & Food Court Plaza</option>
                <option value="Emergency Medical Center West">Emergency Medical Center West</option>
              </select>
            </div>
          </div>

          {/* AI RATIONALE CARD */}
          <div className="glass-panel-glow p-6 rounded-3xl border-emerald-500/50 relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" /> AI RATIONALE RECOMMENDATION
            </div>
            <h3 className="text-xl font-extrabold text-white">
              "{selectedRoute.aiReasoning}"
            </h3>
            <div className="mt-3 flex items-center gap-4 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" /> 42% Lower Crowd Density
              </span>
              <span className="flex items-center gap-1 text-cyan-400 font-bold">
                <Accessibility className="w-4 h-4" /> Wheelchair & Elderly Ramps Available
              </span>
            </div>
          </div>

          {/* ROUTE COMPARISON CARDS (3 OPTIONS) */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">Available Route Options</h3>

            {MOCK_ROUTES.map((route) => {
              const isSelected = selectedRoute.id === route.id;
              const isAiRecommended = route.isAiRecommended;

              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500 text-white shadow-xl'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-white">{route.name}</span>
                      {isAiRecommended && (
                        <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow">
                          ✨ RECOMMENDED
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400">{route.aiReasoning}</p>

                    <div className="flex items-center gap-3 pt-2 text-xs">
                      <span className="text-amber-300 font-bold">{route.distanceMeters} meters</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-cyan-300 font-bold">{route.estimatedMinutes} min walk</span>
                      <span className="text-slate-500">•</span>
                      <span className={`font-bold uppercase ${
                        route.crowdLevel === 'critical' ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {route.crowdLevel} Density
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {route.accessibilityFriendly && (
                      <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" title="Wheelchair / Elderly Friendly">
                        <Accessibility className="w-4 h-4" />
                      </span>
                    )}

                    <button className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {isSelected ? 'Active Route' : 'Select'}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* RIGHT COL: TURN-BY-TURN GUIDANCE */}
        <div className="space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border-amber-500/30 sticky top-24 space-y-4">
            <h3 className="font-extrabold text-base text-white border-b border-amber-500/20 pb-3 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-amber-400" /> Turn-by-Turn Guidance
            </h3>

            <div className="space-y-4">
              {selectedRoute.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1 pb-3 border-b border-slate-800/80">
                    <h4 className="font-bold text-xs text-white">{step}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Follow green misting canopy signs</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => alert(`Navigation started for ${selectedRoute.name}`)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-lg"
              >
                Start Live Turn-by-Turn Navigation 📍
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
