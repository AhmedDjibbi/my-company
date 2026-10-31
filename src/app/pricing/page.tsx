import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for starting out and testing the AI.",
      features: ["Up to 50 leads/mo", "Basic AI Qualification", "Website Widget", "1 User"],
      cta: "Start Free",
      highlight: false,
    },
    {
      name: "Starter",
      price: "499",
      description: "For growing agencies scaling their lead flow.",
      features: ["Up to 500 leads/mo", "Advanced AI Qualification", "Multi-channel (FB/IG)", "3 Users", "Priority Support"],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "1,200",
      description: "The complete automation suite for elite businesses.",
      features: ["Unlimited leads", "Premium AI Agents", "Full Automation Pipeline", "Unlimited Users", "Dedicated Account Manager"],
      cta: "Go Pro",
      highlight: true,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">LEADFLOW AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">About</Link>
            <Link href="/pricing" className="text-sm font-medium text-blue-600">Pricing</Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Contact</Link>
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Login</Link>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Simple, Transparent Pricing</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Choose the plan that matches your business volume. Scale as you grow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={cn(
              "p-8 rounded-3xl border transition-all hover:scale-105",
              plan.highlight ? "bg-slate-900 text-white border-slate-900 shadow-2xl" : "bg-white border-slate-200 text-slate-900"
            )}>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={cn("text-sm", plan.highlight ? "text-slate-400" : "text-slate-500")}>TND/mo</span>
                </div>
                <p className={cn("mt-4 text-sm", plan.highlight ? "text-slate-400" : "text-slate-500")}>{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <svg className={cn("w-5 h-5", plan.highlight ? "text-blue-400" : "text-blue-600")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.highlight ? "text-slate-300" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href="/register" className={cn(
                "block w-full py-3 rounded-xl text-center font-bold transition-all",
                plan.highlight ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              )}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
