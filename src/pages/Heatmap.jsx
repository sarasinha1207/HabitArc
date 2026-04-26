import { useOutletContext, useNavigate } from 'react-router-dom';
import { Trophy, CheckCircle2, Flame, TrendingUp, HeartPulse, Shield, ShieldAlert, Sparkles } from 'lucide-react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Heatmap() {
  const { habits, completedDates, mercySkips, useSkipDay, currentStreak, longestStreak } = useOutletContext();
  const navigate = useNavigate();

  const total = habits.length;
  const completed = habits.filter(h => h.completed).length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const getMonthlyData = () => {
    // Generate dummy data for Architectural Expansion bar chart
    return [
      { name: 'W1', value: 20 },
      { name: 'W2', value: 35 },
      { name: 'W3', value: 50 },
      { name: 'W4', value: 65 },
      { name: 'W5', value: 85 }
    ];
  };
  const monthlyData = getMonthlyData();

  const heatmapValues = completedDates.map(d =>
    typeof d === 'string' ? { date: d, count: 1 } : d
  );

  const todayDate = new Date();
  const currentYear = todayDate.getFullYear();
  const startDate = new Date(currentYear, 0, 1);
  const endDate = new Date(currentYear, 11, 31);

  const completedToday = completedDates.some(d => (typeof d === 'string' ? d : d.date) === `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}` && (typeof d === 'string' || d.count > 0 || d.isSkip));
  const isRecoveryMode = currentStreak === 0 && longestStreak > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">

      <header className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Commitment Map</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Visualize your consistency and architectural growth within the HabitArc neural network. Each node represents a day of discipline.
          </p>
        </div>

        <div className="flex items-center gap-4 border border-slate-800 rounded-2xl bg-[#0B1120] p-4 shrink-0">
          <div className="flex flex-col border-r border-slate-800 pr-4">
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Longest Streak</span>
            <span className="text-2xl font-bold text-cyan-400">{longestStreak} Days</span>
          </div>
          <div className="flex flex-col pl-2">
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Current Streak</span>
            <span className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              {currentStreak} Days {currentStreak > 0 && '🔥'}
            </span>
          </div>
        </div>
      </header>

      {/* Heatmap Section */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-[#111827]">
        <div className="flex justify-between items-center mb-6">
          <div className="heatmap-container overflow-hidden w-full">
            <CalendarHeatmap
              startDate={startDate}
              endDate={endDate}
              values={heatmapValues}
              classForValue={(value) => {
                if (!value || value.count === 0) {
                  return 'color-empty';
                }
                return `color-scale-${Math.min(value.count, 4)}`;
              }}
              tooltipDataAttrs={(value) => {
                if (!value || !value.date || value.count === 0) {
                  return {
                    'data-tooltip-id': 'heatmap-tooltip',
                    'data-tooltip-content': '0 tasks done on this day'
                  };
                }
                const dateObj = new Date(value.date);
                const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
                return {
                  'data-tooltip-id': 'heatmap-tooltip',
                  'data-tooltip-content': `${value.count} task${value.count > 1 ? 's' : ''} done on ${formattedDate}`
                };
              }}
              showWeekdayLabels={true}
            />
            <Tooltip id="heatmap-tooltip" place="top" effect="solid" className="!bg-slate-800 !text-slate-50 !rounded-lg !shadow-xl !px-3 !py-2 !text-sm" />
          </div>
        </div>
        <div className="flex justify-end items-center gap-2 text-xs text-slate-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-[#1f2937]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#115e59]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#0f766e]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#14b8a6]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#34d399]"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Peak Performance */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#111827] flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-cyan-400">Peak Performance</h3>
          </div>
          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-4">
              <span className="w-20 text-sm text-slate-300">Tuesdays</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '85%' }} />
              </div>
              <span className="text-xs font-bold text-slate-300 w-8">85%</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-20 text-sm text-slate-300">Sundays</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '40%' }} />
              </div>
              <span className="text-xs font-bold text-slate-300 w-8">40%</span>
            </div>
          </div>
        </div>

        {/* Architectural Expansion */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#111827] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
          <h3 className="text-lg font-semibold text-slate-100 mb-1">Architectural Expansion</h3>
          <p className="text-sm text-slate-400 mb-6">+24% consistency compared to last month</p>
          <div className="h-32 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <Tooltip
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {monthlyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#colorGradient)`} />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                    <stop offset="100%" stopColor="#0891b2" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mercy System Active */}
        <div className="p-8 rounded-2xl border border-slate-800 bg-[#111827] flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full border-2 border-slate-700 flex items-center justify-center mb-4 bg-slate-900/50">
            <Shield className="w-8 h-8 text-orange-400/80 fill-orange-400/20" />
          </div>
          <h4 className="text-[10px] font-bold text-orange-400 tracking-widest uppercase mb-2">Mercy System Active</h4>
          <p className="text-sm text-slate-300 max-w-xs mb-6 leading-relaxed">
            {mercySkips} Shields remaining. Don't let the streak break tonight.
          </p>
          <button
            onClick={useSkipDay}
            disabled={mercySkips <= 0 || completedToday}
            className="w-full max-w-[200px] py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 text-sm font-bold rounded-lg transition-colors border border-slate-700"
          >
            Use Shield
          </button>
        </div>

        {/* Total Quests Finished */}
        <div className="p-8 rounded-2xl border border-slate-800 bg-[#111827] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-2">Total Quests Finished</span>
            <span className="text-4xl font-bold text-slate-100 mb-6">1,284</span>
            <div className="flex gap-2">
              <span className="px-2 py-1 text-[10px] font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded">ELITE ARCHITECT</span>
              <span className="px-2 py-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded">98% LOYALTY</span>
            </div>
          </div>
          <div className="w-24 h-24 relative drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <CircularProgressbar
              value={80}
              text={`80%`}
              strokeWidth={8}
              styles={buildStyles({
                pathColor: '#06b6d4',
                textColor: '#f8fafc',
                trailColor: '#1e293b',
                textSize: '24px',
              })}
            />
            <div className="absolute top-[65%] w-full text-center text-[8px] text-slate-400 font-bold uppercase tracking-wider">Annual</div>
          </div>
        </div>

      </div>
    </div>
  );
}
