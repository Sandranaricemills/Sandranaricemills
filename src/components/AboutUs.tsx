import React from 'react';
import { MillImage } from './common/MillImage';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Award, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { isUrdu, t } = useLanguage();

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
            <div className="rounded-xl overflow-hidden shadow-xl border border-stone-200 bg-white">
              <MillImage
                slotKey="punjab_heritage"
                alt="Punjab agricultural heritage and rice farming traditions"
                className="w-full h-auto max-h-[480px] object-cover"
                allowZoom={true}
                badgeLabel={isUrdu ? 'خالص پنجابی زراعت و دھان' : 'Authentic Punjab Agriculture'}
              />
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
