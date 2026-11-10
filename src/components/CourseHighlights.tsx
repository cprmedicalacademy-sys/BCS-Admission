import React from 'react';
import { BookOpen, FileCheck2, Target, BarChart3, Trophy, Zap, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

interface CourseHighlightsProps {
  onRegisterClick: () => void;
}

export const CourseHighlights: React.FC<CourseHighlightsProps> = ({ onRegisterClick }) => {
  const highlights = [
    {
      icon: BookOpen,
      step: "01",
      title: "Subject-wise Final Examinations",
      description: "8 high-yield subject-wise comprehensive tests covering বাংলা, ইংরেজি, গণিত ও মানসিক দক্ষতা, বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলী এবং Basic & Clinical Medical Sciences.",
      badge: "8 Full Subject Exams",
      tag: "General & Medical Sciences"
    },
    {
      icon: FileCheck2,
      step: "02",
      title: "Full Syllabus Grand Mock Tests",
      description: "2 complete simulation mock examinations adhering 100% to Bangladesh Public Service Commission (BPSC) Special BCS mark distribution (200 Marks).",
      badge: "2 Grand Mocks (200 Marks)",
      tag: "Exact PSC Pattern"
    },
    {
      icon: Target,
      step: "03",
      title: "Exam-Oriented Preparation",
      description: "Curated questions pinpointing previous 39th & 42nd Special BCS repeats, high-frequency clinical pearls, and high-yield topics compiled by experienced BCS Health Cadre officers.",
      badge: "High-Yield Notes Included",
      tag: "Cadre Doctor Analysis"
    },
    {
      icon: BarChart3,
      step: "04",
      title: "Performance Evaluation & Ranklist",
      description: "Comprehensive post-exam analytics with real-time All-Bangladesh Merit Ranking, subject-wise weakness radar, percentile analysis, and negative marking penalty deductions.",
      badge: "Instant Merit List",
      tag: "AI & Statistical Metrics"
    },
    {
      icon: Trophy,
      step: "05",
      title: "Competitive Examination Environment",
      description: "Experience the adrenaline of real examination conditions with strict negative marking (-0.50 marks per incorrect attempt) and strict time countdown timers.",
      badge: "Strict Negative Marking",
      tag: "Real Test Pressure"
    },
    {
      icon: Zap,
      step: "06",
      title: "Post-Exam Discussion & Solutions",
      description: "Every examination is accompanied by an in-depth digital explanation booklet and recorded video review explaining the diagnostic reasoning behind ambiguous options.",
      badge: "Full Solution Booklets",
      tag: "Doubt Clearance"
    }
  ];

  return (
    <section id="course-highlights" className="py-20 bg-white border-t border-sky-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            Academic Framework &amp; Highlights
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed Exclusively for Special BCS (Health) Aspirants
          </h2>
          <p className="text-base text-slate-600">
            A rigorous testing series engineered by top BCS Cadre physicians to calibrate your speed, precision, and confidence under standard BPSC exam conditions.
          </p>
        </div>

        {/* 2-Column Split: Visual Feature Showcase + Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: Visual Marquee Card with Photo */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white p-7 sm:p-9 overflow-hidden relative shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  Cadre Benchmarking
                </span>
                <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs px-2.5 py-1 rounded font-bold">
                  Negative Mark: -0.50
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display leading-tight text-white">
                Master the Art of Eliminating Negative Marking
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                In Special BCS, candidates lose selections not due to lack of knowledge, but due to reckless negative marking in ambiguous clinical MCQs. CPR Medical Academy trains you to distinguish confident attempts from guessing traps.
              </p>

              {/* Photo preview */}
              <div className="relative rounded-xl overflow-hidden aspect-16/10 border border-white/10 shadow-inner">
                <img
                  src="/src/assets/images/cpr_exam_assessment_1794202109921.jpg"
                  alt="Medical Examination preparation and answer sheet"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-semibold text-cyan-200">
                  Standard OMR / CBT Style Format
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Batch Registration Fee</div>
                <div className="text-xl font-bold text-cyan-400 font-mono-numbers">৳ ১৪৯৯ (মূল ভর্তি ফি)</div>
              </div>
              <button
                onClick={onRegisterClick}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Join Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: The 6 Highlight Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-5 bg-slate-50/70 border border-slate-200/80 hover:border-cyan-400 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 font-mono-numbers">
                        {item.step}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-base text-slate-900 group-hover:text-cyan-800 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200/50 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span className="text-cyan-700">{item.badge}</span>
                    <span>{item.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Clear Mid-Page Registration Call-to-Action Banner */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-900 via-blue-900 to-slate-900 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-cyan-950/15">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300">
              <ShieldCheck className="w-4 h-4" />
              <span>BMDC Registered Doctors &amp; Intern Candidates</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-display">
              Ready to Secure Your Name on the Special BCS Cadre Merit List?
            </div>
            <div className="text-xs sm:text-sm text-slate-300 max-w-xl">
              অফলাইন ভর্তি ফি: <strong>৳ ১৪৯৯/-</strong> (অফার সমাপ্ত, ৫৪+ জন ভর্তি) | অনলাইন বিশেষ অফার: <strong>৳ ৫৯৯/-</strong> (মূল ৳ ৭৯৯, ১ম ২০ জনের জন্য)।
            </div>
          </div>

          <button
            onClick={onRegisterClick}
            className="shrink-0 px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            <span>APPLY FOR ADMISSION</span>
            <span className="text-xs font-mono-numbers bg-red-800 px-2 py-0.5 rounded font-bold">অফলাইন ৳ ১৪৯৯ | অনলাইন ৳ ৫৯৯</span>
          </button>
        </div>

      </div>
    </section>
  );
};
