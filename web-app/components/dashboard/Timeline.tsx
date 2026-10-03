import React from "react";
import { CheckCircle, Clock, AlertCircle, Brain, FileText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  date: string;
  event: string;
  result: string;
  doctor: string;
  notes: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <div key={index} className="relative pl-8 group">
          {/* Timeline connector */}
          {index !== items.length - 1 && (
            <div className="absolute left-[15px] top-8 bottom-[-32px] w-0.5 bg-gray-800 group-hover:bg-blue-600/30 transition-colors" />
          )}

          {/* Timeline point */}
          <div className={cn(
            "absolute left-0 top-1.5 h-8 w-8 rounded-full border-4 border-gray-900 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 shadow-lg",
            item.result === "NORMAL" ? "bg-teal-500 shadow-teal-500/20" : "bg-red-500 shadow-red-500/20"
          )}>
            {item.result === "NORMAL" ? <CheckCircle className="h-4 w-4 text-white" /> : <AlertCircle className="h-4 w-4 text-white" />}
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm group-hover:border-blue-600/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{item.date}</span>
                <h3 className="text-lg font-bold text-gray-100 mt-1">{item.event}</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "px-3 py-1 rounded-lg text-xs font-black border",
                  item.result === "NORMAL" ? "bg-teal-500/10 text-teal-400 border-teal-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                )}>
                  {item.result}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Brain className="h-3.5 w-3.5" />
                    <span className="font-bold uppercase tracking-wider">AI Assessment</span>
                 </div>
                 <p className="text-sm text-gray-400 italic">"Model observed {item.result.toLowerCase()} markers in the macular region. Structural integrity remains stable."</p>
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FileText className="h-3.5 w-3.5" />
                    <span className="font-bold uppercase tracking-wider">Clinical Notes</span>
                 </div>
                 <p className="text-sm text-gray-300">{item.notes}</p>
                 <div className="flex items-center gap-1.5 mt-2">
                    <div className="h-5 w-5 rounded-full bg-blue-600/20 flex items-center justify-center">
                       <Clock className="h-3 w-3 text-blue-400" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Reviewed by {item.doctor}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
