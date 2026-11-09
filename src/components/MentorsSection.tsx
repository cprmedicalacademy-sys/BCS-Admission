import React, { useState } from 'react';
import { MENTORS, CAMPAIGN_INFO } from '../data/courseData';
import { Award, GraduationCap, Image as ImageIcon, ArrowRight, Stethoscope, CheckCircle2 } from 'lucide-react';

interface MentorsSectionProps {
  onRegisterClick: () => void;
}

export const MentorsSection: React.FC<MentorsSectionProps> = ({ onRegisterClick }) => {
  const [showMentorBannerModal, setShowMentorBannerModal] = useState(false);

  return (
    <section id="mentors" className="py-20 bg-white border-t border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Expert Faculty &amp; BCS Cadre Panel</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              CPR Medical Academy Mentors
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Taught and mentored directly by BCS (Health &amp; Administration) cadre officers, FCPS post-graduate trainees, and clinical residents from CMCH, DMCH &amp; BSMMU.
            </p>
          </div>

          <button
            onClick={() => setShowMentorBannerModal(true)}
            className="px-4 py-2.5 rounded-xl border border-cyan-200 bg-cyan-50 hover:bg-cyan-100 text-cyan-900 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-2xs self-start md:self-auto shrink-0"
          >
            <ImageIcon className="w-4 h-4 text-cyan-700" />
            <span>View Official Mentor Panel</span>
          </button>
        </div>

        {/* 10 Mentor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
          {MENTORS.map((mentor, index) => (
            <div
              key={index}
              className="rounded-2xl p-4.5 bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 hover:border-cyan-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Avatar Badge */}
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 via-slate-900 to-cyan-800 text-white flex items-center justify-center font-display font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-5 h-5 text-cyan-300" />
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-cyan-800 transition-colors leading-snug">
                    {mentor.name}
                  </h3>
                  <div className="text-[11px] font-semibold text-blue-900 mt-1">
                    {mentor.qualification}
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                  <div className="font-medium text-cyan-800 line-clamp-2">
                    {mentor.cadre}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {mentor.institution}
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100/80 flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span className="text-cyan-700">{mentor.designation}</span>
                <span className="font-mono-numbers">0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Official Mentor Board Banner Showcase */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                Official Orientation Center
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                চট্টগ্রামে একমাত্র অফলাইন মেডিকেল পোস্ট গ্রাজুয়েশন ওরিয়েন্টেশন সেন্টার
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                চকবাজার মতি টাওয়ার ক্যাম্পাসে নিয়মিত অফলাইন ও অনলাইন পরীক্ষা, পোস্ট-এক্সাম অ্যানালাইসিস ও ডাউট ক্লিয়ারিং ক্লাসে অংশ নিন।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setShowMentorBannerModal(true)}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
              >
                View Full Mentor Photo Grid
              </button>
              
              <button
                onClick={onRegisterClick}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <span>Enroll in Winter Batch (৳ 1199)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Modal for Official Mentors Banner Image */}
        {showMentorBannerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative">
              <button
                onClick={() => setShowMentorBannerModal(false)}
                className="absolute top-4 right-4 bg-slate-900 text-white p-1.5 rounded-full hover:bg-slate-700 transition-colors z-10 cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
              
              <div className="text-center pb-3 border-b border-slate-100">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  সিপিআর মেডিকেল একাডেমি মেন্টর প্যানেল
                </h3>
                <p className="text-xs text-slate-500">
                  Centre for Post-Graduation (CPR) · Special BCS Wing
                </p>
              </div>

              <div className="mt-3 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                <img
                  src={CAMPAIGN_INFO.mentorsBannerImage}
                  alt="CPR Medical Academy Official Mentors Panel Board"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  CMCH, DMCH &amp; BCS Cadre Mentors
                </div>
                <button
                  onClick={() => {
                    setShowMentorBannerModal(false);
                    onRegisterClick();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  Register Now (৳ 1199)
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
