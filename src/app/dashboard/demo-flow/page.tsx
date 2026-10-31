"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { GlassCard } from "@/components/ui/GlassCard"
import { Sparkles, Zap, Target, Home, MessageSquare } from "lucide-react"

export default function DemoFlowPage() {
  const [input, setInput] = useState("")
  const [step, setStep] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    { id: 'qualify', title: 'AI Qualification', description: 'Extracting structured data from natural language.', icon: Target },
    { id: 'score', title: 'Lead Scoring', description: 'Calculating a deterministic score based on data.', icon: Zap },
    { id: 'match', title: 'Property Matching', description: 'Finding the best real estate matches.', icon: Home },
    { id: 'respond', title: 'AI Response', description: 'Generating a personalized, premium reply.', icon: MessageSquare },
  ]

  const runDemo = async () => {
    setIsLoading(true)
    setStep(0)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, organizationId: "demo" }),
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 text-purple-500 mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest">Pipeline Visualization</span>
        </div>
        <h1 className="text-5xl font-black text-white tracking-tighter">LeadFlow AI Engine</h1>
        <p className="text-zinc-400 font-light text-lg">Witness the magic of automated lead recovery in real-time.</p>
      </div>

      <div className="flex gap-4 justify-center">
        <div className="relative flex-1 max-w-lg">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Bonjour, je cherche une villa à Hammamet, budget 800k DT"
            className="bg-black/40 border-zinc-800 text-white"
          />
        </div>
        <Button
          onClick={runDemo}
          disabled={isLoading}
          variant="primary"
          className="gap-2"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          {isLoading ? "Processing..." : "Run Full Flow"}
        </Button>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  onClick={() => setStep(i)}
                  className={cn(
                    "p-5 rounded-2xl border cursor-pointer transition-all duration-300 group",
                    step === i
                      ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20"
                      : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-purple-500/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      step === i ? "bg-white text-purple-600" : "bg-zinc-800 text-zinc-500 group-hover:text-purple-400"
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={cn("font-bold", step === i ? "text-white" : "text-zinc-300")}>
                      {s.title}
                    </span>
                  </div>
                  <p className={cn("text-xs ml-11 mt-1", step === i ? "text-purple-100" : "text-zinc-500")}>{s.description}</p>
                </div>
              )
            })}
          </div>

          <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-8 shadow-sm backdrop-blur-sm">
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-white mb-4 tracking-tight">AI Qualification Result</h3>
                <div className="bg-black text-green-400 p-6 rounded-2xl font-mono text-sm overflow-auto max-h-96 border border-zinc-800">
                  <pre>{JSON.stringify({
                    message: input,
                    extracted: {
                      leadId: result.leadId,
                      score: result.score,
                      matchesCount: result.matches?.length
                    }
                  }, null, 2)}</pre>
                </div>
                <p className="text-sm text-zinc-500 italic">AI analyzed the intent, location, and budget from the customer message.</p>
              </div>
            )}

            {step === 1 && (
              <div className="text-center space-y-6">
                <h3 className="text-xl font-black text-white tracking-tight">Lead Scoring</h3>
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#18181b" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="45" fill="none" stroke="#8b5cf6" strokeWidth="10"
                      strokeDasharray={`${(result.score / 100) * 282.7} 282.7`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-1000"
                    />
                    <text x="50" y="55" textAnchor="middle" className="text-3xl font-black fill-white">{result.score}</text>
                  </svg>
                </div>
                <div className="text-2xl font-black text-purple-500 uppercase tracking-widest">{result.score >= 80 ? 'Very Hot' : result.score >= 60 ? 'Hot' : 'Warm'}</div>
                <p className="text-zinc-500">The lead is scored based on the completeness of the information provided.</p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-white mb-4 tracking-tight">Matching Properties</h3>
                <div className="grid grid-cols-1 gap-4">
                  {result.matches?.map((m: any, i: number) => (
                    <div key={i} className="p-5 bg-black/40 border border-zinc-800 rounded-2xl flex justify-between items-center hover:border-purple-500/50 transition-all group">
                      <div className="space-y-1">
                        <div className="font-bold text-white group-hover:text-purple-400 transition-colors">{m.property.title}</div>
                        <div className="text-sm text-zinc-400">{m.property.city} • {m.property.price.toLocaleString()} TND</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-purple-500">{m.matchScore}% Match</div>
                        <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">{m.matchReasons.join(", ")}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-black text-white mb-4 tracking-tight">Generated AI Response</h3>
                <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-white italic relative">
                  <div className="absolute -top-3 left-4 bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">AI AGENT</div>
                  "{result.reply}"
                </div>
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
                  <div className="text-sm font-bold text-white mb-2">Next Action:</div>
                  <div className="text-sm text-zinc-400">Schedule a viewing for the matched properties.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
