import React, { useState, useEffect } from 'react';
import { MILL_INFO, PRODUCTS } from '../data/millData';
import { useImage } from '../context/ImageContext';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  ArrowUp,
  Send,
  CheckCircle2,
  BellRing,
  Sparkles,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const { getImage, setManagerOpen } = useImage();
  const logoRecord = getImage('logo');
  const [logoSrc, setLogoSrc] = useState(logoRecord.url);
  const [logoFailed, setLogoFailed] = useState(false);

  // Newsletter state
  const [email, setEmail] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('harvest');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(() => {
    try {
      return localStorage.getItem('srm_newsletter_subscribed') === 'true';
    } catch {
      return false;
    }
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLogoSrc(logoRecord.url);
    setLogoFailed(false);
  }, [logoRecord.url]);

  const handleLogoError = () => {
    if (logoSrc !== '/images/logo.jpg') {
      setLogoSrc('/images/logo.jpg');
    } else {
      setLogoFailed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      isUrdu
        ? 'السلام علیکم سندرانہ رائس ملز، میں چاول کی اقسام اور ہول سیل ریٹس کے بارے میں جاننا چاہتا ہوں۔'
        : 'Hello Sandrana Rice Mills, I would like to inquire about your rice varieties.'
    );
    window.open(`https://wa.me/${MILL_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError(isUrdu ? 'براہ کرم درست ای میل ایڈریس درج کریں۔' : 'Please provide a valid email address.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      try {
        localStorage.setItem('srm_newsletter_subscribed', 'true');
        localStorage.setItem('srm_newsletter_email', email);
        localStorage.setItem('srm_newsletter_interest', selectedInterest);
      } catch {
        // ignore storage restrictions
      }
    }, 600);
  };

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t-2 border-[#D4AF37]/40">
      {/* Decorative Top Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-emerald-900 via-[#D4AF37] to-emerald-900 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Newsletter Subscription Card */}
        <div className="mb-14 rounded-2xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#0d331e] via-[#072013] to-[#04130a] border border-[#D4AF37]/40 shadow-[0_10px_35px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(245,208,97,0.3)] relative overflow-hidden">
          {/* Subtle Ambient Golden Radial Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18)_0%,transparent_70%)] pointer-events-none blur-2xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)] pointer-events-none blur-2xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-[#F5D061] text-xs font-semibold uppercase tracking-wider">
                <BellRing className="w-3.5 h-3.5 text-[#F5D061]" />
                <span>{isUrdu ? 'فصل کی اطلاعات و خصوصی آفرز' : 'Harvest Alerts & Seasonal Offers'}</span>
              </div>
              
              <h3 className={`text-2xl sm:text-3xl font-bold text-white tracking-tight ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {isUrdu
                  ? 'چاول کی نئی فصل کی آمد اور ہول سیل ریٹس سے باخبر رہیں'
                  : 'Stay Updated on Rice Harvest Seasons & Special Offers'}
              </h3>
              
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
                {isUrdu
                  ? 'سندرانہ رائس ملز کے براہ راست بلیٹن میں شامل ہوں: تازہ باسمتی و کائنات دھان کی آمد، سیزن کے اوائل کی خصوصی رعایتیں، اور ایکسپورٹ کوالٹی لاٹس کی بروقت اطلاعات۔'
                  : 'Subscribe for priority harvest updates, early seasonal discounts, and commercial wholesale price sheets delivered straight from Sandrana Rice Mills.'}
              </p>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-6">
              {isSubscribed ? (
                <div className="p-5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 backdrop-blur-md flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-bold text-white">
                      {isUrdu ? 'آپ کامیابی سے سبسکرائب ہو چکے ہیں!' : 'You are subscribed to Harvest Updates!'}
                    </h4>
                    <p className="text-xs text-emerald-200">
                      {isUrdu
                        ? 'آپ کو نئی فصلوں، مارکیٹ ریٹس اور خصوصی آفرز کی ای میلز موصول ہوں گی۔ شکریہ!'
                        : 'We will keep you informed on fresh paddy arrivals, wholesale rates, and seasonal offers.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubscribed(false)}
                      className="text-[11px] text-[#F5D061] hover:underline pt-1 inline-block cursor-pointer font-medium"
                    >
                      {isUrdu ? 'دوسری ای میل درج کریں' : 'Register another email'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <Mail className={`w-4 h-4 text-stone-400 absolute top-1/2 -translate-y-1/2 ${isUrdu ? 'right-3.5' : 'left-3.5'}`} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError(null);
                        }}
                        placeholder={isUrdu ? 'اپنا ای میل ایڈریس درج کریں...' : 'Enter your email address...'}
                        className={`w-full py-3 ${isUrdu ? 'pr-10 pl-4' : 'pl-10 pr-4'} bg-slate-900/90 text-white placeholder-stone-400 text-xs sm:text-sm rounded-lg border border-stone-700 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all shadow-inner`}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E5BE4A] via-[#D4AF37] to-[#B89222] hover:from-[#F0CF65] hover:to-[#C69C28] text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>{isUrdu ? 'تصدیق ہو رہی ہے...' : 'Subscribing...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{isUrdu ? 'سبسکرائب کریں' : 'Subscribe'}</span>
                          <Send className={`w-3.5 h-3.5 ${isUrdu ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Interest Selector Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="text-stone-400 text-[11px]">
                      {isUrdu ? 'دلچسپی کا شعبہ:' : 'Your interest:'}
                    </span>
                    {[
                      { key: 'harvest', labelEn: 'Harvest Seasons & Paddy', labelUr: 'فصل و دھان' },
                      { key: 'wholesale', labelEn: 'Wholesale Rates', labelUr: 'ہول سیل ریٹس' },
                      { key: 'offers', labelEn: 'Special Offers', labelUr: 'خصوصی آفرز' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setSelectedInterest(item.key)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                          selectedInterest === item.key
                            ? 'bg-[#D4AF37] text-slate-950 font-semibold'
                            : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-800'
                        }`}
                      >
                        {isUrdu ? item.labelUr : item.labelEn}
                      </button>
                    ))}
                  </div>

                  {error && (
                    <p className="text-xs text-rose-400 mt-1 font-medium">{error}</p>
                  )}

                  <p className="text-[11px] text-stone-400 flex items-center gap-1.5 pt-0.5">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>
                      {isUrdu
                        ? 'کوئی فضول ای میلز نہیں، آپ کسی بھی وقت ان سبسکرائب کر سکتے ہیں۔'
                        : 'No spam guaranteed. Unsubscribe anytime. Verified commercial notifications.'}
                    </span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Column 1: Brand & Taglines (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-950 border-2 border-[#D4AF37] flex items-center justify-center shrink-0">
                {!logoFailed && logoSrc ? (
                  <img
                    src={logoSrc}
                    alt="Sandrana Rice Mills Crest"
                    referrerPolicy="no-referrer"
                    onError={handleLogoError}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[#D4AF37] font-serif font-bold text-lg">SRM</span>
                )}
              </div>
              <div>
                <h3 className={`text-xl font-bold tracking-tight text-white ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                  {isUrdu ? 'سندرانہ رائس ملز' : 'SANDRANA RICE MILLS'}
                </h3>
                <p className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                  {isUrdu ? 'خالص پنجابی باسمتی و کائنات کی پہچان' : MILL_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              {isUrdu
                ? 'پنجاب کے زرخیز کھیتوں سے منتخب شدہ بہترین دھان کی خودکار پروسیسنگ۔ 1121 کائنات، سپر باسمتی، 1886 اور 1718 چاول کے مستند پراسیسر اور سپلائرز۔'
                : `${MILL_INFO.secondaryTagline}. Processors and suppliers of premium Basmati, 1121 Kaynat, V1886, and V1718 rice varieties, committed to ethical agriculture and consistent customer satisfaction.`}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={openWhatsApp}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#1B4332] hover:bg-emerald-900 text-white text-xs font-semibold rounded border border-[#D4AF37]/30 transition cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#E4C868]" />
                <span>{isUrdu ? 'واٹس ایپ ڈیسک' : 'WhatsApp Desk'}</span>
              </button>

              <button
                type="button"
                onClick={() => setManagerOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs rounded border border-stone-800 transition cursor-pointer"
                title="Photo Mapping System"
              >
                <span>{isUrdu ? 'تصویری گیلری سیٹ اپ' : 'Photo System (14)'}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className={`text-base font-bold text-[#E4C868] uppercase tracking-wider ${isUrdu ? 'font-sans' : 'font-serif'}`}>
              {isUrdu ? 'اہم روابط' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><a href="#home" className="hover:text-[#D4AF37] transition">{t.nav.home}</a></li>
              <li><a href="#about" className="hover:text-[#D4AF37] transition">{t.nav.about}</a></li>
              <li><a href="#products" className="hover:text-[#D4AF37] transition">{t.nav.products}</a></li>
              <li><a href="#mill" className="hover:text-[#D4AF37] transition">{t.nav.mill}</a></li>
              <li><a href="#quality" className="hover:text-[#D4AF37] transition">{t.nav.quality}</a></li>
              <li><a href="#management" className="hover:text-[#D4AF37] transition">{t.nav.management}</a></li>
              <li><a href="#gallery" className="hover:text-[#D4AF37] transition">{t.nav.gallery}</a></li>
              <li><a href="#contact" className="hover:text-[#D4AF37] transition">{t.nav.contact}</a></li>
            </ul>
          </div>

          {/* Column 3: Products Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`text-base font-bold text-[#E4C868] uppercase tracking-wider ${isUrdu ? 'font-sans' : 'font-serif'}`}>
              {isUrdu ? 'ہماری اقسام' : 'Our Rice Portfolio'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <a href="#products" className="hover:text-[#D4AF37] transition block">
                    {prod.name}
                  </a>
                </li>
              ))}
              <li className="pt-1 text-[11px] text-stone-400">
                {isUrdu ? 'دھان کا کچا اناج اور کسٹم برآمدی بوریاں' : 'Paddy Grain Wholesale & Custom Export Sacks'}
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Facility Address (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`text-base font-bold text-[#E4C868] uppercase tracking-wider ${isUrdu ? 'font-sans' : 'font-serif'}`}>
              {isUrdu ? 'مل کا پتہ و رابطہ' : 'Mill Location'}
            </h4>
            
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{isUrdu ? '28 کلومیٹر جھنگ تا سرگودھا روڈ، جھنگ، پنجاب' : MILL_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5" dir="ltr">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${MILL_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#D4AF37] transition">
                  {MILL_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5" dir="ltr">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${MILL_INFO.email}`} className="hover:text-[#D4AF37] transition">
                  {MILL_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-stone-400 leading-normal">
              {isUrdu
                ? 'پیر تا ہفتہ تجارتی لوڈنگ اور ترسیل دستیاب ہے، اندرون ملک اور کراچی پورٹ تک محفوظ ترسیل۔'
                : 'Commercial dispatches operational Mon – Sat across Punjab, nationwide Pakistan, and international sea ports.'}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>
              &copy; {new Date().getFullYear()} <strong>{isUrdu ? 'سندرانہ رائس ملز' : 'SANDRANA RICE MILLS'}</strong>. {t.footer.rights}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-stone-500">
              {isUrdu ? 'جھنگ تا سرگودھا روڈ، پنجاب، پاکستان' : 'Jhang–Sargodha Road, Punjab'}
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-200 rounded text-xs transition cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>{isUrdu ? 'اوپر جائیں' : 'Back to Top'}</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
