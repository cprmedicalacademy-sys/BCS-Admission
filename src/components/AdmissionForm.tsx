import React, { useState } from 'react';
import { RegistrationFormData } from '../types';
import { PAYMENT_CHANNELS, MEDICAL_COLLEGES, CAMPAIGN_INFO, PROGRAM_OPTIONS, generateRegistrationId } from '../data/courseData';
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
  MessageCircle,
  Upload,
  Image as ImageIcon,
  Camera,
  FileImage,
  Trash2,
  Maximize2,
  X
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
      paymentScreenshot: '',
      cashReceivedBy: '',
      cashReceiptNo: '',
      amount: CAMPAIGN_INFO.offlineOfferPrice, // 1499 (অফলাইন অফার সমাপ্ত, মূল ফি)
    };
  });

  const handleModeChange = (mode: 'Offline Campus (Chittagong Center)' | 'Online Exam Portal (National)') => {
    const isOnline = mode === 'Online Exam Portal (National)';
    // Offline offer is over (1499), online offer is active (599, regular 799)
    const newAmount = isOnline ? 599 : 1499;
    setFormData((prev) => ({
      ...prev,
      examMode: mode,
      amount: newAmount,
      batchShift: isOnline ? 'Online Live & Self-Paced (3:00 PM)' : 'Day Batch (3:00 PM)',
    }));
  };

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedSlipText, setCopiedSlipText] = useState(false);
  const [screenshotModalImage, setScreenshotModalImage] = useState<string | null>(null);
  const [isUploadingScreenshot, setIsUploadingScreenshot] = useState(false);
  const [copiedScreenshot, setCopiedScreenshot] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [completedRecord, setCompletedRecord] = useState<RegistrationFormData | null>(
    registeredCandidate || null
  );

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Image Upload & Canvas Compression Helper
  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({
        ...prev,
        paymentScreenshot: 'অনুগ্রহ করে একটি ছবি (JPG, PNG, WEBP) সিলেক্ট করুন।',
      }));
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        paymentScreenshot: 'ছবির সাইজ ১৫MB এর কম হতে হবে।',
      }));
      return;
    }

    setIsUploadingScreenshot(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        // Compress using canvas to max 1200x1200px
        const maxDimension = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setFormData((prev) => ({ ...prev, paymentScreenshot: compressedDataUrl }));
          setErrors((prev) => {
            const next = { ...prev };
            delete next.paymentScreenshot;
            return next;
          });
        }
        setIsUploadingScreenshot(false);
      };
      img.onerror = () => {
        setIsUploadingScreenshot(false);
        setErrors((prev) => ({
          ...prev,
          paymentScreenshot: 'ছবিটি লোড করতে সমস্যা হয়েছে, অনুগ্রহ করে অন্য ছবি নির্বাচন করুন।',
        }));
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setIsUploadingScreenshot(false);
      setErrors((prev) => ({
        ...prev,
        paymentScreenshot: 'ছবি আপলোড করতে ব্যর্থ হয়েছে, আবার চেষ্টা করুন।',
      }));
    };
    reader.readAsDataURL(file);
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

  // Step 2 Validation: Check bKash (Screenshot preferred) or Cash inputs
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    
    if (formData.paymentMethod === 'bKash (Online)') {
      // User requested: Screenshot is preferred over typing TrxID!
      // If either screenshot or TrxID is provided, it's valid.
      if (!formData.paymentScreenshot && !formData.transactionId?.trim()) {
        errs.paymentScreenshot = 'অনুগ্রহ করে বিকাশ পেমেন্টের স্ক্রিনশট আপলোড করুন অথবা Transaction ID (TrxID) লিখুন';
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

  // Format rich WhatsApp Candidate Slip message
  const generateSlipMessage = (record: RegistrationFormData) => {
    const isOnline = record.examMode === 'Online Exam Portal (National)';
    const regularPrice = isOnline ? 799 : 1499;
    const paidAmount = record.amount || (isOnline ? 599 : 1499);

    const paymentDetail = record.paymentMethod === 'bKash (Online)'
      ? `বিকাশ অনলাইন (Send Money ৳ ${paidAmount}${record.paymentScreenshot ? ', স্ক্রিনশট সংযুক্ত ✅' : ''}${record.transactionId ? `, TrxID: ${record.transactionId}` : ''}${record.senderNumber ? `, প্রেরক: ${record.senderNumber}` : ''})`
      : `ক্যাশ পেমেন্ট (টাকা গ্রহণকারী: ${record.cashReceivedBy}${record.cashReceiptNo ? `, রশিদ নং: ${record.cashReceiptNo}` : ''})`;

    return `*🏥 CPR MEDICAL ACADEMY – SPECIAL BCS CANDIDATE SLIP 🏥*
_চট্টগ্রামে একমাত্র অফলাইন মেডিকেল পোস্ট গ্রাজুয়েশন ওরিয়েন্টেশন সেন্টার_
──────────────────────
👤 *ক্যান্ডিডেট নাম:* Dr. ${record.fullName}
🆔 *রেজিস্ট্রেশন আইডি (৮ ডিজিট):* ${record.registrationId}
📱 *প্রার্থীর হোয়াটসঅ্যাপ:* ${record.whatsappNumber}
${record.altMobileNumber ? `📞 বিকল্প নম্বর: ${record.altMobileNumber}\n` : ''}${record.bmdcNumber ? `🩺 BMDC Reg No: ${record.bmdcNumber}\n` : '🩺 BMDC Status: Intern / Provisional\n'}🏥 *মেডিকেল কলেজ:* ${record.medicalCollege}
🎓 *পাসের বছর:* ${record.passingYear}
⏰ *পরীক্ষার সময়:* 3:00 PM (প্রতি পরীক্ষা বিকাল ৩:০০ টায়)
📍 *অংশগ্রহণের মোড:* ${record.examMode}
💳 *পেমেন্ট পদ্ধতি:* ${paymentDetail}
${record.paymentScreenshot ? '📷 *পেমেন্ট প্রুফ:* বিকাশ সেন্ড মানির স্ক্রিনশট পোর্টালে আপলোড করা হয়েছে।\n' : ''}💵 *পরিশোধিত কোর্স ফি:* ৳ ${paidAmount}/- (${isOnline ? 'অনলাইন ১ম ২০ জন অফার, নিয়মিত ৳ ৭৯৯/-' : 'অফলাইন নিয়মিত ফি (৫৪+ ভর্তি সম্পন্ন, অফার সমাপ্ত)'})
📅 *আবেদনের তারিখ:* ${record.registrationDate || new Date().toISOString().split('T')[0]}
──────────────────────
আসসালামু আলাইকুম CPR একাডেমি কর্তৃপক্ষ,
আমি আমার ক্যান্ডিডেট স্লিপটি পাঠালাম${record.paymentScreenshot ? ' (বিকাশ পেমেন্টের স্ক্রিনশটও সাথে ইনবক্সে পাঠাচ্ছি)' : ''}। অনুগ্রহ করে পেমেন্ট ও তথ্য যাচাই করে আমার সিট নিশ্চিত (Seat Confirmed) করুন। ধন্যবাদ!`;
  };

  // Pre-filled WhatsApp Confirmation URL helper
  const getWhatsAppConfirmationUrl = (record?: RegistrationFormData | null) => {
    const target = record || completedRecord;
    if (!target) return '#';
    const message = generateSlipMessage(target);
    return `https://wa.me/88${CAMPAIGN_INFO.verificationWhatsappRaw}?text=${encodeURIComponent(message)}`;
  };

  // Copy screenshot image directly to clipboard as PNG blob so it can be pasted into WhatsApp
  const copyScreenshotImageToClipboard = async (dataUrl: string) => {
    try {
      const img = new window.Image();
      img.src = dataUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;
      ctx.drawImage(img, 0, 0);

      return new Promise<boolean>((resolve) => {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            resolve(false);
            return;
          }
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            setCopiedScreenshot(true);
            setTimeout(() => setCopiedScreenshot(false), 2500);
            resolve(true);
          } catch (e) {
            console.warn('ClipboardItem write image failed', e);
            resolve(false);
          }
        }, 'image/png');
      });
    } catch (e) {
      console.warn('Failed to copy screenshot to clipboard', e);
      return false;
    }
  };

  // Helper to download the screenshot to device
  const handleDownloadScreenshot = () => {
    const target = completedRecord;
    if (!target?.paymentScreenshot) return;
    const link = document.createElement('a');
    link.href = target.paymentScreenshot;
    link.download = `CPR_bKash_Slip_ID_${target.registrationId || 'proof'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Native share / WhatsApp launcher that sends the actual screenshot image file and text
  const handleShareWithScreenshot = async (record?: RegistrationFormData | null) => {
    const target = record || completedRecord;
    if (!target) return;
    setIsSharing(true);

    const messageText = generateSlipMessage(target);

    // 1. If Web Share API with files is supported (supported on Android/iOS Chrome & Safari)
    if (target.paymentScreenshot) {
      try {
        const res = await fetch(target.paymentScreenshot);
        const blob = await res.blob();
        const file = new File(
          [blob],
          `CPR_bKash_Receipt_ID_${target.registrationId || 'proof'}.jpg`,
          { type: 'image/jpeg' }
        );

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'CPR Medical Academy - Special BCS Admission',
            text: messageText,
            files: [file],
          });
          setIsSharing(false);
          return;
        }
      } catch (err: any) {
        if (err.name === 'AbortError') {
          setIsSharing(false);
          return; // user cancelled share sheet
        }
        console.warn('Web share with file failed, falling back to clipboard and wa.me', err);
      }
    }

    // 2. Automatically copy the image to clipboard so user can just Ctrl+V or Paste in WhatsApp
    if (target.paymentScreenshot) {
      await copyScreenshotImageToClipboard(target.paymentScreenshot);
    }

    // 3. Open WhatsApp Web or Mobile App
    const waUrl = getWhatsAppConfirmationUrl(target);
    try {
      window.open(waUrl, '_blank');
    } catch (err) {
      console.error('WhatsApp redirect error:', err);
    }
    setIsSharing(false);
  };

  // Handle Step 2 Final Submit with Direct Instant Auto-Launch to WhatsApp
  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      const isOnline = formData.examMode === 'Online Exam Portal (National)';
      const finalAmount = isOnline ? 599 : 1499;
      // 8-Digit Registration ID Generator: 26 + phoneLast3 + sequential serial
      const generatedRegId = generateRegistrationId(formData.whatsappNumber);

      const newRecord: RegistrationFormData = {
        ...formData,
        amount: finalAmount,
        registrationId: generatedRegId,
        registrationDate: new Date().toISOString().split('T')[0],
        status: 'Pending WhatsApp Confirmation'
      };

      setCompletedRecord(newRecord);
      onSuccessfulRegistration(newRecord);
      setStep(3);

      // Instant WhatsApp URL for auto-sending
      const waUrl = getWhatsAppConfirmationUrl(newRecord);

      // DIRECT INSTANT AUTO-SEND TO WHATSAPP (01805-743666):
      // Synchronous execution ensures the browser popup blocker NEVER blocks it!
      try {
        const popup = window.open(waUrl, '_blank');
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          // If popup is blocked by browser settings, immediately navigate to WhatsApp:
          window.location.href = waUrl;
        }
      } catch (err) {
        window.location.href = waUrl;
      }

      window.scrollTo({ top: document.getElementById('admission-form-section')?.offsetTop ?? 0, behavior: 'smooth' });
    }
  };

  // Print helper
  const handlePrint = () => {
    window.print();
  };

  // Helper to copy complete candidate slip text for WhatsApp
  const handleCopyFullSlip = () => {
    if (!completedRecord) return;
    const text = generateSlipMessage(completedRecord);
    navigator.clipboard.writeText(text);
    setCopiedSlipText(true);
    setTimeout(() => setCopiedSlipText(false), 2500);
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
                  <span>Proceed to Payment (৳ ১৪৯৯)</span>
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
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      প্রযোজ্য ভর্তি ফি
                    </div>
                    <div className="text-2xl font-black text-blue-900 font-mono-numbers">
                      ৳ {formData.examMode === 'Online Exam Portal (National)' ? '৫৯৯' : '১৪৯৯'}/-
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-0.5">
                      {formData.examMode === 'Online Exam Portal (National)'
                        ? 'অনলাইন ১ম ২০ জন অফার (মূল ফি ৳ ৭৯৯)'
                        : 'অফলাইন নিয়মিত ফি (৫৪+ ভর্তি সম্পন্ন, অফার সমাপ্ত)'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Exam Program & Mode: Interactive 2-Option Card Selector */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Exam Participation Mode (অংশগ্রহণের মাধ্যম নির্বাচন করুন) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full w-fit">
                    ⚡ অনলাইন ব্যাচে ১ম ২০ জনের বিশেষ অফার কার্যকর (অফলাইন অফার সমাপ্ত)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Card 1: OFFLINE */}
                  <div
                    onClick={() => handleModeChange('Offline Campus (Chittagong Center)')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      formData.examMode === 'Offline Campus (Chittagong Center)'
                        ? 'border-blue-900 bg-blue-50/60 shadow-md ring-2 ring-blue-900/10'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-900 text-white font-black text-[11px] tracking-wider uppercase">
                        OFFLINE
                      </span>
                      <span className="text-[10px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                        চকবাজার ক্যাম্পাস
                      </span>
                    </div>

                    <div className="mt-2.5">
                      <div className="text-xs text-slate-500">
                        মূল ভর্তি ফি:
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-black text-blue-950 font-mono-numbers">
                          ৳ ১৪৯৯/-
                        </span>
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                          অফার সমাপ্ত (৫৪+ ভর্তি)
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-slate-600 space-y-1">
                      <div className="font-semibold text-slate-800">
                        📍 মতি টাওয়ার (৫ম তলা), চকবাজার, চট্টগ্রাম
                      </div>
                      <div className="text-[11px] text-slate-500">
                        সরাসরি ওএমআর (OMR) পরীক্ষা, প্রিন্টেড প্রশ্ন ও সল্যুশন বুকলেট
                      </div>
                    </div>
                  </div>

                  {/* Card 2: ONLINE */}
                  <div
                    onClick={() => handleModeChange('Online Exam Portal (National)')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      formData.examMode === 'Online Exam Portal (National)'
                        ? 'border-teal-700 bg-teal-50/60 shadow-md ring-2 ring-teal-700/10'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-teal-700 text-white font-black text-[11px] tracking-wider uppercase">
                        ONLINE
                      </span>
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                        সারা বাংলাদেশ
                      </span>
                    </div>

                    <div className="mt-2.5">
                      <div className="text-xs text-slate-400 line-through">
                        মূল ফি: ৳ ৭৯৯/-
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-black text-teal-950 font-mono-numbers">
                          ৳ ৫৯৯/-
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
                          ১ম ২০ জনের জন্য ৫৯৯/-
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-slate-600 space-y-1">
                      <div className="font-semibold text-slate-800">
                        📱 অনলাইন এক্সাম পোর্টাল (সারা দেশ)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        মোবাইল/ল্যাপটপে লাইভ পরীক্ষা, ডিজিটাল প্রশ্ন ও পিডিএফ বুকলেট
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exam Time confirmation */}
                <div className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-700" />
                    <span>পরীক্ষার সময়: প্রতিদিন বিকাল ৩:০০ টায় (3:00 PM)</span>
                  </span>
                  <span className="text-blue-900 font-mono-numbers">
                    নির্বাচিত: {formData.examMode === 'Online Exam Portal (National)' ? 'অনলাইন (৳ ৫৯৯ - ১ম ২০ জন অফার)' : 'অফলাইন (৳ ১৪৯৯ - নিয়মিত ফি)'}
                  </span>
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
                      <div className="text-[11px] font-semibold text-pink-700 mt-1 font-mono-numbers">
                        ৳ {formData.examMode === 'Online Exam Portal (National)' ? '৫৯৯' : '১৪৯৯'} (Send Money &amp; Screenshot)
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
                      <div className="text-[11px] font-semibold text-emerald-700 mt-1 font-mono-numbers">
                        ৳ {formData.examMode === 'Online Exam Portal (National)' ? '৫৯৯' : '১৪৯৯'} (টাকা গ্রহণকারীর নাম লিখুন)
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
                        Payable: ৳ {formData.examMode === 'Online Exam Portal (National)' ? '599 (অনলাইন ১ম ২০ জন অফার)' : '1499 (অফলাইন নিয়মিত ফি)'}
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
                      <p>৩. টাকার পরিমাণ দিন: <strong className="text-white font-mono">{formData.examMode === 'Online Exam Portal (National)' ? '599' : '1499'}</strong> (রেফারেন্স: <span className="text-cyan-300">BCS</span>)</p>
                      <p>৪. সফলভাবে সেন্ড মানি করার পর ট্রানজেকশনের স্ক্রিনশটটি নিচে আপলোড করুন।</p>
                    </div>
                  </div>

                  {/* PRIMARY: Payment Screenshot Upload (User Request) */}
                  <div className="space-y-3 p-5 rounded-2xl bg-pink-50/70 border-2 border-dashed border-pink-300 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-pink-600 text-white flex items-center justify-center shadow-xs shrink-0">
                          <Camera className="w-4 h-4" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                            পেমেন্টের স্ক্রিনশট আপলোড করুন (Upload Payment Screenshot) <span className="text-red-500">*</span>
                          </label>
                          <p className="text-[11px] text-slate-600">
                            বিকাশ সেন্ড মানি কনফার্মেশন স্ক্রিন বা ফিরতি মেসেজের স্ক্রিনশট যুক্ত করুন
                          </p>
                        </div>
                      </div>
                      {formData.paymentScreenshot && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                          <Check className="w-3.5 h-3.5" />
                          <span>আপলোড সম্পন্ন</span>
                        </span>
                      )}
                    </div>

                    {!formData.paymentScreenshot ? (
                      /* Drag & Drop / File Input Box */
                      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-pink-300 hover:border-pink-500 hover:bg-pink-100/60 rounded-xl cursor-pointer transition-all group bg-white/60">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                        />
                        <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-xs">
                          <Upload className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-pink-900 text-center">
                          {isUploadingScreenshot ? 'ছবি প্রসেস করা হচ্ছে...' : 'স্ক্রিনশট আপলোড করতে এখানে ক্লিক করুন (বা ছবি ড্রপ করুন)'}
                        </span>
                        <span className="text-[11px] text-slate-500 mt-1">
                          PNG, JPG, JPEG, WEBP সমর্থিত (সর্বোচ্চ ১৫MB)
                        </span>
                      </label>
                    ) : (
                      /* Uploaded Screenshot Preview Box */
                      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-xl border border-pink-200 shadow-xs">
                        <div
                          onClick={() => setScreenshotModalImage(formData.paymentScreenshot!)}
                          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-slate-200 cursor-pointer group shrink-0 shadow-sm bg-slate-100"
                          title="বড় করে দেখতে ক্লিক করুন"
                        >
                          <img
                            src={formData.paymentScreenshot}
                            alt="bKash Payment Proof"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Maximize2 className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="flex-1 text-center sm:text-left space-y-1.5">
                          <div className="text-xs font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>বিকাশ পেমেন্টের স্ক্রিনশট সফলভাবে সংযুক্ত হয়েছে</span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            ছবিটি বড় করে যাচাই করতে থাম্বনেইলে ক্লিক করুন।
                          </p>
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setScreenshotModalImage(formData.paymentScreenshot!)}
                              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span>বড় করে দেখুন</span>
                            </button>
                            <label className="px-3 py-1.5 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-900 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageUpload(file);
                                }}
                              />
                              <Upload className="w-3.5 h-3.5" />
                              <span>ছবি পরিবর্তন করুন</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, paymentScreenshot: '' })}
                              className="px-3 py-1.5 rounded-lg hover:bg-red-50 text-red-600 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>মুছে ফেলুন</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {errors.paymentScreenshot && (
                      <p className="text-xs font-bold text-red-600 mt-1.5 flex items-center gap-1.5 bg-red-50 p-2.5 rounded-lg border border-red-200">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                        <span>{errors.paymentScreenshot}</span>
                      </p>
                    )}
                  </div>

                  {/* SECONDARY / OPTIONAL: Sender Phone & TrxID */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                      <span>অতিরিক্ত তথ্য (ঐচ্ছিক / Optional)</span>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        স্ক্রিনশট দিলে TrxID না দিলেও চলবে
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          বিকাশ প্রেরক নম্বর (Sender Number) <span className="text-slate-400 font-normal">(ঐচ্ছিক)</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. 017XXXXXXXX"
                          value={formData.senderNumber || ''}
                          onChange={(e) => setFormData({ ...formData, senderNumber: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono-numbers"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Transaction ID (TrxID) <span className="text-slate-400 font-normal">(ঐচ্ছিক)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. BK9X8291Q (যদি থাকে)"
                          value={formData.transactionId || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, transactionId: e.target.value.toUpperCase() })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 uppercase tracking-wider focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono-numbers"
                        />
                      </div>
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
                    চকবাজার মতি টাওয়ার ক্যাম্পাসে বা আমাদের কোনো সম্মানিত মেন্টর/প্রতিনিধির নিকট সরাসরি <strong>৳ {formData.examMode === 'Online Exam Portal (National)' ? '৫৯৯' : '১৪৯৯'}/-</strong> টাকা ক্যাশ জমা দিয়ে থাকলে যিনি টাকা গ্রহণ করেছেন তার নাম লিখুন।
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
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-200" />
                  <span>সাবমিট করুন ও সরাসরি হোয়াটসঅ্যাপে পাঠান (01805-743666)</span>
                  <ArrowRight className="w-4 h-4 text-emerald-200" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* STEP 3: OFFICIAL CANDIDATE ADMISSION SLIP & WHATSAPP CONFIRMATION */}
        {step === 3 && completedRecord && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* WhatsApp Direct Confirmation Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 text-white shadow-xl space-y-4 no-print border-2 border-emerald-400">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-inner">
                    <MessageCircle className="w-7 h-7 text-emerald-200" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-base sm:text-lg font-black flex items-center gap-2">
                      <span>স্ক্রিনশটসহ হোয়াটসঅ্যাপে পাঠানো হচ্ছে...</span>
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                      হোয়াটসঅ্যাপ ওপেন হলে <strong>01805-743666</strong> নম্বরে আপনার বিকাশ পেমেন্টের স্ক্রিনশট ও স্লিপটি পাঠিয়ে দিন। একাডেমি প্রতিনিধি যাচাই করে আপনার সিট নিশ্চিত করবেন।
                    </p>
                    {completedRecord.paymentScreenshot && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[11px] bg-emerald-950/70 border border-emerald-400/50 text-emerald-200 px-2.5 py-0.5 rounded-md font-bold flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>পেমেন্ট স্ক্রিনশট সংযুক্ত রয়েছে</span>
                        </span>
                        <span className="text-[11px] text-emerald-200/90 font-medium">
                          (চ্যাটে গিয়ে শুধু <strong>Paste / পেস্ট</strong> করুন বা গ্যালারি থেকে সিলেক্ট করুন)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
                  <a
                    href={getWhatsAppConfirmationUrl(completedRecord)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-emerald-700" />
                    <span>সরাসরি হোয়াটসঅ্যাপে পাঠান (01805-743666)</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyFullSlip}
                    className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-400/30 transition-colors cursor-pointer"
                  >
                    {copiedSlipText ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>স্লিপ টেক্সট কপি</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Dedicated Screenshot Action Bar */}
              {completedRecord.paymentScreenshot && (
                <div className="pt-3 border-t border-emerald-700/60 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-emerald-200 font-bold">স্ক্রিনশট অ্যাকশন:</span>
                  
                  <button
                    type="button"
                    onClick={() => copyScreenshotImageToClipboard(completedRecord.paymentScreenshot!)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-950 text-emerald-100 font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-emerald-400/30"
                  >
                    {copiedScreenshot ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>স্ক্রিনশট কপি হয়েছে! (WhatsApp-এ Paste করুন)</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>স্ক্রিনশট কপি করুন (WhatsApp-এ Paste করতে)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadScreenshot}
                    className="px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-950 text-emerald-100 font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-emerald-400/30"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>স্ক্রিনশট ডাউনলোড</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScreenshotModalImage(completedRecord.paymentScreenshot!)}
                    className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold flex items-center gap-1.5 cursor-pointer transition-colors ml-auto"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>স্ক্রিনশট দেখুন</span>
                  </button>
                </div>
              )}
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
                  {/* Official 8-Digit Registration ID (No Roll Number per instruction) */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-cyan-500/30 shadow-md">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                        OFFICIAL REGISTRATION ID (৮ সংখ্যার রেজিস্ট্রেশন নং)
                      </div>
                      <div className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-white mt-0.5">
                        {completedRecord.registrationId}
                      </div>
                    </div>
                    <div className="text-[11px] text-cyan-200 bg-white/10 px-3 py-1.5 rounded-lg border border-cyan-400/20 font-bold self-start sm:self-auto">
                      ✓ ৮ ডিজিট অফিসিয়াল আইডি
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
                      <div className="font-bold text-emerald-800 font-mono-numbers flex flex-wrap items-baseline gap-1.5">
                        <span>৳ {completedRecord.amount}/-</span>
                        <span className="text-[10px] text-slate-500 font-normal line-through">
                          (মূল ফি ৳ {completedRecord.examMode?.includes('Online') ? '৭৯৯' : '১৪৯৯'})
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          ১ম ২০ জন অফার
                        </span>
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
                      <div className="text-[11px] text-slate-700 space-y-1.5">
                        <div className="font-mono-numbers text-slate-600 flex flex-wrap items-center gap-2">
                          <span>বিকাশ সেন্ড মানি (৳ {completedRecord.amount})</span>
                          {completedRecord.senderNumber && <span>· প্রেরক: {completedRecord.senderNumber}</span>}
                          {completedRecord.transactionId && <span>· TrxID: {completedRecord.transactionId}</span>}
                        </div>
                        {completedRecord.paymentScreenshot && (
                          <div className="flex items-center gap-2 pt-1 font-sans">
                            <div
                              onClick={() => setScreenshotModalImage(completedRecord.paymentScreenshot!)}
                              className="relative w-10 h-10 rounded-md overflow-hidden border border-slate-300 cursor-pointer shadow-2xs hover:ring-2 hover:ring-cyan-500 transition-all shrink-0"
                              title="স্ক্রিনশট বড় করে দেখতে ক্লিক করুন"
                            >
                              <img
                                src={completedRecord.paymentScreenshot}
                                alt="Payment Proof"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>বিকাশ পেমেন্ট স্ক্রিনশট সংযুক্ত</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => setScreenshotModalImage(completedRecord.paymentScreenshot!)}
                              className="text-[11px] text-cyan-800 underline font-bold cursor-pointer hover:text-cyan-900"
                            >
                              বড় করে দেখুন
                            </button>
                          </div>
                        )}
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
                    <div>WhatsApp Confirm: 01805-743666</div>
                    <div className="font-mono">{completedRecord.registrationId}</div>
                  </div>
                </div>

                {/* Academic Authority Signature */}
                <div className="text-center sm:text-right">
                  <div className="inline-block border-b border-slate-800 pb-1 px-4">
                    <span className="font-serif italic text-sm text-blue-950 font-bold">
                      Dr. Muhammad Shahnewaz
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
                    <strong>হোয়াটসঅ্যাপ কনফার্মেশন:</strong> আপনার এই ক্যান্ডিডেট স্লিপটি আমাদের হোয়াটসঅ্যাপ নম্বরে (<strong>01805-743666</strong>) পাঠিয়ে দিন। কর্তৃপক্ষ যাচাই করে আপনার সিট নিশ্চিত (Seat Confirmed) করবে।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>ক্যান্ডিডেট স্লিপ সংরক্ষণ:</strong> আপনার ৮ সংখ্যার অফিসিয়াল রেজিস্ট্রেশন আইডি <strong>{completedRecord.registrationId}</strong>। স্লিপটি প্রিন্ট বা পিডিএফ আকারে সংরক্ষণ করুন।
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
                  href={getWhatsAppConfirmationUrl(completedRecord)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer shadow-lg"
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                  <span>সরাসরি হোয়াটসঅ্যাপে পাঠান (01805-743666)</span>
                </a>

                {completedRecord.paymentScreenshot && (
                  <button
                    type="button"
                    onClick={() => copyScreenshotImageToClipboard(completedRecord.paymentScreenshot!)}
                    className="px-4 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-300"
                  >
                    {copiedScreenshot ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>স্ক্রিনশট ক্লিপবোর্ডে কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-600" />
                        <span>পেমেন্ট স্ক্রিনশট কপি করুন</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCopyFullSlip}
                  className="px-4 py-3.5 rounded-xl border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSlipText ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>স্লিপ টেক্সট কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-emerald-700" />
                      <span>স্লিপের সম্পূর্ণ টেক্সট কপি করুন</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-5 py-3.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
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
                    className="px-4 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>নতুন রেজিস্ট্রেশন</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Modal for Full-Size Screenshot Preview */}
      {screenshotModalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200 no-print">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col relative">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-pink-600" />
                <span>বিকাশ পেমেন্ট স্ক্রিনশট প্রিভিউ</span>
              </div>
              <button
                type="button"
                onClick={() => setScreenshotModalImage(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 flex items-center justify-center bg-slate-950/5">
              <img
                src={screenshotModalImage}
                alt="Payment proof full"
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-md border border-slate-200"
              />
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => setScreenshotModalImage(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                বন্ধ করুন (Close)
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
