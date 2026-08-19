import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { CCTVCamera } from '../../types';
import { Eye, Cpu, Activity, AlertTriangle, Shield, Play, Maximize2, Zap, RefreshCw, Users } from 'lucide-react';

export const CCTVGrid: React.FC = () => {
  const { selectedTempleId, cameras, temples } = useSimulation();
  const [selectedCam, setSelectedCam] = useState<CCTVCamera | null>(cameras[0]);
  const [analyzingCamId, setAnalyzingCamId] = useState<string | null>(null);

  const currentTemple = temples.find(t => t.id === selectedTempleId) || temples[0];

  const handleDeepAnalyze = (camId: string) => {
    setAnalyzingCamId(camId);
    setTimeout(() => {
      setAnalyzingCamId(null);
      alert(`AI Deep Analysis for ${camId}: Bounding box human count validated. Confidence score: 98.6%. No weapon or unauthorized item detected.`);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold mb-2 border border-cyan-500/30">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" /> REAL-TIME YOLOv8 COMPUTER VISION INFERENCE
        </div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Eye className="w-7 h-7 text-amber-400" /> Command Center Live CCTV Monitoring Grid
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Simulated live camera streams with automated human bounding box detection, crowd flow speed estimation, and bottleneck triggers.
        </p>
      </div>

      {/* CCTV CAMERA GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((cam) => {
          const isCritical = cam.density === 'critical';
          const isAnalyzing = analyzingCamId === cam.id;

          return (
            <div
              key={cam.id}
              className={`glass-panel rounded-3xl overflow-hidden border transition-all ${
                isCritical
                  ? 'border-rose-500/50 shadow-lg shadow-rose-950/50'
                  : 'border-slate-800 hover:border-amber-500/40'
              }`}
            >
              {/* Camera Video Feed Canvas Simulator */}
              <div className="h-52 bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-slate-800">
                
                {/* Simulated CCTV Background Image / Scene */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                {/* Animated Scanner Bar */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanner shadow-sm shadow-cyan-400" />

                {/* Simulated Computer Vision Bounding Boxes Overlay */}
                <div className="absolute inset-0 p-4 pointer-events-none">
                  {/* Bounding box 1 */}
                  <div className="absolute top-10 left-12 w-14 h-20 border-2 border-cyan-400 rounded bg-cyan-400/10 flex items-start justify-start p-0.5">
                    <span className="text-[8px] font-mono bg-cyan-400 text-slate-950 px-1 font-bold">Person 0.94</span>
                  </div>
                  {/* Bounding box 2 */}
                  <div className="absolute top-16 left-32 w-16 h-24 border-2 border-cyan-400 rounded bg-cyan-400/10 flex items-start justify-start p-0.5">
                    <span className="text-[8px] font-mono bg-cyan-400 text-slate-950 px-1 font-bold">Person 0.98</span>
                  </div>
                  {/* Bounding box 3 */}
                  <div className="absolute top-8 right-16 w-16 h-24 border-2 border-amber-400 rounded bg-amber-400/10 flex items-start justify-start p-0.5">
                    <span className="text-[8px] font-mono bg-amber-400 text-slate-950 px-1 font-bold">Group 0.91</span>
                  </div>
                  {/* Density Heat ring indicator if critical */}
                  {isCritical && (
                    <div className="absolute inset-0 bg-rose-500/10 border-4 border-rose-500 animate-pulse flex items-center justify-center">
                      <span className="bg-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-lg">
                        🚨 AI CRITICAL SURGE DETECTED
                      </span>
                    </div>
                  )}
                </div>

                {/* Top overlay metadata */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 backdrop-blur-md">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> {cam.id}
                  </span>
                  <span>{cam.fps} FPS</span>
                  <span className="text-cyan-400">Conf: {cam.confidence}%</span>
                </div>

                {/* Bottom Overlay People Count */}
                <div className="absolute bottom-2 left-2 bg-slate-950/90 px-3 py-1 rounded-lg border border-slate-800 text-xs font-bold text-white flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{cam.peopleCount.toLocaleString()} Devotees Counted</span>
                </div>

              </div>

              {/* Card Footer Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">{cam.name}</h4>
                    <span className="text-[10px] text-slate-400 uppercase">Zone: {cam.zoneId}</span>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase border ${
                    cam.density === 'critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {cam.density} Density
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[10px]">
                  <button
                    onClick={() => setSelectedCam(cam)}
                    className="py-1.5 rounded-lg bg-slate-900 text-slate-300 font-bold hover:bg-slate-800 flex items-center justify-center gap-1"
                  >
                    <Maximize2 className="w-3 h-3" /> View Feed
                  </button>

                  <button
                    onClick={() => handleDeepAnalyze(cam.id)}
                    disabled={isAnalyzing}
                    className="py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold hover:bg-cyan-500/30 flex items-center justify-center gap-1 border border-cyan-500/30"
                  >
                    {isAnalyzing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Cpu className="w-3 h-3" />}
                    Analyze
                  </button>

                  <button
                    onClick={() => alert(`Warning alert issued for ${cam.name}`)}
                    className="py-1.5 rounded-lg bg-rose-500/20 text-rose-300 font-bold hover:bg-rose-500/30 flex items-center justify-center gap-1 border border-rose-500/30"
                  >
                    <AlertTriangle className="w-3 h-3" /> Create Alert
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
