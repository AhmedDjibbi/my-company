"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

interface Message {
  id: string;
  direction: string;
  sender: string;
  text: string;
  timestamp: Date;
  aiGenerated: boolean;
}

interface ConversationWindowProps {
  conversation: {
    id: string;
    isHumanControlled: boolean;
    messages: Message[];
  };
}

export default function ConversationWindow({ conversation }: ConversationWindowProps) {
  const [messages, setMessages] = useState(conversation.messages);
  const [isHumanControlled, setIsHumanControlled] = useState(conversation.isHumanControlled);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleControl = async () => {
    try {
      const res = await fetch("/api/conversations/toggle-control", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: conversation.id }),
      });
      const data = await res.json();
      if (data.success) {
        setIsHumanControlled(data.isHumanControlled);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      direction: "OUTBOUND",
      sender: "agent",
      text: input,
      timestamp: new Date(),
      aiGenerated: false,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // In a real app, we would send this to the DB
    await fetch("/api/conversations/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: conversation.id,
        text: input,
        direction: "OUTBOUND",
        sender: "agent",
      }),
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
        <h3 className="font-bold text-slate-900">Conversation</h3>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-[10px] uppercase font-bold px-2 py-0.5 rounded-full",
            isHumanControlled ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
          )}>
            {isHumanControlled ? "Human Control" : "AI Automation"}
          </span>
          <button
            onClick={toggleControl}
            className="text-xs text-blue-600 font-semibold hover:underline"
          >
            Toggle Control
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-4 bg-slate-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.direction === 'INBOUND' ? 'justify-start' : 'justify-end'}`}>
            <div className={cn(
              "max-w-[80%] p-3 rounded-2xl text-sm",
              msg.direction === 'INBOUND'
                ? "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                : "bg-blue-600 text-white rounded-tr-none"
            )}>
              <div className="text-[10px] opacity-50 mb-1 font-bold uppercase">
                {msg.sender} {msg.aiGenerated ? "(AI)" : ""}
              </div>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={isHumanControlled ? "Reply to lead..." : "AI is handling this conversation..."}
            disabled={!isHumanControlled}
            className="flex-1 p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={!isHumanControlled}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
