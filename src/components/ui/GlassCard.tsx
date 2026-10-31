import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'highlight' | 'dark'
}

export const GlassCard = ({
  children,
  className,
  variant = 'default',
}: GlassCardProps) => {
  const variants = {
    default: "bg-zinc-900/40 border-zinc-800 hover:border-purple-500/30",
    highlight: "bg-purple-900/10 border-purple-800/50 shadow-[0_0_30px_rgba(139,92,246,0.1)]",
    dark: "bg-black/60 border-zinc-900 shadow-2xl",
  } as const;

  return (
    <div className={cn(
      "rounded-[2rem] border transition-all duration-300 backdrop-blur-xl relative overflow-hidden",
      variants[variant],
      className
    )}>
      {children}
    </div>
  )
}
