import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Compass, MapPin, Users, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const TempleInfo: React.FC = () => {
  const { temples, setSelectedTempleId, setCurrentView } = useSimulation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Compass className="w-7 h-7 text-amber-400" /> Monitored Pilgrimage Destinations
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          YatraSetu connects iconic pilgrimage shrines across Gujarat & India into a unified AI crowd management network.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {temples.map((t) => (
          <div key={t.id} className="glass-panel rounded-3xl overflow-hidden border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div className="h-56 relative overflow-hidden">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  {t.riskLevel} Density
                </span>
                <h3 className="text-2xl font-black text-white mt-1">{t.name}</h3>
                <p className="text-xs text-slate-300">{t.location}, {t.state}</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">{t.description}</p>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block">Capacity</span>
                  <strong className="text-white">{t.totalCapacity.toLocaleString()} max</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Live Crowd</span>
                  <strong className="text-amber-400">{t.currentCrowd.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Avg Wait</span>
                  <strong className="text-cyan-300">{t.avgWaitMinutes} min</strong>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedTempleId(t.id);
                    setCurrentView('map');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
                >
                  Inspect Live Map 🗺️
                </button>
                <button
                  onClick={() => {
                    setSelectedTempleId(t.id);
                    setCurrentView('booking');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
                >
                  Book Darshan Slot 🎟️
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
