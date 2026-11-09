import React, { useState } from 'react';
import { RegistrationFormData } from '../types';
import {
  Lock,
  Unlock,
  X,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Download,
  Printer,
  FileText,
  Phone,
  MessageCircle,
  Trash2,
  Plus,
  RefreshCw,
  CreditCard,
  Banknote,
  Shield,
  Eye,
  EyeOff,
  Camera
} from 'lucide-react';
import { CprLogo } from './CprLogo';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: RegistrationFormData[];
  onUpdateCandidateStatus: (rollNumber: string, newStatus: 'Confirmed' | 'Pending WhatsApp Confirmation') => void;
  onDeleteCandidate: (rollNumber: string) => void;
  onSelectCandidateToViewSlip: (candidate: RegistrationFormData) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  candidates,
  onUpdateCandidateStatus,
  onDeleteCandidate,
  onSelectCandidateToViewSlip,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [adminPreviewImage, setAdminPreviewImage] = useState<{ src: string; title: string } | null>(null);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'confirmed' | 'bkash' | 'cash'>('all');

  if (!isOpen) return null;

  // Handle Login Authentication (Pass: 2926, strictly no hints in UI)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === '2926') {
      setIsAuthenticated(true);
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError(false);
  };

  // Filtered Candidates
  const filteredCandidates = candidates.filter((c) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      c.fullName.toLowerCase().includes(term) ||
      c.whatsappNumber.includes(term) ||
      (c.bmdcNumber && c.bmdcNumber.toLowerCase().includes(term)) ||
      (c.rollNumber && c.rollNumber.toLowerCase().includes(term)) ||
      (c.registrationId && c.registrationId.toLowerCase().includes(term)) ||
      (c.transactionId && c.transactionId.toLowerCase().includes(term)) ||
      (c.cashReceivedBy && c.cashReceivedBy.toLowerCase().includes(term));

    if (!matchesSearch) return false;

    if (filterMode === 'pending') {
      return c.status === 'Pending WhatsApp Confirmation';
    }
    if (filterMode === 'confirmed') {
      return c.status === 'Confirmed';
    }
    if (filterMode === 'bkash') {
      return c.paymentMethod === 'bKash (Online)' || (c.paymentMethod as string) === 'bKash';
    }
    if (filterMode === 'cash') {
      return c.paymentMethod === 'Cash (Campus / Offline)';
    }

    return true;
  });

  // Calculate Metrics
  const totalCount = candidates.length;
  const confirmedCount = candidates.filter((c) => c.status === 'Confirmed').length;
  const pendingCount = totalCount - confirmedCount;
  const totalRevenue = candidates.reduce((sum, c) => sum + (c.amount || 1499), 0);
  const bkashCount = candidates.filter(
    (c) => c.paymentMethod === 'bKash (Online)' || (c.paymentMethod as string) === 'bKash'
  ).length;
  const cashCount = candidates.filter((c) => c.paymentMethod === 'Cash (Campus / Offline)').length;

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Roll Number',
      'Registration ID',
      'Full Name',
      'WhatsApp Number',
      'Alt Mobile',
      'Email',
      'BMDC Number',
      'Medical College',
      'Passing Year',
      'Exam Mode',
      'Payment Method',
      'bKash TrxID',
      'Sender Number',
      'Cash Received By',
      'Amount',
      'Date',
      'Status'
    ];

    const rows = candidates.map((c) => [
      c.rollNumber || '',
      c.registrationId || '',
      `"${c.fullName.replace(/"/g, '""')}"`,
      c.whatsappNumber || '',
      c.altMobileNumber || '',
      c.email || '',
      c.bmdcNumber || 'N/A',
      `"${c.medicalCollege.replace(/"/g, '""')}"`,
      c.passingYear || '',
      c.examMode || '',
      c.paymentMethod || '',
      c.transactionId || '',
      c.senderNumber || '',
      c.cashReceivedBy || '',
      c.amount || 1499,
      c.registrationDate || '',
      c.status || 'Confirmed'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CPR_Special_BCS_Candidates_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-6xl w-full max-h-[92vh] flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                <span>CPR MEDICAL ACADEMY</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-600 px-2 py-0.5 rounded text-white">
                  Admin Panel
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Special BCS Candidate Roster &amp; Payment Verification
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 1. PASSWORD AUTHENTICATION SCREEN (Strictly no hints) */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center max-w-md mx-auto w-full my-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shadow-inner">
              <Lock className="w-8 h-8 text-blue-950" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Admin Authentication
              </h3>
              <p className="text-xs text-slate-500">
                Please enter your administrator passkey to access the candidate list.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  required
                  placeholder="Enter Passkey"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-center text-base tracking-widest font-mono text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                    authError
                      ? 'border-red-500 focus:ring-red-400/30 bg-red-50/20'
                      : 'border-slate-300 focus:border-cyan-600 focus:ring-cyan-600/20 bg-slate-50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <p className="text-xs text-red-600 font-semibold animate-shake">
                  Access denied. Incorrect passkey.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Admin Panel</span>
              </button>
            </form>

            <div className="text-[11px] text-slate-400">
              CPR Medical Academy · Center for Post-Graduation
            </div>
          </div>
        ) : (
          /* 2. AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6 space-y-5 bg-slate-50/60">
            
            {/* KPI Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Total Admitted
                </div>
                <div className="text-xl sm:text-2xl font-black font-mono-numbers text-slate-900 mt-1">
                  {totalCount}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Registered doctors
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  Confirmed Seats
                </div>
                <div className="text-xl sm:text-2xl font-black font-mono-numbers text-emerald-700 mt-1">
                  {confirmedCount}
                </div>
                <div className="text-[10px] text-emerald-600 mt-0.5">
                  Verified Candidates
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                  Pending Verification
                </div>
                <div className="text-xl sm:text-2xl font-black font-mono-numbers text-amber-700 mt-1">
                  {pendingCount}
                </div>
                <div className="text-[10px] text-amber-600 mt-0.5">
                  Awaiting WhatsApp
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] font-bold text-pink-600 uppercase tracking-wider">
                  Payment Channels
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-2 space-y-0.5">
                  <div>bKash: <strong className="font-mono">{bkashCount}</strong></div>
                  <div>Cash: <strong className="font-mono">{cashCount}</strong></div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                <div className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">
                  Total Collection
                </div>
                <div className="text-xl sm:text-2xl font-black font-mono-numbers text-blue-950 mt-1">
                  ৳ {totalRevenue.toLocaleString()}
                </div>
                <div className="text-[10px] text-blue-700 mt-0.5">
                  @ ৳ 1499 per head
                </div>
              </div>
            </div>

            {/* Filter Bar & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
              
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search by Name, Roll, WhatsApp, TrxID, Cash Receiver..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20"
                />
              </div>

              {/* Segmented Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    filterMode === 'all'
                      ? 'bg-blue-950 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  All ({totalCount})
                </button>
                <button
                  onClick={() => setFilterMode('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    filterMode === 'pending'
                      ? 'bg-amber-600 text-white'
                      : 'text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setFilterMode('confirmed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    filterMode === 'confirmed'
                      ? 'bg-emerald-700 text-white'
                      : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  Confirmed ({confirmedCount})
                </button>
                <button
                  onClick={() => setFilterMode('bkash')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    filterMode === 'bkash'
                      ? 'bg-pink-600 text-white'
                      : 'text-pink-700 hover:bg-pink-50'
                  }`}
                >
                  bKash ({bkashCount})
                </button>
                <button
                  onClick={() => setFilterMode('cash')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    filterMode === 'cash'
                      ? 'bg-emerald-800 text-white'
                      : 'text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  Cash ({cashCount})
                </button>

                <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto sm:ml-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

            </div>

            {/* Candidate Table */}
            <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-3.5 whitespace-nowrap">Roll &amp; Reg ID</th>
                      <th className="py-3 px-3.5">Candidate Name</th>
                      <th className="py-3 px-3.5">Contact (WhatsApp)</th>
                      <th className="py-3 px-3.5">Medical College</th>
                      <th className="py-3 px-3.5">Payment Mode &amp; Info</th>
                      <th className="py-3 px-3.5 text-center">Seat Status</th>
                      <th className="py-3 px-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCandidates.length > 0 ? (
                      filteredCandidates.map((candidate) => {
                        const isConfirmed = candidate.status === 'Confirmed';
                        const isBkash =
                          candidate.paymentMethod === 'bKash (Online)' ||
                          (candidate.paymentMethod as string) === 'bKash';

                        return (
                          <tr
                            key={candidate.rollNumber || candidate.whatsappNumber}
                            className={`hover:bg-sky-50/50 transition-colors ${
                              isConfirmed ? 'bg-white' : 'bg-amber-50/20'
                            }`}
                          >
                            {/* Roll & Reg ID */}
                            <td className="py-3 px-3.5 whitespace-nowrap font-mono">
                              <div className="font-black text-blue-950 text-sm">
                                {candidate.rollNumber}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {candidate.registrationId}
                              </div>
                            </td>

                            {/* Full Name & BMDC */}
                            <td className="py-3 px-3.5">
                              <div className="font-bold text-slate-900">
                                {candidate.fullName}
                              </div>
                              <div className="text-[11px] font-mono text-cyan-800">
                                {candidate.bmdcNumber ? `BMDC: ${candidate.bmdcNumber}` : 'Intern / Not Provided'}
                              </div>
                            </td>

                            {/* WhatsApp & Email */}
                            <td className="py-3 px-3.5 whitespace-nowrap">
                              <div className="font-semibold text-slate-800 font-mono flex items-center gap-1.5">
                                <Phone className="w-3 h-3 text-emerald-600" />
                                <span>{candidate.whatsappNumber}</span>
                              </div>
                              {candidate.email && (
                                <div className="text-[10px] text-slate-400 truncate max-w-xs">
                                  {candidate.email}
                                </div>
                              )}
                            </td>

                            {/* Medical College & Passing Year */}
                            <td className="py-3 px-3.5">
                              <div className="font-medium text-slate-800 truncate max-w-xs">
                                {candidate.medicalCollege}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                Passing: {candidate.passingYear} · {candidate.examMode}
                              </div>
                            </td>

                            {/* Payment Info */}
                            <td className="py-3 px-3.5">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    isBkash
                                      ? 'bg-pink-100 text-pink-900 border border-pink-200'
                                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                  }`}
                                >
                                  {isBkash ? 'bKash' : 'Cash'}
                                </span>
                                <span className="font-bold text-slate-900 font-mono">
                                  ৳ {candidate.amount || 1499}
                                </span>
                              </div>

                              {isBkash ? (
                                <div className="text-[10px] font-mono text-slate-500 mt-0.5 space-y-0.5">
                                  {candidate.transactionId && (
                                    <div>
                                      TrxID: <strong className="text-slate-800">{candidate.transactionId}</strong>
                                    </div>
                                  )}
                                  {candidate.senderNumber && <div>প্রেরক: {candidate.senderNumber}</div>}
                                  {candidate.paymentScreenshot && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setAdminPreviewImage({
                                          src: candidate.paymentScreenshot!,
                                          title: `Dr. ${candidate.fullName} - বিকাশ পেমেন্ট স্ক্রিনশট (Roll: ${candidate.rollNumber})`,
                                        })
                                      }
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-pink-100 hover:bg-pink-200 text-pink-900 font-sans font-bold text-[10px] cursor-pointer transition-colors shadow-2xs mt-0.5"
                                    >
                                      <Camera className="w-3 h-3 text-pink-700" />
                                      <span>📷 স্ক্রিনশট দেখুন</span>
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className="text-[10px] text-slate-600 mt-0.5">
                                  গ্রহীতা: <strong className="text-slate-800">{candidate.cashReceivedBy || 'Office'}</strong>
                                  {candidate.cashReceiptNo && ` (রশিদ নং: ${candidate.cashReceiptNo})`}
                                </div>
                              )}
                            </td>

                            {/* Seat Status Toggle */}
                            <td className="py-3 px-3.5 text-center whitespace-nowrap">
                              {isConfirmed ? (
                                <button
                                  onClick={() =>
                                    onUpdateCandidateStatus(
                                      candidate.rollNumber!,
                                      'Pending WhatsApp Confirmation'
                                    )
                                  }
                                  title="Click to revert to pending"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[10px] cursor-pointer hover:bg-emerald-200 transition-colors"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                  <span>Confirmed</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    onUpdateCandidateStatus(candidate.rollNumber!, 'Confirmed')
                                  }
                                  title="Click to confirm seat"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] cursor-pointer hover:bg-amber-200 transition-colors animate-pulse"
                                >
                                  <Clock className="w-3 h-3 text-amber-700" />
                                  <span>Confirm Seat</span>
                                </button>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-3.5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* WhatsApp Candidate */}
                                <a
                                  href={`https://wa.me/88${candidate.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Dr.%20${encodeURIComponent(candidate.fullName)},%20Greetings%20from%20CPR%20Medical%20Academy.%20Regarding%20your%20Special%20BCS%20Registration%20(Roll:%20${candidate.rollNumber}).`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                                  title="Chat with doctor on WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>

                                {/* View Slip */}
                                <button
                                  onClick={() => {
                                    onSelectCandidateToViewSlip(candidate);
                                    onClose();
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                  title="View official slip"
                                >
                                  <FileText className="w-3 h-3" />
                                  <span>Slip</span>
                                </button>

                                {/* Delete Candidate */}
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete ${candidate.fullName} (Roll: ${candidate.rollNumber})?`)) {
                                      onDeleteCandidate(candidate.rollNumber!);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-400">
                          No candidates matching your filter or search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-3 bg-slate-100/70 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  Showing <strong>{filteredCandidates.length}</strong> of <strong>{candidates.length}</strong> registered candidates.
                </div>
                <div className="font-medium text-slate-700">
                  CPR Medical Academy · All Rights Reserved
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Admin Screenshot Zoom Modal */}
      {adminPreviewImage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col relative">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2 truncate pr-2">
                <Camera className="w-4 h-4 text-pink-600 shrink-0" />
                <span className="truncate">{adminPreviewImage.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setAdminPreviewImage(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 flex items-center justify-center bg-slate-950/5">
              <img
                src={adminPreviewImage.src}
                alt="bKash Proof Admin View"
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-md border border-slate-200"
              />
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => setAdminPreviewImage(null)}
                className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
