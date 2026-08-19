import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Accessibility, Volume2, Eye, Shield, CheckCircle2, Navigation, VolumeX } from 'lucide-react';

export const AccessibilityView: React.FC = () => {
  const { accessibilityMode, toggleAccessibilityMode, voiceGuidanceEnabled, toggleVoiceGuidance } = useSimulation();

  const speakDemo = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Welcome to YatraSetu Accessibility Mode. Route B East Canopy Garden Way is recommended for wheelchair access.");
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Voice speech simulation active.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold mb-2 border border-emerald-500/30">
          <Accessibility className="w-3.5 h-3.5 text-emerald-400" /> INCLUSIVE PILGRIMAGE DESIGN
        </div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Accessibility className="w-7 h-7 text-amber-400" /> Accessibility & Assistance Hub
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Dedicated support for elderly devotees, differently-abled visitors, and families requiring specialized care.
        </p>
      </div>

      {/* QUICK CONTROLS CARD */}
      <div className="glass-panel p-8 rounded-3xl border-emerald-500/30 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* High Contrast Mode Toggle */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-400" /> High Contrast & Large Text Mode
            </h3>
            <button
              onClick={toggleAccessibilityMode}
              className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all ${
                accessibilityMode
                  ? 'bg-amber-400 text-slate-950 shadow-lg ring-2 ring-amber-300'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {accessibilityMode ? 'Enabled' : 'Enable High Contrast'}
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Increases font sizing, enhances border contrast, and enforces black background for max legibility under bright outdoor sunlight.
          </p>
        </div>

        {/* Audio Voice Guidance */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-cyan-400" /> Audio Voice Guidance
            </h3>
            <button
              onClick={() => {
                toggleVoiceGuidance();
                speakDemo();
              }}
              className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all ${
                voiceGuidanceEnabled
                  ? 'bg-cyan-400 text-slate-950 shadow-lg ring-2 ring-cyan-300'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {voiceGuidanceEnabled ? 'Audio Active 🔊' : 'Test Audio Guidance'}
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Provides audio queue updates, turn-by-turn spoken navigation cues, and vocal alerts for visually impaired pilgrims.
          </p>
        </div>

      </div>

      {/* ACCESSIBILITY FEATURES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border-slate-800">
          <Navigation className="w-8 h-8 text-emerald-400 mb-3" />
          <h3 className="font-bold text-base text-white">Wheelchair Ramp Rerouting</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Smart routes automatically bypass staircases and steep inclines, guiding wheelchairs along smooth gradient ramps.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-slate-800">
          <Shield className="w-8 h-8 text-amber-400 mb-3" />
          <h3 className="font-bold text-base text-white">Elderly Golf Cart Shuttles</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Senior pilgrims can request free electric shuttle pickups directly from Zone 5 Parking Bay to Garbhagriha.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-slate-800">
          <CheckCircle2 className="w-8 h-8 text-purple-400 mb-3" />
          <h3 className="font-bold text-base text-white">Fast Pass Priority Slots</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Priority fast-track entry passes automatically issued for differently-abled devotees and elderly citizens.
          </p>
        </div>
      </div>

    </div>
  );
};
