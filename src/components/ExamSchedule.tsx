import React, { useState } from 'react';
import { EXAM_SCHEDULE, CAMPAIGN_INFO } from '../data/courseData';
import { Calendar, Clock, Award, Filter, ArrowRight, CheckCircle2, Image as ImageIcon, MapPin, Phone } from 'lucide-react';

interface ExamScheduleProps {
  onRegisterClick: () => void;
}

export const ExamSchedule: React.FC<ExamScheduleProps> = ({ onRegisterClick }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'subject' | 'grand'>('all');
  const [showPosterModal, setShowPosterModal] = useState(false);

  const filteredExams = EXAM_SCHEDULE.filter((exam) => {
    if (activeFilter === 'subject') return exam.type === 'Subject Final';
    if (activeFilter === 'grand') return exam.type === 'Grand Mock';
    return true;
  });

  return (
    <section id="routine" className="py-20 bg-slate-50/70 border-t border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100/70 px-3 py-1 rounded-full mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Official Special BCS Exam Schedule</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Subject Finals &amp; Grand Mock Routine
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Strictly configured per CPR Medical Academy curriculum (8 Subject Finals covering General &amp; Medical sciences + 2 Full Syllabus Grand Mocks).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
            {/* View Official Poster Button */}
            <button
              onClick={() => setShowPosterModal(true)}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-900 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ImageIcon className="w-4 h-4 text-blue-700" />
              <span>View Official Poster</span>
            </button>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-xs">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All (10)
              </button>
              <button
                onClick={() => setActiveFilter('subject')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'subject'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Subject Finals (8)
              </button>
              <button
                onClick={() => setActiveFilter('grand')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeFilter === 'grand'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Grand Mocks (2)
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/90 border-b border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Date</th>
                  <th className="py-3.5 px-4 sm:px-6">Day &amp; Time</th>
                  <th className="py-3.5 px-4 sm:px-6">Exam &amp; Subject / Topic</th>
                  <th className="py-3.5 px-3 sm:px-4 text-center">Questions</th>
                  <th className="py-3.5 px-3 sm:px-4 text-center">Marks</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredExams.map((item) => {
                  const isGrand = item.type === 'Grand Mock';
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-sky-50/60 transition-colors ${
                        isGrand ? 'bg-red-50/20' : ''
                      }`}
                    >
                      {/* Date */}
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 whitespace-nowrap font-mono-numbers">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-600" />
                          <span>{item.date}</span>
                        </div>
                      </td>

                      {/* Day & Time */}
                      <td className="py-4 px-4 sm:px-6 text-slate-700 font-semibold whitespace-nowrap">
                        <div>{item.day}</div>
                        <div className="text-[11px] font-bold text-blue-900 font-mono-numbers flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyan-600" />
                          <span>{item.time || '3:00 PM'}</span>
                        </div>
                      </td>

                      {/* Topic */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isGrand
                                  ? 'bg-red-100 text-red-900 border border-red-300'
                                  : 'bg-cyan-100 text-cyan-900 border border-cyan-200'
                              }`}
                            >
                              {item.title}
                            </span>
                          </div>
                          <div className="font-semibold text-slate-900 text-sm">
                            {item.subjects}
                          </div>
                        </div>
                      </td>

                      {/* Total Questions */}
                      <td className="py-4 px-3 sm:px-4 text-center font-mono-numbers text-slate-600 whitespace-nowrap">
                        {item.totalQuestions} MCQs
                      </td>

                      {/* Marks */}
                      <td className="py-4 px-3 sm:px-4 text-center font-black font-mono-numbers text-blue-900 whitespace-nowrap">
                        {item.marks}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <button
                          onClick={onRegisterClick}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-cyan-600 hover:text-white text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Enroll
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer info banner with Chittagong center info */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>
                <strong>ভেন্যু:</strong> মতি টাওয়ার (৫ম তলা), গুলজার মোড়, চকবাজার, চট্টগ্রাম (EBL ব্যাংকের ATM বুথের ডান পাশে লিফটের ৪ তলা)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-blue-900 bg-blue-100/90 px-2.5 py-1 rounded">
                পরীক্ষার সময়: বিকাল ৩:০০ টা (3:00 PM)
              </span>
              <span className="font-semibold text-cyan-800">
                হটলাইন: {CAMPAIGN_INFO.contactPhone}, {CAMPAIGN_INFO.contactPhone2}
              </span>
              <button
                onClick={onRegisterClick}
                className="text-red-700 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>ভর্তি ফি ৳১১৯৯ (১ম ২০ জন)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal for Official Schedule Poster */}
        {showPosterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative">
              <button
                onClick={() => setShowPosterModal(false)}
                className="absolute top-4 right-4 bg-slate-900 text-white p-1.5 rounded-full hover:bg-slate-700 transition-colors z-10 cursor-pointer"
                aria-label="Close poster"
              >
                ✕
              </button>
              
              <div className="text-center pb-3 border-b border-slate-100">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  অফিসিয়াল স্পেশাল বিসিএস রুটিন পোস্টার
                </h3>
                <p className="text-xs text-slate-500">
                  CPR Medical Academy · Centre for Post-Graduation
                </p>
              </div>

              <div className="mt-3 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                <img
                  src={CAMPAIGN_INFO.posterScheduleImage}
                  alt="Special BCS Subject Finals & Grand Mock Official Schedule Poster"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-slate-600">
                  চকবাজার, চট্টগ্রাম ক্যাম্পাস
                </div>
                <button
                  onClick={() => {
                    setShowPosterModal(false);
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
