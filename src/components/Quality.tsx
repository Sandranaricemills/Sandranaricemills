import React from 'react';
import { QUALITY_STANDARDS } from '../data/millData';
import { useLanguage } from '../context/LanguageContext';
import { Award, CheckCircle2, ShieldCheck, Flame, Scale, Droplets } from 'lucide-react';

export const Quality: React.FC = () => {
  const { isUrdu, t } = useLanguage();

  const getMetricData = (index: number, defaultStd: any) => {
    if (!isUrdu) return defaultStd;
    const urduMetrics = [
      { label: '8.4 ملی میٹر اوسط لمبائی', desc: '1121 کائنات گریڈ ون چاول کی مستند لمبائی۔' },
      { label: '12 - 13 فیصد محفوظ نمی', desc: 'اسٹوریج اور دیرپا تازگی کے لیے آئیڈیل نمی کا تناسب۔' },
      { label: '99.5 فیصد خالص گریڈنگ', desc: 'کنکروں، داغوں اور گرد و غبار سے مکمل پاک۔' },
      { label: '2 گنا پکا کر لمبائی', desc: 'بریانی اور پلاؤ میں دانہ دانہ علیحدہ اور شاندار خوشبو۔' },
    ];
    return urduMetrics[index] ? { ...defaultStd, ...urduMetrics[index] } : defaultStd;
  };

  return (
    <section id="quality" className="py-20 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold uppercase tracking-widest rounded-full mb-3">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.quality.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t.quality.title}
          </h2>
          <p className="text-slate-600 font-sans text-base sm:text-lg max-w-2xl mx-auto">
            {t.quality.subtitle}
          </p>
        </div>

        {/* 4 Pillars of Standard Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {QUALITY_STANDARDS.map((std, i) => {
            const s = getMetricData(i, std);
            return (
              <div
                key={i}
                className="p-6 bg-white rounded-xl border border-stone-200 shadow-2xs hover:shadow-md transition-shadow text-center flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1B4332] block mb-2">
                    {s.metric}
                  </span>
                  <h3 className={`text-base font-bold text-slate-900 mb-2 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                    {s.label}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-[#B89222] font-semibold uppercase tracking-wider">
                  {isUrdu ? 'مل سے تصدیق شدہ' : 'Mill Certified'}
                </div>
              </div>
            );
          })}
        </div>

        {/* 6 Key Quality Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="p-6 bg-white rounded-xl border border-stone-200 flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6 text-emerald-800" />
            </div>
            <div>
              <h3 className={`text-lg font-bold text-slate-900 mb-1 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {isUrdu ? 'دانے کی یکساں لمبائی' : 'Grain Length Integrity'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUrdu
                  ? 'جدید لینگتھ گریڈرز ٹوٹے ہوئے دانوں کو الگ کرتے ہیں تاکہ ڈش میں چاول کی یکساں لمبائی اور خوبصورتی برقرار رہے۔'
                  : 'Precision length graders discard broken and undersized kernels. Our 1121 and Super Basmati lots preserve whole-kernel tip integrity for uniform plate presentation.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center shrink-0">
              <Droplets className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h3 className={`text-lg font-bold text-slate-900 mb-1 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {isUrdu ? 'نمی کا درست توازن' : 'Moisture Calibration'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUrdu
                  ? 'کنٹرول شدہ ڈرائینگ نمی کو 12 سے 13 فیصد پر رکھتی ہے، جو چاول کو فنگس اور کیڑوں سے محفوظ بناتی ہے۔'
                  : 'Regulated drying keeps moisture within the ideal 12–13% window. This prevents grain brittle-fracture, fungal vulnerability, and guarantees longevity in storage.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-blue-800" />
            </div>
            <div>
              <h3 className={`text-lg font-bold text-slate-900 mb-1 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {isUrdu ? 'پکائی میں دگنی لمبائی' : 'Cooking Elongation'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUrdu
                  ? 'ہر بیچ کا سیمپل کچن میں ٹیسٹ کیا جاتا ہے تاکہ پکنے پر دانہ نرم، نکھرا ہوا اور دگنی لمبائی حاصل کرے۔'
                  : 'Every milling run is batch-tested in our sample kitchen to confirm double-length elongation, non-stickiness, and firm grain fluffiness suitable for Biryanis and Pulao.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-800" />
            </div>
            <div>
              <h3 className={`text-lg font-bold text-slate-900 mb-1 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {isUrdu ? 'خوشبو اور قدرتی ذائقہ' : 'Aroma & Sweet Taste Retention'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUrdu
                  ? 'کم درجہ حرارت پر ڈی ہسکنگ سے قدرتی خوشبو محفوظ رہتی ہے، جس سے اصلی پنجابی باسمتی کی مہک قائم رہتی ہے۔'
                  : 'Low-temperature de-husking protects volatile 2-acetyl-1-pyrroline compounds, ensuring our authentic Basmati delivers its famous natural Punjabi fragrance.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-stone-100 text-stone-900 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-stone-700" />
            </div>
            <div>
              <h3 className={`text-lg font-bold text-slate-900 mb-1 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {isUrdu ? 'حفظانِ صحت کے اصول' : 'Sanitary & Hygienic Handling'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUrdu
                  ? 'سیلڈ پائپ لائنز، میگنیٹک میٹل فلٹرز اور طاقتور ڈسٹ سکشن کے ذریعے مکمل صفائی اور فوڈ گریڈ پروٹیکشن۔'
                  : 'Enclosed conveying pipes, magnetic metal separators, and high-efficiency dust suction maintain spotless processing environments compliant with food standards.'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-stone-200 flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h3 className={`text-lg font-bold text-slate-900 mb-1 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {isUrdu ? 'بیچ در بیچ مستقل معیار' : 'Batch Consistency'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUrdu
                  ? 'ہول سیلرز اور تجارتی گاہکوں کو ہر آرڈر میں یکساں گریڈ ملتا ہے، جس کی مکمل لیب رپورٹ ساتھ دی جاتی ہے۔'
                  : 'Wholesalers and bulk purchasers receive repeatable quality in every dispatch lot, supported by transparent grading slips and sample approval prior to truck dispatch.'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
