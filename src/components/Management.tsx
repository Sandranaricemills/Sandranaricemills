import React, { useState } from 'react';
import { MANAGEMENT_TEAM } from '../data/millData';
import { MillImage } from './common/MillImage';
import { useLanguage } from '../context/LanguageContext';
import { useImage } from '../context/ImageContext';
import { ShieldCheck, PhoneCall, Mail, Scan, Maximize2 } from 'lucide-react';

export const Management: React.FC = () => {
  const { isUrdu, t } = useLanguage();
  const { getImage } = useImage();

  // State to track whether an image should be fully adjusted in frame (contain) or cropped (cover)
  const [fitModes, setFitModes] = useState<Record<string, 'contain' | 'cover'>>({
    'saeed-ahmad': 'contain',
    'mamtaz-hussain': 'contain',
    'tahir-qazi': 'contain',
  });

  const toggleFitMode = (memberId: string) => {
    setFitModes((prev) => ({
      ...prev,
      [memberId]: prev[memberId] === 'contain' ? 'cover' : 'contain',
    }));
  };

  const getMemberData = (memberId: string, defaultMember: any) => {
    if (!isUrdu) return defaultMember;
    if (memberId === 'saeed-ahmad') {
      return {
        ...defaultMember,
        name: t.management.members.saeed.name,
        role: t.management.members.saeed.role,
        department: t.management.members.saeed.dept,
        bio: t.management.members.saeed.bio,
      };
    }
    if (memberId === 'mamtaz-hussain') {
      return {
        ...defaultMember,
        name: t.management.members.mamtaz.name,
        role: t.management.members.mamtaz.role,
        department: t.management.members.mamtaz.dept,
        bio: t.management.members.mamtaz.bio,
      };
    }
    if (memberId === 'tahir-qazi') {
      return {
        ...defaultMember,
        name: t.management.members.tahir.name,
        role: t.management.members.tahir.role,
        department: t.management.members.tahir.dept,
        bio: t.management.members.tahir.bio,
      };
    }
    return defaultMember;
  };

  return (
    <section id="management" className="py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold uppercase tracking-widest rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.management.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {t.management.title}
          </h2>
          <p className="text-slate-600 font-sans text-base sm:text-lg max-w-2xl mx-auto">
            {t.management.subtitle}
          </p>
        </div>

        {/* Management Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MANAGEMENT_TEAM.map((member) => {
            const m = getMemberData(member.id, member);
            return (
              <div
                key={member.id}
                className="bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Executive Portrait Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                  {/* Ambient backdrop for rich studio framing when fitted */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl scale-110 pointer-events-none transition-opacity duration-500"
                    style={{
                      backgroundImage: `url(${getImage(member.imageKey).url})`,
                    }}
                  />

                  <MillImage
                    slotKey={member.imageKey}
                    alt={`${m.name} - ${m.role}`}
                    objectFit={fitModes[member.id] || 'contain'}
                    className={`w-full h-full ${
                      (fitModes[member.id] || 'contain') === 'contain'
                        ? 'object-contain object-center scale-[0.98] group-hover:scale-100'
                        : 'object-cover object-top group-hover:scale-103'
                    } transition-all duration-500`}
                    containerClassName="w-full h-full flex items-center justify-center bg-transparent"
                    allowZoom={true}
                    badgeLabel={m.role}
                  />

                  {/* Quick Frame Adjust Toggle (Fit in frame vs Fill frame) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFitMode(member.id);
                    }}
                    className="absolute top-2.5 right-2.5 z-20 px-2 py-1 rounded bg-black/75 hover:bg-black text-white/90 hover:text-white backdrop-blur-xs text-[11px] font-medium flex items-center gap-1 transition shadow-xs border border-white/20"
                    title={(fitModes[member.id] || 'contain') === 'contain' ? 'Switch to Fill Frame' : 'Fully adjust in frame'}
                    aria-label="Toggle frame adjustment"
                  >
                    {(fitModes[member.id] || 'contain') === 'contain' ? (
                      <>
                        <Maximize2 className="w-3 h-3 text-[#E4C868]" />
                        <span>Fill</span>
                      </>
                    ) : (
                      <>
                        <Scan className="w-3 h-3 text-[#E4C868]" />
                        <span>Fit</span>
                      </>
                    )}
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none z-10">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E4C868] block">
                      {m.department}
                    </span>
                    <h3 className={`text-2xl font-bold text-white tracking-wide ${isUrdu ? 'font-sans' : 'font-serif'}`}>
                      {m.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="inline-block px-2.5 py-1 bg-stone-100 rounded text-xs font-semibold text-emerald-950 uppercase tracking-wider mb-3">
                      {m.role}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {m.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">
                      {isUrdu ? 'سندرانہ رائس ملز' : 'Sandrana Rice Mills'}
                    </span>
                    {member.phone ? (
                      <a
                        href={`tel:${member.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-semibold"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{member.phone}</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <Mail className="w-3.5 h-3.5 text-stone-400" />
                        <span>{isUrdu ? 'براہِ راست رابطہ' : 'Direct Inquiries'}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Executive Assurance Banner */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-emerald-950 via-[#1B4332] to-emerald-950 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#D4AF37]/30">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className={`text-xl font-bold text-[#E4C868] ${isUrdu ? 'font-sans' : 'font-serif'}`}>
              {isUrdu ? 'ہول سیل اور ایکسپورٹ کے لیے انتظامیہ سے براہِ راست رابطہ' : 'Personalized Attention for Bulk & Export Inquiries'}
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
              {isUrdu
                ? 'ہماری ایگزیکٹو ٹیم ہول سیل آرڈرز اور پیکنگ کی خصوصی تفصیلات کا خود جائزہ لے کر ہر معاہدے کی بروقت تکمیل یقینی بناتی ہے۔'
                : 'Our executive directors personally review wholesale volume orders and customized packaging specifications to ensure flawless contract fulfillment.'}
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#B89222] text-slate-950 text-xs font-semibold tracking-wider uppercase rounded shadow transition shrink-0"
          >
            <span>{isUrdu ? 'انتظامیہ سے رابطہ کریں' : 'Connect With Management'}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
