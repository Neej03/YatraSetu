import React from 'react';
import { Cpu, Eye, Activity, Shield, Navigation, Database, Lock, Server, ArrowDown } from 'lucide-react';

export const TechArchitecture: React.FC = () => {
  const layers = [
    {
      name: '1. Input Layer',
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20',
      items: ['1080p CCTV Cameras', 'IoT Density Footprint Sensors', 'Historical Festival Archives', 'Weather & Temp Telemetry', 'Train & Bus Arrival API']
    },
    {
      name: '2. AI & Computer Vision Layer',
      color: 'border-amber-500/40 text-amber-400 bg-amber-950/20',
      items: ['YOLOv8 Human Bounding Box Detection', 'OpenCV Head Counting Model', 'LSTM Time Series Prediction', 'Stampede Anomaly Detector']
    },
    {
      name: '3. Intelligence & Analytics Layer',
      color: 'border-purple-500/40 text-purple-400 bg-purple-950/20',
      items: ['Real-Time Density Heatmap Engine', 'Surge Risk Score Calculator (0-100)', 'Graph-Based Route Optimizer', 'Dynamic Slot Capacity Balancer']
    },
    {
      name: '4. Action & Orchestration Layer',
      color: 'border-rose-500/40 text-rose-400 bg-rose-950/20',
      items: ['Automated Push Notifications', 'Turnstile Access Control Override', 'LED Signage Redirection', 'Emergency Corridor Signal Lock']
    },
    {
      name: '5. User Presentation Layer',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20',
      items: ['Pilgrim PWA & Booking Hub', 'Authority Command Center Dashboard', 'Police & Medical Mobile Terminal', 'Public LED Screen Display']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold mb-2 border border-cyan-500/30">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" /> SYSTEM DESIGN SPECIFICATION
        </div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Server className="w-7 h-7 text-amber-400" /> Technology Architecture & AI Pipeline
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Detailed technical breakdown of YatraSetu's 5-tier scalable cloud architecture.
        </p>
      </div>

      {/* 5-TIER PIPELINE DIAGRAM */}
      <div className="space-y-4">
        {layers.map((layer, idx) => (
          <React.Fragment key={idx}>
            <div className={`glass-panel p-6 rounded-3xl border ${layer.color} relative`}>
              <h3 className={`font-extrabold text-sm uppercase tracking-wider mb-3 ${layer.color.split(' ')[1]}`}>
                {layer.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 border border-slate-800 text-white shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {idx < layers.length - 1 && (
              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-amber-400 animate-bounce" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* TECH STACK GRID */}
      <div className="glass-panel p-8 rounded-3xl border-amber-500/30 space-y-4">
        <h3 className="font-extrabold text-base text-white">Full-Stack Frameworks & Libraries</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Frontend UI</span>
            <strong className="text-white">React 18 + Vite + TypeScript</strong>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Styling</span>
            <strong className="text-amber-400">Tailwind CSS + Framer Motion</strong>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">CV Model</span>
            <strong className="text-cyan-300">YOLOv8 + OpenCV + PyTorch</strong>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">GIS & Charts</span>
            <strong className="text-emerald-400">Interactive Canvas SVG + Recharts</strong>
          </div>
        </div>
      </div>

    </div>
  );
};
