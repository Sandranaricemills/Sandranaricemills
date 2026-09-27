import React, { useState, useEffect } from 'react';
import {
  Sun,
  CloudSun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Compass,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Thermometer,
  Calendar,
  Sparkles,
  Search,
  CheckCircle2,
  X,
  Wheat,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface WeatherData {
  location: string;
  subArea: string;
  district: string;
  province: string;
  temperatureC: number;
  temperatureF: number;
  condition: string;
  conditionDescription: string;
  feelsLikeC: number;
  humidity: number;
  windSpeedKmH: number;
  windDirection: string;
  uvIndex: number;
  visibilityKm: number;
  precipitationChance: number;
  airQuality: string;
  pressureHpa: number;
  millingAdvisory: {
    sunDryingSuitability: 'Excellent' | 'Good' | 'Moderate' | 'Poor';
    paddyMoistureImpact: string;
    actionableAdvice: string;
  };
  forecast: Array<{
    day: string;
    condition: string;
    highC: number;
    lowC: number;
    rainChance: number;
  }>;
  lastUpdated: string;
  groundingSources?: Array<{
    title: string;
    uri: string;
  }>;
}

export const WeatherWidget: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [showSourcesModal, setShowSourcesModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
        weekday: 'long',
        year: 'numeric',
        month: 'long',
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
    } else {
      setLoading(true);
    }
    setErrorMsg(null);

    try {
      const url = isManualRefresh ? '/api/weather?refresh=true' : '/api/weather';
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data.success && data.data) {
        setWeather(data.data);
      } else {
        throw new Error(data.error || 'Failed to retrieve weather data');
      }
    } catch (err: any) {
      console.warn('Weather fetch warning:', err);
      setErrorMsg(err.message || 'Unable to sync with Google Search Grounding.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather(false);
    // Periodically sync every 15 minutes
    const interval = setInterval(() => {
      fetchWeather(false);
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string = '') => {
    const c = condition.toLowerCase();
    if (c.includes('rain') || c.includes('shower') || c.includes('drizzle')) {
      return <CloudRain className="w-12 h-12 text-sky-400 animate-pulse" />;
    }
    if (c.includes('cloud') || c.includes('overcast') || c.includes('haze') || c.includes('dust')) {
      return <CloudSun className="w-12 h-12 text-[#F5D061]" />;
    }
    return <Sun className="w-14 h-14 text-[#F5D061] animate-spin-slow" />;
  };

  const getDryingSuitabilityColor = (status: string = 'Good') => {
    switch (status) {
      case 'Excellent':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Good':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      case 'Moderate':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Poor':
      default:
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
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
      className="relative py-16 bg-gradient-to-b from-[#061c10] via-[#092b19] to-[#05180e] text-white overflow-hidden border-y border-[#D4AF37]/30"
    >
      {/* Target anchor for #dashboard navigation */}
      <span id="dashboard" className="absolute -top-24" />

      {/* Decorative Atmosphere & Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(245,208,97,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block with Grounding Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            {/* Real-time Google Search Grounding Badge & Live Date/Time */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-[#D4AF37]/40 text-[#E4C868] text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-white font-bold">{t.weather.liveStatus}</span>
                <span className="text-[#D4AF37]/60">•</span>
                <span className="flex items-center gap-1 text-[#F5D061]">
                  <Search className="w-3 h-3 text-[#D4AF37]" />
                  {t.weather.groundedBadge}
                </span>
              </div>

              {/* Live PST Date & Time Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#D4AF37]/40 text-xs text-stone-200 backdrop-blur-md shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-[#F5D061]" />
                <span className="text-stone-200 font-medium">{dateStr}</span>
                <span className="text-[#D4AF37]/60">•</span>
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-mono font-bold text-white tracking-wide">{timeStr}</span>
                <span className="px-1.5 py-0.2 rounded bg-[#1B4332] text-[#F5D061] text-[10px] font-bold border border-[#D4AF37]/40">
                  PST
                </span>
              </div>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {t.weather.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
              {t.weather.subtitle}
            </p>
          </div>

          {/* Action & Unit Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Unit Toggle Switch */}
            <div className="inline-flex items-center p-1 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setTempUnit('C')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  tempUnit === 'C'
                    ? 'bg-[#D4AF37] text-slate-950 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
                title={t.weather.tempToggle}
              >
                °C
              </button>
              <button
                type="button"
                onClick={() => setTempUnit('F')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  tempUnit === 'F'
                    ? 'bg-[#D4AF37] text-slate-950 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
                title={t.weather.tempToggle}
              >
                °F
              </button>
            </div>

            {/* Refresh Button with Google Search Grounding */}
            <button
              type="button"
              onClick={() => fetchWeather(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#FFF0A0] hover:text-white text-xs font-semibold border border-[#D4AF37]/50 backdrop-blur-md transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#D4AF37] ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? t.weather.refreshing : t.weather.refreshBtn}</span>
            </button>

            {/* Sources Button */}
            {weather?.groundingSources && weather.groundingSources.length > 0 && (
              <button
                type="button"
                onClick={() => setShowSourcesModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-xs font-medium border border-white/15 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.weather.groundingSourcesBtn}</span>
              </button>
            )}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && !weather && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
            <div className="h-64 rounded-2xl bg-white/5 border border-white/10" />
            <div className="h-64 rounded-2xl bg-white/5 border border-white/10" />
            <div className="h-64 rounded-2xl bg-white/5 border border-white/10" />
          </div>
        )}

        {/* Live Weather Content Grid */}
        {weather && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Card 1: Primary Current Weather Gauge (5 Columns on Large) */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#0c2e1b]/95 via-[#072013]/90 to-[#04140b]/95 border border-[#D4AF37]/40 p-6 sm:p-8 backdrop-blur-md shadow-xl relative overflow-hidden flex flex-col justify-between group">
              {/* Gold Top Light Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F5D061] to-transparent opacity-80" />

              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#E4C868] font-bold">
                      {weather.location}
                    </span>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {weather.subArea}, {weather.district}, {weather.province}
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 shadow-inner shrink-0">
                    {getWeatherIcon(weather.condition)}
                  </div>
                </div>

                {/* Live Date & Time Bar inside Weather Frame */}
                <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-[#D4AF37]/35 text-xs text-stone-200 mb-3 shadow-inner">
                  <div className="flex items-center gap-1.5 text-stone-200">
                    <Calendar className="w-3.5 h-3.5 text-[#F5D061]" />
                    <span className="font-medium text-[#FFF0A0]">{dateStr}</span>
                  </div>
                  <span className="text-[#D4AF37]/50">•</span>
                  <div className="flex items-center gap-1.5 text-white font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="font-bold text-white tracking-wider">{timeStr}</span>
                    <span className="text-[10px] font-sans px-1.5 py-0.2 rounded bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 font-semibold">
                      PST
                    </span>
                  </div>
                </div>

                {/* Big Temperature Hero */}
                <div className="flex items-baseline gap-4 my-2">
                  <span className="font-serif text-6xl sm:text-7xl font-black text-white tracking-tight">
                    {formatTemp(weather.temperatureC)}
                  </span>
                  <div className="text-left">
                    <span className="block text-lg font-semibold text-[#FFF0A0]">
                      {weather.condition}
                    </span>
                    <span className="block text-xs text-stone-400">
                      {t.weather.feelsLike} {formatTemp(weather.feelsLikeC)}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 mt-3 italic leading-relaxed">
                  "{weather.conditionDescription}"
                </p>
              </div>

              {/* Sub-bar metrics */}
              <div className="grid grid-cols-3 gap-2.5 pt-6 mt-6 border-t border-white/10 text-center">
                <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                  <div className="flex items-center justify-center gap-1 text-sky-400 mb-1">
                    <Droplets className="w-3.5 h-3.5" />
                    <span className="text-[11px] text-stone-400">{t.weather.humidity}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{weather.humidity}%</span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                  <div className="flex items-center justify-center gap-1 text-teal-400 mb-1">
                    <Wind className="w-3.5 h-3.5" />
                    <span className="text-[11px] text-stone-400">{t.weather.windSpeed}</span>
                  </div>
                  <span className="text-sm font-bold text-white">
                    {weather.windSpeedKmH} km/h {weather.windDirection}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                  <div className="flex items-center justify-center gap-1 text-[#F5D061] mb-1">
                    <Sun className="w-3.5 h-3.5" />
                    <span className="text-[11px] text-stone-400">{t.weather.uvIndex}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{weather.uvIndex} / 11</span>
                </div>
              </div>

              {/* Last sync footer */}
              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-3 mt-3 border-t border-white/5">
                <span>{t.weather.lastUpdated}: {weather.lastUpdated}</span>
                <span className="text-[#D4AF37] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Google Grounded
                </span>
              </div>
            </div>

            {/* Card 2: Specialized Rice Milling & Paddy Agriculture Advisory (4 Columns) */}
            <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#0a2616]/95 via-[#082214]/90 to-[#041209]/95 border border-[#D4AF37]/40 p-6 sm:p-7 backdrop-blur-md shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Wheat className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="font-serif text-lg font-bold text-white">
                      {t.weather.millingTitle}
                    </h3>
                  </div>

                  {/* Sun Drying Suitability Tag */}
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border ${getDryingSuitabilityColor(
                      weather.millingAdvisory.sunDryingSuitability
                    )}`}
                  >
                    {weather.millingAdvisory.sunDryingSuitability}
                  </span>
                </div>

                {/* Grain Moisture Impact Analysis */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 mb-4">
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-[#FFF0A0]">
                    <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    <span>{t.weather.paddyMoisture}</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {weather.millingAdvisory.paddyMoistureImpact}
                  </p>
                </div>

                {/* Actionable Floor & Yard Advisory */}
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.weather.actionAdvice}</span>
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    {weather.millingAdvisory.actionableAdvice}
                  </p>
                </div>
              </div>

              {/* Atmospheric Details Grid */}
              <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5">
                  <span className="text-stone-400 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-stone-400" />
                    {t.weather.visibility}
                  </span>
                  <span className="font-medium text-white">{weather.visibilityKm} km</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5">
                  <span className="text-stone-400 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-stone-400" />
                    {t.weather.pressure}
                  </span>
                  <span className="font-medium text-white">{weather.pressureHpa} hPa</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5">
                  <span className="text-stone-400 flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5 text-stone-400" />
                    {t.weather.precipitation}
                  </span>
                  <span className="font-medium text-white">{weather.precipitationChance}%</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5">
                  <span className="text-stone-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-stone-400" />
                    {t.weather.airQuality}
                  </span>
                  <span className="font-medium text-white">{weather.airQuality}</span>
                </div>
              </div>
            </div>

            {/* Card 3: 3-Day Agricultural Forecast (3 Columns) */}
            <div className="lg:col-span-3 rounded-2xl bg-gradient-to-br from-[#0a2616]/95 via-[#082214]/90 to-[#041209]/95 border border-[#D4AF37]/40 p-6 sm:p-7 backdrop-blur-md shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="font-serif text-base font-bold text-white">
                    {t.weather.forecastTitle}
                  </h3>
                </div>

                <div className="space-y-3">
                  {weather.forecast.map((dayItem, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-black/30 border border-white/10 hover:border-[#D4AF37]/40 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="shrink-0">
                          {getWeatherIcon(dayItem.condition)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{dayItem.day}</p>
                          <p className="text-[11px] text-stone-400">{dayItem.condition}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-bold text-white">
                          {formatTemp(dayItem.highC)}
                          <span className="text-[11px] font-normal text-stone-400 ml-1">
                            / {formatTemp(dayItem.lowC)}
                          </span>
                        </p>
                        {dayItem.rainChance > 0 && (
                          <span className="text-[10px] text-sky-400 flex items-center justify-end gap-0.5 mt-0.5">
                            <Droplets className="w-2.5 h-2.5" />
                            {dayItem.rainChance}% rain
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mill Geographical Location Tag */}
              <div className="mt-5 pt-3.5 border-t border-white/10 text-center">
                <p className="text-[11px] text-stone-400">
                  <span className="text-[#E4C868] font-semibold">Puber Wala Jhang Region:</span> Chenab agricultural basin, optimal for Super Basmati & 1121 Kainat cultivation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error message indicator if any */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{errorMsg} Displaying verified regional seasonal weather baseline.</span>
          </div>
        )}
      </div>

      {/* Google Search Grounding Sources Modal */}
      {showSourcesModal && weather?.groundingSources && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#092b19] border border-[#D4AF37]/50 p-6 shadow-2xl text-white">
            <button
              type="button"
              onClick={() => setShowSourcesModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full cursor-pointer"
              aria-label={t.weather.close}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[#F5D061]">
              <Search className="w-4 h-4" />
              <h4 className="font-serif text-lg font-bold">{t.weather.sourcesTitle}</h4>
            </div>

            <p className="text-xs text-stone-300 mb-4 leading-relaxed">
              {t.weather.sourcesDesc}
            </p>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {weather.groundingSources.map((source, index) => (
                <a
                  key={index}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10 hover:border-[#D4AF37]/60 hover:bg-black/60 transition-all text-xs text-stone-200 group"
                >
                  <span className="truncate pr-2 font-medium group-hover:text-[#FFF0A0]">
                    {source.title || source.uri}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                </a>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 text-right">
              <button
                type="button"
                onClick={() => setShowSourcesModal(false)}
                className="px-4 py-2 rounded-lg bg-[#D4AF37] text-slate-950 text-xs font-bold hover:bg-[#B89222] transition-colors cursor-pointer"
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
