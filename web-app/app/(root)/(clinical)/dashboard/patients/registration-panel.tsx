"use client";

import React, { useState, useEffect } from "react";
import { 
  X, User, Phone, Mail, MapPin, 
  Stethoscope, AlertCircle, ShieldCheck, 
  Key, Copy, Check, Calendar, 
  ChevronRight, Brain, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface RegistrationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationPanel({ isOpen, onClose }: RegistrationPanelProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [copied, setCopied] = useState(false);

  // Reset state when panel opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSubmitting(false);
      const date = new Date();
      const year = date.getFullYear();
      const random = Math.floor(1000 + Math.random() * 9000);
      setPatientId(`OPT-${year}-${random}`);
      
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let pass = "";
      for (let i = 0; i < 8; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
      setTempPassword(pass);
    }
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`ID: ${patientId}\nPassword: ${tempPassword}`);
    setCopied(true);
    toast.success("Credentials copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Patient registered successfully");
      onClose(); // This will close the panel
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="absolute inset-y-0 right-0 w-full max-w-xl bg-gray-950 border-l border-gray-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-gray-900/40">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400">
                 <Users className="h-5 w-5" />
              </div>
              <div>
                 <h2 className="text-xl font-bold text-gray-100 leading-tight">Patient Intake</h2>
                 <p className="text-xs text-gray-500 font-medium">New clinical record registration</p>
              </div>
           </div>
           <button 
             onClick={onClose}
             className="p-2 rounded-lg hover:bg-gray-800 text-gray-500 transition-colors"
           >
              <X className="h-5 w-5" />
           </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 bg-gray-900/20 border-b border-gray-800 flex items-center justify-between">
           {[1, 2, 3].map((i) => (
             <div key={i} className="flex items-center gap-2">
                <div className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all",
                  step >= i ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-gray-800 text-gray-500"
                )}>
                   {i}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  step >= i ? "text-gray-200" : "text-gray-600"
                )}>
                   {i === 1 ? "Basic Info" : i === 2 ? "Medical Details" : "Clinical Setup"}
                </span>
                {i < 3 && <ChevronRight className="h-3 w-3 text-gray-800" />}
             </div>
           ))}
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
           
           <form id="registration-form" onSubmit={(e) => { e.preventDefault(); handleFinalSubmit(); }}>
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in duration-500">
                   {/* Patient Identity */}
                   <div className="p-5 rounded-2xl bg-blue-600/5 border border-blue-600/10 flex items-center justify-between">
                      <div>
                         <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Auto-Generated ID</p>
                         <h3 className="text-lg font-mono font-bold text-gray-100 mt-0.5">{patientId}</h3>
                      </div>
                      <div className="px-3 py-1 rounded bg-teal-500/10 text-teal-400 text-[9px] font-black uppercase border border-teal-500/20">
                         System Ready
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 space-y-2">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Legal Name</label>
                         <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                            <input required type="text" placeholder="e.g. Rajesh Kumar Sharma" className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:border-blue-600/40 transition-all" />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Age</label>
                         <input required type="number" placeholder="45" className="w-full px-4 py-3.5 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:border-blue-600/40 transition-all" />
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Gender</label>
                         <select className="w-full px-4 py-3.5 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:border-blue-600/40 appearance-none transition-all">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                         </select>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone Number</label>
                         <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                            <input required type="tel" placeholder="+91 98XXX XXXXX" className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:border-blue-600/40 transition-all" />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address</label>
                         <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                            <input required type="email" placeholder="patient@example.com" className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:border-blue-600/40 transition-all" />
                         </div>
                      </div>

                      <div className="col-span-2 space-y-2">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Residential Address / City</label>
                         <div className="relative group">
                            <MapPin className="absolute left-4 top-4 h-4 w-4 text-gray-600" />
                            <textarea placeholder="e.g. Apartment 402, Green Valley, Mumbai" className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:border-blue-600/40 h-24 transition-all" />
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10 animate-in fade-in duration-500">
                   {/* Chronic Conditions */}
                   <div className="space-y-6">
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                         <AlertCircle className="h-4 w-4 text-red-500" /> Chronic Conditions
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                         {["Diabetes Mellitus", "Hypertension", "Glaucoma History", "Asthma"].map((item) => (
                           <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-blue-600/20 cursor-pointer group transition-all">
                              <div className="h-5 w-5 rounded border-2 border-gray-700 flex items-center justify-center transition-colors group-hover:border-blue-600">
                                 <Check className="h-3 w-3 text-blue-500 opacity-0 group-hover:opacity-100" />
                              </div>
                              <span className="text-xs font-bold text-gray-400 group-hover:text-gray-200">{item}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Symptoms */}
                   <div className="space-y-6">
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                         <Brain className="h-4 w-4 text-purple-400" /> Vision Symptoms
                      </h4>
                      <div className="flex flex-wrap gap-2">
                         {["Blurry Vision", "Eye Pain", "Floaters", "Vision Loss", "Headache", "Light Sensitivity", "Dryness"].map((symp) => (
                           <button key={symp} type="button" className="px-4 py-2 rounded-full border border-gray-800 bg-gray-900/40 text-[11px] font-bold text-gray-500 hover:border-purple-600/30 hover:text-purple-400 transition-all">
                              + {symp}
                           </button>
                         ))}
                      </div>
                   </div>

                   {/* Surgery/History */}
                   <div className="space-y-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Previous Eye Surgery Details</label>
                         <textarea placeholder="e.g. Cataract surgery (Left eye) - 2024" className="w-full px-4 py-3.5 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:border-blue-600/40 h-20 transition-all" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Family Medical History</label>
                         <textarea placeholder="e.g. Genetic history of AMD in paternal side" className="w-full px-4 py-3.5 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:border-blue-600/40 h-20 transition-all" />
                      </div>
                   </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10 animate-in fade-in duration-500">
                   {/* Priority Level */}
                   <div className="space-y-6">
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                         <Stethoscope className="h-4 w-4 text-teal-400" /> Clinical Setup
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                         {[
                           { level: "Normal", color: "bg-teal-500" },
                           { level: "Urgent", color: "bg-yellow-500" },
                           { level: "Emergency", color: "bg-red-600" }
                         ].map((p) => (
                           <button key={p.level} type="button" className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-gray-600 flex flex-col items-center gap-2 group transition-all">
                              <div className={cn("h-3 w-3 rounded-full shadow-sm", p.color)} />
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-200">{p.level}</span>
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Assigned Doctor / Consultant</label>
                         <select className="w-full px-4 py-3.5 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none appearance-none">
                            <option>Dr. Rajesh Verma (Lead)</option>
                            <option>Dr. Ananya Iyer</option>
                            <option>Dr. Sameer Khan</option>
                         </select>
                      </div>
                   </div>

                   {/* Credentials Preview */}
                   <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600/10 via-transparent to-teal-500/10 border border-blue-600/20 backdrop-blur-sm space-y-6">
                      <div className="flex items-center gap-3">
                         <div className="h-8 w-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                            <ShieldCheck className="h-4 w-4" />
                         </div>
                         <h4 className="text-sm font-bold text-gray-100">Patient Access Credentials</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1.5 p-4 rounded-2xl bg-black/40 border border-white/5">
                            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Portal Username</p>
                            <p className="text-sm font-mono font-bold text-gray-200 tracking-tight">{patientId}</p>
                         </div>
                         <div className="space-y-1.5 p-4 rounded-2xl bg-black/40 border border-white/5">
                            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Temp Password</p>
                            <p className="text-sm font-mono font-bold text-gray-200 tracking-tight">{tempPassword}</p>
                         </div>
                      </div>

                      <button 
                        type="button"
                        onClick={handleCopy}
                        className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-300 flex items-center justify-center gap-2 transition-all"
                      >
                         {copied ? <Check className="h-3.5 w-3.5 text-teal-400" /> : <Copy className="h-3.5 w-3.5" />}
                         {copied ? "Copied to Clipboard" : "Copy Credentials for Patient"}
                      </button>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-600/5 border border-blue-600/10">
                         <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                         <p className="text-[10px] text-gray-500 leading-relaxed italic">
                            Patient credentials will be provided by the clinic during check-in. They can update their password after first login.
                         </p>
                      </div>
                   </div>
                </div>
              )}
           </form>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-800 bg-gray-900/40 flex items-center justify-between gap-4">
           <button 
             onClick={() => step > 1 ? setStep(step - 1) : onClose()}
             className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-300 transition-colors"
           >
              {step === 1 ? "Cancel" : "Back"}
           </button>
           
           {step < 3 ? (
             <button 
               onClick={() => setStep(step + 1)}
               className="px-10 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
             >
                Continue <ChevronRight className="h-4 w-4" />
             </button>
           ) : (
             <button 
               type="button"
               onClick={handleFinalSubmit}
               disabled={isSubmitting}
               className="px-12 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-black transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
             >
                {isSubmitting ? "Registering..." : "Register Patient"}
             </button>
           )}
        </div>
      </div>
    </div>
  );
}

const Users = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
