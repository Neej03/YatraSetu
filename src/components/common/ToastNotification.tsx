import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { AlertOctagon, X, CheckCircle, Info } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { activeToast, dismissToast } = useSimulation();

  if (!activeToast) return null;

  const isCritical = activeToast.type === 'critical';
  const isHigh = activeToast.type === 'high';

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md w-full animate-bounce">
      <div className={`p-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-start gap-3 ${
        isCritical
          ? 'bg-rose-950/90 border-rose-500/50 text-rose-100 shadow-rose-900/50'
          : isHigh
          ? 'bg-amber-950/90 border-amber-500/50 text-amber-100 shadow-amber-900/50'
          : 'bg-slate-900/90 border-cyan-500/50 text-cyan-100 shadow-cyan-900/50'
      }`}>
        <div className="p-2 rounded-xl bg-slate-900/50">
          {isCritical ? (
            <AlertOctagon className="w-6 h-6 text-rose-400 animate-pulse" />
          ) : isHigh ? (
            <AlertOctagon className="w-6 h-6 text-amber-400" />
          ) : (
            <CheckCircle className="w-6 h-6 text-cyan-400" />
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm tracking-wide">{activeToast.title}</h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{activeToast.message}</p>
        </div>
        <button
          onClick={dismissToast}
          className="p-1 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
