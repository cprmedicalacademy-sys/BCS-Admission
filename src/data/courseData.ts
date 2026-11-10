import { ExamScheduleItem, Mentor, Testimonial, RegistrationFormData } from '../types';

/**
 * 8-Digit Registration ID Generator:
 * - First 2 digits: '26' (Fixed per user instruction)
 * - Next 3 digits: Last 3 digits of candidate's mobile number
 * - Last 3 digits: Sequential serial (maintained starting from 055 onwards)
 * Total strictly 8 digits: e.g. 26 + 753 + 055 = 26753055
 */
export const generateRegistrationId = (phone: string, seq?: number): string => {
  const digits = (phone || '').replace(/\D/g, '');
  const phoneLast3 = digits.length >= 3 ? digits.slice(-3) : digits.padStart(3, '0');

  let serial = seq;
  if (!serial || serial < 55) {
    try {
      const stored = localStorage.getItem('cpr_reg_serial_counter');
      const nextVal = stored ? Math.max(parseInt(stored, 10) + 1, 55) : 55;
      localStorage.setItem('cpr_reg_serial_counter', nextVal.toString());
      serial = nextVal;
    } catch {
      serial = 55;
    }
  }

  const serialStr = String(serial).padStart(3, '0').slice(-3);
  return `26${phoneLast3}${serialStr}`;
};

export const PROGRAM_OPTIONS = {
  offline: {
    id: "offline",
    name: "Offline Campus (Chittagong Center)",
    titleBengali: "অফলাইন ক্যাম্পাস (চকবাজার, চট্টগ্রাম)",
    badge: "OFFLINE",
    regularPrice: 1499,
    offerPrice: 1499, // অফার শেষ (৫৪+ জন ভর্তি সম্পন্ন)
    isOfferActive: false,
    offerEnded: true,
    offerStatusText: "অফলাইন ব্যাচের অফার শেষ (৫৪+ জন ভর্তি সম্পন্ন)",
    badgeText: "অফার সমাপ্ত · মূল ফি ৳ ১৪৯৯/-",
    description: "মতি টাওয়ার (৫ম তলা), চকবাজার, চট্টগ্রামে সরাসরি ওএমআর ভিত্তিক অফলাইন পরীক্ষা",
    features: [
      "চকবাজার মতি টাওয়ারে সরাসরি ওএমআর (OMR) অফলাইন পরীক্ষা",
      "১০টি পরীক্ষা (৮টি সাবজেক্ট ফাইনাল + ২টি গ্র্যান্ড মক)",
      "প্রতিটি পরীক্ষা বিকাল ৩:০০ টায় অনুষ্ঠিত",
      "প্রিন্টেড প্রশ্ন ও পূর্ণাঙ্গ সল্যুশন বুকলেট",
      "সরাসরি সিএমসিএইচ ও ডিএমসিএইচ ক্যাডার মেন্টরদের পরামর্শ",
      "অল-বাংলাদেশ মেরিট র‍্যাংকিং"
    ]
  },
  online: {
    id: "online",
    name: "Online Exam Portal (National)",
    titleBengali: "অনলাইন এক্সাম পোর্টাল (সারা বাংলাদেশ)",
    badge: "ONLINE",
    regularPrice: 799,
    offerPrice: 599, // ১ম ২০ জনের জন্য ৫৯৯/- অফার চালু রয়েছে
    isOfferActive: true,
    offerEnded: false,
    savings: 200,
    offerLimit: 20,
    offerTag: "প্রথম ২০জনের জন্য ৫৯৯/-",
    offerStatusText: "অনলাইন ব্যাচে ১ম ২০ জনের জন্য বিশেষ অফার চলমান",
    badgeText: "🔥 ১ম ২০ জনের জন্য ৫৯৯/- অফার",
    description: "সারা বাংলাদেশ থেকে মোবাইল বা ল্যাপটপে পরীক্ষা দেওয়ার সুবিধা ও ডিজিটাল সল্যুশন",
    features: [
      "সারা বাংলাদেশ থেকে মোবাইল বা ল্যাপটপে পরীক্ষা দেওয়ার সুবিধা",
      "১০টি পূর্ণাঙ্গ অনলাইন টেস্ট (৮টি সাবজেক্ট ফাইনাল + ২টি গ্র্যান্ড মক)",
      "প্রতিটি পরীক্ষা বিকাল ৩:০০ টায় লাইভ এবং পরবর্তীতে আর্কাইভে সংরক্ষিত",
      "ডিজিটাল প্রশ্ন ও পূর্ণাঙ্গ পিডিএফ সল্যুশন বুকলেট",
      "তাৎক্ষণিক অটোমেটিক মার্কস, নেগেটিভ মার্কিং ও র‍্যাংকিং",
      "ডেডিকেটেড ক্যাডার হোয়াটসঅ্যাপ গ্রুপ অ্যাক্সেস"
    ]
  }
};

export const CAMPAIGN_INFO = {
  academyName: "CPR MEDICAL ACADEMY",
  centerTitle: "Centre for Post-Graduation (CPR)",
  taglineBengali: "চট্টগ্রামে একমাত্র অফলাইন মেডিকেল পোস্ট গ্রাজুয়েশন ওরিয়েন্টেশন সেন্টার",
  slogan: "Special BCS (Health) Subject Finals & Grand Mock",
  campaignTitle: "SPECIAL BCS – CPR MEDICAL ACADEMY",
  campaignSubtitle: "SUBJECT FINALS & GRAND MOCK",
  
  // Pricing Structure: Offline offer ended (1499), Online offer active (599, reg 799)
  offlineRegularPrice: 1499,
  offlineOfferPrice: 1499, // Offer ended
  offlineOfferEnded: true,
  onlineRegularPrice: 799,
  onlineOfferPrice: 599, // Offer active
  first20OfferOnline: true,

  regularPrice: 1499,
  offerPrice: 1499,
  coursePrice: 1499,
  enrolledCount: 54, // ইতিমধ্যে ৫৪ জন ভর্তি সম্পন্ন (অফলাইন অফার কোটা পূর্ণ)
  maxSeats: 100,
  claimedSeats: 54,
  examTime: "3:00 PM",
  bkashNumber: "+880 1675-226753",
  bkashRawNumber: "01675226753",
  contactPhone: "01898-938981",
  contactPhone2: "01805-743666",
  verificationWhatsapp: "01805-743666",
  verificationWhatsappRaw: "01805743666",
  contactEmail: "cprmedicalacademy@gmail.com",
  officeAddress: "মতি টাওয়ার (৫ম তলা), গুলজার মোড়, চকবাজার, চট্টগ্রাম (EBL ব্যাংকের ATM বুথের ডান পাশে লিফটের ৪ তলা)",
  posterScheduleImage: "/assets/aistudio/image_25415bad.png",
  mentorsBannerImage: "/assets/aistudio/image_ed966ee5.png"
};

export const PAYMENT_CHANNELS = {
  online: {
    title: "Online Payment (bKash Send Money)",
    type: "bKash Personal",
    number: "01675-226753",
    instructions: "bKash অ্যাপ বা *247# ডায়াল করে Send Money করুন: 01675226753 নম্বরে। অফলাইন ভর্তি ফি ৳ ১৪৯৯ (অফার সমাপ্ত, ৫৪+ জন ভর্তি) অথবা অনলাইন অফার ফি ৳ ৫৯৯ (১ম ২০ জন অফার, নিয়মিত ৳ ৭৯৯), রেফারেন্স: BCS। সেন্ড মানির পর স্ক্রিনশট আপলোড করুন।"
  },
  cash: {
    title: "Cash Payment (ক্যাশ পেমেন্ট)",
    type: "অফলাইন চকবাজার ক্যাম্পাস / প্রতিনিধি",
    instructions: "আমাদের মতি টাওয়ার, চকবাজার অফিসে বা আমাদের কোনো প্রতিনিধির নিকট সরাসরি ক্যাশ টাকা (অফলাইন ৳ ১৪৯৯ বা অনলাইন ৳ ৫৯৯) জমা দিয়ে থাকলে, যিনি টাকা গ্রহণ করেছেন তার নাম লিখুন।"
  }
};

export const MEDICAL_COLLEGES = [
  "Chittagong Medical College (CMC)",
  "Dhaka Medical College (DMC)",
  "Sir Salimullah Medical College (SSMC)",
  "Shaheed Suhrawardy Medical College (ShSMC)",
  "Rajshahi Medical College (RMC)",
  "Mymensingh Medical College (MMC)",
  "MAG Osmani Medical College, Sylhet (SOMC)",
  "Sher-e-Bangla Medical College, Barisal (SBMC)",
  "Rangpur Medical College (RpMC)",
  "Khulna Medical College (KMC)",
  "Comilla Medical College (CoMC)",
  "Cox's Bazar Medical College",
  "Rangamati Medical College",
  "Chandpur Medical College",
  "Noakhali Medical College",
  "Faridpur Medical College (FMC)",
  "Dinajpur Medical College (DjMC)",
  "Pabna Medical College",
  "Bangladesh Medical College (BMC)",
  "Chattogram Maa-O-Shishu Hospital Medical College",
  "Southern Medical College, Chattogram",
  "Marine City Medical College, Chattogram",
  "BGC Trust Medical College, Chattogram",
  "University of Science and Technology Chittagong (USTC)",
  "Holy Family Red Crescent Medical College",
  "Enam Medical College",
  "Anwer Khan Modern Medical College",
  "Other Medical College (Govt. / Private / Foreign)"
];

// Exact Routine with 3:00 PM Exam Time
export const EXAM_SCHEDULE: ExamScheduleItem[] = [
  {
    id: "SF-01",
    examNo: 1,
    title: "Subject Final 01",
    type: "Subject Final",
    subjects: "বাংলা ভাষা ও সাহিত্য",
    date: "17 November",
    day: "Tuesday",
    time: "3:00 PM",
    totalQuestions: 100,
    marks: 100,
    duration: "60 Minutes",
    status: "Upcoming"
  },
  {
    id: "SF-02",
    examNo: 2,
    title: "Subject Final 02",
    type: "Subject Final",
    subjects: "ইংরেজি ভাষা ও সাহিত্য",
    date: "19 November",
    day: "Thursday",
    time: "3:00 PM",
    totalQuestions: 100,
    marks: 100,
    duration: "60 Minutes",
    status: "Upcoming"
  },
  {
    id: "SF-03",
    examNo: 3,
    title: "Subject Final 03",
    type: "Subject Final",
    subjects: "গাণিতিক যুক্তি ও মানসিক দক্ষতা",
    date: "21 November",
    day: "Saturday",
    time: "3:00 PM",
    totalQuestions: 100,
    marks: 100,
    duration: "60 Minutes",
    status: "Upcoming"
  },
  {
    id: "SF-04",
    examNo: 4,
    title: "Subject Final 04",
    type: "Subject Final",
    subjects: "বাংলাদেশ বিষয়াবলী",
    date: "23 November",
    day: "Monday",
    time: "3:00 PM",
    totalQuestions: 100,
    marks: 100,
    duration: "60 Minutes",
    status: "Upcoming"
  },
  {
    id: "SF-05",
    examNo: 5,
    title: "Subject Final 05",
    type: "Subject Final",
    subjects: "আন্তর্জাতিক বিষয়াবলী",
    date: "25 November",
    day: "Wednesday",
    time: "3:00 PM",
    totalQuestions: 100,
    marks: 100,
    duration: "60 Minutes",
    status: "Upcoming"
  },
  {
    id: "SF-06",
    examNo: 6,
    title: "Subject Final 06",
    type: "Subject Final",
    subjects: "Anatomy + Surgery + Forensic Medicine",
    date: "27 November",
    day: "Friday",
    time: "3:00 PM",
    totalQuestions: 100,
    marks: 100,
    duration: "60 Minutes",
    status: "Upcoming"
  },
  {
    id: "SF-07",
    examNo: 7,
    title: "Subject Final 07",
    type: "Subject Final",
    subjects: "Physiology + Medicine + Biochemistry + Community Medicine",
    date: "29 November",
    day: "Sunday",
    time: "3:00 PM",
    totalQuestions: 100,
    marks: 100,
    duration: "60 Minutes",
    status: "Upcoming"
  },
  {
    id: "SF-08",
    examNo: 8,
    title: "Subject Final 08",
    type: "Subject Final",
    subjects: "Gynaecology & Obs + Pathology + Microbiology + Pharmacology",
    date: "1 December",
    day: "Tuesday",
    time: "3:00 PM",
    totalQuestions: 100,
    marks: 100,
    duration: "60 Minutes",
    status: "Upcoming"
  },
  {
    id: "GM-01",
    examNo: 9,
    title: "Grand Mock 01",
    type: "Grand Mock",
    subjects: "Full Syllabus Mock Test – 01 (BPSC Special BCS Mirror Exam)",
    date: "4 December",
    day: "Friday",
    time: "3:00 PM",
    totalQuestions: 200,
    marks: 200,
    duration: "120 Minutes",
    status: "Upcoming"
  },
  {
    id: "GM-02",
    examNo: 10,
    title: "Grand Mock 02",
    type: "Grand Mock",
    subjects: "Full Syllabus Mock Test – 02 (Final All-Bangladesh Ranking)",
    date: "7 December",
    day: "Monday",
    time: "3:00 PM",
    totalQuestions: 200,
    marks: 200,
    duration: "120 Minutes",
    status: "Upcoming"
  }
];

// Exact 10 Mentors from image_ed966ee5.png
export const MENTORS: Mentor[] = [
  {
    name: "Dr Didarul Hoque Sakib",
    qualification: "MBBS, BCS (Health)",
    cadre: "FCPS Trainee - CMCH, Ex Resident - DMCH",
    designation: "Mentor, CPR Medical Academy",
    institution: "Chittagong Medical College & Hospital (CMCH)"
  },
  {
    name: "Dr. Md. Saimul Islam",
    qualification: "MBBS, BCS (Health)",
    cadre: "FCPS (Final Part) Medicine",
    designation: "Mentor, CPR Medical Academy",
    institution: "Chittagong Medical College & Hospital (CMCH)"
  },
  {
    name: "Dr. A. Z. Md. Sadek",
    qualification: "MBBS, BCS (Health)",
    cadre: "FCPS (Final Part) Medicine",
    designation: "Mentor, CPR Medical Academy",
    institution: "Chittagong Medical College & Hospital (CMCH)"
  },
  {
    name: "Dr. Sahik Ahmed",
    qualification: "MBBS (DMC), BCS (Health)",
    cadre: "FCPS Part 1 (Medicine), MRCP (PACES Candidate)",
    designation: "Mentor, CPR Medical Academy",
    institution: "Chittagong Medical College & Hospital (CMCH)"
  },
  {
    name: "Dr. Shardul Das",
    qualification: "MBBS, 42nd BCS (Health)",
    cadre: "RMO, Kawkhali UHC",
    designation: "Mentor, CPR Medical Academy",
    institution: "Kawkhali Upazila Health Complex"
  },
  {
    name: "Dr. Md. Wahiduzzaman Ashiq",
    qualification: "MBBS (CMC)",
    cadre: "46th BCS Administration (Recommended)",
    designation: "Mentor, CPR Medical Academy",
    institution: "Chittagong Medical College Alumni"
  },
  {
    name: "Dr. Md. Julkarnine",
    qualification: "MBBS, BCS Health (48th & 46th Recommended)",
    cadre: "MD Phase-A (Cardiology), FCPS Part-II (Medicine)",
    designation: "Mentor, CPR Medical Academy",
    institution: "Chittagong Medical College & Hospital (CMCH)"
  },
  {
    name: "Dr. Mohammad Sajid",
    qualification: "MBBS, BCS (Health)",
    cadre: "46th BCS Health, 48th BCS Health Cadre",
    designation: "Mentor, CPR Medical Academy",
    institution: "Special BCS Cadre Specialist"
  },
  {
    name: "Dr. Muhammad Shahnewaz",
    qualification: "MBBS, BCS (Health)",
    cadre: "FCPS P-II (Colorectal Surgery)",
    designation: "Mentor, CPR Medical Academy",
    institution: "Chittagong Medical College Alumni"
  },
  {
    name: "Dr. Nazmul Hasan",
    qualification: "Senior Mentor, Genesis BCS Care",
    cadre: "Ex Senior Teacher: BCS Confidence & BCS Career Aid",
    designation: "Senior Faculty & Cadre Strategist",
    institution: "CPR Medical Academy"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Tanzina Akhter",
    qualification: "MBBS, Candidate for Special BCS (Health)",
    cadreBatch: "Special BCS Batch",
    bmdc: "BMDC A-99124",
    quote: "CPR Medical Academy's Chittagong offline center provides an unparalleled competitive environment. The Subject Finals covered both General and Medical topics precisely.",
    college: "Chittagong Medical College (CMC)"
  },
  {
    name: "Dr. Rashedul Karim",
    qualification: "MBBS, Assistant Surgeon (42nd BCS)",
    cadreBatch: "42nd Special BCS",
    bmdc: "BMDC A-88319",
    quote: "Mentors from CMCH and DMCH reviewed each exam. Eliminating negative marking in the 2 Grand Mocks made all the difference on my exam day.",
    college: "Chittagong Medical College"
  }
];

// Pre-seeded verified candidates for the lookup modal
export const SEEDED_CANDIDATES: RegistrationFormData[] = [
  {
    fullName: "Dr. Tanjim Ahmed Chowdhury",
    whatsappNumber: "01711223344",
    altMobileNumber: "01911223344",
    email: "tanjim.doc@gmail.com",
    bmdcNumber: "A-92834",
    medicalCollege: "Chittagong Medical College (CMC)",
    passingYear: "2023",
    program: "Special BCS Subject Finals & Grand Mock Program",
    examTime: "3:00 PM",
    batchShift: "Day Batch (3:00 PM)",
    examMode: "Offline Campus (Chittagong Center)",
    paymentMethod: "bKash (Online)",
    senderNumber: "01711223344",
    transactionId: "BK9X7281Q",
    amount: 1499,
    registrationId: "26344051", // 8-digit official ID (26 + 344 + 051)
    registrationDate: "2026-11-06",
    status: "Confirmed"
  },
  {
    fullName: "Dr. Farhana Sultana",
    whatsappNumber: "01822334455",
    altMobileNumber: "01622334455",
    email: "dr.farhana.ssmc@gmail.com",
    bmdcNumber: "A-104921",
    medicalCollege: "Dhaka Medical College (DMC)",
    passingYear: "2024",
    program: "Special BCS Subject Finals & Grand Mock Program",
    examTime: "3:00 PM",
    batchShift: "Day Batch (3:00 PM)",
    examMode: "Offline Campus (Chittagong Center)",
    paymentMethod: "Cash (Campus / Offline)",
    cashReceivedBy: "Dr. Md. Saimul Islam",
    amount: 1499,
    registrationId: "26455052", // 8-digit official ID (26 + 455 + 052)
    registrationDate: "2026-11-07",
    status: "Confirmed"
  }
];
