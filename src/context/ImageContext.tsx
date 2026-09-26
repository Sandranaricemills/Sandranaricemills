import React, { createContext, useContext, useState, useEffect } from 'react';
import { IMAGE_SLOTS } from '../data/millData';
import { ImageSlot } from '../types';

interface ImageMapRecord {
  url: string;
  fileName: string;
  isCustom: boolean;
}

interface LightboxState {
  isOpen: boolean;
  url: string;
  title: string;
  subtitle?: string;
  slotKey?: string;
}

interface ImageContextType {
  slots: ImageSlot[];
  getImage: (key: string) => ImageMapRecord;
  setImageOverride: (key: string, dataUrl: string, fileName: string) => void;
  resetSlot: (key: string) => void;
  resetAll: () => void;
  lightbox: LightboxState;
  openLightbox: (keyOrUrl: string, title?: string, subtitle?: string) => void;
  closeLightbox: () => void;
  isManagerOpen: boolean;
  setManagerOpen: (open: boolean) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

const STORAGE_PREFIX = 'srm_image_override_';

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [overrides, setOverrides] = useState<Record<string, { url: string; fileName: string }>>({});
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    url: '',
    title: '',
  });
  const [isManagerOpen, setManagerOpen] = useState(false);

  // Load any stored overrides from localStorage
  useEffect(() => {
    try {
      const stored: Record<string, { url: string; fileName: string }> = {};
      IMAGE_SLOTS.forEach((slot) => {
        const item = localStorage.getItem(`${STORAGE_PREFIX}${slot.key}`);
        if (item) {
          try {
            const parsed = JSON.parse(item);
            if (parsed.url && (parsed.url.startsWith('data:') || parsed.url.startsWith('blob:'))) {
              stored[slot.key] = parsed;
            }
          } catch {
            // ignore
          }
        }
      });
      setOverrides(stored);
    } catch {
      // localStorage may fail in restricted sandboxes
    }
  }, []);

  const getImage = (key: string): ImageMapRecord => {
    if (overrides[key]) {
      return {
        url: overrides[key].url,
        fileName: overrides[key].fileName,
        isCustom: true,
      };
    }

    const slot = IMAGE_SLOTS.find((s) => s.key === key);
    if (slot) {
      if (key === 'mill_banner') {
        return {
          url: '/images/Sandranaricemills.png',
          fileName: slot.defaultFileName,
          isCustom: false,
        };
      }
      if (key === 'punjab_heritage') {
        return {
          url: 'https://lh3.googleusercontent.com/d/1EJQ5ASXVd28U9MUITuoJsZ-c8C3zCER8',
          fileName: slot.defaultFileName,
          isCustom: false,
        };
      }
      if (key === 'leadership_mamtaz') {
        return {
          url: `/images/${encodeURIComponent(slot.defaultFileName)}`,
          fileName: slot.defaultFileName,
          isCustom: false,
        };
      }
      return {
        url: `/images/${encodeURIComponent(slot.defaultFileName)}?v=srm_v2`,
        fileName: slot.defaultFileName,
        isCustom: false,
      };
    }

    return {
      url: '',
      fileName: 'image-placeholder.jpg',
      isCustom: false,
    };
  };

  const setImageOverride = (key: string, dataUrl: string, fileName: string) => {
    setOverrides((prev) => ({
      ...prev,
      [key]: { url: dataUrl, fileName },
    }));
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify({ url: dataUrl, fileName }));
    } catch (e) {
      console.warn('Could not store image in localStorage (likely size limit). Image will remain in memory.', e);
    }
  };

  const resetSlot = (key: string) => {
    setOverrides((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch {
      // ignore
    }
  };

  const resetAll = () => {
    setOverrides({});
    try {
      IMAGE_SLOTS.forEach((s) => localStorage.removeItem(`${STORAGE_PREFIX}${s.key}`));
    } catch {
      // ignore
    }
  };

  const openLightbox = (keyOrUrl: string, title?: string, subtitle?: string) => {
    const slot = IMAGE_SLOTS.find((s) => s.key === keyOrUrl);
    if (slot) {
      const record = getImage(slot.key);
      setLightbox({
        isOpen: true,
        url: record.url,
        title: title || slot.title,
        subtitle: subtitle || slot.description,
        slotKey: slot.key,
      });
    } else {
      setLightbox({
        isOpen: true,
        url: keyOrUrl,
        title: title || 'Image Viewer',
        subtitle: subtitle || '',
      });
    }
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ImageContext.Provider
      value={{
        slots: IMAGE_SLOTS,
        getImage,
        setImageOverride,
        resetSlot,
        resetAll,
        lightbox,
        openLightbox,
        closeLightbox,
        isManagerOpen,
        setManagerOpen,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = () => {
  const ctx = useContext(ImageContext);
  if (!ctx) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return ctx;
};
