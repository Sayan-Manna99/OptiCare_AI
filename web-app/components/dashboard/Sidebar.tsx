"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, Brain, FileText, 
  BarChart3, Settings, MessageSquare, 
  ChevronRight, Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Patients", href: "/dashboard/patients", icon: Users },
  { name: "AI Screenings", href: "/dashboard/screenings", icon: Brain },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Consultations", href: "/dashboard/consultations", icon: MessageSquare },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 flex flex-col z-40 overflow-hidden group">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Eye className="h-6 w-6 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-black text-gray-100">OptiCare</p>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Clinical Hub</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-lg shadow-blue-600/5" 
                  : "text-gray-500 hover:bg-gray-800 hover:text-gray-200"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5", isActive ? "text-blue-400" : "text-gray-500 group-hover:text-blue-400/80")} />
                <span className="text-sm font-semibold tracking-wide">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* Profile Summary */}
      <div className="p-4 mt-auto border-t border-gray-800">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-800/40 border border-gray-700/30">
          <div className="h-10 w-10 rounded-lg bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-400 font-bold">
            DR
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-200 truncate">Dr. Rajesh Verma</p>
            <p className="text-[10px] text-gray-500 font-medium truncate">Chief Ophthalmologist</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
