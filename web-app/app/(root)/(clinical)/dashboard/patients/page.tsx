"use client";

import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { 
  Search, Filter, Plus, MoreVertical, 
  ArrowUpRight, Download, Users, Key,
  X, ShieldCheck, Copy, Info
} from "lucide-react";
import { recentPatients } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import RegistrationPanel from "./registration-panel";

export default function PatientsPage() {
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState<any>(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Registration Panel */}
      <RegistrationPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />

      {/* Credential Spotlight Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedPatient(null)} />
           <div className="relative w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400">
                       <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-gray-100">Portal Credentials</h3>
                       <p className="text-xs text-gray-500">{selectedPatient.name}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedPatient(null)} className="p-2 rounded-lg hover:bg-gray-800 text-gray-500 transition-colors">
                    <X className="h-5 w-5" />
                 </button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Portal User ID</label>
                    <div className="flex items-center gap-2 p-4 rounded-2xl bg-blue-600/5 border border-blue-600/20 group">
                       <span className="text-2xl font-mono font-black text-blue-400 tracking-tighter flex-1">{selectedPatient.id}</span>
                       <button 
                         onClick={() => {
                            navigator.clipboard.writeText(selectedPatient.id);
                            toast.success("User ID copied");
                         }}
                         className="p-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-600/40 text-gray-400 hover:text-blue-400 transition-all"
                       >
                          <Copy className="h-4 w-4" />
                       </button>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Temporary Password</label>
                    <div className="flex items-center gap-2 p-4 rounded-2xl bg-teal-500/5 border border-teal-500/20 group">
                       <span className="text-2xl font-mono font-black text-teal-400 tracking-tighter flex-1">{selectedPatient.password || "X6N20MRK"}</span>
                       <button 
                         onClick={() => {
                            navigator.clipboard.writeText(selectedPatient.password || "X6N20MRK");
                            toast.success("Password copied");
                         }}
                         className="p-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-teal-500/40 text-gray-400 hover:text-teal-400 transition-all"
                       >
                          <Copy className="h-4 w-4" />
                       </button>
                    </div>
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800">
                 <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
                    <Info className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gray-500 leading-relaxed italic">
                       These credentials allow the patient to access their personal OptiCare portal. They will be prompted to change their password upon first login.
                    </p>
                 </div>
                 <button 
                   onClick={() => setSelectedPatient(null)}
                   className="w-full mt-6 py-4 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold transition-all border border-gray-700"
                 >
                    Close Secure View
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-100 tracking-tight">Patient Directory</h1>
          <p className="text-gray-500 font-medium mt-1">Manage and monitor your clinical patient records.</p>
        </div>
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20"
        >
          <Plus className="h-4 w-4" /> Register New Patient
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by name, ID, or condition..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/40 border border-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 font-semibold hover:bg-gray-700 transition-all">
          <Filter className="h-4 w-4" /> Filters
        </button>
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 font-semibold hover:bg-gray-700 transition-all">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* Patients Table */}
      <div className="rounded-2xl bg-gray-900/40 border border-gray-800 overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-800/20">
              <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Patient ID</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Full Name</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Demographics</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Last AI Diagnosis</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Severity</th>
              <th className="px-6 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-blue-400/80 bg-blue-600/5 px-2 py-1 rounded border border-blue-600/10">
                        {patient.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-200">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {patient.age}y • {patient.gender}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={cn(
                          "text-[10px] font-black px-2 py-0.5 rounded w-fit border",
                          patient.aiResult === "NORMAL" 
                            ? "bg-teal-500/10 text-teal-400 border-teal-500/20" 
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        )}>
                          {patient.aiResult}
                        </span>
                        <p className="text-[10px] text-gray-600 font-medium">{patient.lastScan}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-bold",
                        patient.severity === "High" ? "text-red-400" : patient.severity === "Medium" ? "text-yellow-400" : "text-teal-400"
                      )}>
                        {patient.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link 
                          href="/dashboard/screenings"
                          className="text-[10px] font-black text-blue-400/70 hover:text-blue-400 transition-colors uppercase tracking-widest bg-blue-600/5 px-2 py-1 rounded border border-blue-600/10"
                        >
                          View EHR
                        </Link>
                        <button 
                          onClick={() => setSelectedPatient(patient)}
                          className="p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-600/5 transition-all group"
                          title="Show Login Credentials"
                        >
                          <Key className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="p-2 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-all">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Placeholder */}
      <div className="flex items-center justify-between text-xs font-bold text-gray-600 uppercase tracking-widest">
        <p>Showing 5 of 1,284 patients</p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-lg border border-gray-800 hover:bg-gray-800 disabled:opacity-50" disabled>Previous</button>
          <button className="px-4 py-2 rounded-lg border border-gray-800 hover:bg-gray-800">Next</button>
        </div>
      </div>
    </div>
  );
}
