import React, { useState } from 'react';
import { MILL_INFO, PRODUCTS } from '../data/millData';
import { ContactFormData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ExternalLink
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    productInterest: 'Raw V1121 Kaynat Rice',
    quantityEst: '10 to 25 Metric Tons',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      return;
    }

    // Prepare WhatsApp message
    const waText = encodeURIComponent(
      isUrdu
        ? `*نئی انکوائری - سندرانہ رائس ملز ویب سائٹ*\n` +
          `👤 *نام:* ${formData.fullName}\n` +
          `🏢 *کمپنی:* ${formData.companyName || 'لاگو نہیں'}\n` +
          `📞 *فون:* ${formData.phone}\n` +
          `✉️ *ای میل:* ${formData.email || 'لاگو نہیں'}\n` +
          `🌾 *پروڈکٹ:* ${formData.productInterest}\n` +
          `📦 *مقدار:* ${formData.quantityEst}\n` +
          `💬 *پیغام:* ${formData.message || 'برائے مہربانی کوٹیشن اور تفصیلات فراہم کریں۔'}`
        : `*New Inquiry - Sandrana Rice Mills Website*\n` +
          `👤 *Name:* ${formData.fullName}\n` +
          `🏢 *Company:* ${formData.companyName || 'N/A'}\n` +
          `📞 *Phone:* ${formData.phone}\n` +
          `✉️ *Email:* ${formData.email || 'N/A'}\n` +
          `🌾 *Product:* ${formData.productInterest}\n` +
          `📦 *Estimated Quantity:* ${formData.quantityEst}\n` +
          `💬 *Message:* ${formData.message || 'Please share product specifications & price quote.'}`
    );

    setSubmitted(true);

    // Open WhatsApp in new tab
    window.open(`https://wa.me/${MILL_INFO.whatsappRaw}?text=${waText}`, '_blank');
  };

  const openDirectWhatsApp = () => {
    const text = encodeURIComponent(
      isUrdu
        ? 'السلام علیکم سندرانہ رائس ملز، میں چاول کی اقسام اور ہول سیل ریٹس کے بارے میں بات کرنا چاہتا ہوں۔'
        : 'Hello Sandrana Rice Mills, I would like to inquire about your rice varieties and wholesale pricing.'
    );
    window.open(`https://wa.me/${MILL_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold uppercase tracking-widest rounded-full mb-3">
            <Building className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-slate-600 font-sans text-base sm:text-lg max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info, Address & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 shadow-2xs space-y-5">
              <h3 className={`text-xl font-bold text-slate-900 border-b border-stone-200 pb-3 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {isUrdu ? 'مرکزی دفتر و فیکٹری احاطہ' : 'Headquarters & Processing Facility'}
              </h3>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-900 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    {isUrdu ? 'فیکٹری کا مکمل پتہ' : 'Physical Mill Address'}
                  </span>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">
                    {isUrdu ? '28 کلومیٹر جھنگ تا سرگودھا روڈ، جھنگ، پنجاب، پاکستان' : MILL_INFO.address}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isUrdu ? 'مرکزی شاہراہ پر واقع، بھاری ٹرکوں اور ٹرالوں کی آسان رسائی۔' : 'Situated on main highway with high-capacity truck access.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-900 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    {isUrdu ? 'براہِ راست فون / کالز' : 'Direct Phone / Calls'}
                  </span>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5" dir="ltr">
                    <a href={`tel:${MILL_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-emerald-800 transition">
                      {MILL_INFO.phone}
                    </a>
                  </p>
                  <p className="text-xs text-slate-500">
                    {isUrdu ? 'انتظامیہ اور مینجمنٹ سے براہِ راست رابطہ۔' : 'Direct line to administrative management.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-900 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    {isUrdu ? 'آفیشل واٹس ایپ' : 'Official WhatsApp'}
                  </span>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5" dir="ltr">
                    <button
                      type="button"
                      onClick={openDirectWhatsApp}
                      className="text-emerald-800 hover:text-emerald-950 underline font-semibold cursor-pointer"
                    >
                      {MILL_INFO.phone} {isUrdu ? '(چیٹ کے لیے کلک کریں)' : '(Click to Chat)'}
                    </button>
                  </p>
                  <p className="text-xs text-slate-500">
                    {isUrdu ? 'تازہ ریٹ لسٹ اور چاول کی تصاویر فوری حاصل کریں۔' : 'Rapid response for live rate cards & grain photos.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-900 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    {isUrdu ? 'آفیشل ای میل' : 'Official Email'}
                  </span>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5" dir="ltr">
                    <a href={`mailto:${MILL_INFO.email}`} className="hover:text-emerald-800 transition">
                      {MILL_INFO.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    {isUrdu ? 'اوقاتِ کار اور ڈسپیچ' : 'Operating & Dispatch Hours'}
                  </span>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">
                    {isUrdu ? 'پیر تا ہفتہ: صبح 8:00 بجے تا رات 8:00 بجے (24 گھنٹے سیزنل ڈسپیچ)' : MILL_INFO.workingHours}
                  </p>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${MILL_INFO.phone.replace(/\s+/g, '')}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded shadow-xs transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'کال کریں' : 'Call Us Direct'}</span>
                </a>

                <button
                  type="button"
                  onClick={openDirectWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#1B4332] hover:bg-[#133225] text-white text-xs font-semibold rounded shadow-xs transition cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#E4C868]" />
                  <span>{isUrdu ? 'واٹس ایپ پر رابطہ' : 'Chat on WhatsApp'}</span>
                </button>
              </div>
            </div>

            {/* Embedded Google Map Representation */}
            <div className="rounded-xl overflow-hidden border border-stone-200 shadow-2xs bg-stone-100">
              <div className="p-3 bg-white border-b border-stone-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                  {isUrdu ? 'جھنگ تا سرگودھا روڈ (28 کلومیٹر)' : '28 KM Jhang–Sargodha Road Location'}
                </span>
                <a
                  href={MILL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-800 hover:text-emerald-950 font-medium inline-flex items-center gap-1"
                >
                  <span>{isUrdu ? 'گوگل میپ کھولیں' : 'Open Maps'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative w-full h-56 bg-stone-200">
                <iframe
                  title="Sandrana Rice Mills Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=28+KM+Jhang-Sargodha+Road+Jhang+Punjab+Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                />
              </div>
              <div className="p-3 bg-stone-50 text-[11px] text-slate-500">
                {isUrdu
                  ? 'نوٹ: ہول سیل ڈیلرز اور برآمدی نمائندوں سے گزارش ہے کہ فیکٹری تشریف آوری سے قبل پیشگی رابطہ کر لیں تاکہ انتظامیہ آپ کا پرتپاک استقبال کر سکے۔'
                  : 'Visiting Protocol: Wholesale delegates and export representatives are requested to confirm arrivals in advance to arrange a guided mill walkthrough with management.'}
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-stone-50 rounded-xl border border-stone-200 shadow-sm p-6 sm:p-8">
              <h3 className={`text-2xl font-bold text-slate-900 mb-2 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {t.contact.quote}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                {isUrdu
                  ? 'اپنی مطلوبہ ورائٹی اور مقدار منتخب کریں۔ فارم جمع کروانے پر آپ کی درخواست براہ راست ہمارے آفیشل واٹس ایپ پر ارسال ہو جائے گی۔'
                  : 'Fill out the form below to receive customized specifications, lot availability, and ex-mill pricing. Submitting instantly formats your request directly to our official WhatsApp line.'}
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{isUrdu ? 'انکوائری موصول ہو گئی!' : 'Inquiry Transmitted!'}</span>
                    <p className="text-slate-700 mt-0.5">
                      {isUrdu
                        ? 'آپ کی درخواست واٹس ایپ میں کھل چکی ہے۔ ہماری انتظامی ٹیم جلد آپ کو تازہ ترین ریٹ فراہم کرے گی۔'
                        : 'Your request has been prepared and opened in WhatsApp. Our management team will reply with rate cards shortly.'}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.contact.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={isUrdu ? 'مثلاً محمد طارق / بلال احمد' : 'e.g. M. Tariq / Mr. Bilal'}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded text-sm text-slate-900 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.contact.company}
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder={isUrdu ? 'مثلاً الرازق فوڈز / گلوبل ٹریڈرز' : 'e.g. Al-Raziq Foods / Global Trading'}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded text-sm text-slate-900 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.contact.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 0000000"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded text-sm text-slate-900 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="business@example.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded text-sm text-slate-900 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.contact.riceVariety}
                    </label>
                    <select
                      value={formData.productInterest}
                      onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded text-sm text-slate-900 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                    >
                      {PRODUCTS.map((prod) => (
                        <option key={prod.id} value={prod.name}>
                          {prod.name}
                        </option>
                      ))}
                      <option value="Mixed Lot / Multiple Varieties">
                        {isUrdu ? 'مکس لاٹ / متعدد اقسام' : 'Mixed Lot / Multiple Varieties'}
                      </option>
                      <option value="Unhusked Paddy Supply">
                        {isUrdu ? 'کچا دھان سپلائی' : 'Unhusked Paddy Supply'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.contact.quantity}
                    </label>
                    <select
                      value={formData.quantityEst}
                      onChange={(e) => setFormData({ ...formData, quantityEst: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded text-sm text-slate-900 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                    >
                      <option value="1 to 5 Metric Tons (Sample / Trial)">
                        {isUrdu ? '1 تا 5 میٹرک ٹن (ٹیسٹ سیمپل)' : '1 to 5 Metric Tons (Sample / Trial)'}
                      </option>
                      <option value="10 to 25 Metric Tons (Standard Truckload)">
                        {isUrdu ? '10 تا 25 میٹرک ٹن (ایک ٹرک لوڈ)' : '10 to 25 Metric Tons (Standard Truckload)'}
                      </option>
                      <option value="50 to 100 Metric Tons">
                        {isUrdu ? '50 تا 100 میٹرک ٹن' : '50 to 100 Metric Tons'}
                      </option>
                      <option value="Multi-Container Export Lot (100+ Tons)">
                        {isUrdu ? 'ملٹی کنٹینر ایکسپورٹ لاٹ (100+ ٹن)' : 'Multi-Container Export Lot (100+ Tons)'}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.contact.message}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isUrdu
                        ? 'مطلوبہ پیکنگ سائز (مثلاً 25 کلو یا 50 کلو بیگز)، منزل یا ڈیلیوری کا شیڈول تحریر کریں...'
                        : 'Specify preferred bag size (e.g. 25kg or 50kg), destination market, or delivery timetable...'
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded text-sm text-slate-900 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#1B4332] hover:bg-[#133225] text-white font-semibold text-sm rounded shadow-sm hover:shadow transition cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#E4C868]" />
                    <span>{t.contact.submit}</span>
                  </button>
                  <p className="text-center text-[11px] text-slate-500 mt-2">
                    {isUrdu
                      ? 'انتظامیہ سے براہِ راست رابطہ نمبر: 0962 726 300 92+'
                      : 'Directly connects to our managing director at +92 300 7260962.'}
                  </p>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
