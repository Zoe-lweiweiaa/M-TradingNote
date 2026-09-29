import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip,
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, Target, Activity, ShieldAlert,
  CheckCircle2, XCircle, Briefcase, Focus, PieChart as PieChartIcon, LineChart
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Report() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPeriod = searchParams.get('period') || 'day';
  const [activeTab, setActiveTab] = useState(currentPeriod);

  useEffect(() => {
    setActiveTab(currentPeriod);
  }, [currentPeriod]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ period: tab });
  };

  const tabs = [
    { id: 'day', label: 'Daily' },
    { id: 'week', label: 'Weekly' },
    { id: 'month', label: 'Monthly' },
    { id: 'quarter', label: 'Quarterly' },
  ];

  return (
    <div className="w-full min-h-full pb-[100px] bg-[#F8F9FA] font-sans text-slate-900 relative">
      {/* Header & Tabs */}
      <div className="bg-white px-3 pt-[54px] pb-2.5 shadow-sm relative z-20 sticky top-0 border-b border-slate-100">
        <h1 className="text-[16px] font-bold text-[#0B2545] mb-3 tracking-wide flex items-center gap-1.5">
          <PieChartIcon size={18} className="text-[#EE6C4D]" /> Trade Tracking
        </h1>
        
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "flex-1 min-w-[60px] py-1 text-[11px] font-bold rounded-md transition-all text-center",
                activeTab === tab.id 
                  ? "bg-[#0B2545] text-white shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-2.5 py-3 space-y-2.5 relative z-0">
        {activeTab === 'day' && <DailyReport />}
        {activeTab === 'week' && <WeeklyReport />}
        {activeTab === 'month' && <MonthlyReport />}
        {activeTab === 'quarter' && <QuarterlyReport />}
      </div>
    </div>
  );
}

// ---------------------------
// Daily Report
// ---------------------------
function DailyReport() {
  return (
    <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Top Analysis Question */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EE6C4D]"></div>
        <div className="text-[9px] text-[#EE6C4D] font-bold mb-1 flex items-center gap-1 tracking-wider uppercase"><Focus size={12}/> Core Question</div>
        <h2 className="text-[13px] font-bold mb-2.5 text-[#0B2545] leading-snug">Did you stick to your trading plan today?</h2>
        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div>
            <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase">Plan Deviation</div>
            <div className="text-[12px] font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 size={14}/> None</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase">Emotional Trades</div>
            <div className="text-[12px] font-bold text-emerald-600">0</div>
          </div>
          <div className="col-span-2 border-t border-slate-200 pt-2 mt-0.5">
            <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase">Focus for Tomorrow</div>
            <div className="text-[11px] font-medium text-[#0B2545] leading-relaxed">Watch if ZIJIN MINING breaks the 5-day MA on pullback.</div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 flex justify-between items-center">
        <div>
          <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">Today's PnL</div>
          <div className="text-[15px] font-bold text-emerald-500 font-mono">+3,330.00</div>
        </div>
        <div className="text-center">
          <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">Trades</div>
          <div className="text-[15px] font-bold text-[#0B2545] font-mono">2</div>
        </div>
        <div className="text-right">
          <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">Discipline Score</div>
          <div className="text-[15px] font-bold text-[#EE6C4D] font-mono">95</div>
        </div>
      </div>

      {/* Timeflow & Execution */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200">
        <h3 className="text-[13px] font-bold text-[#0B2545] mb-4 flex items-center gap-1.5">
          <Activity size={16} className="text-[#EE6C4D]" /> Execution Timeline
        </h3>
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[4px] before:h-full before:w-[1px] before:bg-slate-200">
          <div className="relative pl-5">
            <div className="absolute left-[-1px] w-2.5 h-2.5 rounded-full bg-[#0B2545] border-2 border-white mt-0.5 shadow-sm"></div>
            <div className="flex justify-between items-start mb-1">
              <div className="font-bold text-[12px] text-[#0B2545]">10:15 BIG DATA ETF <span className="bg-[#0B2545]/10 border border-[#0B2545]/20 text-[#0B2545] px-1 py-0.5 rounded text-[8px] ml-1 uppercase">Open</span></div>
            </div>
            <div className="text-[10px] text-slate-500 mb-1.5 font-medium">Motive: Trend following, sector rotation</div>
            <div className="bg-emerald-50 text-emerald-700 p-2 rounded-lg text-[10px] border border-emerald-100 flex items-start gap-1.5">
              <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-500"/>
              <span className="leading-relaxed font-medium">Executed entry as planned, avoided chasing highs.</span>
            </div>
          </div>
          
          <div className="relative pl-5">
            <div className="absolute left-[-1px] w-2.5 h-2.5 rounded-full bg-[#EE6C4D] border-2 border-white mt-0.5 shadow-sm"></div>
            <div className="flex justify-between items-start mb-1">
              <div className="font-bold text-[12px] text-[#0B2545]">14:30 JEREH <span className="bg-[#EE6C4D]/10 border border-[#EE6C4D]/20 text-[#EE6C4D] px-1 py-0.5 rounded text-[8px] ml-1 uppercase">Close</span></div>
            </div>
            <div className="text-[10px] text-slate-500 mb-1.5 font-medium">Motive: Invalidated short-term logic</div>
            <div className="bg-rose-50 text-rose-700 p-2 rounded-lg text-[10px] border border-rose-100 flex items-start gap-1.5">
              <XCircle size={14} className="shrink-0 mt-0.5 text-rose-500"/>
              <span className="leading-relaxed font-medium">Deviation: Actual exit 140.0 fell below planned stop 145.0. Held onto loss, leading to larger drawdown.</span>
            </div>
          </div>
        </div>
      </div>

      <NextStepPlan 
        overall="Maintain 59% exposure. Market is consolidating on low volume, avoid blind additions."
        stocks={[
          { name: "JEREH", plan: "Position closed. Monitor oil & gas flows, do not re-enter yet." },
          { name: "BIG DATA ETF", plan: "Currently +10%. Consider adding if it breaks 1.10 as planned." }
        ]}
      />
    </div>
  );
}

// ---------------------------
// Weekly Report
// ---------------------------
const weekReasonData = [
  { name: 'Breakouts', winRate: 75, count: 4 },
  { name: 'Fundamentals', winRate: 60, count: 2 },
  { name: 'MA Bounces', winRate: 40, count: 3 },
  { name: 'FOMO Trades', winRate: 10, count: 4 },
];

function WeeklyReport() {
  return (
    <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EE6C4D]"></div>
        <div className="text-[9px] text-[#EE6C4D] font-bold mb-1 flex items-center gap-1 tracking-wider uppercase"><Focus size={12}/> Core Question</div>
        <h2 className="text-[13px] font-bold mb-2.5 text-[#0B2545]">Was your trading pattern healthy this week?</h2>
        <div className="grid grid-cols-1 gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[10px] leading-relaxed">
          <div className="flex gap-1.5"><span className="text-slate-500 font-bold uppercase tracking-wider shrink-0 w-20">Profit Source:</span> <span className="font-bold text-emerald-600">Resistance Breakouts (75% Win)</span></div>
          <div className="flex gap-1.5"><span className="text-slate-500 font-bold uppercase tracking-wider shrink-0 w-20">Loss Source:</span> <span className="font-bold text-rose-600">FOMO Trades (10% Win)</span></div>
          <div className="flex gap-1.5 border-t border-slate-200 pt-1.5 mt-0.5">
            <span className="text-slate-500 font-bold uppercase tracking-wider shrink-0 w-20">Top Fix:</span> <span className="font-medium text-[#0B2545]">Prone to emotional entries on Friday afternoons. Must enforce strict rules.</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 bg-white rounded-xl p-3 shadow-sm border border-slate-200 text-center">
        <div>
          <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">Weekly PnL</div>
          <div className="text-[12px] font-bold text-emerald-500 font-mono">+12,450</div>
        </div>
        <div>
          <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">Win Rate</div>
          <div className="text-[12px] font-bold text-[#0B2545] font-mono">55.5%</div>
        </div>
        <div>
          <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">P/L Ratio</div>
          <div className="text-[12px] font-bold text-[#0B2545] font-mono">1.8</div>
        </div>
        <div>
          <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">Max Draw</div>
          <div className="text-[12px] font-bold text-rose-500 font-mono">-4.2%</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200">
        <h3 className="text-[13px] font-bold text-[#0B2545] mb-3 flex items-center gap-1.5">
          <TrendingUp size={14} className="text-[#EE6C4D]" /> Trade Motives & Win Rates
        </h3>
        <div className="h-[140px] w-full -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekReasonData} layout="vertical" margin={{ top: 0, right: 20, left: 15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#64748b', fontWeight: 600}} width={70} />
              <Tooltip cursor={{fill: '#f8fafc'}} formatter={(value: number) => [`${value}%`, 'Win Rate']} contentStyle={{borderRadius: '8px', fontSize: '10px', padding: '6px 10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)'}}/>
              <Bar dataKey="winRate" radius={[0, 4, 4, 0]} barSize={14}>
                {weekReasonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.winRate > 60 ? '#EE6C4D' : entry.winRate > 30 ? '#0B2545' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <NextStepPlan 
        overall="To address the 30% profit erosion from 'FOMO trades', force yourself to record at least 2 substantive reasons before entering any trade next week. Otherwise, no entry."
        stocks={[
          { name: "COAL IND", plan: "You have a good grasp of 'resistance breakouts'. If a similar setup appears, consider increasing initial position to 25-30% to expand P/L ratio." }
        ]}
      />
    </div>
  );
}

// ---------------------------
// Monthly Report
// ---------------------------
const monthRadarData = [
  { subject: 'Returns', A: 85, fullMark: 100 },
  { subject: 'Win Rate', A: 65, fullMark: 100 },
  { subject: 'P/L Ratio', A: 90, fullMark: 100 },
  { subject: 'Risk Ctrl', A: 70, fullMark: 100 },
  { subject: 'Discipline', A: 60, fullMark: 100 },
];

function MonthlyReport() {
  return (
    <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EE6C4D]"></div>
        <div className="text-[9px] text-[#EE6C4D] font-bold mb-1 flex items-center gap-1 tracking-wider uppercase"><Focus size={12}/> Core Question</div>
        <h2 className="text-[13px] font-bold mb-2.5 text-[#0B2545]">Is your trading system improving?</h2>
        <div className="grid grid-cols-1 gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[10px] leading-relaxed">
          <div className="flex gap-1.5"><span className="text-slate-500 font-bold uppercase tracking-wider shrink-0 w-22">Monthly Profile:</span> <span className="font-bold text-emerald-600">Right-side trend follower (70%)</span></div>
          <div className="flex gap-1.5"><span className="text-slate-500 font-bold uppercase tracking-wider shrink-0 w-22">Stable Profit:</span> <span className="font-medium text-[#0B2545]">Metals, Computing & Data</span></div>
          <div className="flex gap-1.5"><span className="text-slate-500 font-bold uppercase tracking-wider shrink-0 w-22">Major Loss:</span> <span className="font-bold text-rose-600">Frequent intraday chasing</span></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 flex flex-col justify-center gap-3">
          <div>
            <div className="text-[9px] text-slate-500 mb-0.5 uppercase tracking-wider font-bold">Monthly PnL</div>
            <div className="text-[15px] font-bold text-emerald-500 font-mono">+46,200</div>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">Win Rate</div>
              <div className="text-[12px] font-bold text-[#0B2545] font-mono">62%</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">P/L Ratio</div>
              <div className="text-[12px] font-bold text-[#0B2545] font-mono">2.1</div>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">Drawdown</div>
              <div className="text-[12px] font-bold text-rose-500 font-mono">-8.5%</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">Trades</div>
              <div className="text-[12px] font-bold text-[#0B2545] font-mono">45</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-200 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={140}>
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={monthRadarData}>
              <PolarGrid stroke="#f1f5f9" />
              <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 8, fontWeight: 600}} />
              <Radar name="Profile" dataKey="A" stroke="#EE6C4D" fill="#EE6C4D" fillOpacity={0.2} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200">
        <h3 className="text-[13px] font-bold text-[#0B2545] mb-2.5 flex items-center gap-1.5">
          <ShieldAlert size={14} className="text-rose-500" /> Top 3 Discipline Issues
        </h3>
        <div className="space-y-1.5 text-[10px] font-medium">
          <div className="bg-rose-50 p-2 rounded-lg border border-rose-100 flex items-center justify-between">
            <span className="text-slate-700">1. Failed to execute planned stops</span>
            <span className="text-rose-600 font-mono font-bold bg-white px-1.5 py-0.5 rounded-md border border-rose-100 shadow-sm">12 times</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
            <span className="text-slate-700">2. Impulsive intraday entries</span>
            <span className="text-[#EE6C4D] font-mono font-bold bg-white px-1.5 py-0.5 rounded-md border border-slate-200 shadow-sm">8 times</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
            <span className="text-slate-700">3. Oversized test positions (&gt;10%)</span>
            <span className="text-[#EE6C4D] font-mono font-bold bg-white px-1.5 py-0.5 rounded-md border border-slate-200 shadow-sm">5 times</span>
          </div>
        </div>
      </div>

      <NextStepPlan 
        overall="Keep the strict take-profit habit. Must fix the 'holding losers' bad habit. Introduce a hard rule next month: Any single position >5% loss triggers unconditional reduction."
        stocks={[
          { name: "Deeply Trapped Positions", plan: "Review holdings with >15% loss. Utilize early next month's bounce window to plan a 1/3 phased exit." }
        ]}
      />
    </div>
  );
}

// ---------------------------
// Quarterly Report
// ---------------------------
const assetData = [
  { name: 'Stocks', value: 50, color: '#0B2545' },
  { name: 'ETFs', value: 30, color: '#EE6C4D' },
  { name: 'Bonds', value: 15, color: '#10b981' },
  { name: 'Crypto', value: 5, color: '#8b5cf6' }
];

function QuarterlyReport() {
  return (
    <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EE6C4D]"></div>
        <div className="text-[9px] text-[#EE6C4D] font-bold mb-1 flex items-center gap-1 tracking-wider uppercase"><Focus size={12}/> Core Question</div>
        <h2 className="text-[13px] font-bold mb-2.5 text-[#0B2545]">Is your long-term strategy and asset allocation sound?</h2>
        <div className="grid grid-cols-1 gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[10px] leading-relaxed">
          <div className="flex gap-1.5"><span className="text-slate-500 font-bold uppercase tracking-wider shrink-0 w-16">Allocation:</span> <span className="font-bold text-emerald-600">Effectively smoothed 20% vol.</span></div>
          <div className="flex gap-1.5"><span className="text-slate-500 font-bold uppercase tracking-wider shrink-0 w-16">Stability:</span> <span className="font-medium text-[#0B2545]">Score 88/100. System is maturing.</span></div>
          <div className="flex gap-1.5 border-t border-slate-200 pt-1.5 mt-0.5">
            <span className="text-slate-500 font-bold uppercase tracking-wider shrink-0 w-16">Next Qtr:</span> <span className="font-medium text-[#0B2545]">Focus on dividend & broad-market ETFs.</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 flex justify-between">
        <div>
          <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">Quarterly PnL</div>
          <div className="text-[14px] font-bold text-emerald-500 font-mono">+12.4%</div>
        </div>
        <div>
          <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">Volatility</div>
          <div className="text-[14px] font-bold text-[#0B2545] font-mono">18%</div>
        </div>
        <div>
          <div className="text-[9px] text-slate-500 mb-0.5 font-bold uppercase tracking-wider">Risk Score</div>
          <div className="text-[14px] font-bold text-[#EE6C4D] font-mono">82</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200">
        <h3 className="text-[13px] font-bold text-[#0B2545] mb-2 flex items-center gap-1.5">
          <PieChartIcon size={14} className="text-[#EE6C4D]" /> Asset Allocation & Contribution
        </h3>
        <div className="flex items-center mb-2">
          <div className="w-[120px] h-[120px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={assetData} innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="value">
                  {assetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, 'Ratio']} contentStyle={{fontSize: '10px', borderRadius: '8px', padding: '6px 10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {assetData.map(item => (
              <div key={item.name} className="flex justify-between items-center text-[9px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: item.color}}></div>
                  <span className="text-slate-600 font-bold uppercase tracking-wider">{item.name}</span>
                </div>
                <span className="font-bold text-[#0B2545] font-mono text-[11px]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-[10px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed font-medium">
          <span className="font-bold text-[#0B2545]">Conclusion:</span> ETFs and defensive strategies generated 80% of stable returns this quarter, while high-frequency stock trading dragged down the overall P/L ratio.
        </div>
      </div>

      <NextStepPlan 
        overall="Suggest increasing bond and broad-market ETF ratio to 45% next quarter to consolidate the safety cushion; reduce stock trading frequency by 30% to focus on major trend opportunities."
        stocks={[
          { name: "Gold & USD Assets", plan: "Under rate cut expectations, watch for pullback buy opportunities in Gold ETFs. Keep crypto allocation strictly under 3% for asymmetric upside." }
        ]}
      />
    </div>
  );
}

// ---------------------------
// Shared Next Step Component
// ---------------------------
function NextStepPlan({ overall, stocks }: { overall: string, stocks: {name: string, plan: string}[] }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-[#EE6C4D]/30 relative overflow-hidden mt-2">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#EE6C4D]/5 rounded-full blur-xl"></div>
      <h2 className="text-[13px] font-bold text-[#0B2545] mb-3 flex items-center gap-1.5 relative z-10">
        <Target size={14} className="text-[#EE6C4D]" /> Next Step Plan
      </h2>
      
      <div className="space-y-3 relative z-10">
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div className="text-[10px] font-bold text-[#0B2545] mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
            <Briefcase size={12} className="text-slate-400"/> Overall Portfolio
          </div>
          <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
            {overall}
          </p>
        </div>

        {stocks.length > 0 && (
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <div className="text-[10px] font-bold text-[#0B2545] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
              <LineChart size={12} className="text-slate-400"/> Specific Tickers
            </div>
            <div className="space-y-3">
              {stocks.map((s, i) => (
                <div key={i} className="border-l-[2px] border-[#EE6C4D] pl-2">
                  <div className="text-[11px] font-bold text-[#0B2545] mb-0.5">{s.name}</div>
                  <div className="text-[10px] text-slate-600 leading-relaxed font-medium">{s.plan}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}