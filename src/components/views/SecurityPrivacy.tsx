import React from 'react';
import { Lock, Shield, EyeOff, UserCheck, Key, FileCheck } from 'lucide-react';

export const SecurityPrivacy: React.FC = () => {
  const roles = [
    { role: 'Pilgrim', access: 'Public Crowd Density, Slot Booking, Smart Navigation, Personal QR Ticket' },
    { role: 'Volunteer', access: 'Zone Footprint Counts, Water/Gate Station Requests, Pilgrim Assistance' },
    { role: 'Police / Security', access: 'CCTV Bounding Box Feeds, Crowd Control Gates, Incident Dispatch, Alert Escalation' },
    { role: 'Medical Team', access: 'SOS Location Beacons, Ambulance Route Overrides, Casualty Log' },
    { role: 'Temple Authority', access: 'Executive Analytics, Staff Deployment, Resource Auto-Rebalance, Gate Override' },
    { role: 'Super Admin', access: 'Full System Calibration, Model Fine-Tuning, Global Audit Logs' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold mb-2 border border-cyan-500/30">
          <Lock className="w-3.5 h-3.5 text-cyan-400" /> PRIVACY-BY-DESIGN COMPLIANCE
        </div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Shield className="w-7 h-7 text-amber-400" /> Security, Role-Based Access & Privacy
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          YatraSetu processes CCTV feeds strictly for head/body counting. Zero facial biometric data is stored.
        </p>
      </div>

      {/* ROLE BASED ACCESS CONTROL GRID */}
      <div className="glass-panel p-6 rounded-3xl border-amber-500/30 space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-amber-400" /> Role-Based Access Control (RBAC) Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px]">
              <tr>
                <th className="p-3">User Role</th>
                <th className="p-3">Access Level & Permissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {roles.map((r, i) => (
                <tr key={i}>
                  <td className="p-3 font-bold text-amber-300">{r.role}</td>
                  <td className="p-3 text-slate-200">{r.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRIVACY GUARANTEES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border-slate-800">
          <EyeOff className="w-8 h-8 text-cyan-400 mb-3" />
          <h3 className="font-bold text-base text-white">Anonymized People Counting</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Computer vision algorithms convert camera pixels into numerical count centroids only. No facial features or biometric identifiers are recorded.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-slate-800">
          <Key className="w-8 h-8 text-amber-400 mb-3" />
          <h3 className="font-bold text-base text-white">AES-256 Encrypted Telemetry</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            All data in transit between IoT sensors, CCTV edge nodes, and cloud servers is encrypted using bank-grade AES-256 standards.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-slate-800">
          <FileCheck className="w-8 h-8 text-emerald-400 mb-3" />
          <h3 className="font-bold text-base text-white">Immutable Audit Logging</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Every gate override, emergency alert trigger, and resource rebalance action is logged with timestamp signatures.
          </p>
        </div>
      </div>

    </div>
  );
};
