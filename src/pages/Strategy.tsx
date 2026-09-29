import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Bot, Users, TrendingUp, ShieldAlert, ArrowRight, 
  Sparkles, ChevronRight, Briefcase, Activity
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Strategy() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'ai';
  
  const setTab = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <div className="w-full min-h-full pb-[100px] bg-[#F8F9FA] font-sans text-slate-900 relative">
      {/* Header */}
      <div className="bg-white px-3 pt-[54px] pb-3 shadow-sm relative z-20 sticky top-0 border-b border-slate-100">
        <h1 className="text-[16px] font-bold text-[#0B2545] mb-1 tracking-wide">Strategies</h1>
        <p className="text-slate-500 text-[10px] mb-3 font-medium">External perspectives to calibrate your system</p>
        
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => setTab('ai')}
            className={cn(
              "flex-1 py-1 text-[11px] font-bold rounded-md transition-all flex items-center justify-center gap-1",
              currentTab === 'ai' 
                ? "bg-[#0B2545] text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Bot size={14} /> AI Strategy
          </button>
          <button
            onClick={() => setTab('master')}
            className={cn(
              "flex-1 py-1 text-[11px] font-bold rounded-md transition-all flex items-center justify-center gap-1",
              currentTab === 'master' 
                ? "bg-[#0B2545] text-white shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Users size={14} /> Master Portfolio
          </button>
        </div>
      </div>

      <div className="px-2.5 py-3 space-y-2.5 relative z-0">
        {currentTab === 'ai' ? (
          <>
            {/* AI Strategy 1 */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#EE6C4D]/10 text-[#EE6C4D] p-2 rounded-lg border border-[#EE6C4D]/20">
                    <TrendingUp size={14} />
                  </div>
                  <h2 className="font-bold text-[#0B2545] text-[13px] leading-tight max-w-[140px]">HK High-Dividend Defensive</h2>
                </div>
                <div className="text-right">
                  <div className="text-emerald-500 font-bold text-[14px] font-mono">+4.5%</div>
                  <div className="text-[9px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">1M Return</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="bg-slate-50 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-bold">HK Stocks</span>
                <span className="bg-slate-50 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-bold">Medium-Low Risk</span>
                <span className="bg-slate-50 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-bold">Steady</span>
              </div>
              
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3">
                <div className="text-[9px] text-slate-500 font-bold mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                  <Activity size={12} /> Logic Summary
                </div>
                <div className="text-[10px] text-[#0B2545] leading-relaxed font-medium">
                  Select SOEs with sustainable high dividends and historic low valuations. Play defensive counter-attacks in volatile markets for certain yields.
                </div>
              </div>
              
              <button className="w-full py-2.5 rounded-lg border border-[#EE6C4D]/30 text-[#EE6C4D] text-[11px] font-bold bg-[#EE6C4D]/5 flex items-center justify-center gap-1 active:bg-[#EE6C4D]/10 transition-colors">
                View Details & Compare <ChevronRight size={14} />
              </button>
            </div>

            {/* AI Strategy 2 */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#0B2545]/10 text-[#0B2545] p-2 rounded-lg border border-[#0B2545]/20">
                    <Sparkles size={14} />
                  </div>
                  <h2 className="font-bold text-[#0B2545] text-[13px] leading-tight max-w-[140px]">Tech Momentum Breakouts</h2>
                </div>
                <div className="text-right">
                  <div className="text-emerald-500 font-bold text-[14px] font-mono">+12.8%</div>
                  <div className="text-[9px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">1M Return</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="bg-slate-50 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-bold">US/A-Share</span>
                <span className="bg-rose-50 border border-rose-200 text-rose-600 px-1.5 py-0.5 rounded text-[9px] font-bold">High Risk</span>
                <span className="bg-slate-50 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-bold">Advanced</span>
              </div>
              
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3">
                <div className="text-[9px] text-slate-500 font-bold mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                  <Activity size={12} /> Logic Summary
                </div>
                <div className="text-[10px] text-[#0B2545] leading-relaxed font-medium">
                  Capture strong stocks breaking key resistance in AI & semiconductor chains. Ride the trend, suitable for right-side traders.
                </div>
              </div>
              
              <button className="w-full py-2.5 rounded-lg border border-[#0B2545]/30 text-[#0B2545] text-[11px] font-bold bg-[#0B2545]/5 flex items-center justify-center gap-1 active:bg-[#0B2545]/10 transition-colors">
                View Details & Compare <ChevronRight size={14} />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Master 1 */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm border-2 border-white shadow-sm overflow-hidden shrink-0">
                    <img src="https://picsum.photos/seed/buffett/100/100" alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#0B2545] text-[13px]">Warren Buffett</h2>
                    <div className="text-[9px] text-slate-500 mt-0.5 flex items-center gap-1 font-medium">
                      <span>124.5k Followers</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="flex items-center text-emerald-600"><ShieldAlert size={8} className="mr-0.5"/> Stable (92)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-500 font-bold text-[14px] font-mono">+15.4%</div>
                  <div className="text-[9px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">YTD Return</div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-[9px] text-slate-500 font-bold mb-2 flex items-center gap-1 uppercase tracking-wider">
                  <Briefcase size={12} /> Recent Moves
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#0B2545]">
                      <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">Add</span>
                      OXY
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono font-medium">10-24</div>
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#0B2545]">
                      <span className="bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">Reduce</span>
                      AAPL
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono font-medium">10-15</div>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-2.5 rounded-lg border border-slate-200 text-[#0B2545] text-[11px] font-bold bg-white flex items-center justify-center gap-1 active:bg-slate-50 transition-colors shadow-sm">
                View Full Portfolio <ArrowRight size={12} />
              </button>
            </div>
            
            {/* Master 2 */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm border-2 border-white shadow-sm overflow-hidden shrink-0">
                    <img src="https://picsum.photos/seed/dalio/100/100" alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#0B2545] text-[13px]">Ray Dalio</h2>
                    <div className="text-[9px] text-slate-500 mt-0.5 flex items-center gap-1 font-medium">
                      <span>89.2k Followers</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="flex items-center text-blue-600"><ShieldAlert size={8} className="mr-0.5"/> Steady (85)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-500 font-bold text-[14px] font-mono">+8.2%</div>
                  <div className="text-[9px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">YTD Return</div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-[9px] text-slate-500 font-bold mb-2 flex items-center gap-1 uppercase tracking-wider">
                  <Briefcase size={12} /> Recent Moves
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#0B2545]">
                      <span className="bg-[#0B2545]/10 text-[#0B2545] px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">Open</span>
                      EEM
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono font-medium">10-20</div>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-2.5 rounded-lg border border-slate-200 text-[#0B2545] text-[11px] font-bold bg-white flex items-center justify-center gap-1 active:bg-slate-50 transition-colors shadow-sm">
                View Full Portfolio <ArrowRight size={12} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}