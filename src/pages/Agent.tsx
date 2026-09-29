import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { 
  BotMessageSquare, Send, User, 
  Lightbulb, ChevronRight, ChevronLeft, BarChart2, BookOpen,
  History, Sparkles, AlertTriangle, ListChecks, Info, FileText, Calendar, Bell, Target, Activity
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: React.ReactNode;
}

export default function Agent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tradeId = searchParams.get('trade');
  const action = searchParams.get('action');
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (tradeId === '1' && messages.length === 0) {
      setMessages([
        { id: '1', role: 'agent', content: <p>Hi! I am M-Agent. What would you like to know?</p> },
        { id: '2', role: 'user', content: 'How did I execute the ZIJIN MINING trade?' },
        {
          id: '3',
          role: 'agent',
          content: (
            <div>
              <p className="mb-2 leading-relaxed">Deep dive into <span className="font-bold text-[#0B2545]">ZIJIN MINING (Sold Jul 14)</span>:</p>
              
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-2.5 space-y-2">
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  <span className="font-bold text-[#0B2545] block mb-0.5">📌 Your Plan & Motive:</span>
                  You set the plan to <span className="text-[#EE6C4D] font-bold">'Take profit in tranches at target'</span>. Motive: <span className="text-[#EE6C4D] font-bold">'Right-side breakout'</span>.
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed border-t border-slate-200 pt-2">
                  <span className="font-bold text-[#0B2545] block mb-0.5">📊 Market & Execution:</span>
                  Metals saw inflows. Exiting early during market volatility was <span className="text-emerald-600 font-bold">decisive and logical!</span>
                </div>
              </div>

              <div className="bg-[#EE6C4D]/5 p-2.5 rounded-xl border border-[#EE6C4D]/20 mb-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <BookOpen size={12} className="text-[#EE6C4D]" />
                  <span className="text-[11px] font-bold text-[#0B2545]">Based on your notes</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  You felt regretful after selling. <strong className="text-[#0B2545]">Consider re-entering with a tiny tracking position (5%) on a 5-day MA bounce to prevent FOMO.</strong>
                </p>
              </div>

              <button 
                onClick={() => navigate('/detail/1')}
                className="w-full bg-white border border-slate-200 text-[#0B2545] py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 active:bg-slate-50 shadow-sm transition-colors"
              >
                Back to Details <ChevronRight size={12} />
              </button>
            </div>
          )
        }
      ]);
    } else if (tradeId === '2' && messages.length === 0) {
      setMessages([
        { id: '1', role: 'agent', content: <p>Hi! I am M-Agent. What would you like to know?</p> },
        { id: '2', role: 'user', content: 'Help me review the JEREH trade.' },
        {
          id: '3',
          role: 'agent',
          content: (
            <div>
              <p className="mb-2 leading-relaxed">Deep dive into <span className="font-bold text-[#0B2545]">JEREH (Sold Jul 14)</span>:</p>
              
              <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-200 mb-2.5 space-y-2">
                <div className="text-[11px] text-slate-700 leading-relaxed">
                  <span className="font-bold text-rose-700 block mb-0.5">📌 Plan vs Execution:</span>
                  Planned <span className="text-rose-600 font-bold">'Strict hold if above 145'</span>, exited at 140. Classic case of <strong className="text-rose-600">'holding a losing position'</strong>, causing 3.4% extra loss.
                </div>
              </div>

              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 mb-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <BarChart2 size={12} className="text-emerald-600" />
                  <span className="text-[11px] font-bold text-[#0B2545]">Improvement</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Win rate on "emotional following" is &lt;20%. <strong className="text-[#0B2545]">Next time, set a strict conditional stop-loss order in your broker app.</strong>
                </p>
              </div>

              <button 
                onClick={() => navigate('/detail/2')}
                className="w-full bg-white border border-slate-200 text-[#0B2545] py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 active:bg-slate-50 shadow-sm transition-colors"
              >
                Back to Details <ChevronRight size={12} />
              </button>
            </div>
          )
        }
      ]);
    } else if (action === 'daily' && messages.length === 0) {
      setMessages([
        { id: '1', role: 'user', content: 'Generate Daily Report' },
        { id: '2', role: 'agent', content: <div className="text-[12px] leading-relaxed">Generating Daily Report: Today you had 2 trades, PnL +¥3,330. Discipline score is 95. No emotional trades recorded today!</div> }
      ]);
    } else if (action === 'weekly' && messages.length === 0) {
      setMessages([
        { id: '1', role: 'user', content: 'Generate Weekly Report' },
        { id: '2', role: 'agent', content: <div className="text-[12px] leading-relaxed">Generating Weekly Report: Win rate 55.5%, PnL +¥12,450. Main profit source: Resistance Breakouts (75% Win). Main loss source: FOMO Trades (10% Win). Focus on reducing Friday afternoon entries.</div> }
      ]);
    } else if (action === 'reminder' && messages.length === 0) {
      setMessages([
        { id: '1', role: 'user', content: 'Set Reminder' },
        { id: '2', role: 'agent', content: <div className="text-[12px] leading-relaxed">I've set a reminder: "Watch if ZIJIN MINING breaks the 5-day MA on pullback" for tomorrow at 9:30 AM.</div> }
      ]);
    } else if (action === 'plan' && messages.length === 0) {
      setMessages([
        { id: '1', role: 'user', content: 'Trade Plan' },
        { id: '2', role: 'agent', content: <div className="text-[12px] leading-relaxed">Current Trade Plan: For 'BIG DATA ETF', consider adding if it breaks 1.10. For 'JEREH', monitor oil & gas flows, do not re-enter yet.</div> }
      ]);
    } else if (action === 'insights' && messages.length === 0) {
      setMessages([
        { id: '1', role: 'user', content: 'Behavior Insights' },
        { id: '2', role: 'agent', content: <div className="text-[12px] leading-relaxed">Behavior Insight: You deviated from your stop-loss plan in 12 trades this month. Your win rate on 'emotional following' is &lt;20%. Recommend setting strict conditional stop-loss orders.</div> }
      ]);
    }
  }, [tradeId, action, messages.length, navigate]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const chat = bottomRef.current?.parentElement;
      chat?.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    }, 100);
    return () => window.clearTimeout(timeout);
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: input }
    ]);
    
    const currentInput = input;
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: (
            <div>
              <p className="text-[12px] leading-relaxed">
                Got your question: "<span className="italic">{currentInput}</span>". Based on your data, you tend to "exit too early" when in profit. Suggestion: For the next "breakout" trade, try splitting your take-profit into two tranches (50% / 50%) to let profits run.
              </p>
            </div>
          )
        }
      ]);
    }, 1000);
  };

  const handleAction = (act: string) => {
    setSearchParams({ action: act });
  };

  const isLanding = messages.length === 0 && !tradeId && !action;

  return (
    <div className="w-full h-full bg-[#F8F9FA] font-sans text-slate-900 flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="bg-white px-3 pt-[54px] pb-2.5 flex items-center justify-between shadow-sm shrink-0 z-20 relative border-b border-slate-100">
        <div className="flex items-center gap-2">
          {!isLanding && (
            <button onClick={() => { setSearchParams({}); setMessages([]); }} className="p-1 -ml-1 text-slate-700 active:bg-slate-100 rounded-full transition-colors shrink-0">
              <ChevronLeft size={20} />
            </button>
          )}
          <div className="w-7 h-7 rounded-full bg-[#0B2545] flex items-center justify-center shadow-sm shrink-0">
            <BotMessageSquare size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-[14px] font-bold tracking-tight text-[#0B2545]">M-Agent Coach</h1>
            <div className="text-[9px] text-emerald-500 font-bold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-1 text-[#0B2545] text-[10px] font-bold px-2 py-1.5 bg-slate-100 rounded-lg active:bg-slate-200 transition-colors">
          <History size={12} /> History
        </button>
      </div>

      {isLanding ? (
        <div className="flex-1 overflow-y-auto flex flex-col px-4 pt-8 pb-[140px] no-scrollbar items-center relative">
          
          <div className="text-center mb-8 w-full">
            <h2 className="text-[20px] font-bold text-[#0B2545] leading-snug tracking-tight mb-2">
              Being smart is important,<br/>but discipline matters more.
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">I remember everything you didn't notice.</p>
          </div>

          <div className="w-full mb-8">
            <div className="text-[11px] font-bold text-slate-500 mb-3 ml-1 uppercase tracking-wider">Everyone is asking</div>
            <div className="space-y-2.5">
              {[
                { text: "Review today's trade motivations?", icon: <Sparkles size={12} className="text-[#EE6C4D]"/> },
                { text: "Analyze Zijin Mining history", icon: <Sparkles size={12} className="text-[#EE6C4D]"/> },
                { text: "Any recent trading errors?", icon: <Sparkles size={12} className="text-[#EE6C4D]"/> }
              ].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    setInput(item.text);
                    handleSend();
                  }}
                  className="w-full bg-white p-3.5 rounded-xl shadow-sm border border-slate-100 text-left flex items-center gap-2.5 active:bg-slate-50 transition-transform active:scale-[0.99]"
                >
                  <div className="bg-[#EE6C4D]/10 p-1.5 rounded-full">{item.icon}</div>
                  <span className="text-[12px] font-bold text-[#0B2545]">{item.text}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Chat Area */
        <div className="flex-1 overflow-y-auto p-3 pb-[140px] space-y-5 no-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
              <div className={cn("flex gap-2 max-w-[85%]", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                
                <div className="shrink-0 mt-0.5">
                  {msg.role === 'agent' ? (
                    <div className="w-6 h-6 rounded-full bg-[#0B2545] flex items-center justify-center shadow-sm">
                      <BotMessageSquare size={12} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center border border-white">
                      <User size={12} className="text-slate-600" />
                    </div>
                  )}
                </div>
                
                <div className={cn(
                  "p-2.5 text-[12px] shadow-sm font-medium",
                  msg.role === 'user' 
                    ? "bg-[#0B2545] text-white rounded-[16px] rounded-tr-[4px]" 
                    : "bg-white border border-slate-200 text-slate-800 rounded-[16px] rounded-tl-[4px]"
                )}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} className="h-4" />
        </div>
      )}

      {/* Fixed Bottom Area */}
      <div className="absolute bottom-[98px] left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-10 px-3 pt-2 pb-3 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
        
        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-2 pb-1 -mx-3 px-3">
          <button 
            onClick={() => handleAction('daily')}
            className="shrink-0 bg-white border border-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 active:bg-slate-50 transition-colors shadow-sm"
          >
            <FileText size={12} /> Daily Report
          </button>
          <button 
            onClick={() => handleAction('weekly')}
            className="shrink-0 bg-white border border-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 active:bg-slate-50 transition-colors shadow-sm"
          >
            <Calendar size={12} /> Weekly Report
          </button>
          <button 
            onClick={() => handleAction('reminder')}
            className="shrink-0 bg-white border border-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 active:bg-slate-50 transition-colors shadow-sm"
          >
            <Bell size={12} /> Set Reminder
          </button>
          <button 
            onClick={() => handleAction('plan')}
            className="shrink-0 bg-white border border-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 active:bg-slate-50 transition-colors shadow-sm"
          >
            <Target size={12} /> Trade Plan
          </button>
          <button 
            onClick={() => handleAction('insights')}
            className="shrink-0 bg-white border border-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 active:bg-slate-50 transition-colors shadow-sm"
          >
            <Activity size={12} /> Behavior Insights
          </button>
        </div>

        {isLanding && (
          <div className="flex items-center justify-center gap-1 mb-2 text-[9px] text-slate-400 font-medium">
            <Info size={10} /> 2 deep analyses remaining today. Quota resets at 24:00.
          </div>
        )}

        <div className="flex items-end gap-2 bg-slate-50 rounded-xl p-1.5 border border-slate-200 focus-within:border-[#0B2545] transition-colors shadow-inner">
          <div className="p-2 text-slate-400 shrink-0 mb-0.5">
            <Sparkles size={16} />
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a master what they are buying..."
            className="flex-1 max-h-[72px] min-h-[36px] bg-transparent resize-none text-[13px] font-medium text-[#0B2545] p-2 pl-0 focus:outline-none placeholder:text-slate-400"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2.5 bg-[#EE6C4D] text-white rounded-lg disabled:bg-slate-300 disabled:text-white transition-colors shrink-0 shadow-sm active:scale-95 mb-0.5 mr-0.5"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
