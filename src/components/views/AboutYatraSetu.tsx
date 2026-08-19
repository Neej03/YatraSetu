import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Shield, Sparkles, Award, Compass, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export const AboutYatraSetu: React.FC = () => {
  const { setCurrentView, triggerCrowdSurge } = useSimulation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Hero Banner */}
      <div className="glass-panel-glow p-8 sm:p-12 rounded-3xl border-amber-500/40 relative overflow-hidden text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold mb-4 border border-amber-500/30">
          <Award className="w-4 h-4 text-amber-400" /> NATIONAL PILGRIM SAFETY EDITION
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          About <span className="text-saffron-gradient">YatraSetu</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-3xl mx-auto leading-relaxed">
          YatraSetu was built to solve critical crowd congestion, stampede risks, and long queue delays across major Indian pilgrimage sites using AI Computer Vision, predictive surge modeling, and real-time emergency routing.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setCurrentView('landing')}
            className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-lg hover:bg-amber-400"
          >
            Go to Landing Page
          </button>
          <button
            onClick={triggerCrowdSurge}
            className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4" /> Trigger Surge Test
          </button>
        </div>
      </div>

      {/* SYSTEM ARCHITECTURE FLOW STEPS */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white">4-Phase Pilgrim Protection Journey</h2>
          <p className="text-xs text-slate-400 mt-1">Comprehensive end-to-end crowd safety workflow</p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="glass-panel p-6 rounded-3xl border-cyan-500/30">
            <span className="text-xs font-bold text-cyan-400 block mb-1">PHASE 1</span>
            <h3 className="font-extrabold text-base text-white">1. Before Arrival</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Check live crowd status → AI recommends 05:30 PM window → Book digital Darshan Slot ticket.
            </p>
            <button
              onClick={() => setCurrentView('booking')}
              className="mt-4 text-xs font-bold text-cyan-400 flex items-center gap-1 hover:underline"
            >
              Test Slot Booking <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-amber-500/30">
            <span className="text-xs font-bold text-amber-400 block mb-1">PHASE 2</span>
            <h3 className="font-extrabold text-base text-white">2. During Visit</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Open Live GIS Crowd Map → Check 🟢/🔴 density heatmaps → Select AI recommended low-congestion Route B.
            </p>
            <button
              onClick={() => setCurrentView('map')}
              className="mt-4 text-xs font-bold text-amber-400 flex items-center gap-1 hover:underline"
            >
              Inspect GIS Map <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-rose-500/30">
            <span className="text-xs font-bold text-rose-400 block mb-1">PHASE 3</span>
            <h3 className="font-extrabold text-base text-white">3. Emergency Trigger</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Click "Trigger Crowd Surge" in toolbar → Watch AI detect 98% density → Automated Emergency Corridor unlocks.
            </p>
            <button
              onClick={() => setCurrentView('emergency')}
              className="mt-4 text-xs font-bold text-rose-400 flex items-center gap-1 hover:underline"
            >
              View Emergency Center <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-purple-500/30">
            <span className="text-xs font-bold text-purple-400 block mb-1">PHASE 4</span>
            <h3 className="font-extrabold text-base text-white">4. Authority Command</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Switch to Command Center → View live CCTV camera bounding box feeds → Rebalance volunteers & generate AI report.
            </p>
            <button
              onClick={() => setCurrentView('authority')}
              className="mt-4 text-xs font-bold text-purple-400 flex items-center gap-1 hover:underline"
            >
              Open Command Hub <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
