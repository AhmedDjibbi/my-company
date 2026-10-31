import React from "react"
import { cn } from "@/lib/utils"
import { Bell, Search, User } from "lucide-react"

export default function TopNav() {
  return (
    <header className="h-20 border-b border-zinc-800 bg-black/40 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search leads, properties..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-black"></span>
        </button>
        <div className="h-8 w-[1px] bg-zinc-800" />
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white leading-none">Elite Agent</p>
            <p className="text-[10px] text-zinc-500">Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border border-zinc-800 group-hover:border-purple-500 transition-colors" />
        </div>
      </div>
    </header>
  )
}
