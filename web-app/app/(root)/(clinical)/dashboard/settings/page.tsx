"use client";

import React, { useState } from "react";
import { 
  Settings, User, Bell, Shield, 
  Globe, Database, CreditCard, ChevronRight,
  LogOut, Save, Camera, CheckCircle2, AlertCircle,
  Key, Smartphone, History, Trash2, Cloud, Download,
  ExternalLink, CreditCard as CardIcon, FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/actions/auth.actions";
import { toast } from "sonner";

const settingsSections = [
  { id: "profile", label: "Profile Information", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security & Privacy", icon: Shield },
  { id: "clinic", label: "Clinic Configuration", icon: Globe },
  { id: "billing", label: "Billing & Plans", icon: CreditCard },
  { id: "data", label: "Data Management", icon: Database },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  
  // Toggle States
  const [is2FA, setIs2FA] = useState(true);
  const [notifs, setNotifs] = useState({
    ai: true,
    critical: true,
    reminders: false,
    reports: true
  });

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings updated successfully");
    }, 1000);
  };

  const handleSignOut = async () => {
    const res = await signOut();
    if (res.success) {
      window.location.href = "/";
    }
  };

  return (
    <div className="max-w-5xl space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-100 tracking-tight">Settings</h1>
          <p className="text-gray-500 font-medium mt-1">Manage your professional profile and clinic preferences.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest">
           System Status: Operational
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-1">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-bold group",
                activeTab === section.id 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-lg shadow-blue-600/5" 
                  : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
              )}
            >
              <div className="flex items-center gap-3">
                <section.icon className={cn("h-4 w-4 transition-colors", activeTab === section.id ? "text-blue-400" : "text-gray-600 group-hover:text-blue-400/70")} />
                {section.label}
              </div>
              {activeTab === section.id && <ChevronRight className="h-3 w-3 opacity-50" />}
            </button>
          ))}
          
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/5 transition-all text-sm font-bold mt-4 border border-transparent hover:border-red-500/20"
          >
             <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500" key={activeTab}>
           
           {/* Profile Section */}
           {activeTab === "profile" && (
             <div className="p-8 rounded-3xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm space-y-8">
                <div className="flex items-center gap-6">
                   <div className="relative group cursor-pointer">
                      <div className="h-24 w-24 rounded-3xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-400 text-3xl font-black transition-all group-hover:bg-blue-600/30">
                         RV
                      </div>
                      <div className="absolute inset-0 rounded-3xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <Camera className="h-6 w-6 text-white" />
                      </div>
                   </div>
                   <div>
                      <h2 className="text-xl font-bold text-gray-100">Dr. Rajesh Verma</h2>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Chief Ophthalmologist • City Eye Clinic</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 text-[9px] font-black border border-teal-500/20 uppercase">Verified Physician</span>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name</label>
                      <input type="text" defaultValue="Rajesh Verma" className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:border-blue-600/40 transition-colors" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Medical License Number</label>
                      <input type="text" defaultValue="MC-93821-IND" className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:border-blue-600/40 transition-colors" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address</label>
                      <input type="email" defaultValue="dr.verma@opticare.ai" className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:border-blue-600/40 transition-colors" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Specialization</label>
                      <input type="text" defaultValue="Vitreoretinal Surgeon" className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none focus:border-blue-600/40 transition-colors" />
                   </div>
                </div>

                <div className="pt-4 border-t border-gray-800 flex justify-end">
                   <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50">
                      {isSaving ? <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save className="h-4 w-4" />}
                      {isSaving ? "Saving..." : "Save Profile"}
                   </button>
                </div>
             </div>
           )}

           {/* Notifications Section */}
           {activeTab === "notifications" && (
             <div className="p-8 rounded-3xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm space-y-8">
                <div>
                   <h3 className="text-xl font-bold text-gray-100">Communication Preferences</h3>
                   <p className="text-xs text-gray-500 mt-1">Manage how you receive alerts and clinical updates.</p>
                </div>

                <div className="space-y-4">
                   {[
                     { id: "ai", label: "New AI Screening Ready", desc: "Get notified as soon as an AI analysis is complete." },
                     { id: "critical", label: "Critical Patient Alerts", desc: "Immediate notifications for severe risk detections." },
                     { id: "reminders", label: "Consultation Reminders", desc: "Alerts for upcoming patient appointments." },
                     { id: "reports", label: "Clinic Performance Reports", desc: "Weekly summaries of clinical throughput." },
                   ].map((item) => (
                     <div 
                        key={item.id} 
                        onClick={() => toggleNotif(item.id as keyof typeof notifs)}
                        className="flex items-center justify-between p-5 rounded-2xl bg-gray-800/20 border border-gray-800/50 hover:bg-gray-800/40 cursor-pointer transition-all group"
                     >
                        <div className="space-y-1">
                           <p className="text-sm font-bold text-gray-200">{item.label}</p>
                           <p className="text-[11px] text-gray-500 font-medium group-hover:text-gray-400 transition-colors">{item.desc}</p>
                        </div>
                        <div className={cn(
                          "w-12 h-6 rounded-full p-1 transition-all duration-300 flex",
                          notifs[item.id as keyof typeof notifs] ? "bg-blue-600 justify-end" : "bg-gray-700 justify-start"
                        )}>
                           <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-4 border-t border-gray-800 flex justify-end">
                   <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50">
                      {isSaving ? <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save className="h-4 w-4" />}
                      {isSaving ? "Saving..." : "Save Preferences"}
                   </button>
                </div>
             </div>
           )}

           {/* Security Section */}
           {activeTab === "security" && (
             <div className="space-y-6">
                <div className="p-8 rounded-3xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm space-y-6">
                   <div className="flex items-center gap-3 mb-2">
                      <Key className="h-5 w-5 text-blue-400" />
                      <h3 className="text-xl font-bold text-gray-100">Password & Authentication</h3>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <button className="flex flex-col items-start p-4 rounded-2xl bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800 transition-colors text-left group">
                         <p className="text-sm font-bold text-gray-200">Change Password</p>
                         <p className="text-xs text-gray-500 mt-1">Update your medical portal credentials.</p>
                      </button>
                      <div 
                        onClick={() => setIs2FA(!is2FA)}
                        className="flex items-center justify-between p-4 rounded-2xl bg-blue-600/5 border border-blue-600/20 cursor-pointer hover:bg-blue-600/10 transition-all group"
                      >
                         <div>
                            <p className="text-sm font-bold text-gray-200 flex items-center gap-2">
                               <Smartphone className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" /> 2FA Protection
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{is2FA ? "Multi-factor is active." : "Enable extra security."}</p>
                         </div>
                         <div className={cn(
                           "w-10 h-5 rounded-full p-1 flex transition-all duration-300",
                           is2FA ? "bg-blue-600 justify-end" : "bg-gray-700 justify-start"
                         )}>
                            <div className="h-3 w-3 rounded-full bg-white shadow-sm" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="p-8 rounded-3xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm space-y-4">
                   <div className="flex items-center gap-3">
                      <History className="h-5 w-5 text-teal-400" />
                      <h3 className="text-lg font-bold text-gray-100">Active Login Sessions</h3>
                   </div>
                   <div className="space-y-3">
                      {[
                        { device: "MacBook Pro • Mumbai, India", status: "Current Session", date: "Now" },
                        { device: "iPad Pro • Pune, India", status: "Inactive", date: "2h ago" },
                      ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/20 border border-gray-800/50">
                           <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                              <div>
                                 <p className="text-xs font-bold text-gray-300">{session.device}</p>
                                 <p className="text-[10px] text-gray-600 mt-0.5">{session.status} • {session.date}</p>
                              </div>
                           </div>
                           {i > 0 && <button className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:underline">Revoke</button>}
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           )}

           {/* Clinic Section */}
           {activeTab === "clinic" && (
             <div className="p-8 rounded-3xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm space-y-8">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                         <Globe className="h-8 w-8 text-gray-500" />
                      </div>
                      <div>
                         <h3 className="text-xl font-bold text-gray-100">Clinic Identity</h3>
                         <p className="text-xs text-gray-500">Configure clinic branding and contact details.</p>
                      </div>
                   </div>
                   <button className="text-xs font-bold text-blue-400 border-b border-blue-400/30 pb-0.5 hover:text-blue-300 transition-colors">Manage Locations</button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Clinic Name</label>
                      <input type="text" defaultValue="City Eye Specialist Hospital" className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone Number</label>
                      <input type="text" defaultValue="+91 22 4932 2011" className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none" />
                   </div>
                   <div className="sm:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Clinic Address</label>
                      <textarea defaultValue="Floor 4, Medical Square Tower, Worli, Mumbai 400018" className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800 text-sm text-gray-300 focus:outline-none h-20" />
                   </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/10">
                   <AlertCircle className="h-5 w-5 text-yellow-400 shrink-0" />
                   <p className="text-xs text-gray-500">Only administrators can modify the clinic registration details. Contact IT support for organizational changes.</p>
                </div>
             </div>
           )}

           {/* Billing Section */}
           {activeTab === "billing" && (
             <div className="space-y-6">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 border border-blue-600/20 backdrop-blur-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-6">
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-blue-600/20">Active Plan</span>
                   </div>
                   <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">OptiCare Professional</p>
                   <h3 className="text-3xl font-black text-gray-100">$299<span className="text-lg text-gray-500 font-bold">/month</span></h3>
                   <div className="mt-6 flex items-center gap-6">
                      <div>
                         <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Monthly Scans</p>
                         <p className="text-lg font-bold text-gray-300">412 <span className="text-xs text-gray-600">/ 1,000</span></p>
                      </div>
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden max-w-[200px]">
                         <div className="h-full bg-blue-600 w-[41.2%]" />
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm space-y-4">
                      <div className="flex items-center justify-between">
                         <h4 className="text-sm font-bold text-gray-200">Payment Method</h4>
                         <button className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Edit</button>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="h-10 w-14 rounded bg-gray-800 border border-gray-700 flex items-center justify-center">
                            <CardIcon className="h-6 w-6 text-gray-400" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-gray-300">Visa ending in •••• 4012</p>
                            <p className="text-[10px] text-gray-600 font-bold">Expiry: 04/2028</p>
                         </div>
                      </div>
                   </div>
                   <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm flex flex-col justify-between">
                      <h4 className="text-sm font-bold text-gray-200">Latest Invoice</h4>
                      <div className="flex items-center justify-between pt-2">
                         <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-xs text-gray-500">INV-2026-04.pdf</span>
                         </div>
                         <button className="p-1.5 rounded-lg bg-gray-800 hover:text-blue-400 transition-colors">
                            <Download className="h-4 w-4" />
                         </button>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {/* Data Section */}
           {activeTab === "data" && (
             <div className="space-y-6">
                <div className="p-8 rounded-3xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm space-y-8">
                   <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-400">
                         <Cloud className="h-7 w-7" />
                      </div>
                      <div>
                         <h3 className="text-xl font-bold text-gray-100">Medical Data Storage</h3>
                         <p className="text-xs text-gray-500">HIPAA compliant cloud storage usage metrics.</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                         <span className="text-gray-500 font-bold uppercase tracking-widest">Retinal Scan Archive</span>
                         <span className="text-gray-300 font-black">42.5 GB <span className="text-gray-600">/ 100 GB</span></span>
                      </div>
                      <div className="h-2.5 w-full bg-gray-800 rounded-full overflow-hidden p-0.5 border border-gray-700/50">
                         <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-[42.5%]" />
                      </div>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold transition-all border border-gray-700">
                         <Download className="h-4 w-4" /> Export All Records (JSON)
                      </button>
                      <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold transition-all border border-gray-700">
                         <ExternalLink className="h-4 w-4" /> Cloud Sync Status
                      </button>
                   </div>
                </div>
             </div>
           )}

           {/* Security Alert (Shared Context) */}
           {(activeTab === "profile" || activeTab === "security") && (
             <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 flex gap-4 animate-in slide-in-from-bottom-4 duration-1000">
                <Shield className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                   <p className="text-sm font-bold text-gray-200">Security Recommendation</p>
                   <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      You haven't updated your password in 90 days. We recommend changing it to maintain the highest level of patient data security and HIPAA compliance.
                   </p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
