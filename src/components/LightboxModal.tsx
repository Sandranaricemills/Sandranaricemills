import React from 'react';
import { useImage } from '../context/ImageContext';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const { lightbox, closeLightbox, slots } = useImage();

  if (!lightbox.isOpen) return null;

  const currentSlot = lightbox.slotKey
    ? slots.find((s) => s.key === lightbox.slotKey)
    : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      onClick={closeLightbox}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-slate-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-4 bg-slate-950 border-b border-stone-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <h3 className="font-serif font-bold text-base sm:text-lg text-white truncate max-w-lg">
              {lightbox.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {currentSlot && (
              <span className="text-[11px] font-mono text-stone-400 bg-stone-900 px-2 py-1 rounded hidden sm:inline">
                {currentSlot.defaultFileName}
              </span>
            )}
            <button
              type="button"
              onClick={closeLightbox}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition"
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Image Canvas with High-Fidelity Presentation */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-stone-950/60 min-h-[300px]">
          <img
            src={lightbox.url}
            alt={lightbox.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              if (currentSlot?.defaultFileName) {
                (e.target as HTMLImageElement).src = `/images/${encodeURIComponent(currentSlot.defaultFileName)}?v=srm_v2`;
              }
            }}
            className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-xl"
          />
        </div>

        {/* Modal Caption Footer */}
        <div className="p-4 bg-slate-950 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-stone-300">
          <div className="text-xs max-w-2xl">
            {lightbox.subtitle ? (
              <p className="leading-relaxed">{lightbox.subtitle}</p>
            ) : (
              <p className="text-stone-400">Authentic photography of Sandrana Rice Mills, Punjab, Pakistan.</p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={lightbox.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E4C868] hover:text-[#D4AF37] px-3 py-1.5 bg-stone-900 rounded border border-stone-800"
            >
              <span>Raw File</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
