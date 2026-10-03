import { 
  Users, Activity, ClipboardCheck, AlertTriangle, 
  Clock, Brain, Stethoscope, FileText 
} from "lucide-react";

export const dashboardStats = [
  {
    label: "Total Patients",
    value: "1,284",
    icon: Users,
    trend: "+12%",
    color: "text-blue-400",
    bg: "bg-blue-600/10 border-blue-600/20",
  },
  {
    label: "Pending Reviews",
    value: "24",
    icon: AlertTriangle,
    trend: "Critical",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
  {
    label: "AI Screenings Today",
    value: "86",
    icon: Brain,
    trend: "+24%",
    color: "text-purple-400",
    bg: "bg-purple-600/10 border-purple-600/20",
  },
  {
    label: "Reports Generated",
    value: "412",
    icon: FileText,
    trend: "Total",
    color: "text-teal-400",
    bg: "bg-teal-400/10 border-teal-400/20",
  },
];

export const recentPatients = [
  {
    id: "OPT-2026-0012",
    name: "Rahul Sharma",
    age: 52,
    gender: "Male",
    lastScan: "2 hours ago",
    aiResult: "CNV",
    confidence: "94%",
    status: "Pending Review",
    severity: "High",
    password: "X6N20MRK",
  },
  {
    id: "OPT-2026-0015",
    name: "Priya Das",
    age: 45,
    gender: "Female",
    lastScan: "5 hours ago",
    aiResult: "NORMAL",
    confidence: "98%",
    status: "Approved",
    severity: "Low",
    password: "TR92MQL1",
  },
  {
    id: "OPT-2026-0019",
    name: "Vikram Malhotra",
    age: 63,
    gender: "Male",
    lastScan: "Yesterday",
    aiResult: "DME",
    confidence: "89%",
    status: "Pending Review",
    severity: "Medium",
    password: "BK08WXN2",
  },
  {
    id: "OPT-2026-0022",
    name: "Sneha Kapur",
    age: 38,
    gender: "Female",
    lastScan: "Yesterday",
    aiResult: "DRUSEN",
    confidence: "91%",
    status: "Approved",
    severity: "Medium",
    password: "LP12SJK4",
  },
  {
    id: "OPT-2026-0025",
    name: "Amit Patel",
    age: 71,
    gender: "Male",
    lastScan: "2 days ago",
    aiResult: "CNV",
    confidence: "87%",
    status: "Follow-up Required",
    severity: "High",
    password: "ZY99BVC0",
  },
];

export const clinicActivities = [
  {
    id: 1,
    type: "screening",
    message: "New AI Screening completed for Rahul Sharma",
    time: "2 hours ago",
    status: "urgent",
  },
  {
    id: 2,
    type: "report",
    message: "Dr. Verma approved report for Priya Das",
    time: "4 hours ago",
    status: "normal",
  },
  {
    id: 3,
    type: "consultation",
    message: "Upcoming consultation with Vikram Malhotra",
    time: "Tomorrow, 10:00 AM",
    status: "scheduled",
  },
];

export const patientTimeline = [
  {
    date: "Oct 12, 2025",
    event: "Initial Screening",
    result: "NORMAL",
    doctor: "Dr. Ananya",
    notes: "Baseline established. No signs of retinopathy.",
  },
  {
    date: "Jan 15, 2026",
    event: "Follow-up Scan",
    result: "DRUSEN",
    doctor: "Dr. Ananya",
    notes: "Early onset detected. Recommended lifestyle adjustments.",
  },
  {
    date: "May 10, 2026",
    event: "Critical Analysis",
    result: "DME",
    doctor: "Dr. Ananya",
    notes: "Fluid detected. Starting medication workflow.",
  },
];
