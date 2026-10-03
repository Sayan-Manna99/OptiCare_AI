import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  color: string;
  bg: string;
}

export default function StatsCard({ 
  label, value, icon: Icon, trend, color, bg 
}: StatsCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
      bg
    )}>
      <div className="flex items-start justify-between">
        <div className={cn("p-2 rounded-xl bg-white/5 border border-white/10 shadow-sm", color)}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <span className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full border",
            trend.startsWith("+") 
              ? "bg-green-500/10 text-green-400 border-green-500/20" 
              : trend === "Critical" 
                ? "bg-red-500/10 text-red-400 border-red-500/20 animate-pulse"
                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
          )}>
            {trend}
          </span>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-3xl font-black text-gray-100 tracking-tight">{value}</h3>
        <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">{label}</p>
      </div>

      {/* Decorative gradient blur */}
      <div className={cn(
        "absolute -bottom-8 -right-8 h-24 w-24 rounded-full blur-3xl opacity-20",
        color.replace("text-", "bg-")
      )} />
    </div>
  );
}
