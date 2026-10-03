"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Eye } from "lucide-react";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <Eye className="h-5 w-5 text-white" />
        </div>
        <span className="text-sm font-bold text-gray-200">OptiCare</span>
      </Link>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-gray-800 text-gray-400 border border-gray-700"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div className={cn(
        "fixed inset-y-0 left-0 w-64 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar />
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-4 p-2 text-gray-500 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
