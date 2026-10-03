"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ScanLine, Brain, LogOut } from "lucide-react";
import { signOut } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";

interface LandingActionsProps {
  isAuthenticated: boolean;
  type: "navbar" | "hero";
}

export default function LandingActions({ isAuthenticated, type }: LandingActionsProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      router.refresh();
    }
  };

  // During initial hydration, render a placeholder or the server's version to match exactly
  // If we want to be safe, we can render the "logged out" state as default if we can't guarantee session sync
  if (!mounted) {
    if (type === "navbar") {
      return (
        <div className="flex items-center gap-3">
          <div className="h-8 w-20 bg-gray-800 animate-pulse rounded-xl" />
        </div>
      );
    }
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <div className="h-12 w-48 bg-gray-800 animate-pulse rounded-xl" />
      </div>
    );
  }

  if (type === "navbar") {
    return (
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl transition-all shadow-lg shadow-blue-600/25">
              Dashboard
            </Link>
            <button 
              onClick={handleSignOut}
              className="text-sm font-semibold text-gray-400 hover:text-red-400 transition-colors px-3 py-2 flex items-center gap-1.5"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <Link href="/sign-in" className="text-sm font-semibold text-gray-300 hover:text-blue-400 transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link href="/sign-up" className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-600/25">
              Get Started
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
      {isAuthenticated ? (
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all shadow-xl shadow-blue-600/25">
            Go to Doctor Portal <ArrowRight className="h-5 w-5" />
          </Link>
          <button 
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-red-500/50 text-gray-400 hover:text-red-400 font-bold text-base transition-all"
          >
            <LogOut className="h-5 w-5" /> Sign Out
          </button>
        </div>
      ) : (
        <>
          <a href="#roles" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all shadow-xl shadow-blue-600/25">
            <ScanLine className="h-5 w-5" /> Start Screening
          </a>
          <a href="#features" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-600/40 text-gray-200 font-bold text-base transition-all">
            Explore Platform <Brain className="h-5 w-5" />
          </a>
        </>
      )}
    </div>
  );
}
