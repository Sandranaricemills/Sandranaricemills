import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useImage } from '../context/ImageContext';
import { MapPin, Award, ShieldCheck, HeartHandshake, Sparkles, ZoomIn } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const { openLightbox } = useImage();

  return (
    <section id="about" className="py-20 bg-[#FAF8F5] relative overflow-hidden border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/70 border border-amber-300/60 text-amber-900 text-xs font-semibold uppercase tracking-widest rounded-full mb-3">
            <Sparkles className="w-3 h-3 text-[#B89222]" />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-lg sm:text-xl font-serif text-[#1B4332] font-semibold italic">
            {isUrdu ? 'پنجاب کی زرخیز دھرتی سے اعلیٰ ترین معیار کا چاول' : 'Quality Rice from the Heart of Punjab, Pakistan'}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Showcase (Authentic Punjab Agricultural Collage) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/35 hover:border-[#D4AF37]/65 transition-all duration-500 bg-stone-900 group">
              <div
                className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden cursor-pointer"
                onClick={() =>
                  openLightbox(
                    '/images/Punjab%20culture%20heritage.png',
                    isUrdu ? 'پنجاب زرعی ورثہ و روایات' : 'Punjab Agricultural Heritage & Culture',
                    isUrdu
                      ? 'پنجاب کے زرخیز کھیت، روایتی شجرکاری اور سنہری دھان کی فصل'
                      : 'Five-panel authentic agricultural showcase: paddy dawn, lush panicles, traditional farmers transplanting, flooded fields, and Pakistani flag in field.'
                  )
                }
              >
                {/* Selected Element: img:nth-of-type(1) */}
                <img
                  src="/images/Punjab%20culture%20heritage.png"
                  alt={isUrdu ? 'پنجاب زرعی ثقافت اور دھان کی کاشتکاری' : 'Punjab agricultural heritage and authentic rice farming traditions'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out contrast-[1.03] brightness-[1.01]"
                  loading="eager"
                />

                {/* Subtle vignette and gold accent rim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                {/* Hover zoom icon */}
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                  <span className="p-3 bg-white/95 rounded-full text-slate-900 shadow-xl transition transform group-hover:scale-110">
                    <ZoomIn className="w-5 h-5 text-[#B89222]" />
                  </span>
                </div>

                {/* Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/75 backdrop-blur-md border border-[#D4AF37]/40 text-[#F5D061] text-xs font-semibold tracking-wide rounded-md shadow-md">
                  {isUrdu ? 'خالص پنجابی زراعت و دھان' : 'Authentic Punjab Agriculture'}
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white/80 backdrop-blur-xs rounded-lg border border-stone-200 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span className="font-semibold text-slate-900">
                  {isUrdu ? 'دریائے چناب و جہلم کا زرخیز طاس' : 'Direct From The Indus Basin'}
                </span>
              </div>
              <span className="text-amber-700 font-medium">
                {isUrdu ? 'جھنگ–سرگودھا زرعی بیلٹ' : 'Jhang–Sargodha Agricultural Belt'}
              </span>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="space-y-6 text-slate-700 leading-relaxed">
              <p className="text-base sm:text-lg text-slate-800 font-medium">
                {t.about.p1}
              </p>

              <p className="text-sm sm:text-base">
                {t.about.p2}
              </p>

              <p className="text-sm sm:text-base">
                {t.about.p3}
              </p>

              {/* Four Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-emerald-800" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-sm">
                      {isUrdu ? 'بہترین دھان کا انتخاب' : 'Selective Paddy Procurement'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {isUrdu ? 'پنجاب کے بہترین کھیتوں سے مکمل تیار اور یکساں فصل کی خریداری۔' : 'Only mature, uniform grain heads from trusted Punjab harvest fields.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-sm">
                      {isUrdu ? 'مستقل اور قابلِ اعتماد معیار' : 'Consistent Quality'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {isUrdu ? 'نمی کی درستگی اور داغدار دانوں سے پاک گریڈنگ۔' : 'Moisture calibration and grading to eliminate chalkiness and breakage.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-sm">
                      {isUrdu ? 'دیانتدارانہ کاروباری روابط' : 'Transparent Dealings'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {isUrdu ? 'منصفانہ نرخ، شفاف سودے اور دیرپا گاہک تعلقات۔' : 'Honest grading, fair pricing, and long-term buyer relationships.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-stone-200 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-emerald-800" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-sm">
                      {isUrdu ? 'اہم ترین جغرافیائی لوکیشن' : 'Strategic Location'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {isUrdu ? 'جھنگ–سرگودھا مین شاہراہ پر تیز رفتار ٹرک ترسیل کی سہولت۔' : 'Fast highway transport access via Jhang–Sargodha Road for quick dispatch.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
