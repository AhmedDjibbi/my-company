import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"
import ConversationWindow from "@/components/dashboard/ConversationWindow"

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: {
      conversations: {
        include: {
          messages: { orderBy: { timestamp: 'asc' } },
        },
      },
      appointments: true,
    },
  })

  if (!lead) notFound()

  const conversation = lead.conversations[0];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-900">{lead.name || 'Unknown Lead'}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              lead.leadScore >= 80 ? 'bg-red-100 text-red-700' :
              lead.leadScore >= 60 ? 'bg-orange-100 text-orange-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              Score: {lead.leadScore}/100
            </span>
          </div>
          <p className="text-slate-500">Lead ID: {lead.id}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-lg font-medium text-slate-600 hover:bg-slate-50">
            Edit Lead
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Schedule Viewing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Phone</span>
                <span className="font-medium text-slate-900">{lead.phone || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email</span>
                <span className="font-medium text-slate-900">{lead.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Source</span>
                <span className="font-medium text-slate-900">{lead.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Language</span>
                <span className="font-medium text-slate-900">{lead.preferredLanguage || 'Unknown'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Requirements</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Budget Max</span>
                <span className="font-medium text-slate-900">{lead.budgetMax ? `${lead.budgetMax.toLocaleString()} TND` : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Type</span>
                <span className="font-medium text-slate-900">{lead.propertyType || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location</span>
                <span className="font-medium text-slate-900">{lead.location || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bedrooms</span>
                <span className="font-medium text-slate-900">{lead.bedrooms || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Urgency</span>
                <span className="font-medium text-slate-900">{lead.urgency || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl flex flex-col h-[600px]">
            {conversation ? (
              <ConversationWindow
                conversation={{
                  id: conversation.id,
                  isHumanControlled: conversation.isHumanControlled,
                  messages: conversation.messages,
                }}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 italic">
                No conversation found for this lead.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
