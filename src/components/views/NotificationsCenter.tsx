import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Bell, AlertOctagon, CheckCircle2, Shield, Filter } from 'lucide-react';

export const NotificationsCenter: React.FC = () => {
  const { alerts, acknowledgeAlert } = useSimulation();
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredAlerts = alerts.filter(a => filterSeverity === 'all' || a.severity === filterSeverity);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Bell className="w-7 h-7 text-amber-400" /> Notifications & AI Dispatch Log
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Real-time push alerts, crowd surge notifications, and emergency route dispatch logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['all', 'critical', 'high', 'moderate'].map(s => (
            <button
              key={s}
              onClick={() => setFilterSeverity(s)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${
                filterSeverity === s ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map(a => (
          <div
            key={a.id}
            className={`glass-panel p-6 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              a.severity === 'critical' ? 'border-rose-500/40 bg-rose-950/20' : 'border-amber-500/30'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shrink-0">
                <AlertOctagon className={`w-6 h-6 ${a.severity === 'critical' ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-white">{a.title}</h3>
                  <span className="text-[10px] text-slate-400">{a.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{a.message}</p>
                <div className="mt-2 text-xs text-amber-400 font-semibold">
                  <span>AI Recommended Intervention: {a.recommendedAction}</span>
                </div>
              </div>
            </div>

            <div>
              {!a.isAcknowledged ? (
                <button
                  onClick={() => acknowledgeAlert(a.id)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
                >
                  Acknowledge Alert
                </button>
              ) : (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Acknowledged
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
