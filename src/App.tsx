/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ImageProvider } from './context/ImageContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WeatherWidget } from './components/WeatherWidget';
import { AboutUs } from './components/AboutUs';
import { Management } from './components/Management';
import { Products } from './components/Products';
import { OurMill } from './components/OurMill';
import { Quality } from './components/Quality';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ImageMapperDrawer } from './components/ImageMapperDrawer';
import { LightboxModal } from './components/LightboxModal';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  return (
    <LanguageProvider>
      <ImageProvider>
        <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-slate-900">
          {/* Navigation Header */}
          <Header />

          {/* Main Sections */}
          <main className="flex-1">
            <Hero />
            <WeatherWidget />
            <AboutUs />
            <Management />
            <Products />
            <OurMill />
            <Quality />
            <Gallery />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Interactive Image Manager, Lightbox & Mobile Floating Actions */}
          <ImageMapperDrawer />
          <LightboxModal />
          <FloatingActions />
        </div>
      </ImageProvider>
    </LanguageProvider>
  );
}
