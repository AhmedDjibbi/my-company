import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { GlassCard } from "@/components/ui/GlassCard"
import { Calendar, Clock, User, Home } from "lucide-react"

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    include: {
      lead: true,
      property: true,
      agent: true,
    },
    orderBy: { date: 'asc' },
  })

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-purple-500 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Viewing Schedule</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Appointments</h1>
          <p className="text-zinc-400 font-light text-lg">Coordinate and track your high-value property viewings.</p>
        </div>
        <Button variant="primary" size="md" className="gap-2">
          <Calendar className="w-4 h-4" />
          Schedule Viewing
        </Button>
      </div>

      <GlassCard variant="default" className="overflow-hidden p-0">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-900/80 border-b border-zinc-800">
            <tr className="text-zinc-500">
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Date & Time</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Customer</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Property</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Agent</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest">Status</th>
              <th className="p-5 text-xs font-bold uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {appointments.map((app) => (
              <tr key={app.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-5">
                  <div className="flex items-center gap-3 text-white font-medium">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    {app.date.toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 ml-7">
                    <Clock className="w-3 h-3" />
                    {app.startTime} - {app.endTime}
                  </div>
                </td>
                <td className="p-5 text-white font-medium">{app.lead.name || 'Unknown'}</td>
                <td className="p-5 text-zinc-400 text-sm">{app.property?.title || 'N/A'}</td>
                <td className="p-5 text-zinc-400 text-sm">{app.agent.name || 'Unknown'}</td>
                <td className="p-5">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${
                    app.status === 'CONFIRMED' ? 'bg-green-500 text-white' :
                    app.status === 'REQUESTED' ? 'bg-purple-500 text-white' :
                    'bg-zinc-800 text-zinc-500'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <button className="text-zinc-500 hover:text-white transition-colors text-sm font-bold">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  )
}
