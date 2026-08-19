import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Shield, Eye, Activity, AlertTriangle, Users, Layers, Clock, CheckCircle2, Siren, ArrowRight, RefreshCw } from 'lucide-react';

export const AuthorityCommandCenter: React.FC = () => {
  const {
    selectedTempleId,
    temples,
    zones,
    alerts,
    acknowledgeAlert,
    setCurrentView,
    triggerCrowdSurge,
    triggerEmergencyEvent
  } = useSimulation();

  const [activeTab, setActiveTab] = useState<string>('overview');

  const currentTemple = temples.find(t => t.id === selectedTempleId) || temples[0];
  const criticalZones = zones.filter(z => z.riskLevel === 'critical' || z.riskLevel === 'high');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              AUTHORITY EXECUTIVE SAAS DASHBOARD
            </span>
            <span className="text-xs text-slate-400">Authenticated Access Level: Super Admin</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1 flex items-center gap-2">
            <Shield className="w-7 h-7 text-amber-400" /> Command Center - {currentTemple.name}
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('cctv')}
            className="px-4 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold text-xs hover:bg-cyan-900 flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" /> Live CCTV Feed Grid
          </button>
          <button
            onClick={triggerEmergencyEvent}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg flex items-center gap-1.5 animate-pulse"
          >
            <Siren className="w-4 h-4" /> Trigger Emergency Corridor
          </button>
        </div>
      </div>

      {/* TOP 5 COMMAND CENTER KPI METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Visitors */}
        <div className="glass-panel p-5 rounded-2xl border-amber-500/20">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Visitors Today</span>
          <span className="text-3xl font-black text-white mt-1 block">24,850</span>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">+12% vs yesterday</span>
        </div>

        {/* Current Crowd */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/20">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Campus Crowd</span>
          <span className="text-3xl font-black text-cyan-300 mt-1 block">{currentTemple.currentCrowd.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 mt-1 block">Cap: {currentTemple.totalCapacity.toLocaleString()}</span>
        </div>

        {/* Critical Zones */}
        <div className="glass-panel p-5 rounded-2xl border-rose-500/20">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">High Density Zones</span>
          <span className="text-3xl font-black text-rose-400 mt-1 block">{criticalZones.length} Zones</span>
          <span className="text-[10px] text-rose-300 font-semibold mt-1 block">Action Required</span>
        </div>

        {/* Active Alerts */}
        <div className="glass-panel p-5 rounded-2xl border-orange-500/20">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Active AI Alerts</span>
          <span className="text-3xl font-black text-orange-400 mt-1 block">{alerts.length} Active</span>
          <span className="text-[10px] text-slate-400 mt-1 block">Automated Detection</span>
        </div>

        {/* Avg Waiting Time */}
        <div className="glass-panel p-5 rounded-2xl border-purple-500/20 col-span-2 lg:col-span-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg Wait Time</span>
          <span className="text-3xl font-black text-purple-300 mt-1 block">{currentTemple.avgWaitMinutes} min</span>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">Optimal Flow</span>
        </div>

      </div>

      {/* COMMAND CENTER SUB-NAV TABS */}
      <div className="flex border-b border-slate-800 space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'cctv', label: 'Live CCTV Monitoring' },
          { id: 'map', label: 'GIS Crowd Map' },
          { id: 'prediction', label: 'AI Predictions' },
          { id: 'alerts', label: 'AI Alert Logs' },
          { id: 'resources', label: 'Resource Allocation' },
          { id: 'emergency', label: 'Emergency Center' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTab(t.id);
              if (t.id !== 'overview') setCurrentView(t.id);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Zone Monitoring Table & Alert Actions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Zone Density Status Table */}
          <div className="glass-panel p-6 rounded-3xl border-amber-500/30 space-y-4">
            <h3 className="font-extrabold text-base text-white flex items-center justify-between">
              <span>Zone Density & AI Control Matrix</span>
              <span className="text-xs font-normal text-slate-400">Live Auto Sync</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Zone Name</th>
                    <th className="p-3">Count / Cap</th>
                    <th className="p-3">Density</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-medium">
                  {zones.map((zone) => (
                    <tr key={zone.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3 font-bold text-white">{zone.name}</td>
                      <td className="p-3">{zone.currentCount} / {zone.maxCapacity}</td>
                      <td className="p-3">
                        <span className={`font-bold ${
                          zone.densityPercentage > 85 ? 'text-rose-400' : zone.densityPercentage > 70 ? 'text-orange-400' : 'text-emerald-400'
                        }`}>
                          {zone.densityPercentage}%
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${
                          zone.riskLevel === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {zone.riskLevel}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => alert(`Gate override executed for ${zone.name}`)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold hover:bg-amber-500/30"
                        >
                          Override Gate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Alert Logs */}
          <div className="glass-panel p-6 rounded-3xl border-rose-500/30 space-y-4">
            <h3 className="font-extrabold text-base text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" /> Active AI Alert Log
              </span>
              <span className="text-xs font-normal text-slate-400">{alerts.length} Warnings</span>
            </h3>

            <div className="space-y-3">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                    a.severity === 'critical'
                      ? 'bg-rose-950/40 border-rose-500/50 text-rose-100'
                      : 'bg-amber-950/40 border-amber-500/50 text-amber-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{a.title}</span>
                      <span className="text-[9px] opacity-70">{a.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{a.message}</p>
                    <p className="text-[11px] text-amber-300 font-medium mt-1">
                      <strong>AI Action:</strong> {a.recommendedAction}
                    </p>
                  </div>

                  {!a.isAcknowledged ? (
                    <button
                      onClick={() => acknowledgeAlert(a.id)}
                      className="px-3 py-1.5 text-[10px] font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shrink-0 border border-slate-700"
                    >
                      Acknowledge
                    </button>
                  ) : (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Quick Authority Actions */}
        <div className="space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">Authority Quick Actions</h3>

            <button
              onClick={triggerCrowdSurge}
              className="w-full py-3 rounded-2xl bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold text-xs hover:bg-orange-500/30 text-left px-4 flex items-center justify-between"
            >
              <span>Simulate 98% Crowd Surge</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('resources')}
              className="w-full py-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold text-xs hover:bg-cyan-500/30 text-left px-4 flex items-center justify-between"
            >
              <span>Auto-Deploy Volunteers</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('cctv')}
              className="w-full py-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold text-xs hover:bg-purple-500/30 text-left px-4 flex items-center justify-between"
            >
              <span>Inspect CCTV Feed Grid</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
