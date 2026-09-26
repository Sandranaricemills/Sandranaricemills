import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, ArrowUp } from 'lucide-react';
import { MILL_INFO } from '../data/millData';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hello Sandrana Rice Mills, I would like to inquire about your rice varieties and wholesale rates.');
    window.open(`https://wa.me/${MILL_INFO.whatsappRaw}?text=${message}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto p-3 bg-white text-slate-800 rounded-full shadow-lg border border-stone-200 hover:bg-stone-50 hover:text-emerald-900 transition-all duration-300 transform hover:scale-110"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 text-emerald-900" />
        </button>
      )}

      {/* Floating WhatsApp Quick Action Button */}
      <button
        type="button"
        onClick={openWhatsApp}
        className="pointer-events-auto group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp with Sandrana Rice Mills"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          WhatsApp Us
        </span>
      </button>

      {/* Mobile-only Bottom Sticky Call action button */}
      <a
        href={`tel:${MILL_INFO.phone.replace(/\s+/g, '')}`}
        className="pointer-events-auto sm:hidden p-3 bg-[#1B4332] text-white rounded-full shadow-xl hover:bg-emerald-900 transition-transform transform active:scale-95"
        title="Call Mill"
        aria-label="Call Sandrana Rice Mills"
      >
        <Phone className="w-4 h-4" />
      </a>
    </div>
  );
};
