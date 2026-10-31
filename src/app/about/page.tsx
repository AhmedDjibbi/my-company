import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">LEADFLOW AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm font-medium text-blue-600">About</Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Contact</Link>
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Login</Link>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Our Mission</h1>
            <p className="text-xl text-slate-600">Bridging the gap between digital interest and closed deals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">The LeadFlow Story</h2>
              <p className="text-slate-600 leading-relaxed">
                Founded to solve the most common pain point in high-ticket sales: the "leaky bucket."
                Many businesses spend thousands on marketing, only to lose potential clients because they didn't reply fast enough.
              </p>
              <p className="text-slate-600 leading-relaxed">
                LEADFLOW AI leverages cutting-edge Multi-Agent AI systems to ensure that no lead is ever ignored,
                no requirement is missed, and every qualified prospect is scheduled for a viewing.
              </p>
            </div>
            <div className="bg-slate-100 aspect-square rounded-3xl flex items-center justify-center text-6xl">
              🏢
            </div>
          </div>

          <div className="bg-blue-600 rounded-3xl p-12 text-white text-center space-y-6">
            <h2 className="text-3xl font-bold">Global Vision, Local Expertise</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              While our technology is world-class, we specialize in the nuanced markets of North Africa,
              ensuring your AI speaks the language and dialect of your customers perfectly.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
