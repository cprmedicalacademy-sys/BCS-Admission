export interface RegistrationFormData {
  // Step 1: Personal Information
  fullName: string;
  whatsappNumber: string;
  altMobileNumber?: string;
  email: string;
  bmdcNumber?: string; // Optional per user request
  medicalCollege: string;
  passingYear: string;

  // Step 2: Admission & Payment Details
  program: string;
  examTime: string; // 3:00 PM
  batchShift: 'Day Batch (3:00 PM)' | 'Online Live & Self-Paced (3:00 PM)';
  examMode: 'Offline Campus (Chittagong Center)' | 'Online Exam Portal (National)';
  notes?: string;
  
  // 2 Payment Options: Online (bKash) or Cash
  paymentMethod: 'bKash (Online)' | 'Cash (Campus / Offline)';
  senderNumber?: string; // for bKash
  transactionId?: string; // for bKash (optional if screenshot provided)
  paymentScreenshot?: string; // Base64 data URL of the bKash payment screenshot
  cashReceivedBy?: string; // for Cash: "কে আমাদের মধ্যে টাকা নিবে তার নাম"
  cashReceiptNo?: string;
  amount: number;

  // Generated metadata
  registrationId?: string;
  rollNumber?: string;
  registrationDate?: string;
  status?: 'Pending WhatsApp Confirmation' | 'Confirmed';
}

export interface ExamScheduleItem {
  id: string;
  examNo: number;
  title: string;
  type: 'Subject Final' | 'Grand Mock';
  subjects: string;
  date: string;
  day: string;
  time: string; // "3:00 PM"
  totalQuestions: number;
  marks: number;
  duration: string;
  status: 'Upcoming' | 'Scheduled';
}

export interface Mentor {
  name: string;
  qualification: string;
  cadre: string;
  designation: string;
  institution: string;
  photoUrl?: string;
}

export interface Testimonial {
  name: string;
  qualification: string;
  cadreBatch: string;
  bmdc: string;
  quote: string;
  college: string;
}
