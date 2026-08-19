import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Siren, AlertOctagon, PhoneCall, ShieldAlert, Navigation, Activity, CheckCircle2, UserCheck, MapPin, Cpu, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EmergencyCenter: React.FC = () => {
  const { selectedTempleId, temples, emergencyIncidents, triggerEmergencyEvent, resetSimulation } = useSimulation();
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(3); // Step 3: Alert authority active

  const currentTemple = temples.find(t => t.id === selectedTempleId) || temples[0];

  const workflowSteps = [
    { num: 1, title: 'AI Detects Abnormal Crowd', desc: 'YOLO Computer Vision flags density > 95% in Hall A' },
    { num: 2, title: 'Risk Assessment Index', desc: 'Automated Stampede Risk Score computed: 92/100 (CRITICAL)' },
    { num: 3, title: 'Alert Authority & Command', desc: 'Instant push notification dispatched to Police & Trust Desk' },
    { num: 4, title: 'Notify Response Teams', desc: 'Medical Unit 2 & Rapid Police Unit Alpha deployed to Zone A' },
    { num: 5, title: 'Open Emergency Route', desc: 'Automated turnstiles release West Emergency Promenade' },
    { num: 6, title: 'Redirect Devotees & Contain', desc: 'LED signage shifts incoming flow away from Gate 1' },
  ];

  const handlePanicAction = (type: string) => {
    triggerEmergencyEvent();
    setActiveWorkflowStep(5); // Advance workflow to Open Emergency Route
    alert(`🚨 EMERGENCY ACTION EXECUTED: ${type} dispatched to ${currentTemple.name}. Emergency Promenade unlocked.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-bold mb-2 border border-rose-500/30">
          <Siren className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> HIGH-PRIORITY SAFETY & DISASTER RESPONSE
        </div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <AlertOctagon className="w-7 h-7 text-rose-400" /> Emergency & Safety Command Center
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Rapid emergency dispatch, automated evacuation corridors, medical response tracking, and panic escalation.
        </p>
      </div>

      {/* PANIC ACTION CONTROLS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <button
          onClick={() => handlePanicAction('GENERAL EMERGENCY ALERT')}
          className="glass-panel-red p-5 rounded-2xl border-rose-500/50 hover:bg-rose-900/60 text-center transition-all group"
        >
          <Siren className="w-8 h-8 text-rose-400 mx-auto mb-2 group-hover:scale-110 transition-transform animate-bounce" />
          <span className="font-extrabold text-xs text-white block">🚨 Trigger Emergency Alert</span>
        </button>

        <button
          onClick={() => handlePanicAction('MEDICAL AMBULANCE DISPATCH')}
          className="glass-panel p-5 rounded-2xl border-cyan-500/30 hover:border-cyan-500/60 text-center transition-all group"
        >
          <PhoneCall className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-extrabold text-xs text-white block">🚑 Medical Assistance</span>
        </button>

        <button
          onClick={() => handlePanicAction('RAPID POLICE FORCE')}
          className="glass-panel p-5 rounded-2xl border-amber-500/30 hover:border-amber-500/60 text-center transition-all group"
        >
          <ShieldAlert className="w-8 h-8 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-extrabold text-xs text-white block">👮 Police Response</span>
        </button>

        <button
          onClick={() => handlePanicAction('FIRE & RESCUE UNIT')}
          className="glass-panel p-5 rounded-2xl border-orange-500/30 hover:border-orange-500/60 text-center transition-all group"
        >
          <Activity className="w-8 h-8 text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-extrabold text-xs text-white block">🧑‍🚒 Emergency Rescue</span>
        </button>

        <button
          onClick={() => alert("Pinpoint Incident Location: Zone A Queue Hall turnstile 3.")}
          className="glass-panel p-5 rounded-2xl border-purple-500/30 hover:border-purple-500/60 text-center transition-all group"
        >
          <MapPin className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-extrabold text-xs text-white block">📍 Locate Incident</span>
        </button>

        <button
          onClick={() => handlePanicAction('EMERGENCY ROUTE UNLOCK')}
          className="glass-panel p-5 rounded-2xl border-emerald-500/30 hover:border-emerald-500/60 text-center transition-all group"
        >
          <Navigation className="w-8 h-8 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-extrabold text-xs text-white block">🚪 Open Emergency Route</span>
        </button>

      </div>

      {/* 6-STEP EMERGENCY WORKFLOW VISUALIZER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-rose-500/30 space-y-6">
        <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
          <div>
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-rose-400" /> Automated Emergency Evacuation Workflow
            </h3>
            <p className="text-xs text-slate-400">Step-by-step incident response pipeline</p>
          </div>

          <button
            onClick={resetSimulation}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
          >
            Reset Workflow
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {workflowSteps.map((step) => {
            const isActive = step.num === activeWorkflowStep;
            const isCompleted = step.num < activeWorkflowStep;

            return (
              <div
                key={step.num}
                onClick={() => setActiveWorkflowStep(step.num)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isActive
                    ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg shadow-rose-950/50 ring-2 ring-rose-500/50'
                    : isCompleted
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center ${
                    isActive ? 'bg-rose-500 text-white' : isCompleted ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {step.num}
                  </span>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>

                <h4 className="font-bold text-xs text-white mt-3">{step.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-normal">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTIVE INCIDENTS LOG TABLE */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-white uppercase tracking-wider">Active Incident Tracking</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px]">
              <tr>
                <th className="p-3">Incident ID</th>
                <th className="p-3">Zone</th>
                <th className="p-3">Incident Type</th>
                <th className="p-3">Risk Score</th>
                <th className="p-3">Assigned Team</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {emergencyIncidents.map(inc => (
                <tr key={inc.id}>
                  <td className="p-3 font-mono font-bold text-amber-300">{inc.id}</td>
                  <td className="p-3 font-bold text-white">{inc.zoneName}</td>
                  <td className="p-3 text-rose-300 font-bold">{inc.type}</td>
                  <td className="p-3 font-bold text-rose-400">{inc.riskScore} / 100</td>
                  <td className="p-3 text-slate-300">{inc.assignedTeam}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      {inc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
