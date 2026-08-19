import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Layers, Shield, PhoneCall, Users, Sparkles, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';

export const ResourceManagement: React.FC = () => {
  const { resources, rebalanceResources } = useSimulation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold mb-2 border border-cyan-500/30">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> DYNAMIC GROUND RESOURCE ALLOCATION
        </div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Layers className="w-7 h-7 text-amber-400" /> Resource Management Dashboard
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Track and dynamically rebalance police personnel, medical response units, volunteers, barricades, and water stations across temple zones.
        </p>
      </div>

      {/* RESOURCE MATRIX CARDS */}
      <div className="space-y-6">
        {resources.map((r) => (
          <div key={r.zoneId} className="glass-panel p-6 rounded-3xl border-amber-500/30 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
              <div>
                <h3 className="font-extrabold text-lg text-white">{r.zoneName}</h3>
                <span className="text-xs text-slate-400">Zone ID: {r.zoneId}</span>
              </div>

              {/* AI Auto-Rebalance Recommendation Badge */}
              <div className="flex items-center gap-3">
                <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-amber-500/30 text-xs">
                  <span className="text-slate-400">AI Recommendation: </span>
                  <strong className="text-amber-400">Deploy +{r.aiSuggestedVolunteers - r.volunteerCount} Volunteers</strong>
                </div>

                <button
                  onClick={() => rebalanceResources(r.zoneId)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-md hover:brightness-110 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Auto-Deploy AI Plan
                </button>
              </div>
            </div>

            {/* Resource Counts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block">👮 Police Force</span>
                <span className="font-extrabold text-base text-white">{r.policeCount} officers</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block">🧑‍🤝‍🧑 Volunteers</span>
                <span className="font-extrabold text-base text-amber-300">{r.volunteerCount} active</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block">🚑 Medical Staff</span>
                <span className="font-extrabold text-base text-rose-400">{r.medicalCount} doctors</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block">🚧 Barricades</span>
                <span className="font-extrabold text-base text-white">{r.barricades} units</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block">🚑 Ambulances</span>
                <span className="font-extrabold text-base text-cyan-300">{r.ambulances} ready</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block">💧 Water Stations</span>
                <span className="font-extrabold text-base text-emerald-400">{r.waterStations} active</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
