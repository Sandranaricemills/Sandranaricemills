import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../data/translations';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  isUrdu: boolean;
  dir: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'srm_selected_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      if (saved === 'ur' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore localStorage errors
    }
    return 'en';
  });

  const isUrdu = language === 'ur';
  const dir = isUrdu ? 'rtl' : 'ltr';

  useEffect(() => {
    // Update HTML root attributes for accessibility and styling
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', dir);
    if (isUrdu) {
      document.documentElement.classList.add('lang-urdu');
    } else {
      document.documentElement.classList.remove('lang-urdu');
    }

    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language, isUrdu, dir]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        isUrdu,
        dir,
        toggleLanguage,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
