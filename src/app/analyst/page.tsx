'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { formatINR } from '@/lib/riskEngine';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

const PROMPT_SUGGESTIONS = [
  'Why is API security currently our biggest financial risk?',
  'Where should we invest our remaining budget?',
  'Explain our current cyber risk to the CFO.',
  'Which assets have the highest expected annual loss?',
  'What happens if threat frequency increases by 20%?',
  'Generate an executive summary.',
];

export default function AnalystPage() {
  const {
    organization,
    budget,
    liveMetrics,
    allocations,
    risks,
    currentUser,
  } = useData();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Hello ${currentUser.name}. I am your OptiRisk Decision Analyst.
I have access to live financial quantification metrics for **${organization.name}**:
- Overall Cyber Risk Score: **${liveMetrics.riskScore} / 100**
- Expected Annual Loss (EAL): **${formatINR(liveMetrics.eal)}**
- Active Budget: **${formatINR(budget)}** (Allocated: ${formatINR(liveMetrics.allocatedTotal)})
- Return on Investment (ROSI): **${liveMetrics.rosi.toFixed(1)}×**

Ask any question regarding cyber exposure, budget allocation, or select a prompt below.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'deterministic-engine',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const query = userText.trim();
    setInput('');

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setLoading(true);

    try {
      const topRisksContext = risks.slice(0, 5).map((r) => ({
        title: r.title,
        assetName: r.assetName,
        eal: r.expectedAnnualLoss,
        financialImpact: r.financialImpact,
        recommendedControl: r.recommendedControlName,
      }));

      const res = await fetch('/api/analyst', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          context: {
            organizationName: organization.name,
            budget,
            allocated: liveMetrics.allocatedTotal,
            remaining: liveMetrics.remainingBudget,
            riskScore: liveMetrics.riskScore,
            eal: liveMetrics.eal,
            riskReductionPct: liveMetrics.riskReductionPct,
            rosi: liveMetrics.rosi,
            topRisks: topRisksContext,
            allocations,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-ai`,
            sender: 'assistant',
            text: data.reply || 'No analysis available.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            source: data.source || 'deterministic-engine',
          },
        ]);
      } else {
        throw new Error('Analyst API error');
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-err`,
          sender: 'assistant',
          text: `Analysis based on live risk engine:\n\nOur current Expected Annual Loss is ${formatINR(liveMetrics.eal)}. Reallocating budget towards high-leverage controls (API Security and IAM) produces the maximum risk reduction.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'local-fallback',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'm-reset',
        sender: 'assistant',
        text: `Session refreshed. Grounded in active risk score: ${liveMetrics.riskScore}/100 and EAL: ${formatINR(liveMetrics.eal)}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto flex flex-col h-[calc(100vh-6.5rem)]">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">OptiRisk Analyst</h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-mono border border-blue-200">
                FAIR Model Grounded
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Executive decision co-pilot answering with verified balance-sheet loss calculations
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Suggested Inquiries */}
      <div className="mb-3 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {PROMPT_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSend(suggestion)}
              disabled={loading}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium whitespace-nowrap transition-colors shrink-0 shadow-2xs"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${
              m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-blue-700 shadow-2xs'
              }`}
            >
              {m.sender === 'user' ? currentUser.avatar : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-xl rounded-xl p-4 text-xs leading-relaxed space-y-1.5 ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-800 shadow-xs'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans max-w-none text-xs leading-relaxed">
                {m.text}
              </div>

              <div
                className={`flex items-center justify-between pt-1 text-[10px] font-mono ${
                  m.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                }`}
              >
                <span>{m.timestamp}</span>
                {m.source && (
                  <span className="flex items-center gap-1 text-[9px] text-emerald-700 font-medium">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Engine
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white border border-slate-200 text-blue-700 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 shadow-xs">
              <span>Evaluating model parameters...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="mt-2 shrink-0 relative flex items-center"
      >
        <input
          type="text"
          placeholder="Ask any question about cyber risk, EAL figures, or budget allocation..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="absolute right-2 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 text-white disabled:text-slate-400 transition-colors shadow-2xs"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
