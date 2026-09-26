import React, { useState } from 'react';
import { IMAGE_SLOTS } from '../data/millData';
import { ImageSlot } from '../types';
import { MillImage } from './common/MillImage';
import { useImage } from '../context/ImageContext';
import { useLanguage } from '../context/LanguageContext';
import { ZoomIn, Sparkles, Filter } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const { openLightbox } = useImage();

  const filterTabs = [
    { key: 'all', label: isUrdu ? 'تمام تصاویر (14)' : 'All Real Photos (14)' },
    { key: 'Product', label: isUrdu ? 'چاول کی اقسام و اناج' : 'Rice Grains & Products' },
    { key: 'Paddy Agriculture', label: isUrdu ? 'دھان اور کھیت' : 'Paddy & Fields' },
    { key: 'Leadership', label: isUrdu ? 'قیادت و مینجمنٹ' : 'Leadership Team' },
    { key: 'Heritage', label: isUrdu ? 'مل اور روایات' : 'Mill & Heritage' },
  ];

  const filteredSlots: ImageSlot[] = selectedFilter === 'all'
    ? IMAGE_SLOTS
    : IMAGE_SLOTS.filter((s) => {
        if (selectedFilter === 'Heritage') {
          return s.targetSection === 'Heritage' || s.targetSection === 'Hero Banner' || s.targetSection === 'Brand / Logo';
        }
        return s.targetSection === selectedFilter;
      });

  return (
    <section id="gallery" className="py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold uppercase tracking-widest rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.gallery.badge}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              {t.gallery.title}
            </h2>
            <p className="mt-3 text-slate-600 font-sans text-base">
              {t.gallery.subtitle}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-stone-400 mr-1 hidden sm:inline" />
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedFilter(tab.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition cursor-pointer ${
                  selectedFilter === tab.key
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredSlots.map((slot) => (
            <div
              key={slot.key}
              className="bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div
                className="relative aspect-square w-full overflow-hidden bg-stone-200 cursor-pointer"
                onClick={() => openLightbox(slot.key, slot.title, slot.description)}
              >
                <MillImage
                  slotKey={slot.key}
                  alt={slot.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  allowZoom={false} // Click whole card opens lightbox
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="p-2.5 bg-white/95 rounded-full text-slate-900 shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium tracking-wide rounded">
                  {slot.targetSection}
                </div>
              </div>

              {/* Caption & Metadata */}
              <div className="p-4 bg-white flex flex-col justify-between flex-1">
                <div>
                  <h3 className={`text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-900 transition-colors ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                    {slot.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {slot.description}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span className="truncate max-w-[170px]" title={slot.defaultFileName}>
                    {slot.defaultFileName}
                  </span>
                  <button
                    type="button"
                    onClick={() => openLightbox(slot.key, slot.title, slot.description)}
                    className="text-emerald-800 hover:text-emerald-950 font-sans font-semibold cursor-pointer"
                  >
                    {isUrdu ? 'دیکھیں' : 'View'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Note */}
        <div className="mt-12 text-center text-xs text-slate-500">
          {isUrdu
            ? 'تصویری گیلری سندرانہ رائس ملز جھنگ، پنجاب کی حقیقی پیداوار اور فیکٹری پراسیسنگ کی عکاسی کرتی ہے۔'
            : 'Photographic materials strictly reflect authentic agricultural harvest and facility operations at Sandrana Rice Mills, Jhang, Punjab.'}
        </div>

      </div>
    </section>
  );
};
