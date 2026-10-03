"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, Download, Plus, Clock, FileText, 
  Activity, ArrowUpRight, CheckCircle2, UserCircle,
  Bell, Stethoscope, HeartPulse, Brain, Info
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PatientPortalPage() {
  const router = useRouter();
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      {/* 0. PREMIUM NAVIGATION BAR */}
      <nav className="flex items-center justify-between p-6 rounded-[32px] bg-white/[0.02] border border-white/10 backdrop-blur-xl mb-6">
         <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
               <Brain className="h-5 w-5" />
            </div>
            <div>
               <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">OptiCare</p>
               <p className="text-xs font-bold text-white">Patient Hub</p>
            </div>
         </div>

         <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
               <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-gray-900 z-10" />
               <Bell className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div className="h-8 w-px bg-white/10 mx-2" />
            <button 
               onClick={() => router.push("/")}
               className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-bold text-xs"
            >
               Sign Out
            </button>
         </div>
      </nav>

      {/* 1. HERO WELCOME SECTION */}
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-600/20 via-gray-900 to-black border border-gray-800 p-8 md:p-14">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[100px] -ml-24 -mb-24" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3">
               <div className="h-16 w-16 rounded-[24px] bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-600/20">
                  <UserCircle className="h-10 w-10" />
               </div>
               <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">Welcome back, <br/><span className="text-blue-400">Rahul Sharma</span></h1>
                  <div className="flex items-center gap-2 mt-2">
                     <ShieldCheck className="h-4 w-4 text-teal-400" />
                     <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em]">Verified Secure Access • OPT-DEMO-2026</p>
                  </div>
               </div>
            </div>
            
            <p className="text-lg text-gray-400 font-medium leading-relaxed">
               Your latest retinal screenings have been processed by <span className="text-white">OptiCare</span>. Your assigned doctor, <span className="text-blue-400">Dr. Rajesh Verma</span>, is monitoring your progress.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
               <button className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all shadow-2xl shadow-blue-600/30 flex items-center gap-3 active:scale-95">
                  <Download className="h-5 w-5" /> Download Latest Report
               </button>
               <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white font-black hover:bg-white/10 transition-all flex items-center gap-3">
                  <Plus className="h-5 w-5" /> Book Consultation
               </button>
            </div>
          </div>

          {/* Health Pulse Card */}
          <div className="p-8 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-xl lg:w-80 space-y-6">
             <div className="flex items-center justify-between">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Health Pulse</p>
                <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
             </div>
             <div className="space-y-1">
                <p className="text-4xl font-black text-white tracking-tighter">92%</p>
                <p className="text-xs text-teal-400 font-bold">Stability Score</p>
             </div>
             <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-teal-400 w-[92%]" />
             </div>
             <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                Your retinal stability has improved by <span className="text-teal-400 font-bold">4.2%</span> since your baseline scan in October.
             </p>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Findings & Timeline */}
        <div className="lg:col-span-2 space-y-10">
           
           {/* AI HEATMAP PREVIEW (The "WOW" Factor) */}
           <div className="group relative rounded-[40px] bg-black border border-gray-800 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              <div className="aspect-video relative overflow-hidden">
                 {/* Mock Retinal Scan with Heatmap Overlay */}
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000')] bg-cover bg-center grayscale opacity-40 group-hover:scale-105 transition-transform duration-[2000ms]" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48 rounded-full border-2 border-red-500/50 flex items-center justify-center animate-pulse">
                       <div className="absolute inset-0 bg-red-500/10 rounded-full blur-2xl" />
                       <div className="text-center z-20">
                          <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Detection Zone</p>
                          <p className="text-sm font-black text-white">CNV ACTIVITY</p>
                       </div>
                    </div>
                 </div>
                 {/* AI Scanner Line */}
                 <div className="absolute left-0 right-0 h-0.5 bg-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-20 animate-[scan_4s_ease-in-out_infinite]" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex items-end justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Live Analysis View</p>
                    <h3 className="text-2xl font-black text-white tracking-tight">AI Retinal Mapping</h3>
                    <p className="text-xs text-gray-400 font-medium max-w-xs">AI-driven pathology detection highlighted in red. Analysis verified by Dr. Rajesh Verma.</p>
                 </div>
                 <button className="px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                    Expand Details
                 </button>
              </div>
           </div>

           {/* Recent Clinic Visits */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-4">
                 <h2 className="text-2xl font-black text-white tracking-tight">Recent Clinic Visits</h2>
                 <button className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] hover:text-blue-300 transition-colors">View All Visits</button>
              </div>

              <div className="space-y-0 relative before:absolute before:left-[35px] before:top-10 before:bottom-10 before:w-px before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
                 {[
                   { date: "May 10, 2026", type: "Clinical Screening", result: "CNV", note: "Immediate follow-up required for injection therapy.", doctor: "Dr. Rajesh Verma", status: "Recent" },
                   { date: "Jan 15, 2026", type: "Routine Checkup", result: "DRUSEN", note: "Retinal layers stable. Continue taking PreserVision AREDS 2.", doctor: "Dr. Rajesh Verma", status: "Baseline" }
                 ].map((visit, idx) => (
                   <div key={idx} className="relative pl-20 pb-12 last:pb-0 group">
                      <div className={cn(
                        "absolute left-[27px] top-2 h-4 w-4 rounded-full border-2 border-gray-950 z-10 transition-all duration-500",
                        idx === 0 ? "bg-red-500 ring-8 ring-red-500/10 scale-125" : "bg-gray-800 ring-8 ring-gray-800/10"
                      )} />
                      <div className="p-8 rounded-[32px] bg-gray-900/30 border border-gray-800 hover:border-gray-700 hover:bg-gray-900/50 transition-all duration-500 group-hover:translate-x-1">
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                               <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">{visit.status}</p>
                               <h4 className="text-xl font-bold text-gray-100">{visit.date}</h4>
                               <p className="text-xs text-gray-500 font-medium">{visit.type} • {visit.doctor}</p>
                            </div>
                            <div className={cn(
                               "px-4 py-1.5 rounded-xl border text-[11px] font-black uppercase tracking-widest",
                               visit.result === "NORMAL" ? "bg-teal-500/5 text-teal-400 border-teal-500/10" : "bg-red-500/5 text-red-400 border-red-500/10"
                            )}>
                               {visit.result}
                            </div>
                         </div>
                         <div className="p-5 rounded-2xl bg-black/40 border border-gray-800/50 flex items-start gap-4">
                            <Info className="h-5 w-5 text-gray-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-400 leading-relaxed italic font-medium">
                               "{visit.note}"
                            </p>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Column: Care Plan & Prescription Wallet */}
        <div className="space-y-8">
           
           {/* DIGITAL PRESCRIPTION WALLET */}
           <div className="p-8 rounded-[40px] bg-gradient-to-br from-teal-500/20 via-gray-900 to-black border border-teal-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-32 w-32 bg-teal-500/5 rounded-full blur-[60px] -mr-16 -mt-16" />
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                 <div className="h-10 w-10 rounded-2xl bg-teal-400 flex items-center justify-center text-black shadow-lg shadow-teal-400/20">
                    <HeartPulse className="h-5 w-5" />
                 </div>
                 Active Prescriptions
              </h3>
              
              <div className="space-y-6">
                 {[
                   { name: "Lucentis 0.5mg", schedule: "Next Injection: May 24", type: "Intravitreal" },
                   { name: "PreserVision AREDS 2", schedule: "Twice daily with food", type: "Vitamins" }
                 ].map((med, i) => (
                   <div key={i} className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 group-hover:border-teal-500/40 transition-all">
                      <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1">{med.type}</p>
                      <p className="text-lg font-bold text-white mb-2">{med.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                         <Clock className="h-3 w-3" />
                         {med.schedule}
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-4 rounded-xl border border-teal-500/20 text-[10px] font-black text-teal-400 hover:bg-teal-500/10 transition-all uppercase tracking-[0.2em]">
                    View History
                 </button>
              </div>
           </div>

           {/* Knowledge Hub */}
           <div className="p-8 rounded-[40px] bg-gray-900/40 border border-gray-800 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                 <div className="h-10 w-10 rounded-2xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center text-teal-400">
                    <FileText className="h-5 w-5" />
                 </div>
                 Knowledge Hub
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                 Learn more about your condition and how to maintain optimal retinal health.
              </p>
              <div className="space-y-3">
                 {[
                   "Understanding CNV Progression",
                   "Lifestyle Tips for Eye Health",
                   "Nutrition & Macular Support"
                 ].map((resource, i) => (
                   <button key={i} className="w-full p-4 rounded-2xl bg-black/40 border border-gray-800 flex items-center justify-between group hover:border-teal-400/30 transition-all">
                      <span className="text-xs text-gray-400 font-bold group-hover:text-gray-200 transition-colors">{resource}</span>
                      <ArrowUpRight className="h-4 w-4 text-gray-700 group-hover:text-teal-400 transition-all" />
                   </button>
                 ))}
              </div>
           </div>

           {/* Medical Alert */}
           <div className="p-6 rounded-[32px] bg-red-500/5 border border-red-500/10">
              <div className="flex items-start gap-4">
                 <Bell className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                 <div className="space-y-1">
                    <h4 className="text-xs font-black text-red-400 uppercase tracking-widest">Medical Alert</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                       If you notice sudden blurry vision or distortion in your straight-line vision, contact the clinic immediately.
                    </p>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
