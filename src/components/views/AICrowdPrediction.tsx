import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { MOCK_PREDICTIONS } from '../../data/mockData';
import { Activity, Sparkles, AlertTriangle, TrendingUp, Calendar, Sun, Users, ShieldAlert, Cpu } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export const AICrowdPrediction: React.FC = () => {
  const { selectedTempleId, temples, theme } = useSimulation();

  const currentTemple = temples.find(t => t.id === selectedTempleId) || temples[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold mb-2 border border-cyan-500/30">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> MULTI-FACTOR AI FORECASTING ENGINE
        </div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Activity className="w-7 h-7 text-amber-400" /> AI Crowd Surge Prediction
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Predict crowd buildup 1-6 hours in advance using historical festival archives, real-time computer vision, weather telemetry, and train/bus arrival schedules.
        </p>
      </div>

      {/* AI ALERT CALLOUT BANNER */}
      <div className="glass-panel-glow p-6 rounded-3xl border-rose-500/40 bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 mt-1">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-rose-400 font-extrabold block">
                HIGH SURGE FORECAST WARNING
              </span>
              <h3 className="text-xl font-extrabold text-white mt-0.5">
                Crowd expected to increase by <span className="text-rose-400 font-black">31%</span> between 06:00 PM and 07:00 PM
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                <strong>Recommended Action:</strong> Increase entry turnstile control at Gate 2 and activate East Promenade Fast Pass lane.
              </p>
            </div>
          </div>

          <button
            onClick={() => alert("Intervention action dispatched to Command Center")}
            className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shrink-0"
          >
            Dispatch Gate Control Command
          </button>
        </div>
      </div>

      {/* FORECAST CHART SECTION (RECHARTS AREA CHART) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-amber-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-extrabold text-lg text-white">6-Hour Crowd Forecast vs Safe Physical Capacity</h3>
            <p className="text-xs text-slate-400">Comparing current count vs predicted peak vs 15,000 threshold</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1 text-cyan-400"><span className="w-3 h-3 rounded bg-cyan-400" /> Current Count</span>
            <span className="flex items-center gap-1 text-amber-400"><span className="w-3 h-3 rounded bg-amber-400" /> AI Forecast</span>
            <span className="flex items-center gap-1 text-rose-400"><span className="w-3 h-3 rounded bg-rose-500" /> Capacity Limit</span>
          </div>
        </div>

        {/* Chart Container */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_PREDICTIONS} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e2e8f0' : 'rgba(255,255,255,0.05)'} />
              <XAxis dataKey="timeLabel" stroke={theme === 'light' ? '#475569' : '#94A3B8'} fontSize={11} />
              <YAxis stroke={theme === 'light' ? '#475569' : '#94A3B8'} fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a',
                  borderColor: theme === 'light' ? '#d97706' : '#f59e0b',
                  color: theme === 'light' ? '#0f172a' : '#f8fafc',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
                }}
                itemStyle={{ color: theme === 'light' ? '#0f172a' : '#f8fafc' }}
              />
              <Area type="monotone" dataKey="currentCrowd" name="Current Count" stroke="#06B6D4" fillOpacity={1} fill="url(#colorCurrent)" />
              <Area type="monotone" dataKey="predictedCrowd" name="Predicted Peak" stroke="#F59E0B" fillOpacity={1} fill="url(#colorPredicted)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MULTI-FACTOR DECOMPOSITION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Festival Impact */}
        <div className="glass-panel p-5 rounded-2xl border-purple-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Festival Impact</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-purple-300">+35% Influx</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Shravan Somvar Festival Surge</p>
        </div>

        {/* Weather Impact */}
        <div className="glass-panel p-5 rounded-2xl border-orange-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Weather Factor</span>
            <Sun className="w-4 h-4 text-orange-400" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-orange-300">Moderate (+8%)</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Evening breeze encourages turnout</p>
        </div>

        {/* Train & Transit Factor */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Transit Arrival</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-cyan-300">2 Special Trains</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Arriving at Veraval Station at 05:15 PM</p>
        </div>

        {/* Risk Score */}
        <div className="glass-panel p-5 rounded-2xl border-rose-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Surge Risk Index</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-rose-400">89 / 100</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">High Risk Threshold</p>
        </div>

      </div>

    </div>
  );
};
