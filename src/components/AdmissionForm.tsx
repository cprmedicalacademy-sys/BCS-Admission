import React, { useState } from 'react';
import { RegistrationFormData } from '../types';
import { PAYMENT_CHANNELS, MEDICAL_COLLEGES, CAMPAIGN_INFO } from '../data/courseData';
import {
  User,
  Phone,
  Mail,
  Stethoscope,
  Building2,
  Calendar,
  CreditCard,
  Banknote,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  Printer,
  Download,
  Share2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  QrCode,
  ShieldCheck,
  RotateCcw,
  Clock,
  Send,
  MessageCircle
} from 'lucide-react';
import { CprLogo } from './CprLogo';

interface AdmissionFormProps {
  onSuccessfulRegistration: (candidate: RegistrationFormData) => void;
  registeredCandidate?: RegistrationFormData | null;
  onReset?: () => void;
}

export const AdmissionForm: React.FC<AdmissionFormProps> = ({
  onSuccessfulRegistration,
  registeredCandidate,
  onReset
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(registeredCandidate ? 3 : 1);

  // Form State
  const [formData, setFormData] = useState<RegistrationFormData>(() => {
    if (registeredCandidate) return registeredCandidate;
    return {
      fullName: '',
      whatsappNumber: '',
      altMobileNumber: '',
      email: '',
      bmdcNumber: '',
      medicalCollege: '',
      passingYear: '2024',
      program: 'Special BCS Subject Finals & Grand Mock Program',
      examTime: CAMPAIGN_INFO.examTime, // 3:00 PM
      batchShift: 'Day Batch (3:00 PM)',
      examMode: 'Offline Campus (Chittagong Center)',
      notes: '',
      paymentMethod: 'bKash (Online)',
      senderNumber: '',
      transactionId: '',
      cashReceivedBy: '',
      cashReceiptNo: '',
      amount: CAMPAIGN_INFO.offerPrice,
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [completedRecord, setCompletedRecord] = useState<RegistrationFormData | null>(
    registeredCandidate || null
  );

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.whatsappNumber.trim()) {
      errs.whatsappNumber = 'WhatsApp Number is required';
    } else if (formData.whatsappNumber.replace(/\D/g, '').length < 10) {
      errs.whatsappNumber = 'Please enter a valid 11-digit phone number';
    }

    // BMDC Registration Number is optional per user request

    if (!formData.medicalCollege.trim()) {
      errs.medicalCollege = 'Medical College is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation: Check bKash or Cash inputs
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    
    if (formData.paymentMethod === 'bKash (Online)') {
      if (!formData.senderNumber?.trim()) {
        errs.senderNumber = 'বিকাশ প্রেরকের মোবাইল নম্বর আবশ্যক (Sender Number)';
      }
      if (!formData.transactionId?.trim()) {
        errs.transactionId = 'বিকাশ Transaction ID (TrxID) আবশ্যক';
      } else if (formData.transactionId.trim().length < 5) {
        errs.transactionId = 'সঠিক TrxID লিখুন (কমপক্ষে ৫ অক্ষর)';
      }
    } else if (formData.paymentMethod === 'Cash (Campus / Offline)') {
      if (!formData.cashReceivedBy?.trim()) {
        errs.cashReceivedBy = 'টাকা যিনি গ্রহণ করেছেন তার নাম লিখুন (e.g. Dr. Sakib / Dr. Saimul / Office)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Step 1 Next
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: document.getElementById('admission-form-section')?.offsetTop ?? 0, behavior: 'smooth' });
    }
  };

  // Handle Step 2 Final Submit
  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      const generatedRoll = Math.floor(240000 + Math.random() * 9000).toString();
      const generatedRegId = `CPR-W24-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRecord: RegistrationFormData = {
        ...formData,
        registrationId: generatedRegId,
        rollNumber: generatedRoll,
        registrationDate: new Date().toISOString().split('T')[0],
        status: 'Pending WhatsApp Confirmation'
      };

      setCompletedRecord(newRecord);
      onSuccessfulRegistration(newRecord);
      setStep(3);
      window.scrollTo({ top: document.getElementById('admission-form-section')?.offsetTop ?? 0, behavior: 'smooth' });
    }
  };

  // Print helper
  const handlePrint = () => {
    window.print();
  };

  // Pre-filled WhatsApp Confirmation message
  const getWhatsAppConfirmationUrl = () => {
    if (!completedRecord) return '#';
    const paymentDetail = completedRecord.paymentMethod === 'bKash (Online)'
      ? `বিকাশ অনলাইন (TrxID: ${completedRecord.transactionId}, প্রেরক নম্বর: ${completedRecord.senderNumber})`
      : `ক্যাশ পেমেন্ট (টাকা গ্রহণকারী: ${completedRecord.cashReceivedBy})`;

    const message = `আসসালামু আলাইকুম CPR Medical Academy,
আমি স্পেশাল বিসিএস (সাবজেক্ট ফাইনাল ও গ্র্যান্ড মক) কোর্সে রেজিস্ট্রেশন করেছি।

• ক্যান্ডিডেট নাম: ${completedRecord.fullName}
• নির্ধারিত রোল নম্বর: ${completedRecord.rollNumber}
• রেজিস্ট্রেশন আইডি: ${completedRecord.registrationId}
• হোয়াটসঅ্যাপ নম্বর: ${completedRecord.whatsappNumber}
• মেডিকেল কলেজ: ${completedRecord.medicalCollege}
• বিএমডিসি রেজি: ${completedRecord.bmdcNumber || 'ইন্টার্ন / প্রযোজ্য নয়'}
• পরীক্ষার সময়: ${completedRecord.examTime} (বিকাল ৩:০০ টা)
• পরীক্ষার ভেন্যু/মোড: ${completedRecord.examMode}
• পেমেন্ট মেথড: ${paymentDetail}
• জমা দেওয়া ফি: ৳ ${completedRecord.amount}/-

আমার ক্যান্ডিডেট স্লিপটি যাচাই করে আমার সিট নিশ্চিত (Seat Confirmed) করুন। ধন্যবাদ!`;

    return `https://wa.me/88${CAMPAIGN_INFO.verificationWhatsappRaw}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="admission-form-section" className="py-20 bg-gradient-to-b from-sky-50/50 via-slate-50 to-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Container Header */}
        <div className="text-center space-y-3 mb-10 no-print">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Official Online Admission Portal</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Special BCS Admission Registration
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Fill in your doctor details, choose online bKash or Cash payment, and generate your Candidate Admission Slip.
          </p>

          {/* Stepper Wizard Indicator */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 pt-6 max-w-md mx-auto">
            <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-blue-900' : 'text-slate-400'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono-numbers text-xs ${
                step > 1 ? 'bg-emerald-600 text-white' : step === 1 ? 'bg-blue-900 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
              }`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </span>
              <span>Personal Info</span>
            </div>

            <div className={`h-0.5 w-8 sm:w-12 ${step >= 2 ? 'bg-blue-900' : 'bg-slate-200'}`} />

            <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-blue-900' : 'text-slate-400'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono-numbers text-xs ${
                step > 2 ? 'bg-emerald-600 text-white' : step === 2 ? 'bg-blue-900 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
              }`}>
                {step > 2 ? <Check className="w-4 h-4" /> : '2'}
              </span>
              <span>Admission &amp; Payment</span>
            </div>

            <div className={`h-0.5 w-8 sm:w-12 ${step >= 3 ? 'bg-blue-900' : 'bg-slate-200'}`} />

            <div className={`flex items-center gap-2 text-xs font-bold ${step === 3 ? 'text-emerald-700' : 'text-slate-400'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono-numbers text-xs ${
                step === 3 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
              }`}>
                3
              </span>
              <span>Candidate Slip</span>
            </div>
          </div>
        </div>

        {/* STEP 1: PERSONAL INFORMATION */}
        {step === 1 && (
          <div className="bg-white rounded-3xl border border-sky-100 shadow-xl p-6 sm:p-10 relative overflow-hidden">
            <div className="border-b border-slate-100 pb-5 mb-8">
              <h3 className="text-xl font-bold font-display text-slate-900">
                Step 1: Doctor's Personal Information
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Please provide your authentic details for examination portal registration &amp; result merit list.
              </p>
            </div>

            <form onSubmit={handleStep1Submit} className="space-y-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name (with Dr. Title) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Md. Ashraful Alam"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName
                        ? 'border-red-400 focus:ring-red-400/30'
                        : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* WhatsApp Number & Alternative Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX (Active WhatsApp)"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                        errors.whatsappNumber
                          ? 'border-red-400 focus:ring-red-400/30'
                          : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20'
                      }`}
                    />
                  </div>
                  {errors.whatsappNumber ? (
                    <p className="text-xs text-red-500 mt-1">{errors.whatsappNumber}</p>
                  ) : (
                    <p className="text-[11px] text-slate-500 mt-1">
                      Exam notices, schedule updates &amp; question solve PDFs will be shared here.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Alternative Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      placeholder="Optional backup phone number"
                      value={formData.altMobileNumber}
                      onChange={(e) => setFormData({ ...formData, altMobileNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address & BMDC Registration Number (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      placeholder="doctor.bcs@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-red-400 focus:ring-red-400/30'
                          : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    BMDC Registration Number <span className="text-slate-400 font-normal lowercase">(optional / ঐচ্ছিক)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. A-95420 or leave blank if intern"
                      value={formData.bmdcNumber || ''}
                      onChange={(e) => setFormData({ ...formData, bmdcNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono-numbers"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    ইন্টার্ন চিকিৎসক বা রেজিষ্ট্রেশন নম্বর না থাকলে খালি রাখুন।
                  </p>
                </div>
              </div>

              {/* Medical College Name & Passing Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Medical College Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      list="colleges-list"
                      placeholder="Select or enter your Medical College"
                      value={formData.medicalCollege}
                      onChange={(e) => setFormData({ ...formData, medicalCollege: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                        errors.medicalCollege
                          ? 'border-red-400 focus:ring-red-400/30'
                          : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20'
                      }`}
                    />
                    <datalist id="colleges-list">
                      {MEDICAL_COLLEGES.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </div>
                  {errors.medicalCollege && (
                    <p className="text-xs text-red-500 mt-1">{errors.medicalCollege}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    MBBS Passing Year <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <select
                      value={formData.passingYear}
                      onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono-numbers"
                    >
                      <option value="2025">2025 (Intern Doctor)</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018 or Earlier">2018 or Earlier</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-700 to-slate-900 hover:from-cyan-500 hover:to-blue-800 text-white font-bold text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <span>Proceed to Payment (৳ 1199)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* STEP 2: ADMISSION & PAYMENT INFORMATION */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-sky-100 shadow-xl p-6 sm:p-10 relative overflow-hidden">
            <div className="border-b border-slate-100 pb-5 mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-display text-slate-900">
                  Step 2: Admission &amp; Payment Options
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select Online bKash Payment or Cash Payment to generate your candidate slip.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Step 1</span>
              </button>
            </div>

            <form onSubmit={handleStep2Submit} className="space-y-8">
              
              {/* Program Summary & Timing Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-cyan-50/40 to-blue-50/50 border border-cyan-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-2.5 py-0.5 rounded">
                      Special BCS Campaign
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-1 font-display">
                      Special BCS: Subject Finals &amp; Grand Mock Program
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1.5">
                      <span className="flex items-center gap-1 font-bold text-blue-900 bg-blue-100/70 px-2.5 py-0.5 rounded">
                        <Clock className="w-3.5 h-3.5" />
                        <span>পরীক্ষার সময়: বিকাল ৩:০০ টা (3:00 PM)</span>
                      </span>
                      <span>·</span>
                      <span>8 Subject Finals + 2 Grand Mocks</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-xs text-slate-400 line-through font-mono-numbers">
                      ৳ 1499
                    </div>
                    <div className="text-2xl font-black text-blue-900 font-mono-numbers">
                      ৳ 1199/-
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700">
                      ১ম ২০ জনের অফার (Save ৳ 300)
                    </div>
                  </div>
                </div>
              </div>

              {/* Mode & Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Exam Time
                  </label>
                  <div className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-700" />
                    <span>3:00 PM (প্রতি পরীক্ষার দিন বিকাল ৩:০০ টায়)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Exam Participation Mode
                  </label>
                  <select
                    value={formData.examMode}
                    onChange={(e) =>
                      setFormData({ ...formData, examMode: e.target.value as any })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-medium"
                  >
                    <option value="Offline Campus (Chittagong Center)">Offline Campus (চকবাজার মতি টাওয়ার, চট্টগ্রাম)</option>
                    <option value="Online Exam Portal (National)">Online Exam Portal (All Bangladesh)</option>
                  </select>
                </div>
              </div>

              {/* PAYMENT SYSTEM: 2 OPTIONS (Online bKash OR Cash) */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Payment System (পেমেন্ট পদ্ধতি নির্বাচন করুন) <span className="text-red-500">*</span>
                </label>

                {/* 2-Option Radio Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option 1: Online bKash */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'bKash (Online)' })}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      formData.paymentMethod === 'bKash (Online)'
                        ? 'border-pink-600 bg-pink-50/50 ring-2 ring-pink-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      bKash
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Online Payment (bKash)</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Send Money to +880 1675-226753
                      </div>
                      <div className="text-[11px] font-semibold text-pink-700 mt-1">
                        ৳ ১১৯৯ (Send Money &amp; TrxID)
                      </div>
                    </div>
                  </button>

                  {/* Option 2: Cash Payment */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'Cash (Campus / Offline)' })}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      formData.paymentMethod === 'Cash (Campus / Offline)'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        Cash Payment (ক্যাশ পেমেন্ট)
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        চকবাজার ক্যাম্পাসে বা মেন্টরের কাছে জমা
                      </div>
                      <div className="text-[11px] font-semibold text-emerald-700 mt-1">
                        টাকা গ্রহণকারীর নাম ইনপুট দিন
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* CONDITIONAL PAYMENT SECTION: 1) bKash Details */}
              {formData.paymentMethod === 'bKash (Online)' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  {/* bKash Instructions Box */}
                  <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs text-pink-300 font-semibold">
                      <span>bKash Personal Send Money Instructions</span>
                      <span className="font-mono-numbers bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700 text-cyan-200">
                        Payable: ৳ 1199 (১ম ২০ জন)
                      </span>
                    </div>

                    {/* Account Number with Copy Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-800/90 rounded-xl border border-slate-700">
                      <div>
                        <div className="text-[11px] text-slate-400">bKash Personal Number:</div>
                        <div className="text-lg font-mono font-bold text-white tracking-wider text-pink-300">
                          +880 1675-226753
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy('01675226753', 'number')}
                        className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
                      >
                        {copiedKey === 'number' ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied 01675226753!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy bKash Number</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-xs text-slate-300 leading-relaxed space-y-1">
                      <p>১. আপনার বিকাশ অ্যাপ ওপেন করুন অথবা *247# ডায়াল করুন।</p>
                      <p>২. <strong>Send Money</strong> সিলেক্ট করে নম্বর দিন: <strong className="text-pink-300 font-mono">01675226753</strong></p>
                      <p>৩. টাকার পরিমাণ দিন: <strong className="text-white">1199</strong> (রেফারেন্স: <span className="text-cyan-300">BCS</span>)</p>
                      <p>৪. সফলভাবে সেন্ড মানি করার পর ফিরতি SMS-এর Transaction ID (TrxID) নিচে দিন।</p>
                    </div>
                  </div>

                  {/* bKash Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Sender Mobile Number (বিকাশ প্রেরক নম্বর) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 017XXXXXXXX (যে নম্বর থেকে টাকা পাঠিয়েছেন)"
                        value={formData.senderNumber || ''}
                        onChange={(e) => setFormData({ ...formData, senderNumber: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all font-mono-numbers ${
                          errors.senderNumber
                            ? 'border-red-400 focus:ring-red-400/30'
                            : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20'
                        }`}
                      />
                      {errors.senderNumber && (
                        <p className="text-xs text-red-500 mt-1">{errors.senderNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Transaction ID (TrxID) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BK9X8291Q বা 9J283H49K"
                        value={formData.transactionId || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, transactionId: e.target.value.toUpperCase() })
                        }
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 uppercase tracking-wider focus:outline-none focus:ring-2 transition-all font-mono-numbers ${
                          errors.transactionId
                            ? 'border-red-400 focus:ring-red-400/30'
                            : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500/20'
                        }`}
                      />
                      {errors.transactionId && (
                        <p className="text-xs text-red-500 mt-1">{errors.transactionId}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* CONDITIONAL PAYMENT SECTION: 2) Cash Payment Details */}
              {formData.paymentMethod === 'Cash (Campus / Offline)' && (
                <div className="space-y-5 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <Banknote className="w-5 h-5 text-emerald-700" />
                    <span>ক্যাশ পেমেন্ট ভেরিফিকেশন (Cash Received Information)</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    চকবাজার মতি টাওয়ার ক্যাম্পাসে বা আমাদের কোনো সম্মানিত মেন্টর/প্রতিনিধির নিকট সরাসরি <strong>৳ ১১৯৯/-</strong> টাকা ক্যাশ জমা দিয়ে থাকলে যিনি টাকা গ্রহণ করেছেন তার নাম লিখুন।
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        টাকা গ্রহণকারীর নাম (Received By Name) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Md. Saimul Islam / ড. সাকিব / অফিস ডেস্ক"
                        value={formData.cashReceivedBy || ''}
                        onChange={(e) => setFormData({ ...formData, cashReceivedBy: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                          errors.cashReceivedBy
                            ? 'border-red-400 focus:ring-red-400/30'
                            : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-600/20'
                        }`}
                      />
                      {errors.cashReceivedBy ? (
                        <p className="text-xs text-red-600 mt-1">{errors.cashReceivedBy}</p>
                      ) : (
                        <p className="text-[11px] text-slate-500 mt-1">
                          যিনি আপনার ক্যাশ টাকা নিয়েছেন তার নাম লিখুন।
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        ক্যাশ মেমো / মানি রিসিট নম্বর <span className="text-slate-400 font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="রশিদ নম্বর (যদি থাকে)"
                        value={formData.cashReceiptNo || ''}
                        onChange={(e) => setFormData({ ...formData, cashReceiptNo: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all font-mono-numbers"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        অফিস থেকে মানি রিসিট দেওয়া হয়ে থাকলে তার নম্বর দিন।
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Special Note / Remarks */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Additional Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Targetting Special BCS Health Cadre"
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>

              {/* Step 2 Actions */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2 cursor-pointer"
                >
                  ← Edit Personal Information
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-700 to-blue-900 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit &amp; Generate Candidate Slip</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* STEP 3: OFFICIAL CANDIDATE ADMISSION SLIP & WHATSAPP CONFIRMATION */}
        {step === 3 && completedRecord && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* WhatsApp Confirmation Required Alert Bar */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 text-white shadow-lg space-y-3 no-print">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-bold">
                      রেজিস্ট্রেশন সম্পন্ন হয়েছে! সিট কনফার্ম করতে স্লিপটি হোয়াটসঅ্যাপে পাঠান:
                    </div>
                    <div className="text-xs text-emerald-100 mt-0.5">
                      আপনার ক্যান্ডিডেট স্লিপটি আমাদের অফিশিয়াল হোয়াটসঅ্যাপ নম্বরে (<strong>{CAMPAIGN_INFO.verificationWhatsapp}</strong>) পাঠিয়ে দিলে আমাদের পক্ষ থেকে আপনার সিট নিশ্চিত (Seat Confirmed) করা হবে।
                    </div>
                  </div>
                </div>

                {/* Direct Action Button to WhatsApp */}
                <a
                  href={getWhatsAppConfirmationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all duration-200 hover:scale-102 cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4 text-emerald-700" />
                  <span>Send to WhatsApp (01898-938982)</span>
                </a>
              </div>
            </div>

            {/* Official Candidate Admission Slip Card (Printable) */}
            <div className="print-card bg-white rounded-3xl border-2 border-slate-300 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
              
              {/* Slip Watermark / Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-900 pb-5">
                <div className="flex items-center gap-3">
                  <CprLogo size="lg" />
                </div>
                <div className="text-left sm:text-right">
                  <span className="inline-block bg-blue-900 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded tracking-wider">
                    Official Candidate Slip
                  </span>
                  <div className="text-xs text-slate-500 mt-1 font-mono-numbers">
                    Issue Date: {completedRecord.registrationDate || 'Today'}
                  </div>
                </div>
              </div>

              {/* Sub-Banner with Exam Time 3:00 PM */}
              <div className="bg-sky-50 border-y border-sky-100 py-2.5 px-4 my-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-semibold text-slate-800">
                <span>Special BCS (Health) Subject Finals &amp; Grand Mock Program</span>
                <span className="text-blue-900 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-700" />
                  <span>পরীক্ষার সময়: ৩:০০ PM (বিকাল ৩:০০ টা)</span>
                </span>
              </div>

              {/* Main Candidate Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                
                {/* Doctor Avatar / Photo Placeholder */}
                <div className="md:col-span-1 flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-900 text-white flex flex-col items-center justify-center font-display shadow-inner">
                    <Stethoscope className="w-10 h-10 mb-1 opacity-90" />
                    <span className="text-xs font-bold">DR. CANDIDATE</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-bold text-slate-900">
                      {completedRecord.fullName}
                    </div>
                    <div className="text-[11px] font-mono font-semibold text-cyan-800">
                      {completedRecord.bmdcNumber ? `BMDC: ${completedRecord.bmdcNumber}` : 'BMDC: Intern / Provisional'}
                    </div>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-0.5 rounded">
                    <span>Send Slip to WhatsApp to Confirm</span>
                  </div>
                </div>

                {/* Candidate Particulars */}
                <div className="md:col-span-2 space-y-3.5">
                  <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Assigned Candidate Roll No.
                      </div>
                      <div className="text-xl font-black text-blue-950 font-mono-numbers tracking-wider">
                        {completedRecord.rollNumber}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Registration ID
                      </div>
                      <div className="text-base font-bold text-slate-900 font-mono-numbers">
                        {completedRecord.registrationId}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500">Medical College:</span>
                      <div className="font-semibold text-slate-800">
                        {completedRecord.medicalCollege}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500">Passing Year:</span>
                      <div className="font-semibold text-slate-800 font-mono-numbers">
                        {completedRecord.passingYear}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500">Candidate WhatsApp:</span>
                      <div className="font-semibold text-slate-800 font-mono-numbers">
                        {completedRecord.whatsappNumber}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500">Exam Time:</span>
                      <div className="font-bold text-blue-900 font-mono-numbers">
                        {completedRecord.examTime} (3:00 PM)
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500">Exam Mode:</span>
                      <div className="font-semibold text-slate-800">
                        {completedRecord.examMode}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500">Admission Fee:</span>
                      <div className="font-bold text-emerald-800 font-mono-numbers">
                        ৳ {completedRecord.amount}/- (১ম ২০ জন অফার)
                      </div>
                    </div>
                  </div>

                  {/* Payment Details Banner */}
                  <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>Payment Method: {completedRecord.paymentMethod}</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Payment Recorded
                      </span>
                    </div>
                    {completedRecord.paymentMethod === 'bKash (Online)' ? (
                      <div className="font-mono-numbers text-[11px] text-slate-600">
                        TrxID: <strong>{completedRecord.transactionId}</strong> · Sender Phone: {completedRecord.senderNumber}
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-700">
                        ক্যাশ টাকা গ্রহণকারী: <strong className="text-slate-900">{completedRecord.cashReceivedBy}</strong>
                        {completedRecord.cashReceiptNo && ` (রশিদ নং: ${completedRecord.cashReceiptNo})`}
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* Slip Bottom: QR Code + Seal & Signature */}
              <div className="mt-8 pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* QR Code Graphic representation */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 p-1.5 bg-slate-900 text-white rounded-lg flex items-center justify-center">
                    <QrCode className="w-full h-full text-white" />
                  </div>
                  <div className="text-[10px] text-slate-500 space-y-0.5">
                    <div className="font-bold text-slate-800">CPR DIGITAL VERIFY</div>
                    <div>WhatsApp Confirm: 01898-938982</div>
                    <div className="font-mono">{completedRecord.registrationId}</div>
                  </div>
                </div>

                {/* Academic Authority Signature */}
                <div className="text-center sm:text-right">
                  <div className="inline-block border-b border-slate-800 pb-1 px-4">
                    <span className="font-serif italic text-sm text-blue-950 font-bold">
                      Dr Didarul Hoque Sakib, BCS (Health)
                    </span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                    Academic Coordinator · CPR Medical Academy
                  </div>
                </div>

              </div>

            </div>

            {/* Post-Registration Next Steps & Direct WhatsApp Confirmation Actions */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 no-print">
              <h4 className="text-sm font-bold text-slate-900">
                সিট নিশ্চিতকরণের জন্য করণীয়:
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>হোয়াটসঅ্যাপ কনফার্মেশন:</strong> আপনার এই ক্যান্ডিডেট স্লিপটি আমাদের হোয়াটসঅ্যাপ নম্বরে (<strong>01898-938982</strong>) পাঠিয়ে দিন। কর্তৃপক্ষ যাচাই করে আপনার সিট নিশ্চিত (Seat Confirmed) করবে।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>ক্যান্ডিডেট স্লিপ সংরক্ষণ:</strong> আপনার রোল নম্বর <strong>{completedRecord.rollNumber}</strong>। স্লিপটি প্রিন্ট বা পিডিএফ আকারে সংরক্ষণ করুন।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>পরীক্ষার সময়:</strong> প্রতিটি পরীক্ষা নির্ধারিত তারিখে <strong>বিকাল ৩:০০ টায় (3:00 PM)</strong> অনুষ্ঠিত হবে।
                  </span>
                </li>
              </ul>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href={getWhatsAppConfirmationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Slip to WhatsApp (01898-938982)</span>
                </a>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-5 py-3 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF Slip</span>
                </button>

                {onReset && (
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      onReset();
                    }}
                    className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Register Another Candidate</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
