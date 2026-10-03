"use client";

import React from "react";
import { 
  BarChart3, TrendingUp, PieChart, Activity, 
  Target, Zap, AlertTriangle, CheckCircle,
  Calendar, ArrowUpRight, ArrowDownRight, Users,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

const analyticsStats = [
  { label: "Clinic Efficiency", value: "94.2%", icon: Zap, color: "text-yellow-400", trend: "+2.4%", trendUp: true },
  { label: "AI Prediction Accuracy", value: "93.1%", icon: Target, color: "text-blue-400", trend: "+0.8%", trendUp: true },
  { label: "Avg. Review Time", value: "4.2m", icon: Activity, color: "text-teal-400", trend: "-12%", trendUp: false },
  { label: "Critical Referrals", value: "128", icon: AlertTriangle, color: "text-red-400", trend: "+14%", trendUp: true },
];

const diseaseDistribution = [
  { name: "CNV", count: 412, percentage: 32, color: "bg-red-500" },
  { name: "DME", count: 284, percentage: 22, color: "bg-orange-500" },
  { name: "DRUSEN", count: 198, percentage: 15, color: "bg-purple-500" },
  { name: "NORMAL", count: 390, percentage: 31, color: "bg-teal-500" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-100 tracking-tight">Healthcare Analytics</h1>
          <p className="text-gray-500 font-medium mt-1">Deep insights into clinical performance and disease distribution.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-xs font-bold text-gray-300">Last 30 Days</span>
           </div>
           <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20">
              <Download className="h-4 w-4" /> Report
           </button>
        </div>
      </div>

      {/* Analytics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsStats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm relative overflow-hidden group">
            <div className="flex items-start justify-between mb-4">
              <div className={cn("p-2.5 rounded-xl bg-white/5 border border-white/10", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full border",
                stat.trendUp ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
              )}>
                {stat.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.trend}
              </div>
            </div>
            <h3 className="text-3xl font-black text-gray-100 tracking-tight">{stat.value}</h3>
            <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
            
            <div className={cn(
              "absolute -bottom-6 -right-6 h-20 w-20 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity",
              stat.color.replace("text-", "bg-")
            )} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Disease Distribution Chart (Custom CSS) */}
        <div className="p-8 rounded-3xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-gray-200 mb-8">Disease Distribution</h2>
          <div className="space-y-6">
            {diseaseDistribution.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-gray-400">{item.name}</span>
                  <span className="text-gray-200">{item.count} Cases ({item.percentage}%)</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-800 overflow-hidden p-0.5 border border-gray-700/50">
                  <div 
                    className={cn("h-full rounded-full shadow-lg transition-all duration-1000 ease-out", item.color)} 
                    style={{ width: `${item.percentage}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 p-4 rounded-xl bg-blue-600/5 border border-blue-600/20">
             <p className="text-xs text-gray-500 leading-relaxed">
               <span className="text-blue-400 font-bold">Trend Analysis:</span> CNV detection has increased by 14% this month, correlating with the new intake from the Central Eye Clinic.
             </p>
          </div>
        </div>

        {/* Weekly Activity Heatmap Placeholder */}
        <div className="p-8 rounded-3xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm flex flex-col">
          <h2 className="text-xl font-bold text-gray-200 mb-8">Screening Density (Weekly)</h2>
          <div className="flex-1 grid grid-cols-7 grid-rows-4 gap-2">
             {Array.from({ length: 28 }).map((_, i) => {
                const intensity = Math.random();
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "rounded-lg transition-all duration-500 hover:scale-110",
                      intensity > 0.8 ? "bg-blue-600" : intensity > 0.5 ? "bg-blue-600/60" : intensity > 0.2 ? "bg-blue-600/30" : "bg-gray-800"
                    )}
                  />
                );
             })}
          </div>
          <div className="mt-6 flex items-center justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
             <span>Mon</span>
             <span>Tue</span>
             <span>Wed</span>
             <span>Thu</span>
             <span>Fri</span>
             <span>Sat</span>
             <span>Sun</span>
          </div>
          <div className="mt-8 flex items-center gap-4">
             <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                   <p className="text-sm font-bold text-gray-200">284 Scans</p>
                   <p className="text-[10px] text-gray-600">Total this week</p>
                </div>
             </div>
             <div className="h-8 w-px bg-gray-800" />
             <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-teal-400" />
                <div>
                   <p className="text-sm font-bold text-gray-200">+18%</p>
                   <p className="text-[10px] text-gray-600">Growth vs. last week</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
