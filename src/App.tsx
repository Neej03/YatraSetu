import React from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastNotification } from './components/common/ToastNotification';
import { YatraSetuChatbot } from './components/common/YatraSetuChatbot';

import { LandingPage } from './components/views/LandingPage';
import { PilgrimDashboard } from './components/views/PilgrimDashboard';
import { LiveCrowdMap } from './components/views/LiveCrowdMap';
import { DarshanSlotBooking } from './components/views/DarshanSlotBooking';
import { SmartRoutePlanner } from './components/views/SmartRoutePlanner';
import { AICrowdPrediction } from './components/views/AICrowdPrediction';
import { AuthorityCommandCenter } from './components/views/AuthorityCommandCenter';
import { CCTVGrid } from './components/views/CCTVGrid';
import { EmergencyCenter } from './components/views/EmergencyCenter';
import { ResourceManagement } from './components/views/ResourceManagement';
import { ReportsAnalytics } from './components/views/ReportsAnalytics';
import { TempleInfo } from './components/views/TempleInfo';
import { NotificationsCenter } from './components/views/NotificationsCenter';
import { AccessibilityView } from './components/views/AccessibilityView';
import { AboutYatraSetu } from './components/views/AboutYatraSetu';
import { WeatherForecast } from './components/views/WeatherForecast';

const MainViewContent: React.FC = () => {
  const { currentView } = useSimulation();

  switch (currentView) {
    case 'landing':
      return <LandingPage />;
    case 'pilgrim':
      return <PilgrimDashboard />;
    case 'map':
      return <LiveCrowdMap />;
    case 'booking':
      return <DarshanSlotBooking />;
    case 'weather':
      return <WeatherForecast />;
    case 'route':
      return <SmartRoutePlanner />;

    case 'prediction':
      return <AICrowdPrediction />;
    case 'authority':
      return <AuthorityCommandCenter />;
    case 'cctv':
      return <CCTVGrid />;
    case 'emergency':
      return <EmergencyCenter />;
    case 'resources':
      return <ResourceManagement />;
    case 'analytics':
      return <ReportsAnalytics />;
    case 'temple':
      return <TempleInfo />;
    case 'notifications':
      return <NotificationsCenter />;
    case 'accessibility':
      return <AccessibilityView />;
    case 'about':
      return <AboutYatraSetu />;
    default:
      return <LandingPage />;
  }
};

export function App() {
  return (
    <SimulationProvider>
      <div className="min-h-screen flex flex-col justify-between relative selection:bg-amber-500 selection:text-slate-950">
        <ToastNotification />
        
        <div>
          <Navbar />
          <main className="transition-all duration-300">
            <MainViewContent />
          </main>
        </div>

        <YatraSetuChatbot />
        <Footer />
      </div>
    </SimulationProvider>
  );
}

export default App;
