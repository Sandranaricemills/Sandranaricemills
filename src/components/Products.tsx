import React, { useState } from 'react';
import { PRODUCTS, MILL_INFO } from '../data/millData';
import { ProductItem } from '../types';
import { MillImage } from './common/MillImage';
import { useLanguage } from '../context/LanguageContext';
import { MessageSquare, ArrowUpRight, Check, Package, Sparkles, FileDown, Loader2 } from 'lucide-react';
import { generateCatalogPDF } from '../utils/pdfCatalog';

export const Products: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProductModal, setActiveProductModal] = useState<ProductItem | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const categories = [
    { key: 'all', label: isUrdu ? 'تمام اقسام (6)' : 'All Varieties (6)' },
    { key: 'kaynat', label: isUrdu ? '1121 کائنات' : '1121 Kaynat' },
    { key: 'basmati', label: isUrdu ? 'سپر باسمتی' : 'Super Basmati' },
    { key: 'long-grain', label: isUrdu ? '1886 اور 1718' : 'V1886 & V1718' },
    { key: 'hybrid', label: isUrdu ? 'ہائی بریڈ' : 'High Bread' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleWhatsAppInquiry = (productName: string) => {
    const text = encodeURIComponent(
      isUrdu
        ? `السلام علیکم سندرانہ رائس ملز، میں *${productName}* کے ہول سیل ریٹس اور ترسیل کی شرائط جاننا چاہتا ہوں۔`
        : `Hello Sandrana Rice Mills, I would like to inquire about specifications, minimum order quantity, and bulk pricing for *${productName}*.`
    );
    window.open(`https://wa.me/${MILL_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const handleDownloadCatalog = async () => {
    try {
      setIsDownloadingPdf(true);
      await generateCatalogPDF();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.warn('Failed to generate catalog PDF:', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <section id="products" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold uppercase tracking-widest rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.products.badge}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              {t.products.title}
            </h2>
            <p className="mt-3 text-slate-600 font-sans text-base">
              {t.products.subtitle}
            </p>
          </div>

          {/* Action Row: Category Filter Tabs & PDF Catalog Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setSelectedCategory(c.key)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    selectedCategory === c.key
                      ? 'bg-[#1B4332] text-white shadow-xs'
                      : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Download PDF Catalog Action Button */}
            <button
              type="button"
              onClick={handleDownloadCatalog}
              disabled={isDownloadingPdf}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 shrink-0 shadow-xs cursor-pointer ${
                downloadSuccess
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#071a10] hover:bg-[#133225] text-[#E4C868] hover:text-white border border-[#D4AF37]/50 hover:border-[#D4AF37]'
              }`}
              title="Download Certified PDF Product Catalog & Technical Matrix"
            >
              {isDownloadingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                  <span>{isUrdu ? 'پی ڈی ایف تیار ہو رہی ہے...' : 'Preparing PDF...'}</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>{isUrdu ? 'کیٹلاگ ڈاؤنلوڈ ہو گیا!' : 'Catalog Downloaded!'}</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t.products.downloadPdf}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-stone-50 rounded-xl overflow-hidden border border-stone-200/90 hover:border-amber-400/80 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Product Photography Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
                <MillImage
                  slotKey={product.imageKey}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  allowZoom={true}
                  badgeLabel={product.category.toUpperCase()}
                />
                <button
                  type="button"
                  onClick={() => setActiveProductModal(product)}
                  className="absolute bottom-3 right-3 p-2 bg-white/90 text-slate-800 rounded-md hover:bg-white hover:text-emerald-900 shadow transition text-xs font-semibold inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 cursor-pointer"
                  title="View Specifications"
                >
                  <span>{isUrdu ? 'تفصیلات' : 'Specs'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-800 font-semibold mb-1">
                    <span>{product.category === 'kaynat' ? (isUrdu ? '1121 کائنات نسل' : '1121 Lineage') : (isUrdu ? 'پنجاب فصل' : 'Punjab Harvest')}</span>
                    <span className="font-mono bg-amber-50 px-2 py-0.5 rounded border border-amber-200/70">
                      L: {product.grainLength}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-bold text-slate-900 group-hover:text-emerald-900 transition-colors ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                    {product.name}
                  </h3>

                  <p className="text-xs font-medium text-emerald-800 mt-1 mb-2 line-clamp-1">
                    {product.subheading}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Key Technical Specs Table */}
                <div className="pt-3 border-t border-stone-200/70 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.products.moisture}:</span>
                    <span className="font-medium text-slate-800">{product.moistureContent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.products.brokenGrains}:</span>
                    <span className="font-medium text-slate-800">{product.brokenGrains}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.products.purity}:</span>
                    <span className="font-medium text-slate-800">{product.purity}</span>
                  </div>
                </div>

                {/* Packaging Badges */}
                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    {t.products.packaging}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.packagingOptions.map((pkg, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[11px] bg-white border border-stone-200 px-2 py-0.5 rounded text-slate-700"
                      >
                        <Package className="w-2.5 h-2.5 text-stone-400" />
                        {pkg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Product Action: WhatsApp Direct Inquiry */}
                <div className="pt-4 border-t border-stone-200 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleWhatsAppInquiry(product.name)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-[#1B4332] hover:bg-[#133225] text-white text-xs font-semibold tracking-wide rounded shadow-2xs hover:shadow transition cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#E4C868]" />
                    <span>{t.products.inquire}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveProductModal(product)}
                    className="p-2.5 text-slate-600 hover:text-emerald-900 bg-white hover:bg-stone-100 border border-stone-200 rounded transition cursor-pointer"
                    title="View Technical Details"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Wholesale Packaging Note */}
        <div className="mt-12 p-6 rounded-xl bg-stone-100 border border-stone-300/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-900 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`font-bold text-lg text-slate-900 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                {isUrdu ? 'برآمدی اور مقامی کسٹم پیکنگ کی مکمل سہولت' : 'Custom Export & Domestic Bag Packaging Available'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-0.5">
                {isUrdu
                  ? 'ہم 25 کلو اور 50 کلو پی پی بیگز، کاٹن کینوس یا آپ کے اپنے برانڈ اور لوگو کے مطابق خصوصی پیکنگ تیار کرتے ہیں۔'
                  : 'We supply in standard 25kg, 50kg polypropylene bags, luxury printed canvas, or customize master sacks with your private distributor brand and logo.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDownloadCatalog}
              disabled={isDownloadingPdf}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#071a10] hover:bg-[#133225] text-[#E4C868] text-xs font-bold rounded border border-[#D4AF37]/40 shadow-xs transition cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isUrdu ? 'مکمل کیٹلاگ پی ڈی ایف' : 'Full Spec PDF'}</span>
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-300 text-slate-800 text-xs font-semibold rounded hover:bg-stone-50 transition"
            >
              <span>{isUrdu ? 'کسٹم پیکنگ کی درخواست' : 'Request Custom Packaging'}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Technical Specification Modal */}
      {activeProductModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveProductModal(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-emerald-800">
                  {activeProductModal.category.toUpperCase()} • {isUrdu ? 'تکنیکی تصدیق' : 'Certified Batch Standard'}
                </span>
                <h3 className={`text-2xl sm:text-3xl font-bold text-slate-900 ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                  {activeProductModal.name}
                </h3>
                <p className="text-sm text-stone-500 font-medium">
                  {activeProductModal.subheading}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveProductModal(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-stone-50 p-3.5 rounded border border-stone-200">
                <span className="text-slate-500 block mb-1">{isUrdu ? 'اوسط لمبائی' : 'Average Kernel Length'}</span>
                <span className="text-base font-bold text-slate-900">{activeProductModal.grainLength}</span>
              </div>
              <div className="bg-stone-50 p-3.5 rounded border border-stone-200">
                <span className="text-slate-500 block mb-1">{t.products.moisture}</span>
                <span className="text-base font-bold text-slate-900">{activeProductModal.moistureContent}</span>
              </div>
              <div className="bg-stone-50 p-3.5 rounded border border-stone-200">
                <span className="text-slate-500 block mb-1">{t.products.brokenGrains}</span>
                <span className="text-base font-bold text-slate-900">{activeProductModal.brokenGrains}</span>
              </div>
              <div className="bg-stone-50 p-3.5 rounded border border-stone-200">
                <span className="text-slate-500 block mb-1">{t.products.purity}</span>
                <span className="text-base font-bold text-slate-900">{activeProductModal.purity}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                {isUrdu ? 'کھانے پکانے اور استعمال کی خصوصیات' : 'Culinary & Commercial Application'}
              </h4>
              <p className="text-sm text-slate-700">
                {activeProductModal.idealUse}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDownloadCatalog}
                disabled={isDownloadingPdf}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold rounded border border-stone-300 transition cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5 text-[#B89222]" />
                <span>{isUrdu ? 'پی ڈی ایف اسپیکس ڈاؤنلوڈ کریں' : 'Download Certified PDF Specs'}</span>
              </button>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveProductModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  {isUrdu ? 'بند کریں' : 'Close'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleWhatsAppInquiry(activeProductModal.name);
                    setActiveProductModal(null);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] text-white text-xs font-semibold rounded hover:bg-[#133225] transition cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#E4C868]" />
                  <span>{isUrdu ? 'اس ورائٹی کے بارے میں رابطہ کریں' : 'Inquire About This Variety'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
