import React, { useState } from 'react';
import { RegistrationFormData } from '../types';
import { Search, X, CheckCircle2, AlertCircle, FileText, ArrowRight, Stethoscope } from 'lucide-react';

interface RegistrationLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  allCandidates: RegistrationFormData[];
  onSelectCandidate: (candidate: RegistrationFormData) => void;
}

export const RegistrationLookupModal: React.FC<RegistrationLookupModalProps> = ({
  isOpen,
  onClose,
  allCandidates,
  onSelectCandidate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<RegistrationFormData[] | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;

    const matched = allCandidates.filter((c) => {
      const matchBmdc = c.bmdcNumber ? c.bmdcNumber.toLowerCase().includes(term) : false;
      const matchPhone = c.whatsappNumber.includes(term);
      const matchRoll = c.rollNumber ? c.rollNumber.toLowerCase().includes(term) : false;
      const matchName = c.fullName.toLowerCase().includes(term);
      return matchBmdc || matchPhone || matchRoll || matchName;
    });

    setSearchResult(matched);
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            <span>Candidate Verification</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            Verify Registration &amp; Download Slip
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Enter your BMDC Registration Number, WhatsApp phone, or Roll Number to retrieve your official admission card.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="space-y-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Stethoscope className="w-4 h-4" />
            </div>
            <input
              type="text"
              autoFocus
              placeholder="e.g. A-92834 or 01711223344 or 241012"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-24 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono-numbers"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Search</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Try pre-registered demo doctors:</span>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('A-92834');
              }}
              className="text-cyan-700 underline font-mono cursor-pointer"
            >
              A-92834
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('A-104921');
              }}
              className="text-cyan-700 underline font-mono cursor-pointer"
            >
              A-104921
            </button>
          </div>
        </form>

        {/* Results Area */}
        {searched && (
          <div className="space-y-3 max-h-72 overflow-y-auto pt-2 border-t border-slate-100">
            {searchResult && searchResult.length > 0 ? (
              searchResult.map((c) => (
                <div
                  key={c.rollNumber || c.whatsappNumber}
                  className="p-4 rounded-xl border border-sky-100 bg-sky-50/50 hover:bg-sky-50 flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {c.fullName}
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        Confirmed
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 flex items-center gap-2 font-mono-numbers">
                      <span>Roll: <strong>{c.rollNumber}</strong></span>
                      <span>·</span>
                      <span>BMDC: <strong>{c.bmdcNumber || 'Intern / N/A'}</strong></span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {c.medicalCollege} ({c.batchShift})
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectCandidate(c);
                      onClose();
                    }}
                    className="shrink-0 px-3 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Slip</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-slate-500 space-y-2">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <div className="text-sm font-semibold">No Registered Record Found</div>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Please verify the BMDC number or phone number entered. If you have not registered yet, proceed to registration.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
