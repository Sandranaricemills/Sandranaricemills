import React from 'react';
import { PROCESSING_STEPS } from '../data/millData';
import { MillImage } from './common/MillImage';
import { useLanguage } from '../context/LanguageContext';
import {
  Sprout,
  ShieldCheck,
  Cog,
  Sparkles,
  Eye,
  PackageCheck,
  CheckCircle,
  Factory
} from 'lucide-react';

export const OurMill: React.FC = () => {
  const { isUrdu, t } = useLanguage();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sprout': return <Sprout className="w-5 h-5 text-emerald-800" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-800" />;
      case 'Cog': return <Cog className="w-5 h-5 text-emerald-800" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-emerald-800" />;
      case 'Eye': return <Eye className="w-5 h-5 text-emerald-800" />;
      case 'PackageCheck': return <PackageCheck className="w-5 h-5 text-emerald-800" />;
      default: return <CheckCircle className="w-5 h-5 text-emerald-800" />;
    }
  };

  const getStepData = (step: any) => {
    if (!isUrdu) return step;
    const urduSteps: Record<string, { title: string; shortDesc: string; details: string }> = {
      '01': {
        title: 'دھان کا انتخاب و آمد',
        shortDesc: 'فصل کی جانچ اور کوالٹی چیک',
        details: 'پنجاب کے بہترین کاشتکاروں سے خالص دھان کی خریداری اور رطوبت کی پیمائش۔'
      },
      '02': {
        title: 'پری کلیننگ اور صفائی',
        shortDesc: 'تنکے، مٹی اور پتھروں کا خاتمہ',
        details: 'جدید وائبریٹری چھلنیوں اور ڈی سٹونرز کے ذریعے مکمل صفائی۔'
      },
      '03': {
        title: 'ڈی ہسکنگ (چھلکا اتارنا)',
        shortDesc: 'ربڑ رول ڈی ہسکنگ ٹیکنالوجی',
        details: 'دانے کو ٹوٹنے سے بچاتے ہوئے نہایت احتیاط کے ساتھ چھلکا اتارا جاتا ہے۔'
      },
      '04': {
        title: 'سلکی واٹر پالشنگ',
        shortDesc: 'شفاف اور چمکدار دانہ',
        details: 'فلٹر شدہ پانی کی نمی سے دانوں کو یکساں، شفاف اور چمکدار بنایا جاتا ہے۔'
      },
      '05': {
        title: 'کلر سارٹنگ و گریڈنگ',
        shortDesc: 'سی سی ڈی آپٹیکل کیمرہ فلٹریشن',
        details: 'داغدار، زرد اور خراب دانوں کو خودکار کمپیوٹرائزڈ سسٹم کے ذریعے علیحدہ کرنا۔'
      },
      '06': {
        title: 'خودکار پیکنگ و ترسیل',
        shortDesc: '25 کلو، 50 کلو اور کسٹم بیگز',
        details: 'صاف ستھرے بیگز میں وزنی پیمائش کے ساتھ پیکنگ اور فوری لوڈنگ۔'
      }
    };
    return urduSteps[step.step] ? { ...step, ...urduSteps[step.step] } : step;
  };

  return (
    <section id="mill" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold uppercase tracking-widest rounded-full mb-3">
            <Factory className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.mill.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t.mill.title}
          </h2>
          <p className="text-slate-600 font-sans text-base sm:text-lg max-w-2xl mx-auto">
            {t.mill.subtitle}
          </p>
        </div>

        {/* Visual Callout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="rounded-xl overflow-hidden shadow-lg border border-stone-200 bg-white">
            <MillImage
              slotKey="crop_dhaan"
              alt="Harvest-ready ripe paddy crop panicles (Dhaan) in Punjab fields"
              className="w-full h-80 object-cover"
              allowZoom={true}
              badgeLabel={isUrdu ? 'کھیت کی فصل • تیار دھان' : 'Field Harvest • Dhaan'}
            />
            <div className="p-4 bg-white border-t border-stone-100 text-xs text-slate-600">
              <span className="font-bold text-slate-900">
                {isUrdu ? 'مرحلہ 01: پنجاب کے کھیتوں سے تیار فصل — ' : 'Stage 01: Punjab Field Maturation — '}
              </span>
              {isUrdu
                ? 'ہم صرف اس وقت دھان خریدتے ہیں جب نمی کا تناسب قدرتی طور پر معیار کے عین مطابق ہو۔'
                : 'We procure exclusively when paddy moisture naturally reaches physiological ripening in local Punjabi fields.'}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg border border-stone-200 bg-white">
            <MillImage
              slotKey="paddy_hands"
              alt="Intake inspection of freshly harvested golden paddy 1121"
              className="w-full h-80 object-cover"
              allowZoom={true}
              badgeLabel={isUrdu ? 'معائنہ و کوالٹی چیک' : 'Intake Quality Testing'}
            />
            <div className="p-4 bg-white border-t border-stone-100 text-xs text-slate-600">
              <span className="font-bold text-slate-900">
                {isUrdu ? 'آمد پر نمونہ جات کی جانچ — ' : 'Intake Inspection — '}
              </span>
              {isUrdu
                ? 'ہر ٹرک سے نمونہ لے کر دانے کی لمبائی، خوشبو اور نمی کا مکمل تجزیہ کیا جاتا ہے۔'
                : 'Manual sample testing across each incoming truckload to verify kernel fullness, aroma, and freedom from red striations.'}
            </div>
          </div>
        </div>

        {/* 6 Step Sequential Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESSING_STEPS.map((step) => {
            const s = getStepData(step);
            return (
              <div
                key={step.step}
                className="p-6 rounded-xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                      {getIcon(step.iconName)}
                    </div>
                    <span className="font-mono text-2xl font-bold text-[#D4AF37]">
                      {step.step}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold text-slate-900 mb-1 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                    {s.title}
                  </h3>

                  <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-3">
                    {s.shortDesc}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.details}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <CheckCircle className="w-3 h-3 text-[#B89222]" />
                  <span>{isUrdu ? 'سٹین لیس سٹیل حفظانِ صحت کنویئرز' : 'Sanitary stainless steel conveyance'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modern Machinery & Cleanliness Highlight */}
        <div className="mt-16 p-8 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h4 className={`text-lg font-bold text-slate-900 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {isUrdu ? 'نیومیٹک نرم چھلکا اتارنے کی مشینری' : 'Pneumatic Gentle Milling'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUrdu
                  ? 'جدید ربڑ رول ڈی ہسکرز باسمتی اور 1121 دانے کو ٹوٹنے سے بچاتے ہوئے چھلکا علیحدہ کرتے ہیں۔'
                  : 'Rubber roll huskers and aspirated aspirators ensure delicate Basmati and 1121 long-grain kernels do not fracture during shell stripping.'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className={`text-lg font-bold text-slate-900 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {isUrdu ? 'مائیکرو مسٹ سلکی واٹر پالشنگ' : 'Micro-Mist Water Polishing'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUrdu
                  ? 'خالص فلٹر شدہ پانی کی پھوار سے چاول کی سطح کو صاف اور قدرتی طور پر چمکدار بنایا جاتا ہے۔'
                  : 'Using pure filtered water mist under gentle friction, outer aleurone layers are removed to create a clean, non-sticky translucent surface.'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className={`text-lg font-bold text-slate-900 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {isUrdu ? 'جدید آپٹیکل کمپیوٹرائزڈ کلر سارٹرز' : 'Trichromatic CCD Color Sorters'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUrdu
                  ? 'ہائی سپیڈ مائیکرو کیمرے ہر گزرتے دانے کو اسکین کر کے داغدار دانوں کو فوری باہر نکال پھینکتے ہیں۔'
                  : 'High-speed micro cameras analyze every passing kernel, blasting discolored, chalky, or yellow grains into separate reject chutes.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
