import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Activity, Sparkles, FileText, Download, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

export const ReportsAnalytics: React.FC = () => {
  const { selectedTempleId, temples } = useSimulation();
  const [reportGenerated, setReportGenerated] = useState<boolean>(false);

  const currentTemple = temples.find(t => t.id === selectedTempleId) || temples[0];

  const hourlyData = [
    { hour: '06 AM', visitors: 1200, waitMin: 8 },
    { hour: '08 AM', visitors: 3400, waitMin: 15 },
    { hour: '10 AM', visitors: 5600, waitMin: 22 },
    { hour: '12 PM', visitors: 4200, waitMin: 18 },
    { hour: '02 PM', visitors: 5800, waitMin: 24 },
    { hour: '04 PM', visitors: 7900, waitMin: 32 },
    { hour: '06 PM', visitors: 11200, waitMin: 52 },
    { hour: '08 PM', visitors: 6100, waitMin: 28 },
  ];

  const handleGenerateReport = () => {
    setReportGenerated(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold mb-2 border border-amber-500/30">
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" /> CROWD ANALYTICS & AUDIT INTELLIGENCE
          </div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-7 h-7 text-amber-400" /> Reports & Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Historical visitor throughput, queue bottleneck diagnostics, emergency response logs, and automated executive AI reports.
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-xl hover:scale-105 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Generate Executive AI Report
        </button>
      </div>

      {/* GENERATED AI REPORT SUMMARY BOX */}
      {reportGenerated && (
        <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border-amber-500/40 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <h3 className="font-extrabold text-lg text-amber-400 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Executive AI Daily Summary Report - {currentTemple.name}
            </h3>
            <span className="text-xs text-slate-400 font-mono">Generated at {new Date().toLocaleTimeString()}</span>
          </div>

          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-2">
            <p>
              "Today's crowd reached peak density at <strong>06:45 PM</strong>. Zone A (Main Queue Complex Hall A) experienced the highest physical congestion (96% density). AI computer vision detected zero safety breaches, and emergency response teams maintained a <strong>&lt; 30 second average dispatch window</strong>."
            </p>
            <p className="text-amber-300 font-semibold">
              <strong>Key Recommendation for Tomorrow:</strong> Increase ground volunteer manpower at Gate 1 by 25% during the 05:30 PM - 07:00 PM evening Aarti window, and open auxiliary Promenade Route C.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => alert("Report downloaded as PDF!")}
              className="px-4 py-2 rounded-xl bg-slate-800 text-amber-300 font-bold text-xs hover:bg-slate-700 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Download PDF Report
            </button>
          </div>
        </div>
      )}

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Hourly Visitor Traffic */}
        <div className="glass-panel p-6 rounded-3xl border-amber-500/20">
          <h3 className="font-extrabold text-sm text-white mb-4">Hourly Devotee Traffic Volume</h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#F59E0B', borderRadius: '12px' }} />
                <Bar dataKey="visitors" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Avg Wait Time Trend */}
        <div className="glass-panel p-6 rounded-3xl border-cyan-500/20">
          <h3 className="font-extrabold text-sm text-white mb-4">Average Queue Waiting Time (Minutes)</h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#06B6D4', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="waitMin" stroke="#06B6D4" strokeWidth={3} dot={{ fill: '#06B6D4' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
