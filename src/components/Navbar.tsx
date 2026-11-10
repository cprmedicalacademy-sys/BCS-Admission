import React, { useState } from 'react';
import { CprLogo } from './CprLogo';
import { Menu, X, PhoneCall, Search, Shield } from 'lucide-react';

interface NavbarProps {
  onRegisterClick: () => void;
  onLookupClick: () => void;
  onAdminClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick, onLookupClick, onAdminClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-sky-100 shadow-[0_2px_15px_-3px_rgba(14,165,233,0.07)]">
      {/* Top emergency announcement bar */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-cyan-900 text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between no-print">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-cyan-300 font-semibold tracking-wide">SPECIAL BCS:</span>
            <span>অফলাইন ৫৪+ ও অনলাইন ৩২+ জন ভর্তি সম্পন্ন · মোট ৮৬+ চিকিৎসক যুক্ত</span>
            <span className="hidden sm:inline text-sky-200">· চকবাজার, চট্টগ্রাম ও সারা দেশ</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-slate-300">
            <button
              onClick={onLookupClick}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verify Reg ID</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onAdminClick}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer text-cyan-200"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
            <span className="text-slate-600">|</span>
            <a
              href="tel:01898938981"
              className="hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>01898-938981</span>
            </a>
            <span className="text-slate-600">/</span>
            <a
              href="https://wa.me/8801805743666"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 text-emerald-300 transition-colors flex items-center gap-1 font-bold"
            >
              <span>WhatsApp: 01805-743666</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title / Logo */}
        <a href="#home" className="shrink-0 flex items-center">
          <CprLogo size="md" />
        </a>

        {/* Zone 2: Navigation Links (Clean, unboxed, single-line) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <a
            href="#home"
            className="hover:text-cyan-700 transition-colors whitespace-nowrap shrink-0"
          >
            Home
          </a>
          <a
            href="#course-highlights"
            className="hover:text-cyan-700 transition-colors whitespace-nowrap shrink-0"
          >
            Course Features
          </a>
          <a
            href="#routine"
            className="hover:text-cyan-700 transition-colors whitespace-nowrap shrink-0"
          >
            Exam Routine
          </a>
          <a
            href="#mentors"
            className="hover:text-cyan-700 transition-colors whitespace-nowrap shrink-0"
          >
            Cadre Mentors
          </a>
          <a
            href="#faq"
            className="hover:text-cyan-700 transition-colors whitespace-nowrap shrink-0"
          >
            Admission FAQ
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onLookupClick}
            className="hidden sm:flex lg:hidden items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span>Find Slip</span>
          </button>
          
          <button
            type="button"
            onClick={onRegisterClick}
            className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 via-blue-700 to-slate-900 text-white font-semibold text-xs sm:text-sm shadow-md shadow-cyan-900/15 hover:shadow-cyan-900/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Register Now</span>
              <span className="bg-red-500/90 text-white text-[11px] font-bold px-1.5 py-0.2 rounded font-mono-numbers">
                ৳ ১৪৯৯ / ৳ ৭৯৯
              </span>
            </span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sky-50 text-slate-800"
            >
              Home
            </a>
            <a
              href="#course-highlights"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sky-50 text-slate-800"
            >
              Course Highlights & Features
            </a>
            <a
              href="#routine"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sky-50 text-slate-800"
            >
              Exam Routine & Schedule
            </a>
            <a
              href="#mentors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sky-50 text-slate-800"
            >
              BCS Cadre Mentors
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sky-50 text-slate-800"
            >
              Frequently Asked Questions
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLookupClick();
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-sky-50 text-cyan-800 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Verify Registration ID & Slip</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onAdminClick();
              }}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-100 text-slate-700 flex items-center gap-2 font-bold"
            >
              <Shield className="w-4 h-4 text-cyan-700" />
              <span>Admin Panel</span>
            </button>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRegisterClick();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-800 text-white font-bold text-center text-sm shadow-md"
            >
              Register Now · অফলাইন ৳ ১৪৯৯ | অনলাইন ৳ ৭৯৯
            </button>
            <a
              href="https://wa.me/8801805743666"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs text-slate-500 hover:text-emerald-700 py-1"
            >
              হটলাইন: 01898-938981 · WhatsApp: 01805-743666 (চকবাজার, চট্টগ্রাম)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
