"use client";

import React, { useState } from "react";
import { 
  Brain, CheckCircle, XCircle, MessageSquare, 
  Eye, Download, Share2, Info, ChevronRight,
  AlertCircle, Activity, FileText, Stethoscope
} from "lucide-react";
import { recentPatients } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { toast } from "sonner";

export default function ScreeningsPage() {
  const [selectedPatient, setSelectedPatient] = useState(recentPatients[0]);
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = (type: "approve" | "reject") => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (type === "approve") {
        toast.success(`Report approved and generated for ${selectedPatient.name}`);
      } else {
        toast.error(`AI result rejected for ${selectedPatient.name}. Forwarded for manual review.`);
      }
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col lg:flex-row gap-8 animate-in fade-in duration-700">
      {/* Left List - Pending Screenings */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-black text-gray-100 tracking-tight">AI Review Queue</h1>
          <span className="px-2 py-1 rounded bg-blue-600/20 border border-blue-600/30 text-[10px] font-black text-blue-400 uppercase">
            {recentPatients.filter(p => p.status === "Pending Review").length} Pending
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
          {recentPatients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={cn(
                "w-full text-left p-4 rounded-2xl border transition-all duration-200 group relative overflow-hidden",
                selectedPatient.id === patient.id 
                  ? "bg-blue-600/10 border-blue-600/40 shadow-lg shadow-blue-600/5" 
                  : "bg-gray-900/40 border-gray-800 hover:border-gray-700"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-bold text-gray-200">{patient.name}</p>
                <span className={cn(
                  "text-[9px] font-black px-1.5 py-0.5 rounded uppercase border",
                  patient.status === "Approved" ? "bg-teal-500/10 text-teal-400 border-teal-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                )}>
                  {patient.status === "Approved" ? "Reviewed" : "Review Required"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Brain className="h-3 w-3 text-purple-400" />
                  <span className="text-[11px] font-bold text-gray-400">{patient.aiResult}</span>
                </div>
                <div className="flex items-center gap-1 border-l border-gray-800 pl-3">
                  <Activity className="h-3 w-3 text-blue-400" />
                  <span className="text-[11px] font-bold text-gray-400">{patient.confidence}</span>
                </div>
              </div>
              
              {selectedPatient.id === patient.id && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Detail - AI Analysis Panel */}
      <div className="flex-1 rounded-3xl bg-gray-900/40 border border-gray-800 flex flex-col overflow-hidden backdrop-blur-md transition-all animate-in zoom-in-95 duration-300" key={selectedPatient.id}>
        {/* Detail Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-gray-800/10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 font-black text-xl">
              {selectedPatient.name[0]}
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-100 leading-tight">{selectedPatient.name}</h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">ID: {selectedPatient.id} • {selectedPatient.age}y • {selectedPatient.gender}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-gray-200 transition-all">
              <Download className="h-4 w-4" />
            </button>
            <button className="p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-gray-200 transition-all">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Detail Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Scan Image Placeholder */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Retinal Scan (OCT)</p>
                <span className="text-[10px] font-medium text-gray-600">Captured: {selectedPatient.lastScan}</span>
              </div>
              <div className="aspect-square rounded-2xl bg-black border border-gray-800 overflow-hidden relative group cursor-crosshair">
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                   <Eye className="h-24 w-24 text-blue-600/20" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-gray-900/80 border border-gray-700/50 backdrop-blur-md">
                   <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                      <span>SCAN_REF_0392.DICOM</span>
                      <span>1.2 MB</span>
                   </div>
                </div>
              </div>
            </div>

            {/* AI Result Cards */}
            <div className="space-y-6">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest">AI Prediction Insight</p>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/5 border border-blue-600/20 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 h-32 w-32 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-100 tracking-tight">{selectedPatient.aiResult}</h3>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Detection Confidence: {selectedPatient.confidence}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  "AI indicates high probability of {selectedPatient.aiResult}. Pattern analysis suggests focal thickening and subretinal fluid markers consistent with clinical presentation."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-3.5 w-3.5 text-yellow-400" />
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Severity</p>
                  </div>
                  <p className={cn(
                    "text-sm font-bold",
                    selectedPatient.severity === "High" ? "text-red-400" : "text-yellow-400"
                  )}>{selectedPatient.severity} Risk</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-3.5 w-3.5 text-teal-400" />
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Reliability</p>
                  </div>
                  <p className="text-sm font-bold text-teal-400 text-sm">Optimal Scan</p>
                </div>
              </div>
              
              {/* Doctor Notes Section */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest block">Doctor's Observation</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add clinical notes, diagnosis override, or treatment advice..."
                  className="w-full min-h-[120px] p-4 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600/40 transition-all placeholder:text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detail Footer - Actions */}
        <div className="p-6 border-t border-gray-800 bg-gray-800/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-widest">
                <Info className="h-3.5 w-3.5" /> Case Details
             </button>
             <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-widest border-l border-gray-800 pl-4">
                <AlertCircle className="h-3.5 w-3.5" /> Flag AI Error
             </button>
          </div>
          <div className="w-full sm:w-auto">
            <button 
              onClick={() => handleAction("approve")}
              disabled={isProcessing}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm transition-all shadow-2xl shadow-blue-600/30 disabled:opacity-50 group"
            >
              {isProcessing ? (
                <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <FileText className="h-5 w-5 group-hover:scale-110 transition-transform" />
              )}
              {isProcessing ? "Generating Report..." : "Finalize & Download Report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
