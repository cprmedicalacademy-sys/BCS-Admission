import React from 'react';
import { CprLogo } from './CprLogo';
import { CAMPAIGN_INFO } from '../data/courseData';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onRegisterClick: () => void;
  onLookupClick: () => void;
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRegisterClick, onLookupClick, onAdminClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Academy Info & Brand */}
          <div className="lg:col-span-5 space-y-4">
            <CprLogo size="lg" className="text-white" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              CPR Medical Academy is Bangladesh's premier medical post-graduation and BCS preparation institution, committed to nurturing confident physicians and cadre leaders.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{CAMPAIGN_INFO.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${CAMPAIGN_INFO.contactEmail}`} className="hover:text-cyan-300">
                  {CAMPAIGN_INFO.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>হটলাইন: 01898-938981 · WhatsApp: 01805-743666</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-400 font-bold text-xs">bKash:</span>
                <span>{CAMPAIGN_INFO.bkashNumber} (Personal Send Money)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Navigation Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#home" className="hover:text-cyan-300 transition-colors">
                  Home &amp; Campaign
                </a>
              </li>
              <li>
                <a href="#course-highlights" className="hover:text-cyan-300 transition-colors">
                  Course Highlights (8 Subject Finals + 2 Grand Mocks)
                </a>
              </li>
              <li>
                <a href="#routine" className="hover:text-cyan-300 transition-colors">
                  Exam Routine &amp; Mark Distribution
                </a>
              </li>
              <li>
                <a href="#mentors" className="hover:text-cyan-300 transition-colors">
                  BCS Cadre Mentors (10 Faculty Members)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-300 transition-colors">
                  Candidate FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Portal Services & Candidate Action */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Online Candidate Portal
            </h4>
            <p className="text-xs text-slate-400">
              Special BCS: অফলাইন ভর্তি ফি <strong>৳ ১৪৯৯/-</strong> (অফার সমাপ্ত, ৫৪+ জন ভর্তি) | অনলাইন <strong>৳ ৫৯৯/-</strong> (১ম ২০ জন অফার, মূল ৳ ৭৯৯)।
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onRegisterClick}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs text-center transition-colors cursor-pointer"
              >
                Register Now · অফলাইন ৳ ১৪৯৯ | অনলাইন ৳ ৫৯৯
              </button>
              <button
                onClick={onLookupClick}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs text-center border border-slate-700 transition-colors cursor-pointer"
              >
                Verify Registration ID &amp; Download Slip
              </button>
            </div>
          </div>

        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-500" />
            <span>&copy; {new Date().getFullYear()} CPR Medical Academy. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onAdminClick}
              className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Admin Panel</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={scrollToTop}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
