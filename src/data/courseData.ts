import { ExamScheduleItem, Mentor, Testimonial, RegistrationFormData } from '../types';

export const CAMPAIGN_INFO = {
  academyName: "CPR MEDICAL ACADEMY",
  centerTitle: "Centre for Post-Graduation (CPR)",
  taglineBengali: "চট্টগ্রামে একমাত্র অফলাইন মেডিকেল পোস্ট গ্রাজুয়েশন ওরিয়েন্টেশন সেন্টার",
  slogan: "Special BCS (Health) Subject Finals & Grand Mock",
  campaignTitle: "SPECIAL BCS – CPR MEDICAL ACADEMY",
  campaignSubtitle: "SUBJECT FINALS & GRAND MOCK",
  regularPrice: 1499,
  offerPrice: 1499,
  coursePrice: 1499,
  discountSavings: 0,
  enrolledCount: 54, // ইতিমধ্যে ৫৪ জন ভর্তি সম্পন্ন
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
    instructions: "bKash অ্যাপ বা *247# ডায়াল করে Send Money করুন: 01675226753 নম্বরে। পরিমাণ ৳ ১৪৯৯, রেফারেন্স: BCS। সেন্ড মানির পর Transaction ID (TrxID) ইনপুট দিন।"
  },
  cash: {
    title: "Cash Payment (ক্যাশ পেমেন্ট)",
    type: "অফলাইন চকবাজার ক্যাম্পাস / প্রতিনিধি",
    instructions: "আমাদের মতি টাওয়ার, চকবাজার অফিসে বা আমাদের কোনো প্রতিনিধির নিকট সরাসরি ক্যাশ টাকা (৳ ১৪৯৯) জমা দিয়ে থাকলে, যিনি টাকা গ্রহণ করেছেন তার নাম লিখুন।"
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
    registrationId: "CPR-W24-0012",
    rollNumber: "241012",
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
    registrationId: "CPR-W24-0018",
    rollNumber: "241018",
    registrationDate: "2026-11-07",
    status: "Confirmed"
  }
];
