import { useOutletContext } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { CheckCircle2, TrendingUp, History, Calendar, Lightbulb, MoreVertical } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const dummyChartData = [
  { name: 'Mon', Physical: 80, Cognitive: 90, Metabolic: 60 },
  { name: 'Tue', Physical: 85, Cognitive: 80, Metabolic: 70 },
  { name: 'Wed', Physical: 90, Cognitive: 85, Metabolic: 75 },
  { name: 'Thu', Physical: 75, Cognitive: 95, Metabolic: 65 },
  { name: 'Fri', Physical: 95, Cognitive: 85, Metabolic: 80 },
  { name: 'Sat', Physical: 100, Cognitive: 70, Metabolic: 90 },
  { name: 'Sun', Physical: 85, Cognitive: 75, Metabolic: 85 },
];

export default function Dashboard() {
  const { habits, completedDates, longestStreak } = useOutletContext();
  
  const completedTodayCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const completionRate = totalCount === 0 ? 0 : Math.round((completedTodayCount / totalCount) * 100);

  // --- Smart Insights Logic ---
  const today = new Date();
  
  // 1. Weekly Trends (This Week vs Last Week)
  let thisWeekCount = 0;
  let lastWeekCount = 0;
  
  completedDates.forEach(d => {
    const dateObj = new Date(typeof d === 'string' ? d : d.date);
    const diffDays = Math.floor((today - dateObj) / (1000 * 60 * 60 * 24));
    const count = typeof d === 'string' ? 1 : d.count;
    if (diffDays <= 7) {
      thisWeekCount += count;
    } else if (diffDays <= 14) {
      lastWeekCount += count;
    }
  });

  const weeklyDiff = thisWeekCount - lastWeekCount;
  const weeklyDiffPercent = lastWeekCount === 0 ? 100 : Math.round((weeklyDiff / lastWeekCount) * 100);
  const weeklyDiffStr = weeklyDiff >= 0 ? `+${weeklyDiffPercent}%` : `${weeklyDiffPercent}%`;

  // 2. Success Velocity (Past 30 days completion rate)
  const past30DaysCount = completedDates.filter(d => {
    const diff = (today - new Date(typeof d === 'string' ? d : d.date)) / (1000 * 60 * 60 * 24);
    return diff <= 30;
  }).reduce((acc, d) => acc + (typeof d === 'string' ? 1 : d.count), 0);
  const expected30Days = Math.max(1, totalCount * 30);
  const successVelocity = Math.min(100, Math.round((past30DaysCount / expected30Days) * 100));

  // 3. Most Productive Day
  const daysOfWeek = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
  let dayCounts = [0, 0, 0, 0, 0, 0, 0];
  completedDates.forEach(d => {
    const dateObj = new Date(typeof d === 'string' ? d : d.date);
    if (!isNaN(dateObj.getTime())) {
      dayCounts[dateObj.getDay()] += (typeof d === 'string' ? 1 : d.count);
    }
  });
  const bestDayIndex = dayCounts.indexOf(Math.max(...dayCounts));
  const bestDay = Math.max(...dayCounts) > 0 ? daysOfWeek[bestDayIndex] : 'certain days';

  // 4. Least Completed Habit
  let leastCompletedHabitName = "certain tasks";
  if (habits.length > 0) {
    const sortedByStreak = [...habits].sort((a, b) => (a.streak || 0) - (b.streak || 0));
    leastCompletedHabitName = sortedByStreak[0].name;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Insights</h1>
      </header>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Arc */}
        <div className="col-span-1 p-8 rounded-2xl border border-slate-800 bg-[#111827] flex flex-col items-center justify-center relative overflow-hidden">
          <h3 className="text-sm font-semibold text-slate-400 mb-6 w-full text-center">Today's Arc</h3>
          <div className="w-48 h-48 relative drop-shadow-[0_0_25px_rgba(6,182,212,0.3)] mb-8">
            <CircularProgressbar
              value={completionRate}
              text={`${completionRate}%`}
              strokeWidth={8}
              styles={buildStyles({
                pathColor: '#06b6d4',
                textColor: '#f8fafc',
                trailColor: '#1e293b',
                textSize: '24px',
              })}
            />
            <div className="absolute top-[65%] w-full text-center text-[10px] text-slate-400 font-bold tracking-wider">{completedTodayCount}/{totalCount} Tasks</div>
          </div>
          <div className="w-full flex justify-between px-8">
            <div className="text-center">
              <p className="text-xl font-bold text-emerald-400">{totalCount - completedTodayCount}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Remaining</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-cyan-400">{(completedTodayCount * 15) / 1000}k</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">XP Gained</p>
            </div>
          </div>
        </div>

        {/* Performance Archetype */}
        <div className="col-span-1 lg:col-span-2 p-6 rounded-2xl border border-slate-800 bg-[#111827] flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-slate-400 font-medium">Performance Archetype</p>
              <h3 className="text-lg font-semibold text-slate-100">Weekly Completion Rate</h3>
            </div>
            <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
              <button className="px-3 py-1 text-[10px] font-bold text-cyan-400 bg-cyan-400/10 rounded border border-cyan-400/20 shadow-sm">7 Days</button>
              <button className="px-3 py-1 text-[10px] font-bold text-slate-400 hover:text-slate-300">30 Days</button>
            </div>
          </div>
          <div className="flex-1 mt-4 relative w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyChartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="Physical" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#22d3ee' }} />
                <Line type="monotone" dataKey="Cognitive" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7' }} />
                <Line type="monotone" dataKey="Metabolic" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border-l-4 border-cyan-400 border-y border-r border-slate-800 bg-[#111827]">
          <div className="flex justify-between items-start mb-4">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded", weeklyDiff >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-orange-500/20 text-orange-400")}>
              {weeklyDiffStr}
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Habits Completed</p>
          <h3 className="text-4xl font-bold text-slate-100 mb-2">{thisWeekCount}</h3>
          <p className="text-[10px] text-slate-500">This week vs last week</p>
        </div>
        
        <div className="p-6 rounded-2xl border-l-4 border-emerald-400 border-y border-r border-slate-800 bg-[#111827]">
          <div className="flex justify-between items-start mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] text-slate-500 font-bold">Average</span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Success Velocity</p>
          <h3 className="text-4xl font-bold text-slate-100 mb-2">{successVelocity}%</h3>
          <p className="text-[10px] text-slate-500">Consistency rating (30 days)</p>
        </div>

        <div className="p-6 rounded-2xl border-l-4 border-orange-400 border-y border-r border-slate-800 bg-[#111827]">
          <div className="flex justify-between items-start mb-4">
            <History className="w-5 h-5 text-orange-400" />
            <span className="text-[10px] text-orange-400/80 font-bold flex items-center gap-1">Streak Peak <span>🔥</span></span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Longest Streak</p>
          <h3 className="text-4xl font-bold text-slate-100 mb-4">{longestStreak} <span className="text-xl text-slate-500 font-medium">/ 22</span></h3>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-orange-400 rounded-full" style={{ width: `${Math.min(100, (longestStreak / 22) * 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Neural Insights */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 mb-6">
          <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          Neural Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#111827] flex gap-5">
            <div className="w-14 h-14 rounded-xl bg-[#0B1120] border border-slate-800 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <span className="px-2 py-0.5 bg-cyan-900/40 text-cyan-400 text-[10px] font-bold rounded border border-cyan-500/20 mb-2 inline-block">Peak Performance</span>
              <h4 className="text-lg font-bold text-slate-100 mb-2">You perform best on {bestDay}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Historical logs show maximum task synchronization on this day. Consider scheduling "Heavy Quests" for this window to maximize XP.
              </p>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#111827] flex gap-5">
            <div className="w-14 h-14 rounded-xl bg-[#0B1120] border border-slate-800 flex items-center justify-center shrink-0">
              <Lightbulb className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <span className="px-2 py-0.5 bg-orange-900/40 text-orange-400 text-[10px] font-bold rounded border border-orange-500/20 mb-2 inline-block">Vulnerability Detected</span>
              <h4 className="text-lg font-bold text-slate-100 mb-2">You skip '{leastCompletedHabitName}' most often</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                This pathway has the lowest momentum. Consider temporarily lowering the difficulty or using a Shield to rebuild consistency safely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Habit Hubs */}
      <div className="p-8 rounded-2xl border border-slate-800 bg-[#111827]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Active Habit Hubs</h2>
            <p className="text-sm text-slate-400 mt-1">Monitoring real-time behavioral synchronization</p>
          </div>
          <button className="text-cyan-400 text-sm font-semibold flex items-center gap-1 hover:text-cyan-300">
            View All Habit Clusters &rarr;
          </button>
        </div>

        <div className="space-y-8">
          {/* Physical Fortress */}
          <div className="flex items-center gap-6 group">
            <div className="w-1.5 h-12 bg-cyan-400 rounded-full" />
            <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                <span className="text-slate-200 font-medium text-lg">Physical Fortress</span>
                <span className="text-cyan-400 text-xs font-bold">8/10 Today</span>
              </div>
              <div className="w-full h-2.5 bg-[#0B1120] rounded-full overflow-hidden border border-slate-800/50">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
            <div className="text-right shrink-0 min-w-[80px]">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Mastery</p>
              <p className="text-sm text-slate-200 font-bold">Gold III</p>
            </div>
            <button className="text-slate-500 hover:text-slate-300"><MoreVertical className="w-5 h-5" /></button>
          </div>

          {/* Cognitive Shield */}
          <div className="flex items-center gap-6 group">
            <div className="w-1.5 h-12 bg-emerald-400 rounded-full" />
            <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                <span className="text-slate-200 font-medium text-lg">Cognitive Shield</span>
                <span className="text-emerald-400 text-xs font-bold">5/5 Today</span>
              </div>
              <div className="w-full h-2.5 bg-[#0B1120] rounded-full overflow-hidden border border-slate-800/50">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="text-right shrink-0 min-w-[80px]">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Mastery</p>
              <p className="text-sm text-slate-200 font-bold">Elite I</p>
            </div>
            <button className="text-slate-500 hover:text-slate-300"><MoreVertical className="w-5 h-5" /></button>
          </div>

          {/* Metabolic Sync */}
          <div className="flex items-center gap-6 group">
            <div className="w-1.5 h-12 bg-orange-400 rounded-full" />
            <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                <span className="text-slate-200 font-medium text-lg">Metabolic Sync</span>
                <span className="text-orange-400 text-xs font-bold">2/6 Today</span>
              </div>
              <div className="w-full h-2.5 bg-[#0B1120] rounded-full overflow-hidden border border-slate-800/50">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: '33%' }} />
              </div>
            </div>
            <div className="text-right shrink-0 min-w-[80px]">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Mastery</p>
              <p className="text-sm text-slate-200 font-bold">Silver II</p>
            </div>
            <button className="text-slate-500 hover:text-slate-300"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

    </div>
  );
}
