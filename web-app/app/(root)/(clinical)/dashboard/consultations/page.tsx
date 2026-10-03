"use client";

import React from "react";
import { 
  MessageSquare, Video, Calendar, Clock, 
  User, ChevronRight, Plus, Search
} from "lucide-react";
import { recentPatients } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ConsultationsPage() {
  const handleAction = (type: string, name: string) => {
    if (type === "video") {
      toast.info(`Connecting to encrypted video call with ${name}...`);
    } else {
      toast.success(`Opening secure channel for ${name}`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-100 tracking-tight">Consultations</h1>
          <p className="text-gray-500 font-medium mt-1">Manage appointments and patient communications.</p>
        </div>
        <button 
          onClick={() => toast.success("Opening appointment scheduler...")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20"
        >
          <Plus className="h-4 w-4" /> Schedule Meeting
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments List */}
        <div className="lg:col-span-2 space-y-4">
           <h2 className="text-xl font-bold text-gray-200">Upcoming Appointments</h2>
           <div className="space-y-4">
              {recentPatients.slice(0, 3).map((patient, i) => (
                <div key={patient.id} className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-600/20 flex items-center justify-center text-blue-400 font-black text-xl">
                         {patient.name[0]}
                      </div>
                      <div>
                         <h3 className="text-lg font-bold text-gray-100">{patient.name}</h3>
                         <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                               <Calendar className="h-3.5 w-3.5" /> May {12 + i}, 2026
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium border-l border-gray-800 pl-3">
                               <Clock className="h-3.5 w-3.5" /> 10:{30 + (i * 15)} AM
                            </span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleAction("message", patient.name)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 text-sm font-bold hover:bg-gray-700 transition-all"
                      >
                         <MessageSquare className="h-4 w-4" /> Message
                      </button>
                      <button 
                        onClick={() => handleAction("video", patient.name)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
                      >
                         <Video className="h-4 w-4" /> Join Call
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Messaging Sidebar */}
        <div className="space-y-4">
           <h2 className="text-xl font-bold text-gray-200">Recent Chats</h2>
           <div className="rounded-2xl bg-gray-900/40 border border-gray-800 overflow-hidden backdrop-blur-sm divide-y divide-gray-800/50">
              {recentPatients.map((patient) => (
                <div 
                  key={patient.id} 
                  onClick={() => handleAction("message", patient.name)}
                  className="p-4 flex items-center gap-3 hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                   <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                      {patient.name[0]}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                         <p className="text-sm font-bold text-gray-200 truncate">{patient.name}</p>
                         <span className="text-[9px] text-gray-600 font-bold uppercase">2h ago</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">Thank you doctor, the report was very helpful.</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
