import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ChevronLeft, MoreHorizontal, Edit3, Tag,
  BotMessageSquare, Target, Zap, Clock, FileText,
  CheckCircle2, XCircle, Info, Sparkles, MessageCircle
} from 'lucide-react';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Scatter } from 'recharts';
import { cn } from '../lib/utils';

const BuyMarker = (props: any) => {
  const { cx, cy, payload } = props;
  if (!payload || payload.buyPrice === undefined) return null;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <rect x={-8} y={-20} width={16} height={12} fill="#3b82f6" rx={2} />
      <text x={0} y={-14} fill="white" fontSize={8} textAnchor="middle" dominantBaseline="central" fontWeight="bold">B</text>
      <path d="M -3 -8 L 0 -5 L 3 -8 Z" fill="#3b82f6" />
    </g>
  )
}

const SellMarker = (props: any) => {
  const { cx, cy, payload } = props;
  if (!payload || payload.sellPrice === undefined) return null;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <rect x={-8} y={8} width={16} height={12} fill="#f97316" rx={2} />
      <text x={0} y={14} fill="white" fontSize={8} textAnchor="middle" dominantBaseline="central" fontWeight="bold">S</text>
      <path d="M -3 8 L 0 5 L 3 8 Z" fill="#f97316" />
    </g>
  )
}

const tradeData = {
  '1': {
    id: '1', symbol: 'ZIJIN MINING', code: '601899', market: 'A-Share', direction: 'Sell', status: 'Closed',
    statusColor: 'text-slate-500', statusBadgeColor: 'bg-slate-100 text-slate-600',
    time: '2026-07-14 10:00:00', timeStr: 'Jul 14', shares: 200, buyPrice: 24.50, currentPrice: 26.81, 
    profitPct: '+9.4%', profitPctColor: 'text-emerald-500', profitVal: '¥ 462', positionPct: '0%',
    chartColor: '#10b981',
    chartData: {
      '1D': [
        { time: '07-05', price: 23.8 }, { time: '07-08', price: 24.0 }, 
        { time: '07-09', price: 24.5, buyPrice: 24.5 }, { time: '07-10', price: 25.2 },
        { time: '07-11', price: 26.0 }, { time: '07-12', price: 25.8 }, 
        { time: '07-13', price: 27.1 }, { time: '07-14', price: 26.81, sellPrice: 26.81 }
      ],
      '1W': [
        { time: 'W3 Jun', price: 22.5 }, { time: 'W4 Jun', price: 23.2 }, 
        { time: 'W1 Jul', price: 24.5, buyPrice: 24.5 }, { time: 'W2 Jul', price: 26.81, sellPrice: 26.81 }
      ],
      '1M': [
        { time: 'Apr', price: 20.1 }, { time: 'May', price: 21.5 }, { time: 'Jun', price: 23.2 }, 
        { time: 'Jul', price: 26.81, buyPrice: 24.5, sellPrice: 26.81 }
      ]
    },
    plan: { target: 27.00, stopLoss: 23.50, desc: 'Take profit in tranches at target, strict stop loss below 23.50' },
    positionMgmt: 'Close',
    motives: ['Take Profit', 'MA5 Break', 'Resistance Fail', 'Market Dip'],
    motiveDesc: 'Reduced exposure following the portfolio de-risking plan. Will consider re-entry upon confirmed bullish breakout.',
    analysis: {
      pnl: 'Bought on right-side breakout, rode the uptrend, and secured profits early due to market volatility.',
      execution: 'Followed plan',
      deviation: 'Actual exit at 26.81 was slightly below 27.00 target, a reasonable early exit to mitigate risk.',
      comprehensive: 'Market sentiment recovered, sustained inflows into the metals sector pushed the stock higher.',
      suggestion: 'Maintain the strict exit discipline. Consider wider take-profit bands for similar setups next time.'
    },
    notes: [
      { id: 1, date: '2026-07-14 11:30', content: 'Felt a bit regretful after selling. Could have gone higher. Will wait another day next time.' },
      { id: 2, date: '2026-07-10 15:00', content: 'High volume breakout confirmed the entry logic. Holding.' }
    ],
    params: { orderId: 'SH20260714100021', orderType: 'Limit Order', fee: '¥ 1.50' }
  },
  '2': {
    id: '2', symbol: 'JEREH', code: '002353', market: 'A-Share', direction: 'Sell', status: 'Closed',
    statusColor: 'text-slate-500', statusBadgeColor: 'bg-slate-100 text-slate-600',
    time: '2026-07-14 14:30:00', timeStr: 'Jul 14', shares: 100, buyPrice: 155.0, currentPrice: 140.0,
    profitPct: '-9.6%', profitPctColor: 'text-rose-500', profitVal: '- ¥ 1,500', positionPct: '0%',
    chartColor: '#f43f5e',
    chartData: {
      '1D': [
        { time: '07-05', price: 148.0 }, { time: '07-08', price: 150.0 }, 
        { time: '07-09', price: 155.0, buyPrice: 155.0 }, { time: '07-10', price: 152.0 },
        { time: '07-11', price: 148.0 }, { time: '07-12', price: 145.0 }, 
        { time: '07-13', price: 142.0 }, { time: '07-14', price: 140.0, sellPrice: 140.0 }
      ],
      '1W': [
        { time: 'W3 Jun', price: 140.5 }, { time: 'W4 Jun', price: 145.2 }, 
        { time: 'W1 Jul', price: 155.0, buyPrice: 155.0 }, { time: 'W2 Jul', price: 140.0, sellPrice: 140.0 }
      ],
      '1M': [
        { time: 'Apr', price: 130.1 }, { time: 'May', price: 138.5 }, { time: 'Jun', price: 145.2 }, 
        { time: 'Jul', price: 140.0, buyPrice: 155.0, sellPrice: 140.0 }
      ]
    },
    plan: { target: 170.00, stopLoss: 145.00, desc: 'Short-term bounce play, strict hold if above 145' },
    positionMgmt: 'Close',
    motives: ['Stop Loss', 'Support Break', 'Error Fix', 'Short-term', 'No Logic'],
    motiveDesc: 'Short-term logic invalidated after failed intraday trade. Exited as planned to correct the error, no averaging down.',
    analysis: {
      pnl: 'Emotional FOMO entry without fundamental support, failed to cut losses early.',
      execution: 'Failed to follow plan',
      deviation: 'Planned stop at 145.00, actual exit at 140.00. Incurred 3.4% unnecessary loss.',
      comprehensive: 'Oil & gas sector is in a downtrend without independent momentum.',
      suggestion: 'Execute stops unconditionally without delay. Avoid pure emotional trades lacking fundamental catalysts.'
    },
    notes: [],
    params: { orderId: 'SZ20260714143005', orderType: 'Market Order', fee: '¥ 5.00' }
  },
  '4': {
    id: '4', symbol: 'BIG DATA ETF', code: '159739', market: 'A-Share', direction: 'Buy', status: 'Open',
    statusColor: 'text-blue-500', statusBadgeColor: 'bg-blue-50 text-blue-600',
    time: '2026-07-13 10:15:00', timeStr: 'Jul 13', shares: 4000, buyPrice: 0.950, currentPrice: 1.050, 
    profitPct: '+10.5%', profitPctColor: 'text-emerald-500', profitVal: '¥ 400', positionPct: '1.6%',
    chartColor: '#10b981',
    chartData: {
      '1D': [
        { time: '07-04', price: 0.88 }, { time: '07-05', price: 0.90 }, 
        { time: '07-08', price: 0.92 }, { time: '07-09', price: 0.91 },
        { time: '07-10', price: 0.93 }, { time: '07-11', price: 0.94 }, 
        { time: '07-12', price: 0.94 }, { time: '07-13', price: 1.05, buyPrice: 0.95 }
      ],
      '1W': [
        { time: 'W4 Jun', price: 0.85 }, { time: 'W1 Jul', price: 0.91 }, 
        { time: 'W2 Jul', price: 1.05, buyPrice: 0.95 }
      ],
      '1M': [
        { time: 'May', price: 0.80 }, { time: 'Jun', price: 0.88 }, 
        { time: 'Jul', price: 1.05, buyPrice: 0.95 }
      ]
    },
    plan: { target: 1.15, stopLoss: 0.90, desc: 'Entering in tranches, strict stop loss below 0.90' },
    positionMgmt: 'Open',
    motives: ['Trend', 'Dip Buy', 'Medium-term', 'Sector Rot'],
    motiveDesc: 'Capital shifting from high valuation tech to low valuation data computing. Starting with a partial position.',
    analysis: {
      pnl: 'Accurate judgment and excellent entry timing, riding the sector rotation trend.',
      execution: 'Followed plan',
      deviation: 'First tranche execution completed as planned.',
      comprehensive: 'Significant capital inflows detected in the computing and big data sectors.',
      suggestion: 'Sufficient profit cushion established. Consider adding to the position if it breaks 1.10 to maximize gains.'
    },
    notes: [],
    params: { orderId: 'SZ20260713101533', orderType: 'Limit Order', fee: '¥ 5.00' }
  }
};

export default function Detail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const scrollTo = searchParams.get('scroll');
  const navigate = useNavigate();
  const data = tradeData[id as keyof typeof tradeData] || tradeData['1'];

  const [kPeriod, setKPeriod] = useState('1D');
  const periods = ['Intraday', '1D', '1W', '1M'];
  const currentChartData = data.chartData[kPeriod as keyof typeof data.chartData] || data.chartData['1D'];

  useEffect(() => {
    if (scrollTo) {
      const timeout = window.setTimeout(() => {
        const el = document.getElementById(scrollTo);
        const main = document.getElementById('main-scroll-container');
        if (el && main) {
          const top = el.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop;
          main.scrollTo({ top, behavior: 'smooth' });
        }
      }, 300);
      return () => window.clearTimeout(timeout);
    } else {
      const timeout = window.setTimeout(() => {
        const main = document.getElementById('main-scroll-container');
        if (main) main.scrollTop = 0;
      }, 50);
      return () => window.clearTimeout(timeout);
    }
  }, [id, scrollTo]);

  return (
    <div id="detail-root" className="w-full min-h-full pb-[40px] bg-[#F4F5F7] font-sans text-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-[54px] pb-2 bg-white sticky top-0 z-30 shadow-sm border-b border-slate-100">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 text-slate-700 active:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-[14px] font-bold text-[#0B2545] tracking-tight">{data.symbol}</h1>
          <span className="text-[9px] text-slate-400 font-medium mt-0.5">{data.market} • {data.code}</span>
        </div>
        <button className="p-2 -mr-2 text-slate-700 active:bg-slate-100 rounded-full transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Top Summary */}
      <div className="bg-white px-3 py-3 mb-1 shadow-sm">
        <div className="flex justify-between items-end mb-3">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <span className={cn("border px-1 py-0.5 rounded text-[9px] font-bold", 
                data.direction === 'Buy' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-[#EE6C4D]/10 text-[#EE6C4D] border-[#EE6C4D]/20"
              )}>{data.direction}</span>
              <span className="text-[10px] text-slate-500 font-medium">{data.timeStr} • {data.shares} shares</span>
            </div>
            <div className="text-[20px] font-bold font-mono text-[#0B2545] flex items-baseline gap-1 tracking-tight">
              {data.currentPrice.toFixed(3)}
            </div>
          </div>
          <div className="text-right">
            <div className={cn("font-bold text-[14px] flex items-center justify-end gap-1 mb-0.5", data.profitPctColor)}>
              {data.profitPct}
            </div>
            <div className="text-[9px] text-slate-500 font-medium">
              PnL <span className="font-bold text-[#134074] ml-1 font-mono">{data.profitVal}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="bg-slate-50 px-2 py-1.5 rounded-lg text-[9px] font-medium text-slate-500 flex-1 text-center border border-slate-100 uppercase">
            Status <span className={cn("font-bold ml-1 normal-case text-[10px]", data.statusColor)}>{data.status}</span>
          </div>
          <div className="bg-slate-50 px-2 py-1.5 rounded-lg text-[9px] font-medium text-slate-500 flex-1 text-center border border-slate-100 uppercase">
            Entry <span className="text-[#134074] font-bold font-mono ml-1 text-[10px]">{data.buyPrice.toFixed(3)}</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white px-3 py-3 mb-1 shadow-sm">
        <div className="flex justify-between items-center mb-1 border-b border-slate-100 pb-2">
          <div className="flex gap-4 text-[10px]">
            {periods.map(p => (
              <button 
                key={p} 
                onClick={() => setKPeriod(p)} 
                className={cn("font-medium transition-colors", kPeriod === p ? "text-[#0B2545] font-bold relative after:absolute after:bottom-[-9px] after:left-1/2 after:-translate-x-1/2 after:w-3 after:h-0.5 after:bg-[#EE6C4D] after:rounded-t" : "text-slate-400")}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-[160px] w-full -ml-3 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={currentChartData} margin={{ top: 35, right: 10, left: 10, bottom: 15 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={data.chartColor} stopOpacity={0.25}/>
                  <stop offset="95%" stopColor={data.chartColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8', fontWeight: 500}} dy={10} minTickGap={15} />
              <YAxis domain={['dataMin - (dataMax-dataMin)*0.1', 'dataMax + (dataMax-dataMin)*0.1']} axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8', fontWeight: 500, fontFamily: 'monospace'}} dx={-5} orientation="right" />
              <ReferenceLine y={data.plan.target} stroke="#EE6C4D" strokeDasharray="4 4" label={{ position: 'insideTopLeft', value: `TP ${data.plan.target.toFixed(2)}`, fill: '#EE6C4D', fontSize: 9, fontWeight: 'bold' }} />
              <ReferenceLine y={data.plan.stopLoss} stroke="#EE6C4D" strokeDasharray="4 4" label={{ position: 'insideBottomLeft', value: `SL ${data.plan.stopLoss.toFixed(2)}`, fill: '#EE6C4D', fontSize: 9, fontWeight: 'bold' }} />
              <Area type="monotone" dataKey="price" stroke={data.chartColor} strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
              <Scatter dataKey="buyPrice" shape={<BuyMarker />} />
              <Scatter dataKey="sellPrice" shape={<SellMarker />} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trade Parameters Section */}
      <div id="params-section" className="bg-white px-3 py-3 mb-1 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[12px] font-bold text-[#0B2545] flex items-center gap-1">
            <FileText size={12} className="text-[#EE6C4D]" />
            Parameters
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[11px] bg-slate-50/50 p-2.5 rounded-lg border border-slate-100/60">
          <div>
            <div className="text-slate-400 mb-0.5 font-medium text-[9px] uppercase">Order ID</div>
            <div className="text-[#134074] font-medium font-mono truncate">{data.params.orderId}</div>
          </div>
          <div>
            <div className="text-slate-400 mb-0.5 font-medium text-[9px] uppercase">Market</div>
            <div className="text-[#134074] font-medium">{data.market}</div>
          </div>
          <div>
            <div className="text-slate-400 mb-0.5 font-medium text-[9px] uppercase">Type</div>
            <div className="text-[#134074] font-medium">{data.params.orderType}</div>
          </div>
          <div>
            <div className="text-slate-400 mb-0.5 font-medium text-[9px] uppercase">Fee</div>
            <div className="text-[#134074] font-medium font-mono">{data.params.fee}</div>
          </div>
          <div className="col-span-2">
            <div className="text-slate-400 mb-0.5 font-medium text-[9px] uppercase">Time</div>
            <div className="text-[#134074] font-medium font-mono">{data.time}</div>
          </div>
        </div>
      </div>

      {/* Original Record Section */}
      <div id="record-section" className="bg-white px-3 py-3 mb-1 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[12px] font-bold text-[#0B2545] flex items-center gap-1">
            <Edit3 size={12} className="text-[#EE6C4D]" />
            Original Record
          </h2>
          <span className="text-[8px] text-slate-400 font-medium bg-slate-50 px-1 py-0.5 rounded border border-slate-100 uppercase">Post-trade</span>
        </div>
        
        <div className="mb-3">
          <div className="flex items-center gap-1 mb-1.5">
            <Tag size={10} className="text-slate-400" />
            <div className="text-[11px] text-[#0B2545] font-bold">Motive</div>
          </div>
          
          {data.positionMgmt && (
            <div className="mb-1.5 flex items-center gap-1.5">
              <span className="text-[9px] text-slate-500 uppercase">Mgmt:</span>
              <span className="bg-[#134074]/10 text-[#134074] px-1.5 py-0.5 rounded text-[9px] font-bold border border-[#134074]/20">{data.positionMgmt}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-1 mb-2">
            {data.motives.map(tag => (
              <span key={tag} className="bg-[#EE6C4D]/10 text-[#EE6C4D] px-1.5 py-0.5 rounded text-[9px] font-bold border border-[#EE6C4D]/20">{tag}</span>
            ))}
          </div>
          <div className="text-[10px] text-slate-600 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100/60 shadow-sm">
            <span className="font-bold text-[#134074] mr-1">Notes:</span>
            {data.motiveDesc}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1">
              <Target size={10} className="text-slate-400" />
              <div className="text-[11px] text-[#0B2545] font-bold">Trade Plan</div>
            </div>
          </div>
          <div className="flex gap-1.5 mb-2">
            <div className="flex-1 bg-slate-50 p-2 rounded-lg border border-slate-100/60 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-400"></div>
              <div className="text-[9px] text-slate-400 mb-0.5 font-medium ml-1 uppercase">Take Profit</div>
              <div className="font-bold text-[#134074] font-mono text-[11px] ml-1">¥ {data.plan.target.toFixed(2)}</div>
            </div>
            <div className="flex-1 bg-slate-50 p-2 rounded-lg border border-slate-100/60 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-rose-400"></div>
              <div className="text-[9px] text-slate-400 mb-0.5 font-medium ml-1 uppercase">Stop Loss</div>
              <div className="font-bold text-[#134074] font-mono text-[11px] ml-1">¥ {data.plan.stopLoss.toFixed(2)}</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-600 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100/60 shadow-sm">
            <span className="font-bold text-[#134074] mr-1">Details:</span>
            {data.plan.desc}
          </div>
        </div>
      </div>

      {/* AI Tracking Analysis Section */}
      <div id="ai-section" className="bg-white px-3 py-3 mb-1 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[12px] font-bold text-[#0B2545] flex items-center gap-1">
            <Zap size={12} className="text-[#EE6C4D]" />
            AI Tracking
          </h2>
          <span className="bg-[#EE6C4D]/10 border border-[#EE6C4D]/20 text-[#EE6C4D] px-1.5 py-0.5 rounded text-[8px] font-bold flex items-center gap-0.5 shadow-sm uppercase">
            <Clock size={8} /> Post-trade Update
          </span>
        </div>

        <div className="space-y-2.5">
          {/* 盈亏归因 */}
          <div className="flex gap-2">
            <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_4px_rgba(59,130,246,0.6)]"></div>
            <div>
              <div className="text-[11px] font-bold text-[#0B2545] mb-0.5">PnL Attribution</div>
              <p className="text-[10px] text-slate-600 leading-relaxed">{data.analysis.pnl}</p>
            </div>
          </div>

          {/* 是否按计划执行 & 偏差 */}
          <div className="flex gap-2">
            <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-[0_0_4px_rgba(16,185,129,0.6)]"></div>
            <div>
              <div className="text-[11px] font-bold text-[#0B2545] mb-0.5">Execution</div>
              <div className="bg-slate-50 border border-slate-100/60 rounded-lg p-2 mt-1 mb-1">
                <div className="flex items-center gap-1 mb-1">
                  {data.analysis.execution === 'Followed plan' ? <CheckCircle2 size={10} className="text-emerald-500" /> : <XCircle size={10} className="text-rose-500" />}
                  <span className="text-[10px] font-bold text-[#134074]">{data.analysis.execution}</span>
                </div>
                <div className="text-[10px] text-slate-500 flex items-start gap-1">
                  <Info size={10} className="shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Deviation: {data.analysis.deviation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 综合判断 */}
          <div className="flex gap-2">
            <div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 shrink-0 shadow-[0_0_4px_rgba(168,85,247,0.6)]"></div>
            <div>
              <div className="text-[11px] font-bold text-[#0B2545] mb-0.5">Market Context</div>
              <p className="text-[10px] text-slate-600 leading-relaxed">{data.analysis.comprehensive}</p>
            </div>
          </div>

          {/* 下一步建议 */}
          <div className={cn("border rounded-xl p-2.5 shadow-sm mt-2", 
            id === '2' ? "bg-emerald-50/50 border-emerald-100" : "bg-[#EE6C4D]/5 border-[#EE6C4D]/20"
          )}>
            <div className={cn("flex items-center gap-1 text-[11px] font-bold mb-1", id === '2' ? "text-emerald-700" : "text-[#EE6C4D]")}>
              <Sparkles size={11} /> AI Suggestion
            </div>
            <p className="text-[10px] text-[#134074] leading-relaxed">{data.analysis.suggestion}</p>
          </div>
        </div>
      </div>

      {/* User Notes */}
      <div id="notes-section" className="bg-white px-3 py-3 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[12px] font-bold text-[#0B2545] flex items-center gap-1">
            <MessageCircle size={12} className="text-[#EE6C4D]" />
            User Notes
          </h2>
        </div>

        {data.notes && data.notes.length > 0 ? (
          <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[3px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {data.notes.map((note, index) => (
              <div key={note.id} className="relative flex items-start gap-2">
                <div className="absolute left-0 w-2 h-2 rounded-full bg-white border-2 border-[#EE6C4D] mt-1 shadow-sm"></div>
                <div className="pl-4 flex-1">
                  <div className="text-[9px] text-slate-400 mb-0.5 font-mono">{note.date}</div>
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-[10px] text-slate-700 leading-relaxed shadow-sm">
                    {note.content}
                  </div>
                </div>
              </div>
            ))}
            {/* input block */}
            <div className="relative flex items-start gap-2 mt-3">
              <div className="absolute left-0 w-2 h-2 rounded-full bg-slate-200 border-2 border-white mt-2"></div>
              <div className="pl-4 flex-1">
                <textarea 
                  placeholder="Add a new note..."
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-[10px] h-12 focus:outline-none focus:border-[#EE6C4D] resize-none transition-all placeholder:text-slate-400 shadow-sm"
                />
                <div className="flex justify-end mt-1.5">
                  <button className="bg-[#EE6C4D] text-white px-2.5 py-1 rounded-lg text-[9px] font-bold shadow-sm active:bg-[#F57C00] transition-colors">Submit</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
              <MessageCircle size={14} className="text-slate-300" />
            </div>
            <div className="text-[11px] font-bold text-slate-700 mb-0.5">No notes yet</div>
            <div className="text-[9px] text-slate-400 mb-3">Reflecting is the best teacher, write down your thoughts.</div>
            <textarea 
              placeholder="Write down your thoughts and reflections on this trade..."
              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-[10px] h-14 focus:outline-none focus:border-[#EE6C4D] focus:ring-1 focus:ring-[#EE6C4D]/20 resize-none transition-all placeholder:text-slate-400 shadow-sm"
            />
            <div className="w-full flex justify-end mt-1.5">
              <button className="bg-[#0B2545] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-sm active:bg-[#134074] transition-colors">Save</button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Agent Entry */}
      <div className="fixed bottom-6 right-4 z-40">
        <button 
          onClick={() => navigate(`/agent?trade=${data.id}`)} 
          className="bg-[#0B2545] text-white p-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center relative"
        >
          <BotMessageSquare size={18} />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EE6C4D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F57C00]"></span>
          </span>
        </button>
      </div>
    </div>
  );
}
