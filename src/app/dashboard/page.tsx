"use client"

import { prisma } from "@/lib/prisma"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { GlassCard } from "@/components/ui/GlassCard"
import { TrendingUp, Users, Calendar, Home, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default async function DashboardPage() {
  const totalLeads = await prisma.lead.count()
  const hotLeads = await prisma.lead.count({ where: { leadScore: { gte: 60 } } })
  const appointments = await prisma.appointment.count()
  const properties = await prisma.property.count()

  const sourceData = [
    { name: 'Facebook', value: 400 },
    { name: 'Instagram', value: 300 },
    { name: 'WhatsApp', value: 300 },
    { name: 'Website', value: 200 },
  ]

  const COLORS = ['#8b5cf6', '#6366f1', '#a855f7', '#4f46e5']

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-white tracking-tighter">Command Center</h1>
          <p className="text-zinc-400 font-light text-lg">Precision analytics for your elite lead ecosystem.</p>
        </div>
        <Button variant="primary" size="md" asChild>
          <Link href="/dashboard/demo-flow" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Run AI Demo
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Users}
          title="Total Leads"
          value={totalLeads}
          change="+12% Growth"
        />
        <MetricCard
          icon={TrendingUp}
          title="Hot Leads"
          value={hotLeads}
          change="+5% High-Value"
          highlight
        />
        <MetricCard
          icon={Calendar}
          title="Appointments"
          value={appointments}
          change="+18% Conversion"
        />
        <MetricCard
          icon={Home}
          title="Properties"
          value={properties}
          change="Managed Assets"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard variant="default" className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-white tracking-tight">Acquisition Velocity</h3>
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Leads by Source</div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{fill: '#71717a', fontSize: 12}}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{fill: '#71717a', fontSize: 12}}
                />
                <Tooltip
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{
                    backgroundColor: '#0//050505',
                    borderColor: '#27272a',
                    borderRadius: '1rem',
                    color: '#fafafa'
                  }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard variant="highlight" className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-white tracking-tight">Lead Distribution</h3>
            <div className="text-xs font-bold text-purple-400 uppercase tracking-widest">Portfolio Mix</div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#050505',
                    borderColor: '#27272a',
                    borderRadius: '1rem',
                    color: '#fafafa'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

function MetricCard({ icon: Icon, title, value, change, highlight = false }: { icon: any, title: string, value: number, change: string, highlight?: boolean }) {
  return (
    <GlassCard
      variant={highlight ? "highlight" : "default"}
      className={cn(
        "p-8 transition-all duration-300 group relative",
        highlight ? "shadow-purple-500/10" : "hover:border-purple-500/30"
      )}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "p-2 rounded-lg",
            highlight ? "bg-purple-500 text-white" : "bg-zinc-800 text-zinc-400"
          )}>
            <Icon className="w-5 h-5" />
          </div>
          <div className={cn(
            "text-xs font-bold uppercase tracking-widest",
            highlight ? "text-purple-200" : "text-zinc-500"
          )}>{change}</div>
        </div>
        <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">{title}</div>
        <div className="text-4xl font-black text-white tracking-tighter">{value}</div>
      </div>
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors" />
    </GlassCard>
  )
}
