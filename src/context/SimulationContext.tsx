import React, { createContext, useContext, useState, useEffect } from 'react';
import { Temple, Zone, CCTVCamera, Alert, ResourceAllocation, EmergencyIncident, TempleId, UserRole, BookingPass, LanguageCode, LanguageOption } from '../types';
import { MOCK_TEMPLES, INITIAL_ZONES, INITIAL_CCTV_CAMERAS, INITIAL_ALERTS, INITIAL_RESOURCES, INITIAL_EMERGENCY_INCIDENTS } from '../data/mockData';
import { LANGUAGES, TRANSLATIONS } from '../data/translations';

interface SimulationContextType {
  selectedTempleId: TempleId;
  setSelectedTempleId: (id: TempleId) => void;
  temples: Temple[];
  zones: Zone[];
  cameras: CCTVCamera[];
  alerts: Alert[];
  resources: ResourceAllocation[];
  emergencyIncidents: EmergencyIncident[];
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  languagesList: LanguageOption[];
  isSimulationActive: boolean;
  toggleSimulation: () => void;
  simulationSpeed: number;
  setSimulationSpeed: (speed: number) => void;
  triggerCrowdSurge: () => void;
  triggerEmergencyEvent: () => void;
  resetSimulation: () => void;
  acknowledgeAlert: (alertId: string) => void;
  accessibilityMode: boolean;
  toggleAccessibilityMode: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  voiceGuidanceEnabled: boolean;
  toggleVoiceGuidance: () => void;
  activePasses: BookingPass[];
  addBookingPass: (pass: BookingPass) => void;
  rebalanceResources: (zoneId: string) => void;
  activeToast: { title: string; message: string; type: 'critical' | 'high' | 'info' } | null;
  dismissToast: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTempleId, setSelectedTempleId] = useState<TempleId>('somnath');
  const [temples, setTemples] = useState<Temple[]>(MOCK_TEMPLES);
  const [zones, setZones] = useState<Zone[]>(INITIAL_ZONES.somnath);
  const [cameras, setCameras] = useState<CCTVCamera[]>(INITIAL_CCTV_CAMERAS);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [resources, setResources] = useState<ResourceAllocation[]>(INITIAL_RESOURCES);
  const [emergencyIncidents, setEmergencyIncidents] = useState<EmergencyIncident[]>(INITIAL_EMERGENCY_INCIDENTS);
  
  const [userRole, setUserRole] = useState<UserRole>('pilgrim');
  const [currentView, setCurrentView] = useState<string>('landing');
  const [language, setLanguage] = useState<LanguageCode>('en');

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS['en'];
    return langDict[key] || TRANSLATIONS['en'][key] || fallback || key;
  };

  const languagesList = LANGUAGES;

  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  
  const [accessibilityMode, setAccessibilityMode] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [voiceGuidanceEnabled, setVoiceGuidanceEnabled] = useState<boolean>(false);

  
  const [activePasses, setActivePasses] = useState<BookingPass[]>([
    {
      bookingId: 'YATRA-883921',
      templeName: 'Somnath Mahadev Temple',
      date: 'Today, Aug 19',
      timeSlot: '05:30 PM - 06:00 PM',
      visitorCount: 2,
      primaryVisitorName: 'Rajesh Sharma',
      assignedGate: 'Gate 3 (East Canopy Entrance)',
      qrData: 'YATRA-SOMNATH-530PM-2PAX',
      status: 'Confirmed',
      createdAt: '10:15 AM'
    }
  ]);

  const [activeToast, setActiveToast] = useState<{ title: string; message: string; type: 'critical' | 'high' | 'info' } | null>(null);

  const dismissToast = () => setActiveToast(null);

  // Sync zones when temple changes
  useEffect(() => {
    if (INITIAL_ZONES[selectedTempleId]) {
      setZones(INITIAL_ZONES[selectedTempleId]);
    } else {
      // Fallback generated zones for other temples
      setZones([
        {
          id: `${selectedTempleId}-z1`,
          templeId: selectedTempleId,
          name: 'Main Sanctum Entrance',
          category: 'entrance',
          currentCount: 890,
          maxCapacity: 1200,
          densityPercentage: 74,
          riskLevel: 'high',
          avgWaitMinutes: 18,
          recommendedAction: 'Monitor entry flow; maintain 80 pilgrims/min speed.',
          coordinates: { x: 30, y: 50 }
        },
        {
          id: `${selectedTempleId}-z2`,
          templeId: selectedTempleId,
          name: 'Courtyard Queue Corridor',
          category: 'queue',
          currentCount: 1450,
          maxCapacity: 2500,
          densityPercentage: 58,
          riskLevel: 'moderate',
          avgWaitMinutes: 12,
          recommendedAction: 'Keep queue movement steady.',
          coordinates: { x: 55, y: 45 }
        },
        {
          id: `${selectedTempleId}-z3`,
          templeId: selectedTempleId,
          name: 'Shrine Exit & Parking',
          category: 'exit',
          currentCount: 420,
          maxCapacity: 2000,
          densityPercentage: 21,
          riskLevel: 'low',
          avgWaitMinutes: 2,
          recommendedAction: 'Clear exit path.',
          coordinates: { x: 80, y: 60 }
        }
      ]);
    }
  }, [selectedTempleId]);

  // Live Simulation ticker
  useEffect(() => {
    if (!isSimulationActive) return;

    const interval = setInterval(() => {
      setZones(prevZones =>
        prevZones.map(zone => {
          // Micro random fluctuate (-15 to +20)
          const delta = Math.floor((Math.random() * 35 - 15) * simulationSpeed);
          const newCount = Math.max(50, Math.min(zone.maxCapacity, zone.currentCount + delta));
          const density = Math.round((newCount / zone.maxCapacity) * 100);
          
          let risk: 'low' | 'moderate' | 'high' | 'critical' = 'low';
          if (density > 85) risk = 'critical';
          else if (density > 70) risk = 'high';
          else if (density > 45) risk = 'moderate';

          return {
            ...zone,
            currentCount: newCount,
            densityPercentage: density,
            riskLevel: risk,
            avgWaitMinutes: Math.max(1, Math.round(density * 0.4))
          };
        })
      );

      // Update camera people counts randomly
      setCameras(prevCams =>
        prevCams.map(cam => {
          const delta = Math.floor((Math.random() * 20 - 10) * simulationSpeed);
          const newCount = Math.max(50, cam.peopleCount + delta);
          return {
            ...cam,
            peopleCount: newCount,
            fps: 28 + Math.floor(Math.random() * 3)
          };
        })
      );

      // Update overall temple counts
      setTemples(prevTemples =>
        prevTemples.map(t => {
          if (t.id === selectedTempleId) {
            const sumZoneCount = zones.reduce((acc, z) => acc + z.currentCount, 0);
            return {
              ...t,
              currentCrowd: sumZoneCount,
              avgWaitMinutes: Math.round(zones.reduce((acc, z) => acc + z.avgWaitMinutes, 0) / zones.length)
            };
          }
          return t;
        })
      );
    }, 4000 / simulationSpeed);

    return () => clearInterval(interval);
  }, [isSimulationActive, simulationSpeed, selectedTempleId, zones]);

  const triggerCrowdSurge = () => {
    setZones(prev =>
      prev.map(z => {
        if (z.category === 'entrance' || z.category === 'queue') {
          const surgeCount = Math.min(z.maxCapacity, Math.round(z.maxCapacity * 0.98));
          return {
            ...z,
            currentCount: surgeCount,
            densityPercentage: 98,
            riskLevel: 'critical',
            avgWaitMinutes: 52,
            recommendedAction: '🔴 CRITICAL SURGE DETECTED! Restrict Entry + Activate Emergency Route B Override.'
          };
        }
        return z;
      })
    );

    const newAlert: Alert = {
      id: `alt-${Date.now()}`,
      templeId: selectedTempleId,
      zoneName: 'Main Entrance & Queue Plaza',
      severity: 'critical',
      title: '🚨 AI SURGE DETECTED: 98% CAPACITY CRITICAL',
      message: 'Abnormal influx of 1,200+ pilgrims detected in under 3 minutes. Stampede risk index elevated to CRITICAL.',
      recommendedAction: 'Deploy barrier overrides, restrict Gate 1, redirect pilgrims to Promenade Corridor.',
      timestamp: 'Just now',
      isAcknowledged: false
    };

    setAlerts(prev => [newAlert, ...prev]);

    setActiveToast({
      title: '🔴 AI CROWD SURGE DETECTED!',
      message: 'Main Queue Complex density jumped to 98%! Entry restricted, emergency redirect active.',
      type: 'critical'
    });
  };

  const triggerEmergencyEvent = () => {
    triggerCrowdSurge();

    const newIncident: EmergencyIncident = {
      id: `inc-${Date.now()}`,
      templeId: selectedTempleId,
      zoneName: 'Main Queue Complex (Hall A)',
      type: 'Crowd Surge',
      riskScore: 98,
      status: 'Responding',
      reportedAt: new Date().toLocaleTimeString(),
      assignedTeam: 'Rapid Police & Medical Unit Alpha',
      emergencyRouteOpened: true
    };

    setEmergencyIncidents(prev => [newIncident, ...prev]);

    setActiveToast({
      title: '🚨 EMERGENCY PROTOCOL ACTIVATED',
      message: 'Emergency Route West opened. Police & Medical teams dispatched to Zone A.',
      type: 'critical'
    });
  };

  const resetSimulation = () => {
    setZones(INITIAL_ZONES[selectedTempleId] || INITIAL_ZONES.somnath);
    setCameras(INITIAL_CCTV_CAMERAS);
    setAlerts(INITIAL_ALERTS);
    setResources(INITIAL_RESOURCES);
    setEmergencyIncidents(INITIAL_EMERGENCY_INCIDENTS);
    setTemples(MOCK_TEMPLES);

    setActiveToast({
      title: '🔄 Simulation Reset',
      message: 'All crowd parameters and AI alert states restored to normal baselines.',
      type: 'info'
    });
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, isAcknowledged: true } : a));
  };

  const toggleSimulation = () => setIsSimulationActive(!isSimulationActive);
  const toggleAccessibilityMode = () => setAccessibilityMode(!accessibilityMode);
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleVoiceGuidance = () => setVoiceGuidanceEnabled(!voiceGuidanceEnabled);

  const addBookingPass = (pass: BookingPass) => {
    setActivePasses(prev => [pass, ...prev]);
    setActiveToast({
      title: '🎟️ Darshan Slot Confirmed!',
      message: `Pass generated for ${pass.timeSlot} at ${pass.assignedGate}.`,
      type: 'info'
    });
  };

  const rebalanceResources = (zoneId: string) => {
    setResources(prev =>
      prev.map(r => {
        if (r.zoneId === zoneId) {
          return {
            ...r,
            volunteerCount: r.aiSuggestedVolunteers,
            policeCount: r.aiSuggestedPolice
          };
        }
        return r;
      })
    );

    setActiveToast({
      title: '🛡️ Resources Rebalanced',
      message: 'AI personnel allocation auto-deployed to critical zone.',
      type: 'info'
    });
  };

  return (
    <SimulationContext.Provider
      value={{
        selectedTempleId,
        setSelectedTempleId,
        temples,
        zones,
        cameras,
        alerts,
        resources,
        emergencyIncidents,
        userRole,
        setUserRole,
        currentView,
        setCurrentView,
        language,
        setLanguage,
        t,
        languagesList,
        isSimulationActive,
        toggleSimulation,
        simulationSpeed,
        setSimulationSpeed,
        triggerCrowdSurge,
        triggerEmergencyEvent,
        resetSimulation,
        acknowledgeAlert,
        accessibilityMode,
        toggleAccessibilityMode,
        theme,
        toggleTheme,
        voiceGuidanceEnabled,
        toggleVoiceGuidance,
        activePasses,
        addBookingPass,
        rebalanceResources,
        activeToast,
        dismissToast
      }}
    >
      <div className={
        accessibilityMode 
          ? 'accessibility-mode min-h-screen' 
          : theme === 'light'
            ? 'light-theme min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300'
            : 'min-h-screen bg-[#070913] text-slate-100 transition-colors duration-300'
      }>
        {children}
      </div>
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
