import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = ({
  label,
  error,
  className,
  ...props
}: InputProps) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block ml-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full p-4 bg-black/40 border border-zinc-800 rounded-2xl text-white placeholder:text-zinc-600",
          "focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all",
          error && "border-red-500/50 focus:ring-red-500/50",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-xs font-medium ml-1">{error}</p>
      )}
    </div>
  )
}
