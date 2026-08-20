import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { TempleId, UserRole, LanguageCode } from '../../types';
import { 
  Shield, Eye, AlertTriangle, Calendar, Navigation, Activity, 
  Compass, ChevronDown, Bell, UserCheck, Accessibility, HelpCircle, 
  Layers, Sun, Moon, BarChart3, Lock, Info, Landmark, Globe, Menu, X 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    selectedTempleId,
    setSelectedTempleId,
    temples,
    userRole,
    setUserRole,
    currentView,
    setCurrentView,
    alerts,
    accessibilityMode,
    toggleAccessibilityMode,
    theme,
    toggleTheme,
    language,
    setLanguage,
    languagesList,
    t
  } = useSimulation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const unreadAlertsCount = alerts.filter(a => !a.isAcknowledged).length;

  const viewsList = [
    { id: 'landing', icon: Activity },
    { id: 'pilgrim', icon: Compass },
    { id: 'map', icon: Navigation },
    { id: 'booking', icon: Calendar },
    { id: 'route', icon: Navigation },
    { id: 'prediction', icon: Activity },
    { id: 'authority', icon: Shield },
    { id: 'weather', icon: Sun },
    { id: 'cctv', icon: Eye },
    { id: 'emergency', icon: AlertTriangle },
    { id: 'resources', icon: Layers },
    { id: 'analytics', icon: BarChart3 },
    { id: 'temple', icon: Landmark },
    { id: 'about', icon: Info },
  ];

  const primaryNavIds = ['landing', 'pilgrim', 'map'];

  const getNavLabel = (id: string) => {
    if (id === 'landing') return t('nav.home');
    return t(`nav.${id}`);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-amber-500/20 bg-[#070913]/90 backdrop-blur-md w-full">
      <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* LEFT: Logo & Temple Selector */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
              <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 shadow-md shadow-amber-500/20">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5]" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-sans whitespace-nowrap">
                    Yatra<span className="text-saffron-gradient">Setu</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 tracking-wider uppercase whitespace-nowrap hidden lg:inline-block">
                    AI GIS v4.2
                  </span>
                </div>
              </div>
            </div>

            {/* Temple Selector (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-900/80 px-2 py-1.5 rounded-lg border border-amber-500/20">
              <select
                value={selectedTempleId}
                onChange={(e) => setSelectedTempleId(e.target.value as TempleId)}
                className="bg-transparent text-xs font-semibold text-amber-300 focus:outline-none cursor-pointer max-w-[100px] sm:max-w-[120px] xl:max-w-[140px] truncate"
              >
                {temples.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            </div>
          </div>

          {/* CENTER: Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 shrink-0">
            {primaryNavIds.map((id) => {
              const v = viewsList.find(item => item.id === id);
              if (!v) return null;

              const Icon = v.icon;
              const isActive = currentView === v.id;
              const label = getNavLabel(v.id);

              return (
                <button
                  key={v.id}
                  onClick={() => setCurrentView(v.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{label}</span>
                </button>
              );
            })}

            {/* "More Views" Dropdown (Desktop) */}
            <div className="relative">
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  !primaryNavIds.includes(currentView)
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>{t('nav.more')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-amber-500/30 rounded-xl shadow-2xl p-1.5 z-50 max-h-[70vh] overflow-y-auto"
                  onMouseLeave={() => setIsMoreMenuOpen(false)}
                >
                  {viewsList.map((v) => {
                    const Icon = v.icon;
                    const isActive = currentView === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          setCurrentView(v.id);
                          setIsMoreMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg flex items-center gap-2 transition-all ${
                          isActive
                            ? 'bg-amber-500/20 text-amber-300 font-semibold'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-amber-400" />
                        <span>{getNavLabel(v.id)}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* RIGHT: Controls & Mobile Hamburger Button */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            
            {/* Role Switcher (Desktop) */}
            <div className="hidden md:flex items-center gap-1 bg-slate-900/90 px-1.5 py-1.5 rounded-lg border border-slate-800 shrink-0">
              <UserCheck className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer max-w-[90px] xl:max-w-[110px] truncate"
              >
                <option value="pilgrim">{t('common.pilgrim_mode')}</option>
                <option value="authority">{t('common.authority_admin')}</option>
                <option value="police">{t('common.police')}</option>
                <option value="medical">{t('common.medical')}</option>
                <option value="volunteer">{t('common.volunteer')}</option>
              </select>
            </div>

            {/* Language Selector Dropdown */}
            <div className="flex items-center gap-1 bg-slate-900/90 px-1.5 py-1.5 rounded-lg border border-amber-500/30 text-amber-300 shrink-0">
              <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-bold text-amber-300 focus:outline-none cursor-pointer max-w-[65px] sm:max-w-[95px] truncate"
                title={t('common.select_language')}
              >
                {languagesList.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.nativeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Switch Mode`}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-sm shrink-0 ${
                theme === 'light'
                  ? 'bg-amber-500/10 text-amber-700 border-amber-500/40 hover:bg-amber-500/20'
                  : 'bg-slate-900/90 text-amber-300 border-amber-500/30 hover:border-amber-400'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
              )}
            </button>

            {/* Accessibility Toggle */}
            <button
              onClick={toggleAccessibilityMode}
              title={t('common.accessibility')}
              className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                accessibilityMode
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/30'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-amber-500/30'
              }`}
            >
              <Accessibility className="w-3.5 h-3.5" />
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => setCurrentView('notifications')}
              className="relative p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-400 transition-all shrink-0"
              title={t('common.notifications')}
            >
              <Bell className="w-3.5 h-3.5" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-rose-600 rounded-full border border-slate-950 animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {/* MOBILE HAMBURGER MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold hover:bg-amber-500/30 transition-all"
              title="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* MOBILE SLIDE-OVER DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-amber-500/20 bg-slate-950/95 backdrop-blur-2xl px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2">
          
          {/* Temple Switcher in Mobile Drawer */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Selected Temple Shrine</span>
            <select
              value={selectedTempleId}
              onChange={(e) => {
                setSelectedTempleId(e.target.value as TempleId);
              }}
              className="w-full bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-bold p-2.5 rounded-xl focus:outline-none"
            >
              {temples.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* User Role Switcher in Mobile Drawer */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">User Role Mode</span>
            <select
              value={userRole}
              onChange={(e) => {
                setUserRole(e.target.value as UserRole);
              }}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium p-2.5 rounded-xl focus:outline-none"
            >
              <option value="pilgrim">{t('common.pilgrim_mode')}</option>
              <option value="authority">{t('common.authority_admin')}</option>
              <option value="police">{t('common.police')}</option>
              <option value="medical">{t('common.medical')}</option>
              <option value="volunteer">{t('common.volunteer')}</option>
            </select>
          </div>

          {/* All Views Grid in Mobile Drawer */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Navigation Views</span>
            <div className="grid grid-cols-2 gap-2">
              {viewsList.map((v) => {
                const Icon = v.icon;
                const isActive = currentView === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      setCurrentView(v.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-900 text-slate-300 border border-slate-800/80 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{getNavLabel(v.id)}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </header>
  );
};





