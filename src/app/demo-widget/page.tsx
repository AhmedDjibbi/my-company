"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function DemoWidgetPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Bonjour ! Je suis l\'assistant LeadFlow. Comment puis-je vous aider dans votre recherche immobilière aujourd\'hui ?' }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [leadId, setLeadId] = useState<string | null>(null)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMsg = { role: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          leadId: leadId,
          organizationId: "org_seed_id",
        }),
      })

      const data = await res.json()

      if (data.error) {
        setMessages(prev => [...prev, { role: 'ai', text: "Désolé, j'ai rencontré un problème technique. Veuillez réessayer." }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
        setLeadId(data.leadId);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Une erreur est survenue. Veuillez vérifier votre connexion." }]);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl w-full text-center space-y-6 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter">Widget Demo</h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          Experience the LeadFlow AI interface exactly as your customers see it.
          Connected to the live qualification engine.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border text-muted text-xs font-bold uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Live AI Engine Active
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary text-primary-foreground p-5 rounded-full shadow-2xl hover:scale-110 transition-all group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
          </button>
        )}

        {isOpen && (
          <div className="bg-background w-80 h-[500px] rounded-[2.5rem] shadow-2xl border border-border flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
            <div className="bg-primary p-6 text-primary-foreground flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold text-sm">AI</div>
                <div>
                  <div className="font-black tracking-tight leading-none">LeadFlow Assistant</div>
                  <div className="text-[10px] opacity-80 font-medium">Online | Instant response</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="flex-1 p-6 overflow-auto space-y-4 bg-accent/10">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm font-medium shadow-sm",
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-background text-foreground border border-border rounded-tl-none'
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-background p-4 rounded-2xl rounded-tl-none border border-border text-xs text-muted animate-pulse font-medium">
                    AI is thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border bg-background flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-3 text-sm bg-accent border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-primary text-primary-foreground p-3 rounded-xl hover:scale-105 transition-all disabled:opacity-50 shadow-md shadow-primary/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
