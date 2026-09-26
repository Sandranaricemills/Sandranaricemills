import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Image as ImageIcon, Languages } from 'lucide-react';
import { MILL_INFO } from '../data/millData';
import { useImage } from '../context/ImageContext';
import { useLanguage } from '../context/LanguageContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setManagerOpen, getImage } = useImage();
  const { language, isUrdu, toggleLanguage, t } = useLanguage();

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.management, href: '#management' },
    { name: t.nav.products, href: '#products' },
    { name: t.nav.ourMill, href: '#mill' },
    { name: t.nav.quality, href: '#quality' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.weather, href: '#weather' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      isUrdu
        ? 'السلام علیکم سندرانہ رائس ملز، میں آپ کے معیاری چاول اور ہول سیل ریٹس کے بارے میں معلومات حاصل کرنا چاہتا ہوں۔'
        : 'Hello Sandrana Rice Mills, I would like to inquire about your premium rice varieties and wholesale rates.'
    );
    window.open(`https://wa.me/${MILL_INFO.whatsappRaw}?text=${message}`, '_blank');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gradient-to-r from-[#092415]/95 via-[#0d2f1c]/95 to-[#092415]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-[#D4AF37]/50 py-2.5'
            : 'bg-gradient-to-r from-[#0a2717]/90 via-[#0e341f]/90 to-[#0a2717]/90 backdrop-blur-md border-b border-[#D4AF37]/40 py-3.5'
        }`}
      >
        {/* Rice Gold radiant top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#1B4332] via-[#E4C868] to-[#1B4332] opacity-90 shadow-xs shadow-[#D4AF37]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Left Brand Lockup (Logo + Clean Wordmark) */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden"
              aria-label="Sandrana Rice Mills Home"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-emerald-950 border-2 border-[#D4AF37] shadow-sm shadow-[#D4AF37]/20 shrink-0 flex items-center justify-center">
                {!logoFailed && logoSrc ? (
                  <img
                    src={logoSrc}
                    alt="Sandrana Rice Mills Logo"
                    referrerPolicy="no-referrer"
                    onError={handleLogoError}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[#D4AF37] font-serif font-bold text-lg leading-none">
                    SRM
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className={`font-bold tracking-tight text-white group-hover:text-[#E4C868] transition-colors leading-tight ${isUrdu ? 'text-lg sm:text-xl font-sans' : 'text-base sm:text-xl font-serif'}`}>
                  {isUrdu ? 'سندرانہ رائس ملز' : 'SANDRANA RICE MILLS'}
                </span>
                <span className="text-[10px] tracking-widest text-[#D4AF37] font-semibold uppercase">
                  {isUrdu ? 'جھنگ • پنجاب • پاکستان' : 'Punjab • Pakistan'}
                </span>
              </div>
            </a>

            {/* Zone 2: Center Navigation Links (Desktop) */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs lg:text-sm font-medium text-stone-200 hover:text-[#E4C868] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Zone 3: Right CTA & Language Toggle */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Language Switcher Button */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#E4C868] hover:text-white bg-[#0e331f] hover:bg-[#14472c] border border-[#D4AF37]/50 hover:border-[#D4AF37] rounded-md transition shadow-xs"
                title={isUrdu ? 'Switch to English' : 'اردو میں دیکھیں'}
                aria-label="Toggle language"
              >
                <Languages className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-semibold">{isUrdu ? 'English' : 'اردو'}</span>
              </button>

              {/* Media Mapping Helper Modal trigger */}
              <button
                type="button"
                onClick={() => setManagerOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-300 hover:text-[#E4C868] bg-[#0e331f]/70 hover:bg-[#0e331f] border border-stone-700 rounded transition shadow-xs"
                title="Photo Gallery Manager"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden 2xl:inline">{t.header.photoCenter}</span>
              </button>

              {/* Direct Phone / Call link */}
              <a
                href={`tel:${MILL_INFO.phone.replace(/\s+/g, '')}`}
                className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-200 hover:text-[#E4C868] px-2 py-1.5 transition-colors"
                title="Call Mill Direct"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{MILL_INFO.phone}</span>
              </a>

              {/* Primary Sticky WhatsApp Action */}
              <button
                type="button"
                onClick={openWhatsApp}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B89222] hover:from-[#E4C868] hover:to-[#D4AF37] text-slate-950 text-xs font-bold tracking-wide uppercase rounded shadow-sm hover:shadow-md hover:shadow-[#D4AF37]/20 transition-all duration-200"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
                <span>{t.header.whatsappBtn}</span>
              </button>
            </div>

            {/* Mobile Actions: Language Button + WhatsApp + Hamburger */}
            <div className="flex items-center gap-1.5 lg:hidden">
              {/* Mobile Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-[#E4C868] bg-[#0e331f] border border-[#D4AF37]/50 rounded transition"
                aria-label="Toggle language"
              >
                <Languages className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isUrdu ? 'EN' : 'اردو'}</span>
              </button>

              <button
                type="button"
                onClick={openWhatsApp}
                className="p-2 text-[#E4C868] hover:text-white"
                aria-label="WhatsApp Us"
              >
                <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-stone-200 hover:text-[#E4C868] focus:outline-hidden"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 bottom-0 ${isUrdu ? 'left-0 border-r' : 'right-0 border-l'} w-5/6 max-w-sm bg-[#071a10] border-[#D4AF37]/30 text-white z-50 shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen
            ? 'translate-x-0'
            : isUrdu
            ? '-translate-x-full'
            : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-[#D4AF37]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-950 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif font-bold text-sm">
                SRM
              </div>
              <span className="font-bold text-white text-base">
                {isUrdu ? 'سندرانہ رائس ملز' : 'SANDRANA RICE'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-stone-300 hover:text-[#E4C868] rounded"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Language Bar */}
          <div className="mt-4 p-2 bg-[#0e331f] rounded-lg border border-[#D4AF37]/30 flex items-center justify-between">
            <span className="text-xs text-stone-300 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-[#D4AF37]" />
              {isUrdu ? 'زبان تبدیل کریں:' : 'Select Language:'}
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => {
                  if (language !== 'en') toggleLanguage();
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded ${
                  !isUrdu
                    ? 'bg-[#D4AF37] text-slate-950'
                    : 'bg-black/30 text-stone-300 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!isUrdu) toggleLanguage();
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded ${
                  isUrdu
                    ? 'bg-[#D4AF37] text-slate-950'
                    : 'bg-black/30 text-stone-300 hover:text-white'
                }`}
              >
                اردو
              </button>
            </div>
          </div>

          <nav className="mt-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 rounded text-base font-medium text-stone-200 hover:bg-[#0e331f] hover:text-[#E4C868] transition"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#D4AF37]/30 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setManagerOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0e331f] hover:bg-[#14472c] text-[#E4C868] text-xs font-semibold rounded border border-[#D4AF37]/40"
          >
            <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>{isUrdu ? 'تصویری گیلری' : 'Photo Center & Real Images'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              openWhatsApp();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B89222] hover:from-[#E4C868] hover:to-[#D4AF37] text-slate-950 text-sm font-bold rounded shadow-md"
          >
            <MessageSquare className="w-4 h-4 text-slate-950" />
            <span>{t.header.whatsappBtn}</span>
          </button>

          <div className="text-center text-[11px] text-[#D4AF37]/80 mt-1">
            {isUrdu ? '28 کلومیٹر جھنگ تا سرگودھا روڈ، جھنگ' : '28 KM Jhang–Sargodha Road, Jhang'}
          </div>
        </div>
      </div>
    </>
  );
};
