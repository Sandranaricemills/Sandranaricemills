import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, CheckCircle2, MapPin, CloudSun } from 'lucide-react';
import { useImage } from '../context/ImageContext';
import { useLanguage } from '../context/LanguageContext';
import { MILL_INFO } from '../data/millData';

export const Hero: React.FC = () => {
  const { getImage } = useImage();
  const { isUrdu, t } = useLanguage();
  const bannerRecord = getImage('mill_banner');

  const defaultLocalUrl = '/images/Sandranaricemills.png';
  const driveImageUrl = 'https://lh3.googleusercontent.com/d/1bsaeRLRZF--muqMHy2XPEz5aVWMOPBYc';
  const [heroSrc, setHeroSrc] = useState(
    bannerRecord.isCustom ? bannerRecord.url : defaultLocalUrl
  );

  useEffect(() => {
    if (bannerRecord.isCustom) {
      setHeroSrc(bannerRecord.url);
    } else {
      setHeroSrc(defaultLocalUrl);
    }
  }, [bannerRecord.isCustom, bannerRecord.url]);

  const handleImageError = () => {
    if (heroSrc === defaultLocalUrl) {
      setHeroSrc(driveImageUrl);
    } else if (heroSrc !== bannerRecord.url) {
      setHeroSrc(bannerRecord.url);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#071a10] text-white">
      {/* Real Mill Banner Photography / Background Matched with Weather Frame Color Grading & Falling Rice Animation */}
      <div className="absolute inset-0 z-0 flex items-end justify-center overflow-hidden bg-gradient-to-br from-[#0c2e1b] via-[#072013] to-[#04140b] shadow-[inset_0_2px_8px_rgba(245,208,97,0.25),inset_0_-30px_60px_rgba(4,20,11,0.95)]">
        {/* Weather Frame Characteristic Top Gold Horizon Light Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F5D061] to-transparent opacity-85 shadow-[0_0_14px_rgba(245,208,97,0.65)] pointer-events-none z-10" />

        {/* Weather Frame Ambient Radial Glows (Emerald & Golden Crescent Glow) */}
        <div className="absolute top-0 right-0 w-[480px] h-[480px] md:w-[720px] md:h-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,208,97,0.18)_0%,rgba(212,175,55,0.1)_35%,transparent_70%)] pointer-events-none blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16)_0%,rgba(12,46,27,0.1)_40%,transparent_70%)] pointer-events-none blur-3xl" />
        
        {/* Golden Crescent Sleek Curved Light Arc */}
        <div className="absolute top-8 right-6 md:right-28 w-60 h-60 md:w-88 md:h-88 rounded-full border-r-[2px] border-t-[1.5px] border-[#F5D061]/40 shadow-[0_0_35px_rgba(245,208,97,0.3)] pointer-events-none opacity-70 blur-[0.5px] animate-crescent-breathe" />

        {/* Charming Realistic Falling Basmati Rice Shower Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
          {[
            { left: '4%', delay: '0s', duration: '6.5s', rotate: '18deg', size: 'w-1.5 h-4.5', opacity: 'opacity-90' },
            { left: '9%', delay: '2.8s', duration: '7.8s', rotate: '-24deg', size: 'w-1 h-3.5', opacity: 'opacity-80' },
            { left: '15%', delay: '1.2s', duration: '6.0s', rotate: '32deg', size: 'w-1.5 h-4', opacity: 'opacity-85' },
            { left: '21%', delay: '4.5s', duration: '8.2s', rotate: '-12deg', size: 'w-2 h-5', opacity: 'opacity-95' },
            { left: '26%', delay: '0.6s', duration: '6.8s', rotate: '25deg', size: 'w-1 h-3.5', opacity: 'opacity-75' },
            { left: '32%', delay: '3.3s', duration: '7.2s', rotate: '-35deg', size: 'w-1.5 h-4.5', opacity: 'opacity-90' },
            { left: '38%', delay: '1.8s', duration: '5.8s', rotate: '15deg', size: 'w-2 h-5', opacity: 'opacity-95' },
            { left: '43%', delay: '5.1s', duration: '8.5s', rotate: '-20deg', size: 'w-1 h-3', opacity: 'opacity-80' },
            { left: '49%', delay: '0.2s', duration: '6.4s', rotate: '28deg', size: 'w-1.5 h-4', opacity: 'opacity-90' },
            { left: '54%', delay: '3.9s', duration: '7.5s', rotate: '-15deg', size: 'w-2 h-5', opacity: 'opacity-95' },
            { left: '60%', delay: '1.5s', duration: '6.2s', rotate: '38deg', size: 'w-1 h-3.5', opacity: 'opacity-80' },
            { left: '66%', delay: '4.8s', duration: '8.0s', rotate: '-28deg', size: 'w-1.5 h-4.5', opacity: 'opacity-90' },
            { left: '72%', delay: '0.9s', duration: '5.9s', rotate: '12deg', size: 'w-2 h-5', opacity: 'opacity-95' },
            { left: '77%', delay: '2.4s', duration: '7.1s', rotate: '-30deg', size: 'w-1 h-3.5', opacity: 'opacity-75' },
            { left: '83%', delay: '4.1s', duration: '8.3s', rotate: '22deg', size: 'w-1.5 h-4', opacity: 'opacity-85' },
            { left: '88%', delay: '1.7s', duration: '6.6s', rotate: '-18deg', size: 'w-2 h-5', opacity: 'opacity-90' },
            { left: '93%', delay: '3.6s', duration: '7.4s', rotate: '30deg', size: 'w-1 h-3.5', opacity: 'opacity-80' },
            { left: '97%', delay: '0.4s', duration: '6.1s', rotate: '-22deg', size: 'w-1.5 h-4.5', opacity: 'opacity-85' },
          ].map((grain, i) => (
            <div
              key={i}
              className="absolute top-0 animate-rice-sway"
              style={{
                left: grain.left,
                animationDelay: `${parseFloat(grain.delay) * 0.4}s`,
              }}
            >
              <div
                className={`rounded-full bg-gradient-to-b from-[#FFFFFF] via-[#FFF9EC] to-[#EBD59B] border border-white/60 shadow-[0_0_8px_rgba(255,255,255,0.8),0_2px_4px_rgba(212,175,55,0.4)] ${grain.size} ${grain.opacity}`}
                style={{
                  transform: `rotate(${grain.rotate})`,
                  animation: `riceFall ${grain.duration} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                  animationDelay: grain.delay,
                  borderRadius: '45% 45% 48% 48% / 60% 60% 40% 40%',
                }}
              />
            </div>
          ))}
        </div>

        <img
          src={heroSrc}
          alt="Sandrana Rice Mills Panoramic Facility"
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-[45%] sm:h-[48%] object-contain object-bottom opacity-50 contrast-110 brightness-105 transition-all duration-700 pointer-events-none filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)] z-[1]"
        />

        {/* Emerald & Gold Vignette Overlays matching the Weather Frame */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c2e1b]/90 via-[#072013]/55 to-[#04140b]/85 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04140b]/70 via-transparent to-black/30 border-b border-[#D4AF37]/40 pointer-events-none shadow-[inset_0_-1px_0_0_rgba(245,208,97,0.35)] z-[1]" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
        <div className="max-w-3xl">
          {/* Geographical origin tag & Live Weather Dashboard Link */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-[#D4AF37]/40 text-[#E4C868] text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5D061] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.hero.badge}</span>
            </div>

            <button
              type="button"
              onClick={() => scrollTo('#weather')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 hover:bg-[#0e331f] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-white hover:text-[#FFF0A0] text-xs font-medium backdrop-blur-md transition-all cursor-pointer shadow-xs"
            >
              <CloudSun className="w-3.5 h-3.5 text-[#F5D061]" />
              <span>Puber Wala Weather</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Live
              </span>
            </button>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.03] mb-6">
            <span className="block text-white tracking-tight [text-shadow:_0_2px_16px_rgba(212,175,55,0.45),_0_4px_28px_rgba(0,0,0,0.85)]">
              {t.hero.titleFirst}
            </span>
            <span className="block bg-gradient-to-r from-[#FFF2B2] via-[#E5BE4A] to-[#B88710] bg-clip-text text-transparent font-black tracking-wide [filter:drop-shadow(0_3px_15px_rgba(212,175,55,0.5))]">
              {t.hero.titleSecond}
            </span>
          </h1>

          {/* Subheading */}
          <p className={`text-xl sm:text-2xl text-stone-200 font-medium mb-4 leading-snug ${isUrdu ? 'font-sans' : 'font-serif'}`}>
            {t.hero.headline}
          </p>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-stone-300 font-sans max-w-2xl leading-relaxed mb-8">
            {t.hero.description}
          </p>

          {/* Action Buttons with animated metallic shine and hover delights */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => scrollTo('#products')}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#E5BE4A] via-[#D4AF37] to-[#B89222] hover:from-[#F0CF65] hover:to-[#C69C28] text-slate-950 font-semibold text-sm rounded shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.55)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-shine pointer-events-none" />
              <span className="relative z-10">{t.hero.exploreProducts}</span>
              <ArrowRight className={`w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1 ${isUrdu ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white/10 hover:bg-[#D4AF37]/15 text-white hover:text-[#FFF0A0] font-medium text-sm rounded border border-white/30 hover:border-[#D4AF37]/70 backdrop-blur-md transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{t.hero.contactUs}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust & Spec Bar below Hero with charming hover reactions */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-transparent border border-white/15 backdrop-blur-xs">
          <div className="group flex items-center gap-3 p-2 rounded-md hover:bg-white/[0.05] transition-all duration-300 cursor-default">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] group-hover:text-[#F5D061] group-hover:scale-110 transition-all shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 group-hover:text-stone-300 font-semibold transition-colors">{t.hero.stats.originTitle}</p>
              <p className="text-sm font-medium text-white">{t.hero.stats.originValue}</p>
            </div>
          </div>

          <div className="group flex items-center gap-3 p-2 rounded-md hover:bg-white/[0.05] transition-all duration-300 cursor-default">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] group-hover:text-[#F5D061] group-hover:scale-110 transition-all shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 group-hover:text-stone-300 font-semibold transition-colors">{t.hero.stats.varietiesTitle}</p>
              <p className="text-sm font-medium text-white">{t.hero.stats.varietiesValue}</p>
            </div>
          </div>

          <div className="group flex items-center gap-3 p-2 rounded-md hover:bg-white/[0.05] transition-all duration-300 cursor-default">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] group-hover:text-[#F5D061] group-hover:scale-110 transition-all shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 group-hover:text-stone-300 font-semibold transition-colors">{t.hero.stats.processingTitle}</p>
              <p className="text-sm font-medium text-white">{t.hero.stats.processingValue}</p>
            </div>
          </div>

          <div className="group flex items-center gap-3 p-2 rounded-md hover:bg-white/[0.05] transition-all duration-300 cursor-default">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] group-hover:text-[#F5D061] group-hover:scale-110 transition-all shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 group-hover:text-stone-300 font-semibold transition-colors">{t.hero.stats.supplyTitle}</p>
              <p className="text-sm font-medium text-white">{t.hero.stats.supplyValue}</p>
            </div>
          </div>
        </div>

        {/* Subtle scroll down indicator */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => scrollTo('#about')}
            className="text-stone-400 hover:text-[#D4AF37] transition p-2 rounded-full cursor-pointer"
            aria-label="Scroll to About section"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
