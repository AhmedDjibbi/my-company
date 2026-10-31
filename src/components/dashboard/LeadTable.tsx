"use client"

import React, { useState } from "react"
import Modal from "@/components/ui/Modal"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { GlassCard } from "@/components/ui/GlassCard"
import { UserPlus, Eye, Filter, Search } from "lucide-react"

interface Lead {
  id: string;
  name: string | null;
  leadScore: number;
  leadStatus: string;
  source: string;
  location: string | null;
}

export default function LeadTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    source: "MANUAL",
    location: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setIsModalOpen(false)
        router.refresh()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Filter leads..."
              className="pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all w-64"
            />
          </div>
          <button className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="primary" size="sm" className="gap-2">
          <UserPlus className="w-4 h-4" />
          Create Lead
        </Button>
      </div>

      <GlassCard variant="default" className="overflow-hidden p-0">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/80 border-b border-zinc-800">
            <tr className="text-zinc-500">
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Lead Name</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Score</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Status</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Source</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Location</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {initialLeads.map((lead) => {
              const scoreColor = lead.leadScore >= 80 ? 'bg-purple-500 text-white' :
                                 lead.leadScore >= 60 ? 'bg-indigo-500 text-white' :
                                 lead.leadScore >= 30 ? 'bg-zinc-700 text-zinc-300' :
                                 'bg-zinc-800 text-zinc-500';

              return (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-5 text-white font-medium group-hover:text-purple-400 transition-colors">{lead.name || 'Unknown'}</td>
                  <td className="p-5">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${scoreColor}`}>
                      {lead.leadScore}/100
                    </span>
                  </td>
                  <td className="p-5 text-zinc-400 text-sm">{lead.leadStatus}</td>
                  <td className="p-5 text-zinc-400 text-sm">{lead.source}</td>
                  <td className="p-5 text-zinc-400 text-sm">{lead.location}</td>
                  <td className="p-5 text-right">
                    <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </GlassCard>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Lead"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="John Doe"
              error=""
              className=""
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Phone"
                type="text"
                required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                error=""
                className=""
              />
              <Input
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="name@company.com"
                error=""
                className=""
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block ml-1">Source</label>
                <select
                  className="w-full p-4 bg-black/40 border border-zinc-800 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  value={formData.source}
                  onChange={e => setFormData({...formData, source: e.target.value})}
                >
                  <option value="FACEBOOK">Facebook</option>
                  <option value="INSTAGRAM">Instagram</option>
                  <option value="WHATSAPP">WhatsApp</option>
                  <option value="WEBSITE">Website</option>
                  <option value="MANUAL">Manual</option>
                </select>
              </div>
              <Input
                label="Location"
                type="text"
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                error=""
                className=""
              />
            </div>
          <Button type="submit" variant="primary" className="w-full py-4 text-lg">
            Save Lead
          </Button>
        </form>
      </Modal>
    </>
  )
}
