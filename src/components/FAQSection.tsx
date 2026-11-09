import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the official mark distribution for Special BCS (Health)?",
      a: "The Special BCS examination consists of 200 MCQ marks: 100 Marks in Medical Sciences (Basic & Clinical disciplines) and 100 Marks in General Studies (Bangla 20, English 20, Bangladesh Affairs 20, International Affairs 20, Mental Ability 10, and Mathematical Reasoning 10). Our 5 Grand Mocks strictly replicate this 200-mark format."
    },
    {
      q: "Is negative marking implemented in CPR Medical Academy exams?",
      a: "Yes. Following exact BPSC standards, 0.50 marks are deducted for every incorrect MCQ attempt. This rigorous calibration trains candidates to curb blind guessing and master selective attempting."
    },
    {
      q: "Can intern doctors or doctors outside Dhaka participate online?",
      a: "Yes, absolutely! The exam portal is mobile-optimized and accessible from all 64 districts. Tests remain open for 24 hours on exam days so doctors on hospital duty or emergency shifts can sit at their convenient time."
    },
    {
      q: "What does the ৳ 1499 admission package include?",
      a: "The all-inclusive ৳ 1499 package covers 8 Subject Final Examinations, 2 Full-length Grand Mocks (200 marks each, 3:00 PM), complete question explanation booklets with rationale, All-Bangladesh Merit Ranking, and direct admission into the official WhatsApp cadre guidance group."
    },
    {
      q: "How soon do I receive my Roll Number and batch access?",
      a: "Your Roll Number and printable Candidate Admission Slip are generated immediately upon completing the online admission form with your Transaction ID. You will also be onboarded into the official WhatsApp batch within 6 hours."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-sky-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Candidate Inquiries</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Everything you need to know regarding the Special BCS testing series, negative marking, and registration.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-cyan-800 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-cyan-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
