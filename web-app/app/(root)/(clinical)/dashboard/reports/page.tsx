"use client";

import React from "react";
import { 
  FileText, Download, Eye, Search, 
  Filter, Calendar, ChevronRight, FileCheck 
} from "lucide-react";
import { recentPatients } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ReportsPage() {
  const handleAction = (type: string, name: string) => {
    if (type === "download") {
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: `Generating PDF for ${name}...`,
          success: `Report downloaded successfully!`,
          error: 'Failed to generate report.',
        }
      );
    } else {
      toast.info(`Opening interactive viewer for ${name}'s report`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-100 tracking-tight">Medical Reports</h1>
          <p className="text-gray-500 font-medium mt-1">Access and manage generated patient diagnosis reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Report Stats */}
        {[
          { label: "Total Reports", value: "412", color: "text-blue-400" },
          { label: "Awaiting Approval", value: "12", color: "text-yellow-400" },
          { label: "Generated Today", value: "18", color: "text-teal-400" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
            <h3 className={cn("text-3xl font-black mt-1", stat.color)}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Reports List */}
      <div className="rounded-2xl bg-gray-900/40 border border-gray-800 overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-gray-800 bg-gray-800/10 flex flex-col sm:flex-row justify-between gap-4">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search reports by patient or ID..." 
                className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-gray-900/60 border border-gray-700 text-sm text-gray-200 focus:outline-none focus:border-blue-600/40 transition-colors"
              />
           </div>
           <button 
            onClick={() => toast.info("Filter panel coming soon")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 text-sm font-bold hover:bg-gray-700 transition-all"
           >
              <Filter className="h-4 w-4" /> Filter
           </button>
        </div>
        
        <div className="divide-y divide-gray-800/50">
          {recentPatients.map((patient) => (
            <div key={patient.id} className="p-6 flex items-center justify-between group hover:bg-white/[0.01] transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/20 transition-all">
                   <FileCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-200">{patient.name} - Diagnosis Report</h4>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mt-0.5">REF: RPT-{patient.id} • {patient.lastScan}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleAction("view", patient.name)}
                  className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-blue-400 hover:border-blue-600/30 transition-all"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleAction("download", patient.name)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/20"
                >
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
