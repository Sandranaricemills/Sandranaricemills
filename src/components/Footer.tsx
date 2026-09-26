import React, { useState, useEffect } from 'react';
import { MILL_INFO, PRODUCTS } from '../data/millData';
import { useImage } from '../context/ImageContext';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, MessageSquare, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const { getImage, setManagerOpen } = useImage();
  const logoRecord = getImage('logo');
  const [logoSrc, setLogoSrc] = useState(logoRecord.url);
  const [logoFailed, setLogoFailed] = useState(false);

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

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t-2 border-[#D4AF37]/40">
      {/* Decorative Top Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-emerald-900 via-[#D4AF37] to-emerald-900 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
