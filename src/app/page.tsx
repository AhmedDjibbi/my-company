"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

export default function LandingPage() {
  useEffect(() => {
    console.log("LeadFlow Elite Mode Loaded");
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#fafafa] selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/50 transition-shadow duration-500">L</div>
            <span className="text-2xl font-black tracking-tighter text-white">LEADFLOW<span className="text-purple-500">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">About</Link>
            <Link href="/pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Contact</Link>
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Login</Link>
            <Link href="/register" className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-200 transition-all shadow-xl shadow-white/10">
              Join the Elite
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 overflow-hidden">
        {/* Immersive Dark Background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[150px] animate-ai-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[150px] animate-ai-pulse" style={{ animationDelay: '3s' }} />

          {/* Cinematic Flow Lines */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-flow" />
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent animate-flow" style={{ animationDelay: '5s' }} />
          <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-flow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-purple-400 text-xs font-bold uppercase tracking-widest animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            The Gold Standard in AI Conversion
          </div>

          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.9]">
            Conversations <br />
            <span className="text-gold">Into Gold.</span>
          </h1>

          <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            LeadFlow AI is the exclusive intelligence layer for high-net-worth lead acquisition.
            We turn digital noise into confirmed appointments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link href="/register" className="w-full sm:w-auto bg-white text-black px-12 py-6 rounded-full text-xl font-black hover:scale-105 transition-all shadow-2xl shadow-white/10 relative group overflow-hidden">
              <span className="relative z-10">Request Access</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform" />
            </Link>
            <Link href="/demo-widget" className="w-full sm:w-auto bg-transparent text-white border border-zinc-800 px-12 py-6 rounded-full text-xl font-bold hover:bg-zinc-900 transition-all">
              Experience the Flow
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] mb-16">Engineered for the Top 1%</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-40 grayscale">
            <div className="text-xl font-black text-white tracking-tight">REAL ESTATE</div>
            <div className="text-xl font-black text-white tracking-tight">AUTOMOTIVE</div>
            <div className="text-xl font-black text-white tracking-tight">LUXURY HOTELS</div>
            <div className="text-xl font-black text-white tracking-tight">PRIVATE CLINICS</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-24">
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">The Intelligence Suite</h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-light">
              Precision-engineered automation for the most demanding industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon="🌐"
              title="Prestige Web Design"
              description="Ultra-high conversion architecture that commands authority and builds instant trust with high-net-worth clients."
              color="bg-zinc-900/50 text-white border-zinc-800"
              animation="group-hover:scale-105 transition-transform"
            />
            <FeatureCard
              icon="🤖"
              title="Elite AI Agents"
              description="Custom models that speak the language of luxury. They don't just chat—they qualify and close."
              color="bg-purple-900/20 text-purple-300 border-purple-800/50"
              animation="animate-ai-pulse"
            />
            <FeatureCard
              icon="♻️"
              title="Precision Lead Recap"
              description="Automated intelligence that distills raw data into actionable gold, removing all friction from your sales flow."
              color="bg-indigo-900/20 text-indigo-300 border-indigo-800/50"
              animation="animate-scan"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />
        </div>
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter">Claim Your Edge</h2>
          <p className="text-zinc-500 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            Stop leaving revenue to chance. Join the elite agencies scaling with LeadFlow AI.
          </p>
          <Link href="/register" className="inline-block bg-white text-black px-16 py-8 rounded-full text-2xl font-black hover:scale-105 transition-all shadow-2xl shadow-white/10">
            Apply for Access
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-bold text-sm">L</div>
            <span className="text-xl font-black tracking-tighter text-white">LEADFLOW<span className="text-purple-500">AI</span></span>
          </div>
          <div className="flex gap-10 text-sm font-medium text-zinc-500 uppercase tracking-widest">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="text-sm font-medium text-zinc-600 opacity-60">
            © 2026 LEADFLOW AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, color, animation }: { icon: string, title: string, description: string, color?: string, animation?: string }) {
  return (
    <div className={cn(
      "p-10 rounded-[2.5rem] border transition-all group relative overflow-hidden backdrop-blur-sm",
      color || "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/50 hover:border-purple-500/30"
    )}>
      {/* Specific Animation Layer */}
      {animation === 'animate-scan' && (
        <div className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent shadow-[0_0_20px_rgba(129,140,248,0.5)] animate-scan z-10" />
      )}
      {animation === 'animate-ai-pulse' && (
        <div className="absolute inset-0 bg-purple-500/5 animate-ai-pulse pointer-events-none" />
      )}

      <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />
      <div className={cn("text-5xl mb-8 transition-transform duration-300 ease-out", animation === 'animate-ai-pulse' ? 'group-hover:scale-125' : 'group-hover:scale-110')}>{icon}</div>
      <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-zinc-400 leading-relaxed font-light">{description}</p>
    </div>
  )
}
