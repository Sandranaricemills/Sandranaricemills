import React, { useState } from 'react';
import { useImage } from '../context/ImageContext';
import { ImageSlot } from '../types';
import {
  X,
  Upload,
  RefreshCw,
  CheckCircle,
  FileImage,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';

export const ImageMapperDrawer: React.FC = () => {
  const {
    slots,
    isManagerOpen,
    setManagerOpen,
    getImage,
    setImageOverride,
    resetSlot,
    resetAll,
    openLightbox
  } = useImage();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [notification, setNotification] = useState<string | null>(null);

  if (!isManagerOpen) return null;

  const handleFileUpload = (slotKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageOverride(slotKey, event.target.result as string, file.name);
          setNotification(`Successfully assigned ${file.name} to slot!`);
          setTimeout(() => setNotification(null), 3500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredSlots = activeFilter === 'all'
    ? slots
    : slots.filter((s) => s.targetSection.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setManagerOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white border-b border-stone-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-900 text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center">
                  <FileImage className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-white">
                    Image Mapping &amp; Upload System
                  </h2>
                  <p className="text-xs text-stone-300">
                    Map and assign your 14 real photographic assets to website sections
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setManagerOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Notification alert */}
            {notification && (
              <div className="mt-4 p-2.5 bg-emerald-900/90 border border-emerald-400 text-emerald-100 rounded text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{notification}</span>
              </div>
            )}

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-stone-800 text-xs">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded transition ${
                  activeFilter === 'all'
                    ? 'bg-[#D4AF37] text-slate-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                All 14 Slots
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('product')}
                className={`px-3 py-1 rounded transition ${
                  activeFilter === 'product'
                    ? 'bg-[#D4AF37] text-slate-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                Products (6)
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('leadership')}
                className={`px-3 py-1 rounded transition ${
                  activeFilter === 'leadership'
                    ? 'bg-[#D4AF37] text-slate-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                Leadership (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('paddy')}
                className={`px-3 py-1 rounded transition ${
                  activeFilter === 'paddy'
                    ? 'bg-[#D4AF37] text-slate-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                Paddy &amp; Harvest (3)
              </button>
            </div>
          </div>

          {/* Body: List of 14 Image Slots */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-50">
            <div className="p-3.5 bg-amber-50 border border-amber-200/90 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>How Image Mapping Works:</strong> Every slot corresponds to one of your 14 uploaded images. Images placed in <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">/public/images/</code> load automatically. You can also click <em>&quot;Upload / Replace&quot;</em> below to select any photo directly from your device.
              </div>
            </div>

            <div className="space-y-3">
              {filteredSlots.map((slot) => {
                const imgRecord = getImage(slot.key);
                return (
                  <div
                    key={slot.key}
                    className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      {/* Thumbnail with zoom trigger */}
                      <div
                        className="relative w-16 h-16 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-300 cursor-pointer"
                        onClick={() => openLightbox(slot.key, slot.title, slot.description)}
                        title="Click to view large preview"
                      >
                        <img
                          src={imgRecord.url}
                          alt={slot.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Slot metadata */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {slot.targetSection}
                          </span>
                          {imgRecord.isCustom ? (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                              Uploaded File
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                              Expected File
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif font-bold text-slate-900 text-sm mt-1 truncate">
                          {slot.title}
                        </h3>

                        <p className="text-xs text-stone-500 font-mono mt-0.5 truncate">
                          File: {slot.defaultFileName}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Upload or Reset */}
                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1B4332] hover:bg-[#133225] text-white text-xs font-semibold rounded cursor-pointer transition">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(slot.key, e)}
                        />
                      </label>

                      {imgRecord.isCustom && (
                        <button
                          type="button"
                          onClick={() => resetSlot(slot.key)}
                          className="p-1.5 text-stone-500 hover:text-red-700 rounded transition"
                          title="Reset to default file path"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => openLightbox(slot.key, slot.title, slot.description)}
                        className="p-1.5 text-stone-600 hover:text-slate-900 rounded"
                        title="View photo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between">
            <button
              type="button"
              onClick={resetAll}
              className="text-xs text-stone-500 hover:text-red-700 underline font-medium"
            >
              Reset All Slots to Defaults
            </button>

            <button
              type="button"
              onClick={() => setManagerOpen(false)}
              className="px-5 py-2 bg-stone-900 hover:bg-black text-white text-xs font-semibold rounded"
            >
              Done / Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
