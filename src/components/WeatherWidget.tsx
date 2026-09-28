import React, { useState, useEffect } from 'react';
import {
  Sun,
  Sunrise,
  Sunset,
  CloudSun,
  CloudRain,
  CloudLightning,
  CloudDrizzle,
  Cloud,
  Wind,
  Droplets,
  Eye,
  Gauge,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Thermometer,
  Calendar,
  Clock,
  MapPin,
  Wheat,
  CheckCircle2,
  X,
  ArrowUp,
  ArrowDown,
  Activity,
  Sparkles,
  Globe,
  SunMedium,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ForecastDay {
  day: string;
  date: string;
  condition: string;
  weatherCode: number;
  highC: number;
  lowC: number;
  rainChance: number;
}

export interface HourlyForecastItem {
  time: string;
  hour24: number;
  tempC: number;
  condition: string;
  weatherCode: number;
  rainChance: number;
  humidity?: number;
  windSpeedKmH?: number;
}

export interface LiveWeatherData {
  location: string;
  subLocation: string;
  district: string;
  region: string;
  displayLocationEn: string;
  displayLocationUr: string;
  businessNameEn: string;
  businessNameUr: string;
  coordinates: { lat: number; lng: number };
  temperatureC: number;
  temperatureF: number;
  condition: string;
  conditionDescription: string;
  weatherCode: number;
  feelsLikeC: number;
  humidity: number;
  windSpeedKmH: number;
  windDirection: string;
  visibilityKm: number;
  pressureHpa: number;
  precipitationChance: number;
  precipitationMm: number;
  uvIndex: number;
  uvIndexText: string;
  todayHighC: number;
  todayLowC: number;
  sunrise: string;
  sunset: string;
  forecast: ForecastDay[];
  hourlyForecast?: HourlyForecastItem[];
  lastUpdated: string;
  lastUpdatedTimestamp: number;
  provider: 'AccuWeather' | 'Open-Meteo (Real Meteorological Station)';
  providerAttributionUrl: string;
  accuWeatherLink?: string;
  millingAdvisory: {
    sunDryingSuitability: 'Excellent' | 'Good' | 'Moderate' | 'Poor';
    paddyMoistureImpact: string;
    actionableAdvice: string;
  };
}

export const WeatherWidget: React.FC = () => {
  const { isUrdu, toggleLanguage, t } = useLanguage();
  const [weather, setWeather] = useState<LiveWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isStaleData, setIsStaleData] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [secondsUntilNextSync, setSecondsUntilNextSync] = useState<number>(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatPstDateTime = (date: Date) => {
    try {
      const timeStr = new Intl.DateTimeFormat(isUrdu ? 'ur-PK' : 'en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(date);

      const dateStr = new Intl.DateTimeFormat(isUrdu ? 'ur-PK' : 'en-US', {
        timeZone: 'Asia/Karachi',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);

      return { timeStr, dateStr };
    } catch {
      return {
        timeStr: date.toLocaleTimeString(),
        dateStr: date.toLocaleDateString(),
      };
    }
  };

  const { timeStr, dateStr } = formatPstDateTime(currentDateTime);

  const fetchWeather = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else if (!weather) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      const url = isManualRefresh ? '/api/weather?refresh=true' : '/api/weather';
      const res = await fetch(url);
      const data = await res.json();

      if (data.success && data.data) {
        setWeather(data.data);
        setIsStaleData(Boolean(data.isStale));
        setErrorMsg(data.isStale ? (data.notice || t.weather.staleWarning) : null);
        setSecondsUntilNextSync(120);
      } else {
        throw new Error(data.error || 'Failed to fetch live weather data for Chund Bharwana');
      }
    } catch (err: any) {
      console.warn('Weather fetch error:', err);
      if (weather) {
        setIsStaleData(true);
        setErrorMsg(t.weather.staleWarning);
      } else {
        setErrorMsg(err.message || 'Live weather service is currently unreachable. Please try again shortly.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather(false);

    const refreshInterval = setInterval(() => {
      fetchWeather(false);
      setSecondsUntilNextSync(120);
    }, 2 * 60 * 1000);

    const countdownTicker = setInterval(() => {
      setSecondsUntilNextSync((prev) => (prev > 1 ? prev - 1 : 120));
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(countdownTicker);
    };
  }, []);

  const getWeatherIcon = (condition: string = '', isHero = false) => {
    const c = condition.toLowerCase();
    const size = isHero ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-7 h-7 sm:w-8 sm:h-8';

    if (c.includes('thunder') || c.includes('lightning') || c.includes('storm')) {
      return <CloudLightning className={`${size} text-amber-400 animate-pulse shrink-0 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]`} />;
    }
    if (c.includes('drizzle')) {
      return <CloudDrizzle className={`${size} text-sky-300 animate-pulse shrink-0 drop-shadow-[0_0_12px_rgba(125,211,252,0.4)]`} />;
    }
    if (c.includes('rain') || c.includes('shower')) {
      return <CloudRain className={`${size} text-sky-400 animate-pulse shrink-0 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]`} />;
    }
    if (c.includes('cloud') || c.includes('overcast')) {
      return <CloudSun className={`${size} text-[#F5D061] shrink-0 drop-shadow-[0_0_12px_rgba(245,208,97,0.4)]`} />;
    }
    if (c.includes('fog') || c.includes('mist')) {
      return <Cloud className={`${size} text-stone-300 shrink-0 drop-shadow-[0_0_8px_rgba(214,211,209,0.3)]`} />;
    }
    return <Sun className={`${size} text-[#F5D061] animate-[spin_16s_linear_infinite] shrink-0 drop-shadow-[0_0_16px_rgba(245,208,97,0.6)]`} />;
  };

  const getDryingSuitabilityColor = (status: string = 'Good') => {
    switch (status) {
      case 'Excellent':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      case 'Good':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-[0_0_10px_rgba(20,184,166,0.2)]';
      case 'Moderate':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'Poor':
      default:
        return 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.2)]';
    }
  };

  const formatTemp = (tempC: number) => {
    if (tempUnit === 'F') {
      const f = Math.round((tempC * 9) / 5 + 32);
      return `${f}°F`;
    }
    return `${Math.round(tempC)}°C`;
  };

  return (
    <section
      id="weather"
      dir={isUrdu ? 'rtl' : 'ltr'}
      className="relative py-14 sm:py-20 bg-gradient-to-b from-[#04120a] via-[#061d11] to-[#04130a] text-white overflow-hidden border-y border-[#D4AF37]/35"
    >
      {/* Anchor targets */}
      <span id="dashboard" className="absolute -top-24" />

      {/* Luxury Atmospheric Glows & Vignettes */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Master Luxury Card Container */}
        <div className="rounded-3xl bg-[#061c10]/85 border border-[#D4AF37]/45 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_40px_rgba(212,175,55,0.08)] p-5 sm:p-8 md:p-10 relative overflow-hidden">
          
          {/* Top Gold Border Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5D061] to-transparent opacity-90" />

          {/* CARD TOPBAR: Corporate Identity, Location & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#D4AF37]/25 mb-8">
            
            {/* Corporate Branding & Target Location */}
            <div>
              {/* Status Pills Row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                
                {/* Live Weather Status Indicator */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-bold tracking-wide backdrop-blur-md shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-white font-extrabold tracking-wider">{t.weather.liveWeather}</span>
                </div>

                {/* Auto-Refresh Ticker Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-[#D4AF37]/35 text-[11px] sm:text-xs text-stone-300 font-mono">
                  <span className="text-[#F5D061] font-semibold">{t.weather.lastUpdated}:</span>
                  <span className="text-white font-bold">{weather?.lastUpdated || timeStr}</span>
                  <span className="text-[#D4AF37]/50 hidden sm:inline">•</span>
                  <span className="text-emerald-400/90 hidden sm:inline">
                    {isUrdu ? `خودکار اپ ڈیٹ (${formatCountdown(secondsUntilNextSync)})` : `Sync (${formatCountdown(secondsUntilNextSync)})`}
                  </span>
                </div>

                {/* Live PST Clock Pill */}
                <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 text-xs text-stone-300">
                  <Calendar className="w-3.5 h-3.5 text-[#F5D061]" />
                  <span>{dateStr}</span>
                  <span className="text-white/30">•</span>
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="font-mono text-white font-semibold">{timeStr}</span>
                  <span className="text-[10px] font-bold text-[#F5D061] bg-[#103822] px-1.5 py-0.5 rounded border border-[#D4AF37]/30">PST</span>
                </div>
              </div>

              {/* Prominent Business Name Display */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F5D061] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#E4C868] uppercase font-sans">
                    {isUrdu ? 'عالمی زرعی معیارات اور ایکسپورٹ' : 'International Rice Export & Milling Quality'}
                  </span>
                </div>
                
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {isUrdu ? 'سندرانہ رائس ملز – پبر والا' : 'SANDRANA RICE MILLS – Puber Wala'}
                </h2>

                {/* Specific Location Display */}
                <div className="flex items-center gap-2 text-stone-300 text-sm sm:text-base font-medium pt-1">
                  <MapPin className="w-4 h-4 text-[#F5D061] shrink-0" />
                  <span className="text-white font-bold">
                    {isUrdu ? 'پبر والا، چند بھروانہ، جھنگ' : 'Puber Wala, Chund Bharwana, Jhang'}
                  </span>
                  <span className="text-[#D4AF37]/50">•</span>
                  <span className="text-xs sm:text-sm text-stone-400">
                    {isUrdu ? 'پنجاب، پاکستان' : 'Punjab, Pakistan'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Bar: Language Toggle, Unit Switch, Refresh & Details */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 self-start lg:self-center">
              
              {/* Elegant English / اردو Toggle */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#FFF0A0] hover:text-white text-xs font-bold border border-[#D4AF37]/50 backdrop-blur-md transition-all shadow-sm cursor-pointer"
                title={isUrdu ? 'Switch to English' : 'اردو میں تبدیل کریں'}
              >
                <Globe className="w-3.5 h-3.5 text-[#F5D061]" />
                <span>{t.weather.switchLang}</span>
              </button>

              {/* Unit Toggle Switch */}
              <div className="inline-flex items-center p-1 rounded-xl bg-black/60 border border-[#D4AF37]/30 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setTempUnit('C')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    tempUnit === 'C'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-slate-950 shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                  title={t.weather.tempToggle}
                >
                  °C
                </button>
                <button
                  type="button"
                  onClick={() => setTempUnit('F')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    tempUnit === 'F'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-slate-950 shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                  title={t.weather.tempToggle}
                >
                  °F
                </button>
              </div>

              {/* Refresh Button */}
              <button
                type="button"
                onClick={() => fetchWeather(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 text-white text-xs font-bold border border-emerald-500/40 backdrop-blur-md transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#F5D061] ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? t.weather.refreshing : t.weather.refreshBtn}</span>
              </button>

              {/* Station Details Button */}
              <button
                type="button"
                onClick={() => setShowDetailsModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-xs font-medium border border-white/15 transition-all cursor-pointer"
                title={t.weather.detailsBtn}
              >
                <Activity className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">{t.weather.detailsBtn}</span>
              </button>
            </div>
          </div>

          {/* Stale / Offline Notification Banner */}
          {isStaleData && errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-950/70 border border-amber-500/50 text-amber-200 text-xs sm:text-sm flex items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
                <span>{errorMsg}</span>
              </div>
              <button
                type="button"
                onClick={() => fetchWeather(true)}
                className="px-3 py-1.5 rounded-lg bg-amber-500/25 hover:bg-amber-500/35 text-amber-100 border border-amber-500/40 font-bold cursor-pointer shrink-0"
              >
                {t.weather.errorRetry}
              </button>
            </div>
          )}

          {/* Error State with No Data */}
          {!loading && !weather && errorMsg && (
            <div className="p-10 rounded-2xl bg-black/60 border border-rose-500/40 text-center max-w-lg mx-auto backdrop-blur-xl my-6">
              <AlertCircle className="w-14 h-14 text-rose-400 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-white mb-2">{t.weather.errorTitle}</h3>
              <p className="text-xs sm:text-sm text-stone-300 mb-6 leading-relaxed">{errorMsg}</p>
              <button
                type="button"
                onClick={() => fetchWeather(true)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-slate-950 text-xs sm:text-sm font-bold shadow-md cursor-pointer hover:opacity-90 transition"
              >
                {t.weather.errorRetry}
              </button>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && !weather && (
            <div className="space-y-6 animate-pulse my-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6 h-72 rounded-2xl bg-white/5 border border-white/10" />
                <div className="lg:col-span-6 h-72 rounded-2xl bg-white/5 border border-white/10" />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-40 rounded-xl bg-white/5 border border-white/10" />
                ))}
              </div>
            </div>
          )}

          {/* MAIN WEATHER CONTENT */}
          {weather && (
            <div className="space-y-8">
              
              {/* HERO ROW: Main Current Weather & Paddy Milling Intelligence */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* HERO CARD (6 Columns): Large Temperature & Central Conditions */}
                <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-[#0c2f1c]/90 via-[#072314]/85 to-[#04140b]/90 border border-[#D4AF37]/40 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F5D061] to-transparent opacity-90" />

                  <div>
                    {/* Header: Current Weather Tag & Station Coordinates */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-[#E4C868] font-bold flex items-center gap-1.5">
                          <Wheat className="w-3.5 h-3.5 text-[#F5D061]" />
                          {t.weather.currentWeather}
                        </span>
                        <p className="text-[11px] text-stone-400 mt-1 font-mono">
                          {isUrdu ? 'مقام: چنڈ بھروانہ (31.4287° N, 72.1932° E)' : 'Station: Chund Bharwana (31.4287° N, 72.1932° E)'}
                        </p>
                      </div>

                      {/* Animated Weather Icon Container */}
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-black/50 border border-[#D4AF37]/30 shadow-inner group-hover:border-[#D4AF37]/60 transition">
                        {getWeatherIcon(weather.condition, true)}
                      </div>
                    </div>

                    {/* Central Large Temperature Display */}
                    <div className="flex items-baseline gap-4 my-2">
                      <span className="font-serif text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight drop-shadow-md">
                        {formatTemp(weather.temperatureC)}
                      </span>
                      <div className="text-left space-y-0.5">
                        <span className="block text-xl sm:text-2xl font-bold text-[#FFF0A0] tracking-wide">
                          {weather.condition}
                        </span>
                        <span className="block text-xs sm:text-sm text-stone-300">
                          {t.weather.feelsLike} <strong className="text-white font-mono">{formatTemp(weather.feelsLikeC)}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Real Condition Meteorological Observation */}
                    <p className="text-xs sm:text-sm text-stone-300 mt-2 italic leading-relaxed">
                      "{weather.conditionDescription}"
                    </p>
                  </div>

                  {/* Range & Sun Timings Bar */}
                  <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-white/10 text-xs">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                      <span className="text-stone-300 flex items-center gap-1.5">
                        <ArrowUp className="w-3.5 h-3.5 text-rose-400" />
                        {t.weather.todayRange}
                      </span>
                      <span className="font-bold text-white font-mono text-xs sm:text-sm">
                        {formatTemp(weather.todayHighC)} / {formatTemp(weather.todayLowC)}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                      <span className="text-stone-300 flex items-center gap-1.5">
                        <Sunrise className="w-3.5 h-3.5 text-[#F5D061]" />
                        <Sunset className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                      <span className="font-bold text-[#FFF0A0] font-mono text-xs">
                        {weather.sunrise} • {weather.sunset}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ADVISORY CARD (6 Columns): Rice Milling & Yard Drying Advisory */}
                <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-[#092616]/90 via-[#072013]/85 to-[#041209]/90 border border-[#D4AF37]/40 p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between">
                  <div>
                    {/* Header & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Wheat className="w-5 h-5 text-[#F5D061]" />
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                          {t.weather.millingTitle}
                        </h3>
                      </div>

                      <span
                        className={`text-xs font-bold px-3.5 py-1 rounded-full border ${getDryingSuitabilityColor(
                          weather.millingAdvisory.sunDryingSuitability
                        )}`}
                      >
                        {t.weather.dryingSuitability}: {weather.millingAdvisory.sunDryingSuitability}
                      </span>
                    </div>

                    {/* Paddy Moisture Analysis Card */}
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 mb-4">
                      <div className="flex items-center gap-2 mb-1.5 text-xs sm:text-sm font-semibold text-[#FFF0A0]">
                        <Droplets className="w-4 h-4 text-sky-400" />
                        <span>{t.weather.paddyMoisture}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        {weather.millingAdvisory.paddyMoistureImpact}
                      </p>
                    </div>

                    {/* Actionable Drying Yard Guidance */}
                    <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                      <div className="flex items-center gap-2 mb-1.5 text-xs sm:text-sm font-semibold text-emerald-300">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>{t.weather.actionAdvice}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                        {weather.millingAdvisory.actionableAdvice}
                      </p>
                    </div>
                  </div>

                  {/* Provider Attribution Line */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{weather.provider}</span>
                    </span>

                    {weather.provider === 'AccuWeather' ? (
                      <a
                        href={weather.accuWeatherLink || weather.providerAttributionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sky-300 hover:text-white font-semibold transition"
                      >
                        <span>AccuWeather®</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-stone-400 text-[11px]">
                        {isUrdu ? 'چنڈ بھروانہ موسمیاتی مرکز' : 'Chund Bharwana Station'}
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* 9 ELEGANT MINI-CARDS FOR WEATHER DETAILS */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Gauge className="w-4 h-4 text-[#F5D061]" />
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                    {isUrdu ? 'تفصیلی موسمیاتی مشاہدات' : 'Atmospheric Observations & Metrics'}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-9 gap-3">
                  
                  {/* 1. 🌡️ Temperature */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-400 mb-1.5">
                      <span className="text-[11px] font-semibold">{t.weather.temperature}</span>
                      <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                    </div>
                    <div>
                      <span className="font-mono text-lg font-bold text-white block">
                        {formatTemp(weather.temperatureC)}
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {formatTemp(weather.todayHighC)} / {formatTemp(weather.todayLowC)}
                      </span>
                    </div>
                  </div>

                  {/* 2. 💧 Humidity */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-400 mb-1.5">
                      <span className="text-[11px] font-semibold">{t.weather.humidity}</span>
                      <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div>
                      <span className="font-mono text-lg font-bold text-white block">
                        {weather.humidity}%
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {weather.humidity > 70 ? (isUrdu ? 'زیادہ نمی' : 'High') : (isUrdu ? 'معتدل' : 'Optimal')}
                      </span>
                    </div>
                  </div>

                  {/* 3. 💨 Wind */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-400 mb-1.5">
                      <span className="text-[11px] font-semibold">{t.weather.wind}</span>
                      <Wind className="w-3.5 h-3.5 text-teal-400" />
                    </div>
                    <div>
                      <span className="font-mono text-base font-bold text-white block truncate">
                        {weather.windSpeedKmH} km/h
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {isUrdu ? `رُخ: ${weather.windDirection}` : `Vector: ${weather.windDirection}`}
                      </span>
                    </div>
                  </div>

                  {/* 4. 🌧️ Rain Chance */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-400 mb-1.5">
                      <span className="text-[11px] font-semibold">{t.weather.rainChance}</span>
                      <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div>
                      <span className="font-mono text-lg font-bold text-white block">
                        {weather.precipitationChance}%
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {weather.precipitationMm > 0 ? `${weather.precipitationMm} mm` : (isUrdu ? 'خشک' : 'Dry')}
                      </span>
                    </div>
                  </div>

                  {/* 5. ☀️ UV Index */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-400 mb-1.5">
                      <span className="text-[11px] font-semibold">{t.weather.uvIndex}</span>
                      <SunMedium className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div>
                      <span className="font-mono text-lg font-bold text-white block">
                        {weather.uvIndex}
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-0.5 truncate">
                        {weather.uvIndexText}
                      </span>
                    </div>
                  </div>

                  {/* 6. 👁️ Visibility */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-400 mb-1.5">
                      <span className="text-[11px] font-semibold">{t.weather.visibility}</span>
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="font-mono text-lg font-bold text-white block">
                        {weather.visibilityKm} km
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {weather.visibilityKm >= 9 ? (isUrdu ? 'واضح' : 'Clear') : (isUrdu ? 'دھند' : 'Hazy')}
                      </span>
                    </div>
                  </div>

                  {/* 7. 🔆 Pressure */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-400 mb-1.5">
                      <span className="text-[11px] font-semibold">{t.weather.pressure}</span>
                      <Gauge className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                    <div>
                      <span className="font-mono text-base font-bold text-white block">
                        {weather.pressureHpa} hPa
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {isUrdu ? 'مستحکم' : 'Steady'}
                      </span>
                    </div>
                  </div>

                  {/* 8. 🌅 Sunrise */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-400 mb-1.5">
                      <span className="text-[11px] font-semibold">{t.weather.sunrise}</span>
                      <Sunrise className="w-3.5 h-3.5 text-[#F5D061]" />
                    </div>
                    <div>
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#FFF0A0] block">
                        {weather.sunrise}
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {isUrdu ? 'صبح کا وقت' : 'Morning'}
                      </span>
                    </div>
                  </div>

                  {/* 9. 🌇 Sunset */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between text-stone-400 mb-1.5">
                      <span className="text-[11px] font-semibold">{t.weather.sunset}</span>
                      <Sunset className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div>
                      <span className="font-mono text-xs sm:text-sm font-bold text-amber-200 block">
                        {weather.sunset}
                      </span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {isUrdu ? 'شام کا وقت' : 'Evening'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* HOURLY WEATHER REPORTS (12-Hour Continuous Timeline) */}
              {weather.hourlyForecast && weather.hourlyForecast.length > 0 && (
                <div className="rounded-2xl bg-black/45 border border-[#D4AF37]/35 p-5 sm:p-7 backdrop-blur-md shadow-xl">
                  {/* Hourly Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#F5D061]" />
                      <div>
                        <h3 className="font-serif text-lg font-bold text-white leading-tight">
                          {t.weather.hourlyTitle}
                        </h3>
                        <p className="text-[11px] text-stone-400">
                          {t.weather.hourlySubtitle}
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-300 font-mono">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>
                        {weather.provider === 'AccuWeather' ? 'AccuWeather® Hourly Feed' : (isUrdu ? '12 گھنٹے کا لائیو ٹائم لائن' : '12-Hour Hourly Telemetry')}
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Scroll Track */}
                  <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-[#D4AF37]/40 scrollbar-track-black/40 -mx-1 px-1">
                    <div className="flex items-stretch gap-3 min-w-max">
                      {weather.hourlyForecast.map((hourItem, idx) => (
                        <div
                          key={idx}
                          className={`p-3 sm:p-3.5 rounded-xl border flex flex-col justify-between items-center text-center transition-all min-w-[100px] sm:min-w-[115px] ${
                            idx === 0
                              ? 'bg-gradient-to-b from-[#103822] via-[#0d2e1b] to-black/80 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                              : 'bg-black/50 border-white/10 hover:border-[#D4AF37]/50 hover:bg-black/70'
                          }`}
                        >
                          {/* Hour Stamp */}
                          <div className="w-full pb-1.5 border-b border-white/10 mb-1">
                            <span className={`text-[11px] font-bold font-mono tracking-tight block truncate ${idx === 0 ? 'text-[#F5D061]' : 'text-stone-300'}`}>
                              {hourItem.time}
                            </span>
                          </div>

                          {/* Weather Icon */}
                          <div className="my-2">
                            {getWeatherIcon(hourItem.condition)}
                          </div>

                          {/* Temp */}
                          <span className="font-mono text-base sm:text-lg font-black text-white">
                            {formatTemp(hourItem.tempC)}
                          </span>

                          {/* Condition text */}
                          <span className="text-[10px] text-stone-300 max-w-[95px] truncate mt-0.5" title={hourItem.condition}>
                            {hourItem.condition}
                          </span>

                          {/* Rain chance pill */}
                          <div className="mt-2.5 pt-2 border-t border-white/10 w-full flex items-center justify-center gap-1 text-[10px]">
                            <CloudRain className="w-3 h-3 text-sky-400" />
                            <span className={hourItem.rainChance > 20 ? 'text-sky-300 font-bold' : 'text-stone-400'}>
                              {hourItem.rainChance}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 5-DAY AGRO-WEATHER FORECAST SECTION */}
              <div className="rounded-2xl bg-black/40 border border-[#D4AF37]/30 p-5 sm:p-7 backdrop-blur-md">
                
                {/* Forecast Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#F5D061]" />
                    <h3 className="font-serif text-lg font-bold text-white">
                      {t.weather.forecast}
                    </h3>
                  </div>

                  <span className="text-xs text-stone-400 font-mono">
                    {isUrdu ? 'چنڈ بھروانہ زرعی بیسن' : 'Chund Bharwana Basin — 5-Day Projection'}
                  </span>
                </div>

                {/* 5 Forecast Day Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  {weather.forecast.slice(0, 5).map((dayItem, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-[#D4AF37]/60 hover:bg-black/70 transition-all flex flex-col justify-between text-center group shadow-md"
                    >
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-[#FFF0A0] transition">
                          {dayItem.day}
                        </p>
                        <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                          {dayItem.date}
                        </p>

                        <div className="my-3 flex justify-center">
                          {getWeatherIcon(dayItem.condition)}
                        </div>

                        <p className="text-xs text-stone-200 font-medium truncate" title={dayItem.condition}>
                          {dayItem.condition}
                        </p>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-white font-mono">
                          <span className="text-white">{formatTemp(dayItem.highC)}</span>
                          <span className="text-stone-400 font-normal">/</span>
                          <span className="text-stone-400 font-normal">{formatTemp(dayItem.lowC)}</span>
                        </div>

                        <div className="mt-1.5 flex items-center justify-center gap-1 text-[11px]">
                          <CloudRain className="w-3 h-3 text-sky-400" />
                          <span className={dayItem.rainChance > 25 ? 'text-sky-300 font-bold' : 'text-stone-400'}>
                            {dayItem.rainChance}% {t.weather.rainChance}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AccuWeather Attribution */}
                {weather.provider === 'AccuWeather' && (
                  <div className="mt-4 pt-3 border-t border-white/5 text-right">
                    <a
                      href={weather.accuWeatherLink || weather.providerAttributionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-stone-400 hover:text-white inline-flex items-center gap-1 transition"
                    >
                      <span>{t.weather.accuWeatherAttribution}</span>
                      <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                    </a>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* METEOROLOGICAL DETAILS & PROVENANCE MODAL */}
      {showDetailsModal && weather && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#092b19] border border-[#D4AF37]/50 p-6 sm:p-7 shadow-2xl text-white">
            <button
              type="button"
              onClick={() => setShowDetailsModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full cursor-pointer"
              aria-label={t.weather.close}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[#F5D061]">
              <Activity className="w-5 h-5" />
              <h4 className="font-serif text-lg sm:text-xl font-bold">{t.weather.sourcesTitle}</h4>
            </div>

            <p className="text-xs text-stone-300 mb-4 leading-relaxed">
              {t.weather.sourcesDesc}
            </p>

            <div className="space-y-2.5 mb-5 text-xs">
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Enterprise:</span>
                  <span className="font-bold text-[#FFF0A0]">SANDRANA RICE MILLS – Puber Wala</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Target Location:</span>
                  <span className="font-semibold text-white">Puber Wala, Chund Bharwana, Jhang</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Coordinates:</span>
                  <span className="font-mono text-stone-200">31.4287° N, 72.1932° E</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Active Provider:</span>
                  <span className="font-semibold text-emerald-300">{weather.provider}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Auto-Refresh Interval:</span>
                  <span className="font-mono text-emerald-300">Every 120 Seconds (2 min)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Last Observation Sync:</span>
                  <span className="font-mono text-white">{weather.lastUpdated}</span>
                </div>
              </div>

              {weather.provider === 'AccuWeather' && (
                <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/30">
                  <p className="font-semibold text-sky-200 mb-1">AccuWeather® Core Weather API</p>
                  <p className="text-[11px] text-stone-300 mb-2">
                    Official AccuWeather telemetry for Chund Bharwana, Jhang.
                  </p>
                  <a
                    href={weather.accuWeatherLink || weather.providerAttributionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-bold"
                  >
                    <span>{t.weather.openAccuWeather}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 text-right">
              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D061] text-slate-950 text-xs font-bold shadow-md cursor-pointer hover:opacity-90 transition"
              >
                {t.weather.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
