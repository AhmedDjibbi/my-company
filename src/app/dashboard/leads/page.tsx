import { prisma } from "@/lib/prisma"
import LeadTable from "@/components/dashboard/LeadTable"
import { Button } from "@/components/ui/Button"
import { Users } from "lucide-react"

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { leadScore: 'desc' }
  })

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-purple-500 mb-2">
            <Users className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Lead Management</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter">High-Value Prospects</h1>
          <p className="text-zinc-400 font-light text-lg">Identify, qualify, and convert your most promising leads.</p>
        </div>
      </div>
      <LeadTable initialLeads={leads} />
    </div>
  )
}
