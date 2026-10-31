"use client"

import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setError("Invalid email or password")
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Nebula */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-ai-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] animate-ai-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-md w-full glass rounded-[2.5rem] p-10 space-y-8 relative z-10 shadow-2xl shadow-black">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto shadow-lg shadow-purple-500/20">L</div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Welcome Back</h1>
          <p className="text-zinc-400 font-light">Sign in to your elite dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-black/40 border border-zinc-800 rounded-2xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-black/40 border border-zinc-800 rounded-2xl text-white placeholder:zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-white text-black p-4 rounded-2xl font-black text-lg hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 group relative overflow-hidden"
          >
            <span className="relative z-10">Sign In</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform" />
          </button>
        </form>

        <div className="text-center text-sm text-zinc-500 font-medium">
          Don't have an account? <Link href="/register" className="text-purple-400 font-bold hover:text-purple-300 transition-colors">Register</Link>
        </div>
      </div>
    </div>
  )
}

// Need to add Link import
