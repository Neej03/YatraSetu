import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { MOCK_WEATHER_DATA } from '../../data/mockData';
import { ChatMessage } from '../../types';
import { MessageSquare, X, Send, Bot, User, Sparkles, Navigation, Calendar, Clock, ShieldAlert, Sun } from 'lucide-react';

export const YatraSetuChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { selectedTempleId, temples, zones, setCurrentView, addBookingPass } = useSimulation();

  const currentTemple = temples.find(t => t.id === selectedTempleId) || temples[0];
  const templeWeather = MOCK_WEATHER_DATA[selectedTempleId] || MOCK_WEATHER_DATA.somnath;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: `Namaste! 🙏 I am YatraSetu AI, your intelligent pilgrimage guide for ${currentTemple.name}. How can I assist your journey today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const promptChips = [
    'What is the weather forecast?',
    'When should I visit the temple?',
    'Which route has less crowd?',
    'What is the current waiting time?',
    'Book me a low-crowd darshan slot'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate dynamic AI response based on text content & simulation state
    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('weather') || lower.includes('temperature') || lower.includes('rain') || lower.includes('forecast')) {
        botResponse = `🌤️ **Live Weather Telemetry for ${currentTemple.name}**: Current temp is **${templeWeather.currentTemp}°C** (${templeWeather.conditionText}) with **${templeWeather.humidity}% humidity** and **${templeWeather.rainProbability}% rain chance**. Thermal Comfort: **${templeWeather.thermalComfort}**. Misting fans are **${templeWeather.mistingStatus}**.`;
      } else if (lower.includes('when should i visit') || lower.includes('best time')) {

        botResponse = `✨ **AI Recommendation**: Based on historical trend analysis and real-time computer vision feeds, the lowest crowd density is predicted between **05:30 PM and 06:30 PM** today (approx 34% occupancy, 12 min wait time).`;
      } else if (lower.includes('route') || lower.includes('path')) {
        botResponse = `🗺️ **Smart Route Advice**: Gate 1 is currently experiencing 94% congestion. I recommend **Route B (East Canopy Garden Way)**. It currently has **42% lower crowd density**, shaded misting canopies, and wheelchair access.`;
      } else if (lower.includes('wait') || lower.includes('waiting time') || lower.includes('crowded right now')) {
        botResponse = `⏱️ **Live Status for ${currentTemple.name}**: Current crowd is **${currentTemple.currentCrowd.toLocaleString()} pilgrims** (${currentTemple.riskLevel.toUpperCase()} density). Average wait time is **${currentTemple.avgWaitMinutes} minutes**.`;
      } else if (lower.includes('medical') || lower.includes('hospital') || lower.includes('emergency')) {
        botResponse = `🚑 **Emergency Assist**: The nearest medical response point is **Medical Post West (Zone 7)** located next to Gate 3 Exit Corridor. Medical teams are on 24/7 standby. Hotline: 108.`;
      } else if (lower.includes('book') || lower.includes('slot')) {
        const newPass = {
          bookingId: `YATRA-${Math.floor(100000 + Math.random() * 900000)}`,
          templeName: currentTemple.name,
          date: 'Today, Aug 19',
          timeSlot: '05:30 PM - 06:00 PM',
          visitorCount: 2,
          primaryVisitorName: 'Pilgrim Visitor',
          assignedGate: 'Gate 3 (East Canopy Entrance)',
          qrData: `YATRA-${selectedTempleId.toUpperCase()}-530PM`,
          status: 'Confirmed' as const,
          createdAt: new Date().toLocaleTimeString()
        };
        addBookingPass(newPass);
        botResponse = `🎟️ **Slot Booked!** I have booked your AI-recommended slot for **05:30 PM - 06:00 PM** at ${currentTemple.name}. Your digital pass is saved in Darshan Slots!`;
      } else {
        botResponse = `🤖 YatraSetu AI has analyzed ${currentTemple.name} parameters. Crowd index is ${currentTemple.riskLevel.toUpperCase()} with ${currentTemple.avgWaitMinutes} min queue delay. Let me know if you would like me to optimize your route or book a slot!`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 p-3.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-2xl shadow-amber-500/40 hover:scale-105 transition-all flex items-center gap-2 border border-amber-300"
      >
        <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
        <span className="font-extrabold text-xs hidden sm:inline tracking-wide">YatraSetu AI</span>
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-full max-w-md bg-slate-950/95 border border-amber-500/30 rounded-3xl shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col h-[520px] animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-amber-500/20 via-slate-900 to-orange-500/20 border-b border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  YatraSetu AI <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-amber-300/80">Real-time Pilgrimage & Crowd Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-medium rounded-tr-none shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-inner'
                  }`}
                >
                  <p dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  <span className="block text-[9px] opacity-60 text-right mt-1">{m.timestamp}</span>
                </div>
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto scrollbar-none">
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="whitespace-nowrap px-2.5 py-1 text-[10px] font-medium rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 transition-all shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask YatraSetu AI about routes, crowd, slots..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold hover:brightness-110 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
