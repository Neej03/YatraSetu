import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Shield, PhoneCall, Heart, Cpu, Compass, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { selectedTempleId, temples, setCurrentView, t } = useSimulation();

  const templeTrustHelplines: Record<string, { office: string; phone: string }> = {
    somnath: { office: 'Shree Somnath Trust Office', phone: '1800 233 1300' },
    dwarka: { office: 'Shri Dwarkadhish Devasthan Office', phone: '02892 234080' },
    ambaji: { office: 'Shri Arasuri Ambaji Devasthan Trust', phone: '02749 262136' },
    pavagadh: { office: 'Shri Kalika Mataji Mandir Trust', phone: '02676 245642' }
  };

  const currentHelpline = templeTrustHelplines[selectedTempleId] || templeTrustHelplines.somnath;

  return (
    <footer className="bg-slate-950 border-t border-amber-500/20 text-slate-400 pt-12 pb-24 mt-20 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-bold">
                <Shield className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-lg text-white">
                {t('footer.brand')}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-amber-300 font-semibold">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Smart Tourism & Crowd Safety Theme</span>
            </div>
          </div>

          {/* 5-Step Core Principle */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">The 5-Step AI Cycle</h4>
            <ul className="text-xs space-y-1.5 font-medium text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> 1. DETECT (CCTV / Computer Vision)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> 2. PREDICT (AI Time Series Models)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400" /> 3. ALERT (Automated Notifications)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" /> 4. CONTROL (Resource & Gate Overrides)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> 5. GUIDE (Smart Route Navigation)
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Navigation</h4>
            <div className="grid grid-cols-2 gap-1 text-xs text-slate-300">
              <button onClick={() => setCurrentView('landing')} className="text-left hover:text-amber-300 py-1">{t('nav.home')}</button>
              <button onClick={() => setCurrentView('pilgrim')} className="text-left hover:text-amber-300 py-1">{t('nav.pilgrim')}</button>
              <button onClick={() => setCurrentView('map')} className="text-left hover:text-amber-300 py-1">{t('nav.map')}</button>
              <button onClick={() => setCurrentView('booking')} className="text-left hover:text-amber-300 py-1">{t('nav.booking')}</button>
              <button onClick={() => setCurrentView('route')} className="text-left hover:text-amber-300 py-1">{t('nav.route')}</button>
              <button onClick={() => setCurrentView('authority')} className="text-left hover:text-amber-300 py-1">{t('nav.authority')}</button>
              <button onClick={() => setCurrentView('emergency')} className="text-left hover:text-amber-300 py-1">{t('nav.emergency')}</button>
              <button onClick={() => setCurrentView('about')} className="text-left hover:text-amber-300 py-1">{t('nav.about')}</button>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-rose-500/20">
            <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
              <PhoneCall className="w-4 h-4" /> 24/7 Pilgrimage Hotlines
            </h4>
            <div className="space-y-1 text-xs text-slate-300 font-medium">
              <p>🚑 Medical Emergency: <span className="text-white font-bold">108</span></p>
              <p>👮 Temple Security / Police: <span className="text-white font-bold">100</span></p>
              <p>📍 Disaster Control Room: <span className="text-white font-bold">1070</span></p>
              <p>🏛️ {currentHelpline.office}: <span className="text-amber-300 font-bold">{currentHelpline.phone}</span></p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t('footer.copyright')}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <Lock className="w-3.5 h-3.5" /> Privacy-First Crowd Intelligence
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-slate-400 font-medium">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" /> Built for Safer Yatras
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

