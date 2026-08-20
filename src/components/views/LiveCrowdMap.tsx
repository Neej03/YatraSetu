import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Zone, CrowdLevel, TempleId } from '../../types';
import { Compass, ZoomIn, ZoomOut, Search, Filter, AlertTriangle, Clock, Users, Shield, X, ArrowRight, CheckCircle2, Layers, Globe, MapPin, ExternalLink, Navigation, Camera, Image as ImageIcon } from 'lucide-react';

// Real-Life GPS Coordinates & Google Map Configs per Temple
const TEMPLE_GPS_COORDS: Record<TempleId, { lat: number; lng: number; address: string; mapZoom: number; queryName: string }> = {
  somnath: {
    lat: 20.8880,
    lng: 70.4012,
    address: 'Somnath Mandir, Prabhas Patan, Veraval, Gujarat 362268',
    mapZoom: 17,
    queryName: 'Somnath+Temple+Gujarat'
  },
  dwarka: {
    lat: 22.2378,
    lng: 68.9678,
    address: 'Dwarkadhish Temple, Dwarka, Gujarat 361335',
    mapZoom: 17,
    queryName: 'Dwarkadhish+Temple+Dwarka'
  },
  ambaji: {
    lat: 24.3297,
    lng: 72.8467,
    address: 'Ambaji Shakti Peeth, Banaskantha, Gujarat 385110',
    mapZoom: 17,
    queryName: 'Ambaji+Temple+Gujarat'
  },
  pavagadh: {
    lat: 22.4833,
    lng: 73.5167,
    address: 'Kalika Mata Temple, Pavagadh Hill, Gujarat 389360',
    mapZoom: 16,
    queryName: 'Kalika+Mata+Temple+Pavagadh'
  }
};

// Real High-Resolution Location Photography for Campus Zones
const ZONE_REAL_IMAGES: Record<string, { url: string; caption: string }> = {
  '1': {
    url: '/images/sanctum.jpg',
    caption: 'Garbhagriha Inner Sanctum Shrine with Golden Shivling'
  },
  '2': {
    url: '/images/entrance.jpg',
    caption: 'Grand Torana Main Entrance Gopuram & Carved Archway'
  },
  '3': {
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
    caption: 'Nandi Chowk Covered Pilgrim Queue Hall A'
  },
  '4': {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    caption: 'Arabian Sea Wall Promenade & Coastal Breakwater'
  },
  '5': {
    url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop',
    caption: 'Pilgrim Transport Bus & Car Parking Plaza'
  },
  '6': {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    caption: 'Anna Kshetra Mahaprasad Dining Hall'
  },
  '7': {
    url: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=800&auto=format&fit=crop',
    caption: 'North Emergency Evacuation Gate & Route'
  }
};

const getZoneRealImage = (zone: Zone) => {
  if (ZONE_REAL_IMAGES[zone.id]) return ZONE_REAL_IMAGES[zone.id];
  if (zone.category === 'shrine') return { url: '/images/sanctum.jpg', caption: 'Inner Temple Shrine' };
  if (zone.category === 'entrance') return { url: '/images/entrance.jpg', caption: 'Main Temple Entrance Gate' };
  if (zone.category === 'queue') return { url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop', caption: 'Pilgrim Queue Hall' };
  if (zone.category === 'parking') return { url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop', caption: 'Parking Complex' };
  return { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', caption: 'Temple Campus Grounds' };
};

export const LiveCrowdMap: React.FC = () => {
  const { selectedTempleId, setSelectedTempleId, temples, zones } = useSimulation();
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [showRealImages, setShowRealImages] = useState<boolean>(true);
  const [mapMode, setMapMode] = useState<'google' | '2d'>('google');
  const [googleLayer, setGoogleLayer] = useState<'h' | 'k' | 'm' | 'p'>('h');

  const currentTemple = temples.find(t => t.id === selectedTempleId) || temples[0];
  const gpsInfo = TEMPLE_GPS_COORDS[selectedTempleId] || TEMPLE_GPS_COORDS.somnath;

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
            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-400" /> REAL-WORLD GOOGLE MAPS & PHOTO GIS
            </span>
            <span className="text-xs text-slate-400 font-sans">Satellite Imagery & Real Zone Photography</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1 flex items-center gap-2">
            <Compass className="w-7 h-7 text-amber-400" /> Live GIS Crowd Map - {currentTemple.name}
          </h1>
        </div>

        {/* Temple Switcher & Map Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Map View Mode Switcher */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-amber-500/30">
            <button
              onClick={() => setMapMode('google')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                mapMode === 'google'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> Google Satellite Map
            </button>

            <button
              onClick={() => setMapMode('2d')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                mapMode === '2d'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> 2D Schematic GIS (Photos)
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
              {showRoutes ? 'Hide AI Routes' : 'Show AI Routes'}
            </button>
          )}
        </div>
      </div>

      {/* REAL-WORLD GOOGLE MAPS GIS DISPLAY */}
      {mapMode === 'google' && (
        <div className="space-y-4">
          
          {/* Top Google Maps Status Bar */}
          <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <MapPin className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  {gpsInfo.address}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  GPS: {gpsInfo.lat.toFixed(4)}° N, {gpsInfo.lng.toFixed(4)}° E • Real Satellite Telemetry
                </p>
              </div>
            </div>

            {/* Google Layer Switchers & App Directions Button */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setGoogleLayer('h')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    googleLayer === 'h' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🛰️ Satellite Hybrid
                </button>
                <button
                  onClick={() => setGoogleLayer('k')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    googleLayer === 'k' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⛰️ 3D Satellite
                </button>
                <button
                  onClick={() => setGoogleLayer('m')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    googleLayer === 'm' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🚗 Roads & Traffic
                </button>
              </div>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${gpsInfo.lat},${gpsInfo.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" /> Open Google Maps Navigation <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* GOOGLE MAP IFRAME & TELEMETRY OVERLAY GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Main Google Maps Viewer (3 Cols) */}
            <div className="lg:col-span-3 glass-panel p-2 rounded-3xl border border-amber-500/30 relative overflow-hidden min-h-[580px] shadow-2xl">
              
              {/* Google Maps iFrame */}
              <iframe
                title={`Google Map - ${currentTemple.name}`}
                width="100%"
                height="580"
                className="rounded-2xl border-0 shadow-inner"
                src={`https://maps.google.com/maps?q=${gpsInfo.lat},${gpsInfo.lng}&t=${googleLayer}&z=${gpsInfo.mapZoom}&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
                loading="lazy"
              />

              {/* Dynamic Live Telemetry Watermark & Live Feed Overlay */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-amber-500/40 backdrop-blur-xl shadow-xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-white tracking-wide">
                  Live Satellite GIS Stream: <span className="text-amber-400">{currentTemple.name}</span>
                </span>
              </div>
            </div>

            {/* Live Crowd Telemetry Zone Pins Drawer (1 Col) */}
            <div className="lg:col-span-1 space-y-3 max-h-[580px] overflow-y-auto pr-1">
              <div className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <h4 className="font-extrabold text-xs text-white flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-400" /> GPS Campus Zones
                </h4>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  {zones.length} Sensors
                </span>
              </div>

              {zones.map((zone) => {
                const colors = getDensityColor(zone.riskLevel);
                const isSelected = selectedZone?.id === zone.id;
                const realImg = getZoneRealImage(zone);

                return (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-slate-900 border-amber-500 shadow-lg shadow-amber-500/20'
                        : 'bg-slate-950/80 border-slate-800/80 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img src={realImg.url} alt={zone.name} className="w-10 h-10 rounded-xl object-cover border border-amber-500/30" />
                      <div className="flex-1 min-w-0">
                        <span className="font-extrabold text-xs text-white truncate block">{zone.name}</span>
                        <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded border inline-block ${colors.bg}/20 ${colors.text} ${colors.border}`}>
                          {zone.riskLevel}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-slate-800/60">
                      <div>
                        <span className="text-slate-400 block">Occupancy</span>
                        <span className="font-bold text-amber-300">{zone.currentCount} / {zone.maxCapacity}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Wait Time</span>
                        <span className="font-bold text-cyan-300">{zone.avgWaitMinutes} min</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

      {/* 2D SCHEMATIC GIS MAP DISPLAY WITH REAL LOCATION PHOTOS */}
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
          <div className="flex flex-wrap items-center justify-between gap-2 z-10 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" /> Real Location Photography GIS
              </span>
              <span className="text-slate-400 hidden sm:inline">2D Campus Floorplan v4.2</span>
            </div>

            {/* Toggle Real Photo Cards & Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowRealImages(!showRealImages)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 ${
                  showRealImages
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                {showRealImages ? 'Real Location Photos ON' : 'Show Location Photos'}
              </button>

              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))}
                  className="p-1 rounded-lg text-slate-300 hover:text-white"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono text-slate-400 px-1">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.1))}
                  className="p-1 rounded-lg text-slate-300 hover:text-white"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* VISUAL SVG MAP FLOOR PLAN WITH REAL LOCATION PHOTO CARDS */}
          <div className="relative w-full h-[520px] my-4 rounded-2xl bg-[#090D1A] overflow-hidden border border-slate-800/80 flex items-center justify-center">
            
            {/* Architectural Grid & Background SVG */}
            <svg
              className="absolute inset-0 w-full h-full transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
              viewBox="0 0 800 520"
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
              <circle cx="500" cy="200" r="75" fill="rgba(245, 158, 11, 0.08)" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" strokeDasharray="4" />
              <rect x="455" y="155" width="90" height="90" fill="none" stroke="#F59E0B" strokeWidth="2" rx="12" />
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

              {/* Interactive Zone Nodes & Real Location Photo Overlay */}
              {filteredZones.map((zone) => {
                const colors = getDensityColor(zone.riskLevel);
                const isSelected = selectedZone?.id === zone.id;
                const realImg = getZoneRealImage(zone);
                const px = (zone.coordinates.x / 100) * 800;
                const py = (zone.coordinates.y / 100) * 520;

                return (
                  <g
                    key={zone.id}
                    transform={`translate(${px}, ${py})`}
                    onClick={() => setSelectedZone(zone)}
                    className="cursor-pointer group"
                  >
                    {/* Outer Heat Ring */}
                    <circle
                      r={zone.densityPercentage > 85 ? '34' : '26'}
                      className={`${colors.bg} opacity-25 animate-ping`}
                      style={{ animationDuration: zone.riskLevel === 'critical' ? '1.5s' : '3s' }}
                    />

                    {/* REAL LOCATION PHOTO CARD OVERLAY */}
                    {showRealImages && (
                      <foreignObject
                        x="-45"
                        y="-70"
                        width="90"
                        height="60"
                        className="overflow-visible pointer-events-none"
                      >
                        <div className={`w-[90px] h-[60px] rounded-xl overflow-hidden shadow-2xl border-2 transition-all ${
                          isSelected ? 'border-amber-400 scale-110 ring-4 ring-amber-500/30' : 'border-slate-700 group-hover:border-amber-400 group-hover:scale-105'
                        }`}>
                          <img src={realImg.url} alt={zone.name} className="w-full h-full object-cover" />
                        </div>
                      </foreignObject>
                    )}

                    {/* Center Node Dot */}
                    <circle r="16" fill="#0F172A" stroke={colors.text.replace('text-', '#')} strokeWidth="3" />

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
                      x="-65"
                      y="22"
                      width="130"
                      height="22"
                      rx="6"
                      fill="#0F172A"
                      stroke={isSelected ? '#F59E0B' : 'rgba(255,255,255,0.2)'}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="36"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {zone.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

        </div>

        {/* ZONE DETAILS DRAWER SIDE PANEL WITH REAL PHOTO BANNER */}
        <div className="lg:col-span-1">
          {selectedZone ? (
            <div className="glass-panel-glow p-5 rounded-3xl border-amber-500/40 space-y-4 sticky top-24">
              
              {/* REAL LOCATION PHOTO BANNER */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl group">
                <img
                  src={getZoneRealImage(selectedZone).url}
                  alt={selectedZone.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 text-[9px] font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Camera className="w-3 h-3 text-amber-400" /> Real Photo
                </span>

                <div className="absolute bottom-2 left-3 right-3">
                  <p className="text-[10px] font-bold text-amber-300 truncate">
                    {getZoneRealImage(selectedZone).caption}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase border ${getDensityColor(selectedZone.riskLevel).bg}/20 ${getDensityColor(selectedZone.riskLevel).text} ${getDensityColor(selectedZone.riskLevel).border}`}>
                  {selectedZone.riskLevel} Risk Level
                </span>
                <button onClick={() => setSelectedZone(null)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-white">{selectedZone.name}</h3>
                <p className="text-xs text-slate-400 capitalize">Category: {selectedZone.category}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Current Crowd</span>
                  <span className="font-extrabold text-sm text-white">{selectedZone.currentCount.toLocaleString()}</span>
                  <span className="text-[9px] text-slate-500 block">Cap: {selectedZone.maxCapacity}</span>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Density Index</span>
                  <span className={`font-extrabold text-sm ${getDensityColor(selectedZone.riskLevel).text}`}>
                    {selectedZone.densityPercentage}%
                  </span>
                  <span className="text-[9px] text-slate-500 block">Physical Occupancy</span>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Est Wait Time</span>
                  <span className="font-extrabold text-sm text-cyan-300">{selectedZone.avgWaitMinutes} mins</span>
                  <span className="text-[9px] text-slate-500 block">Queue Delay</span>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">CCTV Camera</span>
                  <span className="font-extrabold text-xs text-amber-300">CAM-0{selectedZone.id.slice(-1)}</span>
                  <span className="text-[9px] text-emerald-400 block">AI Active</span>
                </div>
              </div>

              {/* AI Recommended Action Card */}
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-amber-500/30">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                  <Shield className="w-4 h-4" /> AI Recommended Action
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {selectedZone.recommendedAction}
                </p>
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <button
                  onClick={() => alert(`Signage override sent to ${selectedZone.name} LED Boards.`)}
                  className="w-full py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs hover:bg-amber-500/30"
                >
                  Send Signage Override Alert
                </button>
              </div>

            </div>
          ) : (
            <div className="glass-panel p-6 rounded-3xl text-center border-slate-800">
              <Camera className="w-10 h-10 text-amber-400/50 mx-auto mb-3 animate-pulse" />
              <h3 className="font-bold text-white text-sm">Select Campus Zone</h3>
              <p className="text-xs text-slate-400 mt-1">
                Click any zone marker to view its real location photo, live occupancy sensor feed, and CCTV metrics.
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
