import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { GlassCard } from "@/components/ui/GlassCard"
import { Calendar, Send, RotateCcw } from "lucide-react"

export default async function FollowUpsPage() {
  const followUps = await prisma.followUp.findMany({
    include: {
      lead: true,
    },
    orderBy: { scheduledDate: 'asc' },
  })

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-purple-500 mb-2">
            <RotateCcw className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Retention Engine</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Follow-ups</h1>
          <p className="text-zinc-400 font-light text-lg">Automated reach-outs to recover high-value leads.</p>
        </div>
        <Button variant="primary" size="md" className="gap-2">
          <Send className="w-4 h-4" />
          Create Sequence
        </Button>
      </div>

      <GlassCard variant="default" className="overflow-hidden p-0">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/80 border-b border-zinc-800">
            <tr className="text-zinc-500">
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Scheduled Date</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Lead</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest">AI Message</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Status</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {followUps.map((fu) => (
              <tr key={fu.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-5">
                  <div className="flex items-center gap-3 text-white font-medium">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    {fu.scheduledDate.toLocaleDateString()}
                  </div>
                </td>
                <td className="p-5 text-white font-medium">{fu.lead.name || 'Unknown'}</td>
                <td className="p-5 text-zinc-400 text-sm truncate max-w-xs italic">
                  "{fu.content}"
                </td>
                <td className="p-5">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${
                    fu.status === 'SENT' ? 'bg-green-500 text-white' :
                    fu.status === 'FAILED' ? 'bg-red-500 text-white' :
                    'bg-zinc-800 text-zinc-500'
                  }`}>
                    {fu.status}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <button className="text-zinc-500 hover:text-white transition-colors text-sm font-bold">
                    Send Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  )
}
