import React from 'react';
import { Sparkles, Snowflake, CheckCircle2, ArrowRight, ShieldCheck, Clock, Award, Users } from 'lucide-react';
import { CAMPAIGN_INFO } from '../data/courseData';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreRoutineClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreRoutineClick,
}) => {
  return (
    <section id="home" className="relative overflow-hidden pt-6 pb-16 md:py-16 bg-gradient-to-b from-sky-50/70 via-cyan-50/30 to-white">
      {/* Subtle Winter Ambient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-200/25 blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-sky-100/50 blur-2xl" />
        {/* Subtle decorative snowflakes */}
        <div className="hidden sm:block absolute top-12 left-12 text-cyan-200/40 animate-pulse">
          <Snowflake className="w-8 h-8" />
        </div>
        <div className="hidden sm:block absolute top-28 right-16 text-sky-200/50">
          <Snowflake className="w-6 h-6" />
        </div>
        <div className="hidden sm:block absolute bottom-16 right-1/3 text-cyan-200/30">
          <Snowflake className="w-10 h-10" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Marquee Campaign Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Campaign Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-100/90 to-cyan-100/90 border border-cyan-300/60 shadow-xs text-slate-800 text-xs sm:text-sm font-semibold">
              <span className="flex items-center gap-1 text-cyan-700">
                <Snowflake className="w-4 h-4 text-cyan-600 animate-spin-slow" />
                <span>SPECIAL BCS (HEALTH)</span>
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-blue-900 font-bold uppercase tracking-wide">
                SUBJECT FINALS &amp; GRAND MOCK
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                SUBJECT FINALS <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-900">
                  &amp; GRAND MOCK
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed pt-1">
                The definitive high-yield examination program tailored specifically for prospective Medical Officers &amp; Assistant Surgeons targeting the upcoming Special BCS (Health Cadre).
              </p>
            </div>

            {/* Dual Price Lockup Box (OFFLINE & ONLINE) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/95 border border-sky-100 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.06)] relative overflow-hidden backdrop-blur-sm space-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-100/60 to-transparent rounded-bl-full pointer-events-none" />

              {/* Header with Already Enrolled Count */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    স্পেশাল বিসিএস কোর্স ও ভর্তি ফি (Offline &amp; Online)
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-lg w-fit">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ইতিমধ্যে ৫৪ জন ভর্তি সম্পন্ন</span>
                </div>
              </div>

              {/* Dual Pricing Grid: OFFLINE vs ONLINE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {/* 1. OFFLINE Track */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden border border-cyan-500/30 shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-500 text-slate-950 font-black text-[11px] tracking-wider uppercase">
                      OFFLINE
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      চকবাজার ক্যাম্পাস
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="text-[11px] text-slate-400">
                      মূল ভর্তি ফি:
                    </div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-black font-display text-white font-mono-numbers">
                        ৳ ১৪৯৯/-
                      </span>
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-950/90 px-2 py-0.5 rounded border border-amber-500/40">
                        অফার সমাপ্ত
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 text-xs font-bold text-slate-300 flex items-center gap-1">
                    <span>⚠️ অফার শেষ (৫৪+ জন ভর্তি সম্পন্ন)</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-300 leading-tight">
                    চকবাজার মতি টাওয়ারে ওএমআর পরীক্ষা, প্রিন্টেড প্রশ্ন ও সল্যুশন বুকলেট
                  </div>
                </div>

                {/* 2. ONLINE Track */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-900 via-teal-950 to-slate-900 text-white relative overflow-hidden border border-teal-400/30 shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-400 text-slate-950 font-black text-[11px] tracking-wider uppercase">
                      ONLINE
                    </span>
                    <span className="text-[10px] font-bold text-teal-200 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-400/40">
                      সারা বাংলাদেশ
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="text-[11px] text-slate-300 line-through">
                      মূল ফি: ৳ ৭৯৯/-
                    </div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-black font-display text-white font-mono-numbers">
                        ৳ ৫৯৯/-
                      </span>
                      <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/40">
                        ৳ ২০০ ছাড়
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 text-xs font-bold text-amber-300 flex items-center gap-1">
                    <span>⚡ ১ম ২০জনের জন্য ৫৯৯/- অফার চলছে!</span>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-300 leading-tight">
                    মোবাইল/ল্যাপটপে লাইভ পরীক্ষা, ডিজিটাল পিডিএফ প্রশ্ন ও সল্যুশন
                  </div>
                </div>
              </div>

              {/* Progress & Guarantee Bar */}
              <div className="pt-1 space-y-1.5">
                <div className="flex justify-between items-center text-xs font-medium text-slate-700">
                  <span className="flex items-center gap-1.5 font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>১০টি পূর্ণাঙ্গ পরীক্ষা (৮টি সাবজেক্ট ফাইনাল + ২টি গ্র্যান্ড মক)</span>
                  </span>
                  <span className="text-blue-900 font-bold font-mono-numbers">
                    বিকাল ৩:০০ টা
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 via-blue-600 to-emerald-600 h-2 rounded-full w-[54%]"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <button
                type="button"
                onClick={onRegisterClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-base shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>REGISTER NOW</span>
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded font-mono-numbers font-extrabold">
                    অফলাইন ৳ ১৪৯৯ | অনলাইন ৳ ৫৯৯
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                type="button"
                onClick={onExploreRoutineClick}
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white border border-slate-300 hover:border-cyan-500 hover:bg-cyan-50/50 text-slate-700 hover:text-cyan-900 font-semibold text-sm transition-all duration-200 cursor-pointer shadow-xs"
              >
                <span>View Exam Routine &amp; Syllabus</span>
              </button>
            </div>

            {/* Quick Trust Checklist */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>8 Subject Finals + 2 Grand Mocks</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-blue-950">
                <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                <span>পরীক্ষার সময়: বিকাল ৩:০০ টা (3:00 PM)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Online (bKash) ও Cash পেমেন্ট</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Poster Card & Doctor Imagery */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Poster Frame */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-cyan-200 via-sky-100 to-blue-200 shadow-2xl shadow-blue-900/10 border border-white/80">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
                  <img
                    src="/src/assets/images/cpr_hero_physicians_1794202110102.jpg"
                    alt="Bangladeshi doctors preparing for Special BCS at CPR Medical Academy"
                    className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

                  {/* Winter campaign badge overlay on poster image */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-200 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span className="text-[11px] font-extrabold text-slate-900 tracking-wider uppercase">
                      Winter Intake 2026
                    </span>
                  </div>

                  {/* Bottom overlay text */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <div className="flex items-center justify-between text-xs text-cyan-300 font-semibold">
                      <span>Center for Physicians' Realization</span>
                      <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                        BPSC Pattern
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white font-display">
                      Comprehensive Question Pool with Explanations
                    </div>
                  </div>
                </div>

                {/* Sub-card: Special BCS Features Floating Pill */}
                <div className="mt-3 bg-white rounded-xl p-3.5 border border-sky-100 shadow-sm flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        100% BCS Syllabus Coverage
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Basic Medical Science + General Knowledge
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded">
                      200 Marks
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
