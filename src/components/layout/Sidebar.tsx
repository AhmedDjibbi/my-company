import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Calendar,
  Home,
  Settings,
  LogOut,
  MessageSquare,
  Building2,
  Sparkles
} from "lucide-react"

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  href: string
  active?: boolean
}

function SidebarItem({ icon: Icon, label, href, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
        active
          ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
      )}
    >
      <Icon className={cn(
        "w-5 h-5 transition-colors",
        active ? "text-white" : "text-zinc-500 group-hover:text-zinc-200"
      )} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen sticky top-0 bg-black border-r border-zinc-800 flex flex-col z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg shadow-purple-500/20">L</div>
        <span className="text-lg font-black tracking-tighter text-white">LEADFLOW<span className="text-purple-500">AI</span></span>
      </div>

      <nav className="flex-1 px-4 space-y-8 mt-6">
        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4 ml-4">Main Menu</p>
          <div className="space-y-1">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard" active />
            <SidebarItem icon={Users} label="Leads" href="/dashboard/leads" />
            <SidebarItem icon={MessageSquare} label="Inbox" href="/dashboard/inbox" />
            <SidebarItem icon={Calendar} label="Appointments" href="/dashboard/appointments" />
            <SidebarItem icon={Building2} label="Properties" href="/dashboard/properties" />
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4 ml-4">AI Engine</p>
          <div className="space-y-1">
            <SidebarItem icon={Sparkles} label="AI Lab" href="/dashboard/ai-lab" />
            <SidebarItem icon={Home} label="Demo Flow" href="/dashboard/demo-flow" />
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">Elite Agent</p>
            <p className="text-[10px] text-zinc-500 truncate">Premium Account</p>
          </div>
        </div>
        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group">
          <LogOut className="w-5 h-5 text-zinc-500 group-hover:text-red-400 transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
