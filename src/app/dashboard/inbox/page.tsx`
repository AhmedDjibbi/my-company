import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { GlassCard } from "@/components/ui/GlassCard"
import { MessageSquare, Send, User, Zap } from "lucide-react"

export default async function InboxPage() {
  const conversations = await prisma.conversation.findMany({
    include: {
      lead: true,
      messages: {
        orderBy: { timestamp: 'desc' },
        take: 1,
      },
    },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <div className="h-full flex gap-6 animate-fade-in">
      {/* Conversations List */}
      <div className="w-1/3 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-white tracking-tighter">Inbox</h1>
          <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest">
            {conversations.length} Active
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {conversations.map((conv) => (
            <GlassCard
              key={conv.id}
              variant="default"
              className="p-4 cursor-pointer hover:border-purple-500/50 group transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span className="font-bold text-white group-hover:text-purple-400 transition-colors">{conv.lead.name || 'Unknown'}</span>
                </div>
                <span className="text-[10px] text-zinc-500">{new Date(conv.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="text-sm text-zinc-400 truncate italic">
                "{conv.messages[0]?.text || 'No messages yet'}"
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700">
                  {conv.channel}
                </span>
                {conv.isHumanControlled && (
                  <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Human
                  </span>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col h-full">
        <GlassCard variant="dark" className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500" />
              <div>
                <h3 className="font-bold text-white">Select a Conversation</h3>
                <p className="text-xs text-zinc-500">Ready to engage with your leads.</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              Take Control
            </Button>
          </div>

          <div className="flex-1 p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 mb-4">
              <MessageSquare className="w-10 h-10 text-zinc-700" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-300">No Conversation Selected</h2>
            <p className="text-zinc-500 max-w-sm">Select a lead from the left panel to view the AI conversation and take over if necessary.</p>
          </div>

          <div className="p-6 border-t border-zinc-800 bg-zinc-900/20">
            <div className="flex gap-3">
              <Input
                placeholder="Type your message..."
                className="flex-1 bg-black/40"
              />
              <Button variant="primary" size="md" className="px-6">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
