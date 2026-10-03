import Link from "next/link";
import { 
  Plus, Search, Filter, ArrowUpRight, 
  ChevronRight, Brain, Clock, Activity, Users,
  ScanLine, AlertCircle, CheckCircle2, FileText
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { dashboardStats, recentPatients, clinicActivities } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-100 tracking-tight">Clinical Overview</h1>
          <p className="text-gray-500 font-medium mt-1">Welcome back, Dr. Verma. Here is what is happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/scan"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20"
          >
            <Plus className="h-4 w-4" /> New Screening
          </Link>
          <button className="p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-gray-200 transition-colors">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-200">Recent Patient Queue</h2>
            <Link href="/dashboard/patients" className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 uppercase tracking-wider">
              View All <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-2xl bg-gray-900/40 border border-gray-800 overflow-hidden backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-800/20">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Patient</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">AI Result</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Confidence</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-gray-200">{patient.name}</p>
                        <p className="text-[10px] text-gray-500">{patient.age}y • {patient.gender}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-xs font-black px-2.5 py-1 rounded-lg border",
                        patient.aiResult === "NORMAL"
                          ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      )}>
                        {patient.aiResult}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-gray-800 overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: patient.confidence }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-400">{patient.confidence}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          patient.status === "Approved" ? "bg-teal-400" : "bg-yellow-400 animate-pulse"
                        )} />
                        <span className="text-xs font-medium text-gray-400">{patient.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinical Activity & Alerts */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-200">Clinical Activity</h2>
          <div className="rounded-2xl bg-gray-900/40 border border-gray-800 p-6 backdrop-blur-sm space-y-6">
            {clinicActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 relative">
                {/* Connector line */}
                <div className="absolute left-[15px] top-8 bottom-[-24px] w-0.5 bg-gray-800 last:hidden" />

                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0 z-10",
                  activity.status === "urgent" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                )}>
                  {activity.type === "screening" ? <Brain className="h-4 w-4" /> : activity.type === "report" ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-200 leading-tight">{activity.message}</p>
                  <p className="text-[11px] text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}

            <button className="w-full py-3 mt-4 rounded-xl border border-gray-800 text-xs font-bold text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 transition-all uppercase tracking-widest">
              View All History
            </button>
          </div>

          {/* AI Status Card */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/10 border border-blue-600/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-100 uppercase tracking-wide">AI Model Status</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <p className="text-[10px] text-teal-400 font-bold">Operational • v3.2.1</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Inference engine is running at peak performance. Avg response time: <span className="text-blue-400 font-bold">1.2s</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
