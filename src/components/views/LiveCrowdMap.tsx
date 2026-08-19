import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Zone, CrowdLevel } from '../../types';
import { Compass, ZoomIn, ZoomOut, Search, Filter, AlertTriangle, Clock, Users, Shield, X, ArrowRight, CheckCircle2, Box, Layers } from 'lucide-react';
import { Temple3DViewer } from '../common/Temple3DViewer';

export const LiveCrowdMap: React.FC = () => {
  const { selectedTempleId, setSelectedTempleId, temples, zones } = useSimulation();
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [mapMode, setMapMode] = useState<'2d' | '3d'>('3d');

  const currentTemple = temples.find(t => t.id === selectedTempleId) || temples[0];

  const filteredZones = zones.filter(z => {
    const matchesCategory = filterCategory === 'all' || z.category === filterCategory;
    const matchesSearch = z.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDensityColor = (level: CrowdLevel) => {
    switch (level) {
      case 'critical': return { bg: 'bg-rose-500', text: 'text-rose-400', border: 'border-rose-500', shadow: 'shadow-rose-500/50', ring: 'ring-rose-500' };
      case 'high': return { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500', shadow: 'shadow-orange-500/50', ring: 'ring-orange-500' };
      case 'moderate': return { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500', shadow: 'shadow-amber-500/50', ring: 'ring-amber-500' };
      default: return { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500', shadow: 'shadow-emerald-500/50', ring: 'ring-emerald-500' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              LIVE DIGITAL TWIN
            </span>
            <span className="text-xs text-slate-400">Real-time WebGL & GIS Telemetry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1 flex items-center gap-2">
            <Compass className="w-7 h-7 text-amber-400" /> Live Crowd Map & 3D Model - {currentTemple.name}
          </h1>
        </div>

        {/* Temple Switcher & Map Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* 2D vs 3D View Switcher */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-amber-500/30">
            <button
              onClick={() => setMapMode('3d')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                mapMode === '3d'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" /> 3D Live Model
            </button>
            <button
              onClick={() => setMapMode('2d')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                mapMode === '2d'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> 2D GIS Map
            </button>
          </div>

          <select
            value={selectedTempleId}
            onChange={(e) => setSelectedTempleId(e.target.value as any)}
            className="bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold px-3 py-2 rounded-xl focus:outline-none"
          >
            {temples.map(t => (
              <option key={t.id} value={t.id} className="bg-slate-900 text-white">{t.name}</option>
            ))}
          </select>

          {mapMode === '2d' && (
            <button
              onClick={() => setShowRoutes(!showRoutes)}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                showRoutes ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {showRoutes ? 'Hide AI Routes Overlay' : 'Show AI Routes Overlay'}
            </button>
          )}
        </div>
      </div>

      {/* 3D LIVE MODEL DISPLAY */}
      {mapMode === '3d' && (
        <div className="space-y-4">
          <Temple3DViewer heightClass="h-[640px]" />
        </div>
      )}

      {/* 2D GIS MAP DISPLAY */}
      {mapMode === '2d' && (
        <>
      {/* FILTER & SEARCH BAR */}
      <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border-amber-500/20">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search zone (e.g., Gate 1, Queue Hall A, Food Court)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1">
          {['all', 'entrance', 'queue', 'shrine', 'parking', 'food', 'exit', 'emergency'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${
                filterCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* MAP CANVAS & LEGEND CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* MAP DISPLAY (3 COLS) */}
        <div className="lg:col-span-3 glass-panel p-4 rounded-3xl border-amber-500/30 relative overflow-hidden min-h-[500px] flex flex-col justify-between">
          
          {/* Top Bar inside Map */}
          <div className="flex items-center justify-between z-10 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" /> GIS Live Feed Active
              </span>
              <span className="text-slate-400 hidden sm:inline">Temple Campus Map v4.2</span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-slate-400 px-2">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.1))}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* VISUAL SVG MAP FLOOR PLAN */}
          <div className="relative w-full h-[480px] my-4 rounded-2xl bg-[#090D1A] overflow-hidden border border-slate-800/80 flex items-center justify-center">
            
            {/* Architectural Grid & Background SVG */}
            <svg
              className="absolute inset-0 w-full h-full transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
              viewBox="0 0 800 500"
            >
              {/* Grid Lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245, 158, 11, 0.05)" strokeWidth="1" />
                </pattern>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Temple Main Shrine Outline */}
              <circle cx="500" cy="200" r="70" fill="rgba(245, 158, 11, 0.08)" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" strokeDasharray="4" />
              <rect x="460" y="160" width="80" height="80" fill="none" stroke="#F59E0B" strokeWidth="2" rx="10" />
              <text x="500" y="205" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="bold">GARBHAGRIHA</text>

              {/* Courtyard Outlines */}
              <path d="M 150,240 L 350,240 L 350,200 L 440,200" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="16" strokeLinecap="round" />
              <text x="250" y="235" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold">MAIN QUEUE HALL A</text>

              {/* Recommended AI Route Line Overlay */}
              {showRoutes && (
                <g>
                  {/* Route B Path */}
                  <path
                    d="M 120,100 L 250,120 L 400,120 L 500,160"
                    fill="none"
                    stroke="url(#routeGrad)"
                    strokeWidth="4"
                    strokeDasharray="8 4"
                    className="animate-pulse"
                  />
                  <text x="280" y="110" fill="#06B6D4" fontSize="10" fontWeight="bold">AI RECOMMENDED ROUTE B (FAST PASS)</text>
                </g>
              )}

              {/* Interactive Zone Nodes */}
              {filteredZones.map((zone) => {
                const colors = getDensityColor(zone.riskLevel);
                const isSelected = selectedZone?.id === zone.id;
                const px = (zone.coordinates.x / 100) * 800;
                const py = (zone.coordinates.y / 100) * 500;

                return (
                  <g
                    key={zone.id}
                    transform={`translate(${px}, ${py})`}
                    onClick={() => setSelectedZone(zone)}
                    className="cursor-pointer group"
                  >
                    {/* Outer Heat Ring */}
                    <circle
                      r={zone.densityPercentage > 85 ? '32' : '24'}
                      className={`${colors.bg} opacity-20 animate-ping`}
                      style={{ animationDuration: zone.riskLevel === 'critical' ? '1.5s' : '3s' }}
                    />
                    <circle r="18" fill="#0F172A" stroke={colors.text.replace('text-', '#')} strokeWidth="3" />

                    {/* Density Percent Text */}
                    <text
                      textAnchor="middle"
                      dy="4"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {zone.densityPercentage}%
                    </text>

                    {/* Label Tag below node */}
                    <rect
                      x="-60"
                      y="24"
                      width="120"
                      height="20"
                      rx="6"
                      fill="#070913"
                      stroke={isSelected ? '#F59E0B' : 'rgba(255,255,255,0.2)'}
                      strokeWidth={isSelected ? '2' : '1'}
                    />
                    <text
                      x="0"
                      y="37"
                      textAnchor="middle"
                      fill="#E2E8F0"
                      fontSize="9"
                      fontWeight="600"
                    >
                      {zone.name.length > 18 ? zone.name.substring(0, 16) + '...' : zone.name}
                    </text>
                  </g>
                );
              })}

            </svg>

          </div>

          {/* Bottom Density Legend Bar */}
          <div className="flex flex-wrap items-center justify-between bg-slate-950/80 p-3 rounded-2xl border border-slate-800 gap-4">
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="text-slate-400">Crowd Density Legend:</span>
              <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Low (&lt;40%)</span>
              <span className="flex items-center gap-1.5 text-amber-400"><span className="w-3 h-3 rounded-full bg-amber-500" /> Moderate (40-70%)</span>
              <span className="flex items-center gap-1.5 text-orange-400"><span className="w-3 h-3 rounded-full bg-orange-500" /> High (70-85%)</span>
              <span className="flex items-center gap-1.5 text-rose-400"><span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" /> Critical (&gt;85%)</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">Click any zone circle to view live parameters</span>
          </div>

        </div>

        {/* ZONE DETAILS DRAWER SIDE PANEL (1 COL) */}
        <div className="lg:col-span-1">
          {selectedZone ? (
            <div className="glass-panel-glow p-6 rounded-3xl border-amber-500/40 space-y-5 sticky top-24">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase border ${getDensityColor(selectedZone.riskLevel).bg}/20 ${getDensityColor(selectedZone.riskLevel).text} ${getDensityColor(selectedZone.riskLevel).border}`}>
                  {selectedZone.riskLevel} Risk Level
                </span>
                <button onClick={() => setSelectedZone(null)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="font-extrabold text-lg text-white">{selectedZone.name}</h3>
                <p className="text-xs text-slate-400 capitalize">Category: {selectedZone.category}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Current Crowd</span>
                  <span className="font-extrabold text-base text-white">{selectedZone.currentCount.toLocaleString()}</span>
                  <span className="text-[9px] text-slate-500 block">Cap: {selectedZone.maxCapacity}</span>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Density Index</span>
                  <span className={`font-extrabold text-base ${getDensityColor(selectedZone.riskLevel).text}`}>
                    {selectedZone.densityPercentage}%
                  </span>
                  <span className="text-[9px] text-slate-500 block">Physical Occupancy</span>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Est Wait Time</span>
                  <span className="font-extrabold text-base text-cyan-300">{selectedZone.avgWaitMinutes} mins</span>
                  <span className="text-[9px] text-slate-500 block">Queue Delay</span>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">CCTV Camera</span>
                  <span className="font-extrabold text-xs text-amber-300">CAM-0{selectedZone.id.slice(-1)}</span>
                  <span className="text-[9px] text-emerald-400 block">AI Active</span>
                </div>
              </div>

              {/* AI Recommended Action Card */}
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-amber-500/30">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                  <Shield className="w-4 h-4" /> AI Recommended Action
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedZone.recommendedAction}
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => alert(`Signage override sent to ${selectedZone.name} LED Boards.`)}
                  className="w-full py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs hover:bg-amber-500/30"
                >
                  Send Signage Override Alert
                </button>
              </div>

            </div>
          ) : (
            <div className="glass-panel p-6 rounded-3xl text-center border-slate-800">
              <Compass className="w-10 h-10 text-amber-400/50 mx-auto mb-3" />
              <h3 className="font-bold text-white text-sm">No Zone Selected</h3>
              <p className="text-xs text-slate-400 mt-1">
                Click any zone marker on the GIS map to inspect live metrics, camera status, and AI actions.
              </p>
            </div>
          )}
        </div>

      </div>
      </>
      )}

    </div>
  );
};
