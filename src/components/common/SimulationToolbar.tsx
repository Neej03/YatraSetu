import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Play, Pause, AlertOctagon, RotateCcw, Zap, Activity, Siren } from 'lucide-react';

export const SimulationToolbar: React.FC = () => {
  const {
    isSimulationActive,
    toggleSimulation,
    simulationSpeed,
    setSimulationSpeed,
    triggerCrowdSurge,
    triggerEmergencyEvent,
    resetSimulation
  } = useSimulation();

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 max-w-4xl w-[92%] sm:w-auto">
      <div className="glass-panel-glow px-4 py-2.5 rounded-2xl flex flex-wrap items-center justify-between sm:justify-start gap-3 shadow-2xl border border-amber-500/40 bg-slate-950/90 backdrop-blur-xl">
        
        {/* Simulation Status Badge */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-800">
          <div className="relative flex items-center justify-center">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold tracking-wider text-amber-300 uppercase">
                Live AI Telemetry Engine
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-400">AI CV Feed Simulator</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          
          {/* Play/Pause */}
          <button
            onClick={toggleSimulation}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-md ${
              isSimulationActive
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            {isSimulationActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isSimulationActive ? 'Pause Stream' : 'Start Stream'}
          </button>

          {/* Trigger Surge */}
          <button
            onClick={triggerCrowdSurge}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-orange-500/20 text-orange-300 border border-orange-500/40 hover:bg-orange-500/30 flex items-center gap-1.5 transition-all"
            title="Simulate 98% Crowd Surge in Zone A"
          >
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            Trigger Surge
          </button>

          {/* Trigger Emergency */}
          <button
            onClick={triggerEmergencyEvent}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 flex items-center gap-1.5 transition-all animate-pulse"
            title="Simulate Stampede Emergency Workflow"
          >
            <Siren className="w-3.5 h-3.5 text-rose-400" />
            Trigger Emergency
          </button>

          {/* Reset */}
          <button
            onClick={resetSimulation}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 flex items-center gap-1 transition-all"
            title="Reset Simulation State"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            Reset
          </button>

        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 pl-3 border-l border-slate-800 hidden md:flex">
          <span className="text-[10px] text-slate-400 font-medium">Speed:</span>
          {[1, 2, 5].map((speed) => (
            <button
              key={speed}
              onClick={() => setSimulationSpeed(speed)}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition-all ${
                simulationSpeed === speed
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
