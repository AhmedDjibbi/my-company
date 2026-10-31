import Sidebar from "@/components/layout/Sidebar"
import TopNav from "@/components/layout/TopNav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-zinc-900/20 to-black">
          {children}
        </main>
      </div>
    </div>
  )
}
