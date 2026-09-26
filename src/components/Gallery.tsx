import React, { useState } from 'react';
import { IMAGE_SLOTS } from '../data/millData';
import { ImageSlot } from '../types';
import { MillImage } from './common/MillImage';
import { useImage } from '../context/ImageContext';
import { useLanguage } from '../context/LanguageContext';
import { ZoomIn, Sparkles, Filter, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

const PADDY_COLLECTION_IMAGES = [
  {
    url: '/images/01.png',
    fileName: '01.png',
    title: 'Golden Harvest Paddy Grains',
    titleUrdu: 'سنہری دھان کے منتخب دانے',
    description: 'Unhusked golden paddy grains mound on clean background showcasing natural grain purity.',
    descriptionUrdu: 'قدرتی خالص اناج کے سنہری دھان کے منتخب دانے۔',
    badge: '1. Paddy Grains',
    badgeUrdu: '1. دھان اناج',
  },
  {
    url: '/images/RICE%20V1121.jpg',
    fileName: 'RICE V1121.jpg',
    title: 'Raw V1121 Kaynat Rice',
    titleUrdu: 'خام وی 1121 کائنات چاول',
    description: 'Signature extra long, slender white grains in matte black bowl.',
    descriptionUrdu: 'کلاسک کالی کٹوری میں اضافی طویل، باریک سفید دانے۔',
    badge: '2. Raw Basmati',
    badgeUrdu: '2. خام کائنات',
  },
  {
    url: '/images/Premium%20Rice%20Silky%20.jpg',
    fileName: 'Premium Rice Silky .jpg',
    title: 'Polished V1121 Silky Rice',
    titleUrdu: 'سلکی پالش 1121 چاول',
    description: 'Ultra-smooth, silky polished long grains spilling from natural burlap jute packaging.',
    descriptionUrdu: 'روایتی جوٹ کی بوری سے چھلکتے چمکدار سلکی پالش شدہ چاول۔',
    badge: '3. Silky 1121',
    badgeUrdu: '3. سلکی پالش',
  },
  {
    url: '/images/Punjab%20culture%20heritage.png',
    fileName: 'Punjab culture heritage.png',
    title: 'Punjab Agricultural Heritage',
    titleUrdu: 'پنجاب زرعی ثقافت و ورثہ',
    description: 'Five-panel authentic agricultural showcase: paddy dawn, lush panicles, traditional farmers transplanting, flooded fields, and Pakistani flag in field.',
    descriptionUrdu: 'پنجاب کے زرخیز کھیت، روایتی شجرکاری اور سنہری دھان کی فصل۔',
    badge: '4. Punjab Fields',
    badgeUrdu: '4. پنجاب ورثہ',
  },
];

export const Gallery: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activePaddyIndex, setActivePaddyIndex] = useState(0);
  const [isSplitGrid, setIsSplitGrid] = useState(false);
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
          {filteredSlots.map((slot) => {
            const isPaddyFrame = slot.key === 'paddy_mound';
            const activePhoto = PADDY_COLLECTION_IMAGES[activePaddyIndex];

            if (isPaddyFrame) {
              return (
                <div
                  key={slot.key}
                  className="bg-white rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between ring-1 ring-[#D4AF37]/20"
                >
                  {/* Image Frame */}
                  <div
                    className="relative aspect-square w-full overflow-hidden bg-stone-900 cursor-pointer"
                    onClick={() => openLightbox(activePhoto.url, isUrdu ? activePhoto.titleUrdu : activePhoto.title, isUrdu ? activePhoto.descriptionUrdu : activePhoto.description)}
                  >
                    <div className="relative w-full h-full">
                      {/* Selected Element: img:nth-of-type(1) with refined contrast and gold-accented styling */}
                      <img
                        src={activePhoto.url}
                        alt={isUrdu ? activePhoto.titleUrdu : activePhoto.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 contrast-[1.03] brightness-[1.02]"
                      />

                      {/* Quad-Split Grid Overlay when toggled */}
                      {isSplitGrid && (
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-black/75 backdrop-blur-xs z-10">
                          {PADDY_COLLECTION_IMAGES.map((img, idx) => (
                            <div
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePaddyIndex(idx);
                                setIsSplitGrid(false);
                              }}
                              className={`relative overflow-hidden rounded border transition-all ${
                                activePaddyIndex === idx
                                  ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]'
                                  : 'border-white/30 hover:border-white'
                              }`}
                            >
                              <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                              <span className="absolute bottom-0.5 left-0.5 px-1 py-0.2 bg-black/80 text-[9px] text-[#F5D061] font-semibold rounded">
                                {idx + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Top Badges & Quad Toggle */}
                    <div className="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none z-20">
                      <div className="px-2 py-0.5 bg-black/70 backdrop-blur-xs text-[#F5D061] border border-[#D4AF37]/40 text-[10px] font-semibold tracking-wide rounded">
                        {isUrdu ? activePhoto.badgeUrdu : activePhoto.badge}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSplitGrid((prev) => !prev);
                        }}
                        className="pointer-events-auto px-2 py-0.5 bg-black/75 hover:bg-[#1B4332] text-white text-[10px] font-semibold tracking-wide rounded backdrop-blur-xs transition flex items-center gap-1 border border-white/30 shadow-xs cursor-pointer"
                        title={isSplitGrid ? 'Show single photo' : 'View all 4 in grid'}
                      >
                        <Layers className="w-3 h-3 text-[#F5D061]" />
                        <span>{activePaddyIndex + 1}/4</span>
                      </button>
                    </div>

                    {/* Left/Right Fast Carousel Switchers */}
                    <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePaddyIndex((prev) => (prev === 0 ? PADDY_COLLECTION_IMAGES.length - 1 : prev - 1));
                        }}
                        className="pointer-events-auto p-1.5 rounded-full bg-black/75 hover:bg-black/95 text-white transition shadow-md hover:scale-110 cursor-pointer"
                        title="Previous photo"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePaddyIndex((prev) => (prev === PADDY_COLLECTION_IMAGES.length - 1 ? 0 : prev + 1));
                        }}
                        className="pointer-events-auto p-1.5 rounded-full bg-black/75 hover:bg-black/95 text-white transition shadow-md hover:scale-110 cursor-pointer"
                        title="Next photo"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 4 Bottom Indicator Pills */}
                    <div className="absolute bottom-2.5 inset-x-2 flex items-center justify-center gap-1.5 z-20 pointer-events-auto">
                      {PADDY_COLLECTION_IMAGES.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePaddyIndex(idx);
                            setIsSplitGrid(false);
                          }}
                          className={`h-1.5 transition-all rounded-full cursor-pointer ${
                            activePaddyIndex === idx
                              ? 'w-6 bg-[#F5D061] shadow-[0_0_8px_rgba(245,208,97,0.9)]'
                              : 'w-2 bg-white/70 hover:bg-white'
                          }`}
                          title={isUrdu ? item.titleUrdu : item.title}
                        />
                      ))}
                    </div>

                    {/* Hover Center Zoom Button */}
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none z-10">
                      <span className="p-2.5 bg-white/95 rounded-full text-slate-900 shadow-md">
                        <ZoomIn className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Caption & Metadata */}
                  <div className="p-4 bg-white flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 tracking-wider uppercase mb-1">
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                        <span>{isUrdu ? '4 تصاویر مجموعہ' : '4 Photos Collection'}</span>
                      </div>
                      <h3 className={`text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-900 transition-colors ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                        {isUrdu ? activePhoto.titleUrdu : activePhoto.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {isUrdu ? activePhoto.descriptionUrdu : activePhoto.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                      <span className="truncate max-w-[170px]" title={activePhoto.fileName}>
                        {activePhoto.fileName}
                      </span>
                      <button
                        type="button"
                        onClick={() => openLightbox(activePhoto.url, isUrdu ? activePhoto.titleUrdu : activePhoto.title, isUrdu ? activePhoto.descriptionUrdu : activePhoto.description)}
                        className="text-emerald-800 hover:text-emerald-950 font-sans font-semibold cursor-pointer"
                      >
                        {isUrdu ? 'دیکھیں' : 'View'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
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
            );
          })}
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
