import { prisma } from "@/lib/prisma"
import PropertyTable from "@/components/dashboard/PropertyTable"
import { Button } from "@/components/ui/Button"
import { Home } from "lucide-react"

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-purple-500 mb-2">
            <Home className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Asset Portfolio</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Properties</h1>
          <p className="text-zinc-400 font-light text-lg">Manage your luxury listings and portfolio valuations.</p>
        </div>
      </div>
      <PropertyTable initialProperties={properties} />
    </div>
  )
}
