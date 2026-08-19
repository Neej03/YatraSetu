import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { MOCK_DARSHAN_SLOTS } from '../../data/mockData';
import { BookingPass, DarshanSlot } from '../../types';
import { Calendar, Clock, Sparkles, Users, CheckCircle2, QrCode, Ticket, ShieldCheck, ArrowRight, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DarshanSlotBooking: React.FC = () => {
  const { selectedTempleId, setSelectedTempleId, temples, addBookingPass, activePasses } = useSimulation();

  const [date, setDate] = useState<string>('2026-08-19');
  const [visitorCount, setVisitorCount] = useState<number>(2);
  const [primaryVisitorName, setPrimaryVisitorName] = useState<string>('Rajesh Sharma');
  const [selectedSlot, setSelectedSlot] = useState<DarshanSlot | null>(MOCK_DARSHAN_SLOTS[2]); // Default AI Recommended
  const [showPassModal, setShowPassModal] = useState<boolean>(false);
  const [generatedPass, setGeneratedPass] = useState<BookingPass | null>(null);

  const currentTemple = temples.find(t => t.id === selectedTempleId) || temples[0];

  const handleBooking = () => {
    if (!selectedSlot) return;

    const pass: BookingPass = {
      bookingId: `YATRA-${Math.floor(100000 + Math.random() * 900000)}`,
      templeName: currentTemple.name,
      date: date,
      timeSlot: selectedSlot.timeWindow,
      visitorCount: visitorCount,
      primaryVisitorName: primaryVisitorName || 'Pilgrim',
      assignedGate: 'Gate 3 (East Canopy Fast Pass Entrance)',
      qrData: `YATRA-${selectedTempleId.toUpperCase()}-${selectedSlot.id}-${visitorCount}PAX`,
      status: 'Confirmed',
      createdAt: new Date().toLocaleTimeString()
    };

    addBookingPass(pass);
    setGeneratedPass(pass);
    setShowPassModal(true);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold mb-2 border border-purple-500/30">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" /> DYNAMIC AI CAPACITY MANAGEMENT
        </div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Calendar className="w-7 h-7 text-amber-400" /> Smart Darshan Slot Booking
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Select your visit details. YatraSetu AI calculates expected temple capacity to suggest optimal low-queue entry slots.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT 2 COLS: BOOKING FORM & TIMELINE */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Input Parameters Form */}
          <div className="glass-panel p-6 rounded-3xl border-amber-500/30 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Temple Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Select Temple</label>
              <select
                value={selectedTempleId}
                onChange={(e) => setSelectedTempleId(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-amber-300 focus:outline-none focus:border-amber-500/50"
              >
                {temples.map(t => (
                  <option key={t.id} value={t.id} className="bg-slate-900 text-white">{t.name}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Visit Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Visitors */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Number of Visitors</label>
              <select
                value={visitorCount}
                onChange={(e) => setVisitorCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                  <option key={n} value={n} className="bg-slate-900">{n} Devotees</option>
                ))}
              </select>
            </div>

            {/* Primary Name */}
            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-400 mb-1">Primary Visitor Name</label>
              <input
                type="text"
                value={primaryVisitorName}
                onChange={(e) => setPrimaryVisitorName(e.target.value)}
                placeholder="Enter full name..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

          </div>

          {/* AI BEST RECOMMENDED SLOT HIGHLIGHT CARD */}
          {MOCK_DARSHAN_SLOTS.find(s => s.isAiRecommended) && (
            <div className="glass-panel-glow p-6 rounded-3xl border-amber-500/50 relative overflow-hidden bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md">
                  ✨ AI RECOMMENDED SLOT
                </span>
                <span className="text-xs text-emerald-400 font-bold">Occupancy: 34% (Low)</span>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-white">05:30 PM – 06:00 PM</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {MOCK_DARSHAN_SLOTS.find(s => s.isAiRecommended)?.reasoning}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSlot(MOCK_DARSHAN_SLOTS.find(s => s.isAiRecommended) || null)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                    selectedSlot?.isAiRecommended
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                      : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                  }`}
                >
                  {selectedSlot?.isAiRecommended ? 'Selected' : 'Select AI Slot'}
                </button>
              </div>
            </div>
          )}

          {/* VISUAL TIMELINE OF AVAILABLE SLOTS */}
          <div className="glass-panel p-6 rounded-3xl border-slate-800">
            <h3 className="font-bold text-sm text-white mb-4 flex items-center justify-between">
              <span>All Available Time Windows & Predicted Crowd Density</span>
              <span className="text-xs font-normal text-slate-400">Click to select</span>
            </h3>

            <div className="space-y-3">
              {MOCK_DARSHAN_SLOTS.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                const isRecommended = slot.isAiRecommended;

                return (
                  <div
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        slot.predictedCrowd === 'critical' ? 'bg-rose-500' :
                        slot.predictedCrowd === 'high' ? 'bg-orange-500' :
                        slot.predictedCrowd === 'moderate' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{slot.timeWindow}</span>
                          {isRecommended && (
                            <span className="px-2 py-0.2 text-[9px] font-bold rounded bg-amber-500/30 text-amber-300 border border-amber-500/50">
                              AI TOP PICK
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">{slot.reasoning}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      {/* Density Progress Bar */}
                      <div className="w-24">
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>Occupancy</span>
                          <span className="font-bold">{slot.occupancyPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              slot.occupancyPercent > 80 ? 'bg-rose-500' : slot.occupancyPercent > 60 ? 'bg-orange-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${slot.occupancyPercent}%` }}
                          />
                        </div>
                      </div>

                      <span className="text-xs font-bold text-amber-300">{slot.availableSeats} seats</span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COL: BOOKING CONFIRMATION SUMMARY */}
        <div className="space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border-amber-500/30 space-y-4 sticky top-24">
            <h3 className="font-extrabold text-base text-white border-b border-amber-500/20 pb-3">
              Booking Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Temple:</span>
                <span className="font-bold text-white text-right">{currentTemple.name}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Date:</span>
                <span className="font-bold text-white">{date}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Selected Slot:</span>
                <span className="font-bold text-amber-400">{selectedSlot ? selectedSlot.timeWindow : 'None'}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Visitors:</span>
                <span className="font-bold text-white">{visitorCount} Persons</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Assigned Fast Gate:</span>
                <span className="font-bold text-cyan-300">Gate 3 (East Canopy)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={handleBooking}
                disabled={!selectedSlot}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-xl hover:brightness-110 transition-all disabled:opacity-50"
              >
                Confirm & Generate Digital Pass 🎟️
              </button>
            </div>

          </div>

          {/* Active Passes List */}
          {activePasses.length > 0 && (
            <div className="glass-panel p-5 rounded-3xl border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Your Booked Passes</h4>
              <div className="space-y-2">
                {activePasses.map(p => (
                  <div key={p.bookingId} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-amber-300 block">{p.bookingId}</span>
                      <span className="text-slate-400 text-[10px]">{p.timeSlot}</span>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 rounded">
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* DIGITAL PASS MODAL */}
      {showPassModal && generatedPass && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl max-w-md w-full border-amber-500/50 space-y-6 animate-in zoom-in-95">
            
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Darshan Slot Booked!</h3>
              <p className="text-xs text-slate-400 mt-0.5">Show this QR pass at Gate 3 Fast-Track turnstiles</p>
            </div>

            {/* QR Card Pass Ticket */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

              <h4 className="font-extrabold text-base text-amber-400">{generatedPass.templeName}</h4>
              <p className="text-[11px] text-slate-400">Digital Entry Ticket • Ref #{generatedPass.bookingId}</p>

              {/* QR Graphic Placeholder */}
              <div className="my-4 p-4 bg-white rounded-xl inline-block shadow-lg">
                <QrCode className="w-32 h-32 text-slate-950" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-left pt-2 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block">Time Slot</span>
                  <strong className="text-white">{generatedPass.timeSlot}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Visitors</span>
                  <strong className="text-white">{generatedPass.visitorCount} Devotees</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Assigned Gate</span>
                  <strong className="text-cyan-300">{generatedPass.assignedGate}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Primary Pilgrim</span>
                  <strong className="text-white">{generatedPass.primaryVisitorName}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert("Digital Pass downloaded to phone!")}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <Printer className="w-4 h-4" /> Download Ticket Pass
              </button>
              <button
                onClick={() => setShowPassModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
