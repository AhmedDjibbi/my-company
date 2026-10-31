import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { ReactNode } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  children: ReactNode
}

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  asChild = false,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 shadow-xl shadow-white/10",
    secondary: "bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800",
    outline: "bg-transparent text-white border border-zinc-800 hover:bg-zinc-900",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/50",
    gold: "bg-gradient-to-b from-[#f5e6a8] to-[#d4af37] text-black hover:brightness-110 shadow-lg shadow-gold-500/20",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-lg",
  }

  const Component = asChild ? Slot : "button"

  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
