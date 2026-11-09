/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RegistrationFormData } from './types';
import { SEEDED_CANDIDATES } from './data/courseData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CourseHighlights } from './components/CourseHighlights';
import { ExamSchedule } from './components/ExamSchedule';
import { AdmissionForm } from './components/AdmissionForm';
import { MentorsSection } from './components/MentorsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { RegistrationLookupModal } from './components/RegistrationLookupModal';
import { AdminPanelModal } from './components/AdminPanelModal';

export default function App() {
  // Candidate list initialized from localStorage (so new admissions persist) or fallback to seeded list
  const [candidates, setCandidates] = useState<RegistrationFormData[]>(() => {
    try {
      const stored = localStorage.getItem('cpr_admitted_candidates_v3');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse cached candidates', e);
    }
    return SEEDED_CANDIDATES;
  });

  const [selectedCandidate, setSelectedCandidate] = useState<RegistrationFormData | null>(null);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync candidate roster to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cpr_admitted_candidates_v3', JSON.stringify(candidates));
    } catch (e) {
      console.error('Failed to save candidates to localStorage', e);
    }
  }, [candidates]);

  // Smooth scroll to admission form
  const handleRegisterClick = () => {
    setSelectedCandidate(null);
    const element = document.getElementById('admission-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll to routine
  const handleRoutineClick = () => {
    const element = document.getElementById('routine');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When a new registration is submitted (automatically adds to Admin Panel!)
  const handleNewRegistration = (candidate: RegistrationFormData) => {
    setCandidates((prev) => [candidate, ...prev]);
    setSelectedCandidate(candidate);
  };

  // Update candidate status in Admin Panel (e.g. Confirm Seat / Mark Pending)
  const handleUpdateCandidateStatus = (
    rollNumber: string,
    newStatus: 'Confirmed' | 'Pending WhatsApp Confirmation'
  ) => {
    setCandidates((prev) =>
      prev.map((c) => (c.rollNumber === rollNumber ? { ...c, status: newStatus } : c))
    );
    if (selectedCandidate && selectedCandidate.rollNumber === rollNumber) {
      setSelectedCandidate((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Delete candidate from Admin Panel
  const handleDeleteCandidate = (rollNumber: string) => {
    setCandidates((prev) => prev.filter((c) => c.rollNumber !== rollNumber));
    if (selectedCandidate && selectedCandidate.rollNumber === rollNumber) {
      setSelectedCandidate(null);
    }
  };

  // When a candidate is selected to view their official slip
  const handleSelectCandidateToViewSlip = (candidate: RegistrationFormData) => {
    setSelectedCandidate(candidate);
    const element = document.getElementById('admission-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative selection:bg-cyan-500 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar
        onRegisterClick={handleRegisterClick}
        onLookupClick={() => setIsLookupOpen(true)}
        onAdminClick={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onRegisterClick={handleRegisterClick}
          onExploreRoutineClick={handleRoutineClick}
        />

        {/* Course Highlights & Features */}
        <CourseHighlights onRegisterClick={handleRegisterClick} />

        {/* Examination Routine & Schedule */}
        <ExamSchedule onRegisterClick={handleRegisterClick} />

        {/* Online Multi-Step Admission Form */}
        <AdmissionForm
          onSuccessfulRegistration={handleNewRegistration}
          registeredCandidate={selectedCandidate}
          onReset={() => setSelectedCandidate(null)}
        />

        {/* BCS Cadre Mentors & Alumni */}
        <MentorsSection onRegisterClick={handleRegisterClick} />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onRegisterClick={handleRegisterClick}
        onLookupClick={() => setIsLookupOpen(true)}
        onAdminClick={() => setIsAdminOpen(true)}
      />

      {/* Candidate Roll Lookup Modal */}
      <RegistrationLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
        allCandidates={candidates}
        onSelectCandidate={handleSelectCandidateToViewSlip}
      />

      {/* Admin Panel Modal (Pass: 2926, zero hints) */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        candidates={candidates}
        onUpdateCandidateStatus={handleUpdateCandidateStatus}
        onDeleteCandidate={handleDeleteCandidate}
        onSelectCandidateToViewSlip={handleSelectCandidateToViewSlip}
      />

      {/* Mobile Floating Sticky CTA (respecting 15% mobile sticky cap per §1.I) */}
      <aside aria-label="Quick Registration" className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-white/95 backdrop-blur-md border-t border-sky-100 shadow-xl flex items-center justify-between gap-3 no-print">
        <div className="pl-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Special BCS (১ম ২০ জন)
          </div>
          <div className="text-sm font-black text-blue-950 font-mono-numbers">
            ৳ 1199 <span className="text-[10px] text-slate-400 line-through font-normal">৳1499</span>
          </div>
        </div>

        <button
          onClick={handleRegisterClick}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
        >
          Register Now · ৳1199
        </button>
      </aside>

    </div>
  );
}
