import React, { useState, useEffect, useRef } from 'react';
import { useImage } from '../../context/ImageContext';
import { Upload, ZoomIn, Wheat, AlertCircle } from 'lucide-react';

interface MillImageProps {
  slotKey: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  allowZoom?: boolean;
  priority?: boolean;
  badgeLabel?: string;
  onUploadSuccess?: () => void;
}

export const MillImage: React.FC<MillImageProps> = ({
  slotKey,
  alt,
  className = '',
  containerClassName = '',
  objectFit = 'cover',
  allowZoom = true,
  badgeLabel,
  onUploadSuccess,
}) => {
  const { getImage, setImageOverride, openLightbox, slots } = useImage();
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const slotInfo = slots.find((s) => s.key === slotKey);
  const imageRecord = getImage(slotKey);
  const expectedFileName = slotInfo?.defaultFileName || imageRecord.fileName;

  const [currentSrc, setCurrentSrc] = useState(imageRecord.url);
  const [fallbackStep, setFallbackStep] = useState(0);

  // Sync state when slotKey or imageRecord.url changes
  useEffect(() => {
    setCurrentSrc(imageRecord.url);
    setHasError(false);
    setFallbackStep(0);
  }, [imageRecord.url, slotKey]);

  // Check if image is already cached/complete on mount or URL change
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      }
    }
  }, [currentSrc]);

  const handleImageError = () => {
    // If it's a Google Drive content CDN link and hasn't tried the thumbnail proxy
    if (fallbackStep === 0 && currentSrc.includes('lh3.googleusercontent.com/d/')) {
      const match = currentSrc.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) {
        setFallbackStep(1);
        setCurrentSrc(`https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`);
        return;
      }
    }

    if (fallbackStep <= 1) {
      setFallbackStep(2);
      // Try local primary file in /images/ or secondary normalized alias
      const fallbackUrl = slotInfo?.defaultFileName
        ? `/images/${encodeURIComponent(slotInfo.defaultFileName)}?v=srm_v2`
        : `/images/${slotKey}.jpg`;
      setCurrentSrc(fallbackUrl);
      return;
    }

    if (fallbackStep === 2) {
      setFallbackStep(3);
      if (slotKey === 'leadership_mamtaz') {
        setCurrentSrc('/images/leadership_mamtaz.png');
        return;
      }
      if (slotKey === 'mill_banner') {
        setCurrentSrc('/images/Sandranaricemills.png');
        return;
      }
      if (slotKey === 'logo') {
        setCurrentSrc('/images/Sandrana%20rice%20mills%20logo.png');
        return;
      }
      setCurrentSrc(`/images/${slotKey}.png`);
      return;
    }

    setHasError(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageOverride(slotKey, event.target.result as string, file.name);
          setHasError(false);
          setIsLoaded(true);
          if (onUploadSuccess) onUploadSuccess();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allowZoom && !hasError && currentSrc) {
      openLightbox(slotKey, slotInfo?.title || alt, slotInfo?.description);
    }
  };

  return (
    <div
      className={`relative group overflow-hidden ${containerClassName ? containerClassName : 'bg-stone-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fallback Placeholder only if image completely failed to load */}
      {hasError ? (
        <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-100 border border-amber-200/80 rounded-lg">
          <div className="w-12 h-12 rounded-full bg-amber-100/90 text-amber-800 flex items-center justify-center mb-3 shadow-inner">
            <Wheat className="w-6 h-6 stroke-[1.75]" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-900 mb-1">
            {slotInfo?.assignedLabel || 'Sandrana Mill Photography'}
          </span>
          <p className="text-sm font-medium text-slate-700 max-w-xs line-clamp-2 mb-2">
            {alt}
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-amber-300/80 rounded text-xs text-amber-900 font-mono mb-3 shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Target: {expectedFileName}</span>
          </div>

          <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1B4332] hover:bg-[#133225] text-white text-xs font-medium rounded cursor-pointer transition shadow-xs">
            <Upload className="w-3.5 h-3.5" />
            <span>Assign {expectedFileName}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      ) : (
        <>
          {/* Main Image */}
          <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={handleImageError}
            className={`w-full h-full transition-opacity duration-300 ${
              objectFit === 'cover' ? 'object-cover' : 'object-contain'
            } ${isLoaded ? 'opacity-100' : 'opacity-90'} ${className}`}
          />

          {/* Loading Shimmer while downloading */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center pointer-events-none">
              <Wheat className="w-8 h-8 text-amber-500/40 animate-bounce" />
            </div>
          )}

          {/* Interactive Overlay on Hover (Zoom & Quick Change) */}
          {isLoaded && (
            <div
              className={`absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 flex items-center justify-center gap-3 ${
                isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {allowZoom && (
                <button
                  type="button"
                  onClick={handleZoom}
                  className="p-2.5 bg-white/95 text-slate-800 rounded-full hover:bg-white hover:text-amber-700 shadow-md transition transform hover:scale-105"
                  title="View full-resolution photo"
                  aria-label="View photo in lightbox"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              )}

              <label
                className="p-2.5 bg-[#1B4332] text-white rounded-full hover:bg-emerald-800 shadow-md transition transform hover:scale-105 cursor-pointer"
                title={`Replace ${expectedFileName}`}
                aria-label={`Replace image for ${slotInfo?.title || alt}`}
              >
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}

          {/* Custom Slot Badge */}
          {badgeLabel && (
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-black/70 backdrop-blur-md text-white text-[11px] font-medium tracking-wide rounded">
              {badgeLabel}
            </div>
          )}
        </>
      )}
    </div>
  );
};
