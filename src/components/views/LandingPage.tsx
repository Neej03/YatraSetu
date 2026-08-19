import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Shield, Eye, Activity, Siren, Navigation, Calendar, Cpu, ArrowRight, CheckCircle2, Zap, AlertTriangle, Users, Compass, Award, Sparkles } from 'lucide-react';
import { Temple3DViewer } from '../common/Temple3DViewer';

interface AnimatedStatProps {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

const CountUpStat: React.FC<AnimatedStatProps> = ({
  end,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 2000,
  className = ''
}) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeOut * end;
      
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return (
    <span className={className}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

export const LandingPage: React.FC = () => {
  const { setCurrentView, temples, triggerCrowdSurge, isSimulationActive, t } = useSimulation();

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden temple-pattern">
        {/* Glowing background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-6 tracking-wide shadow-lg shadow-amber-500/10">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{t('landing.badge')}</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            {t('landing.title_prefix')} <br />
            <span className="text-saffron-gradient">{t('landing.title_highlight')}</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans">
            {t('landing.subtitle')}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('pilgrim')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/30 hover:scale-105 hover:brightness-110 transition-all flex items-center gap-2"
            >
              {t('landing.explore_hub')} <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setCurrentView('map')}
              className="px-8 py-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-amber-300 hover:text-white hover:border-amber-400 font-bold text-base shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Navigation className="w-5 h-5 text-amber-400" /> {t('common.view_map')}
            </button>

            <button
              onClick={() => setCurrentView('authority')}
              className="px-6 py-4 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold text-base hover:bg-cyan-900/60 transition-all flex items-center gap-2"
            >
              <Shield className="w-5 h-5 text-cyan-400" /> {t('landing.open_command')}
            </button>
          </div>

          {/* Live Statistics Counter Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl border-amber-500/20 text-center transform hover:scale-105 transition-all">
              <CountUpStat end={12} suffix="+" duration={2200} className="block text-2xl sm:text-3xl font-extrabold text-amber-400" />
              <span className="text-xs text-slate-300 font-medium">Temple Zones Monitored</span>
            </div>
            <div className="glass-panel p-4 rounded-2xl border-cyan-500/20 text-center transform hover:scale-105 transition-all">
              <CountUpStat end={24} suffix="/7" duration={2200} className="block text-2xl sm:text-3xl font-extrabold text-cyan-400" />
              <span className="text-xs text-slate-300 font-medium">AI CCTV Detection</span>
            </div>
            <div className="glass-panel p-4 rounded-2xl border-emerald-500/20 text-center transform hover:scale-105 transition-all">
              <CountUpStat end={98.4} decimals={1} suffix="%" duration={2400} className="block text-2xl sm:text-3xl font-extrabold text-emerald-400" />
              <span className="text-xs text-slate-300 font-medium">Prediction Accuracy</span>
            </div>
            <div className="glass-panel p-4 rounded-2xl border-orange-500/20 text-center transform hover:scale-105 transition-all">
              <CountUpStat end={42} suffix="%" duration={2000} className="block text-2xl sm:text-3xl font-extrabold text-orange-400" />
              <span className="text-xs text-slate-300 font-medium">Reduced Queue Wait</span>
            </div>
            <div className="glass-panel p-4 rounded-2xl border-rose-500/20 text-center col-span-2 md:col-span-1 transform hover:scale-105 transition-all">
              <CountUpStat end={30} prefix="< " suffix="s" duration={1800} className="block text-2xl sm:text-3xl font-extrabold text-rose-400" />
              <span className="text-xs text-slate-300 font-medium">Emergency Dispatch</span>
            </div>
          </div>

          {/* 3D LIVE DIGITAL TWIN INTERACTIVE SHOWCASE */}
          <div className="mt-16 max-w-5xl mx-auto space-y-4 text-center">
            <div>
              <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-widest">
                Interactive WebGL 3D Simulation
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
                Real-Time <span className="text-saffron-gradient">3D Live Temple Model</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-1">
                Explore temple architecture, live crowd density heatmaps, 360° orbit viewpoints, and Aarti night lighting modes.
              </p>
            </div>

            <Temple3DViewer heightClass="h-[520px]" />
          </div>

          {/* Animated AI Pipeline Graphic: CCTV -> AI Engine -> Crowd Analysis -> Prediction -> Smart Alerts -> Pilgrim */}
          <div className="mt-16 max-w-5xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border-amber-500/30">
            <div className="text-center mb-6">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest">
                Real-Time Data Pipeline Architecture
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Continuous end-to-end processing loop connecting physical CCTV sensors to pilgrim smartphones
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 relative">
              {[
                { title: 'CCTV Feeds', icon: Eye, color: 'text-cyan-400', desc: '1080p Stream' },
                { title: 'AI Engine', icon: Cpu, color: 'text-amber-400', desc: 'YOLO People Count' },
                { title: 'Crowd Analysis', icon: Activity, color: 'text-orange-400', desc: 'Density Heatmap' },
                { title: 'AI Prediction', icon: Zap, color: 'text-purple-400', desc: 'Surge Forecast' },
                { title: 'Smart Alerts', icon: Siren, color: 'text-rose-400', desc: 'Automated Dispatch' },
                { title: 'Pilgrim App', icon: Navigation, color: 'text-emerald-400', desc: 'Smart Route Guide' },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-center relative group hover:border-amber-500/50 transition-all">
                    <div className={`w-10 h-10 mx-auto rounded-xl bg-slate-950 flex items-center justify-center ${step.color} border border-slate-800 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold text-white mt-2">{step.title}</h4>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{step.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* CORE PRODUCT PRINCIPLE: 5-STEP CYCLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase mb-3">
            Core Engineering Principle
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            "Predict the Crowd Before It Becomes a Problem"
          </h2>
          <p className="text-sm text-slate-300 mt-3">
            YatraSetu doesn't just watch crowds—it proactively manages the entire lifecycle in 5 continuous steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { num: '01', name: 'DETECT', title: 'Computer Vision', desc: 'Measures density & counts devotees per sq meter using existing CCTV feeds.', color: 'border-cyan-500/40 text-cyan-400' },
            { num: '02', name: 'PREDICT', title: 'Surge Forecasting', desc: 'Predicts bottlenecks 1-6 hours ahead combining weather, festival calendars, and history.', color: 'border-amber-500/40 text-amber-400' },
            { num: '03', name: 'ALERT', title: 'Instant Notification', desc: 'Fires automated warnings to police, medical units, and pilgrim mobile apps.', color: 'border-orange-500/40 text-orange-400' },
            { num: '04', name: 'CONTROL', title: 'Resource Override', desc: 'Automatically adjusts entry gate turnstiles and dispatches ground personnel.', color: 'border-rose-500/40 text-rose-400' },
            { num: '05', name: 'GUIDE', title: 'Smart Route Navigation', desc: 'Directs incoming pilgrims to less crowded entry gates and canopy corridors.', color: 'border-emerald-500/40 text-emerald-400' }
          ].map((item, i) => (
            <div key={i} className={`glass-panel p-5 rounded-2xl border ${item.color} hover:scale-105 transition-all relative`}>
              <span className="text-2xl font-black text-slate-700 block">{item.num}</span>
              <h3 className={`text-sm font-black tracking-widest mt-1 ${item.color.split(' ')[1]}`}>
                {item.name}
              </h3>
              <h4 className="text-xs font-bold text-white mt-1">{item.title}</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Comprehensive Smart Pilgrimage Capabilities
          </h2>
          <p className="text-sm text-slate-300 mt-3">
            Designed to empower pilgrims, police forces, temple trusts, and emergency response teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-3xl border-amber-500/20 hover:border-amber-500/50 transition-all cursor-pointer" onClick={() => setCurrentView('cctv')}>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Crowd Detection & Count</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Analyzes existing CCTV feeds to detect human density, flow speed, and bottleneck accumulation without invasive facial recognition.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-pointer" onClick={() => setCurrentView('prediction')}>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Surge Forecasting</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Combines historical festival traffic, weather indices, train schedules, and live density to forecast crowd surges hours in advance.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer" onClick={() => setCurrentView('map')}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Navigation className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Live GIS Density Heatmap</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Provides interactive zone floor plans with 🟢 Low, 🟡 Moderate, 🟠 High, and 🔴 Critical density warnings for every courtyard.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer" onClick={() => setCurrentView('booking')}>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Dynamic Darshan Slots</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              AI dynamically adjusts and recommends optimal low-crowd time windows for pilgrims to minimize queue wait time.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-orange-500/20 hover:border-orange-500/50 transition-all cursor-pointer" onClick={() => setCurrentView('route')}>
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Smart Route Planner</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Suggests safest and least crowded entry paths from parking bays to Garbhagriha based on real-time zone congestion.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border-rose-500/20 hover:border-rose-500/50 transition-all cursor-pointer" onClick={() => setCurrentView('emergency')}>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <Siren className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Emergency Safety Center</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Instant incident reporting, medical dispatch, emergency corridor overrides, and rapid pilgrim evacuation protocols.
            </p>
          </div>

        </div>
      </section>

      {/* SUPPORTED PILGRIMAGE SITES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Active Monitored Shrines
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Modular architecture ready for rapid deployment across all major pilgrimage corridors in India.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('temple')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            View All Temples <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {temples.map((temple) => (
            <div
              key={temple.id}
              className="glass-panel rounded-3xl overflow-hidden border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group"
              onClick={() => setCurrentView('map')}
            >
              <div className="h-44 relative overflow-hidden">
                <img
                  src={temple.image}
                  alt={temple.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <span className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-extrabold rounded-full uppercase border ${
                  temple.riskLevel === 'critical'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : temple.riskLevel === 'high'
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                    : temple.riskLevel === 'moderate'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {temple.riskLevel} Density
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-base text-white">{temple.name}</h3>
                <p className="text-xs text-slate-400">{temple.location}, {temple.state}</p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Live Crowd</span>
                    <span className="font-bold text-amber-300">{temple.currentCrowd.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 text-[10px] block">Avg Wait</span>
                    <span className="font-bold text-white">{temple.avgWaitMinutes} mins</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL LANDING CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-glow p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
            Ready to Experience the Future of Safe Pilgrimages?
          </h2>
          <p className="text-sm text-slate-300 mt-4 max-w-2xl mx-auto">
            Try the live interactive demo right now. Switch between Pilgrim views, inspect CCTV camera feeds, trigger simulated crowd surges, and watch YatraSetu respond in real time.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCurrentView('pilgrim')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-base shadow-xl hover:scale-105 transition-all"
            >
              Launch Pilgrim Hub
            </button>
            <button
              onClick={triggerCrowdSurge}
              className="px-8 py-4 rounded-2xl bg-rose-950/80 text-rose-300 border border-rose-500/40 font-bold text-base hover:bg-rose-900/80 transition-all flex items-center gap-2"
            >
              <Zap className="w-5 h-5 text-rose-400" /> Test Crowd Surge Demo
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
