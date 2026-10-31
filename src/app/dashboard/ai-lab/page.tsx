"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { GlassCard } from "@/components/ui/GlassCard"
import { Beaker, Cpu, Zap } from "lucide-react"

export default function AILabPage() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runTest = async () => {
    setIsLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/ai-lab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()
      setResult(data.steps)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 text-purple-500 mb-2">
          <Beaker className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest">AI Diagnostics</span>
        </div>
        <h1 className="text-5xl font-black text-white tracking-tighter">Agent Lab</h1>
        <p className="text-zinc-400 font-light text-lg">Inspect the internal reasoning of the Multi-Agent pipeline in real-time.</p>
      </div>

      <div className="flex gap-4 justify-center">
        <div className="relative flex-1 max-w-lg">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Try: 'Sallam, nheb villa fi Gammarth budget 1M TND'"
            className="bg-black/40 border-zinc-800 text-white"
          />
        </div>
        <Button
          onClick={runTest}
          disabled={isLoading}
          variant="primary"
          className="gap-2"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          {isLoading ? "Analyzing..." : "Test Pipeline"}
        </Button>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StepCard
            title="1. Qualification"
            agent={result.qualification.agent}
            model={result.qualification.model}
            data={result.qualification.output}
          />
          <StepCard
            title="2. Scoring"
            agent={result.scoring.agent}
            data={result.scoring.output}
          />
          <StepCard
            title="3. Matching"
            agent={result.matching.agent}
            model={result.matching.model}
            data={result.matching.output}
          />
          <StepCard
            title="4. Response"
            agent={result.response.agent}
            model={result.response.model}
            data={result.response.output}
            isText
          />
        </div>
      )}
    </div>
  )
}

function StepCard({ title, agent, model, data, isText }: { title: string, agent: string, model?: string, data: any, isText?: boolean }) {
  return (
    <GlassCard variant="dark" className="space-y-4 border-zinc-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-purple-500" />
          <h3 className="font-bold text-white">{title}</h3>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase tracking-tighter">{agent}</span>
          {model && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 uppercase tracking-tighter">{model}</span>}
        </div>
      </div>
      <div className="bg-black/60 rounded-xl p-4 overflow-auto max-h-64 border border-zinc-800">
        {isText ? (
          <p className="text-zinc-300 text-sm italic leading-relaxed">"{data}"</p>
        ) : (
          <pre className="text-green-400 text-xs font-mono leading-relaxed">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </GlassCard>
  )
}
