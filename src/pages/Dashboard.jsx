import { useOutletContext } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { CheckCircle2, TrendingUp, History, Calendar, Lightbulb, MoreVertical } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Dashboard() {
  const { habits, completedDates, highestHabitStreak } = useOutletContext();
  
  const completedTodayCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const completionRate = totalCount === 0 ? 0 : Math.round((completedTodayCount / totalCount) * 100);

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
          <div className="flex-1 mt-4 relative">
            {/* Blank Chart Area mimicking mockup */}
            <div className="absolute bottom-0 w-full flex justify-between text-xs text-slate-500 px-4">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border-l-4 border-cyan-400 border-y border-r border-slate-800 bg-[#111827]">
          <div className="flex justify-between items-start mb-4">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">+12%</span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Habits Completed</p>
          <h3 className="text-4xl font-bold text-slate-100 mb-2">58</h3>
          <p className="text-[10px] text-slate-500">This week vs last week</p>
        </div>
        
        <div className="p-6 rounded-2xl border-l-4 border-emerald-400 border-y border-r border-slate-800 bg-[#111827]">
          <div className="flex justify-between items-start mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] text-slate-500 font-bold">Average</span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Success Velocity</p>
          <h3 className="text-4xl font-bold text-slate-100 mb-2">84%</h3>
          <p className="text-[10px] text-slate-500">Consistency rating across all hubs</p>
        </div>

        <div className="p-6 rounded-2xl border-l-4 border-orange-400 border-y border-r border-slate-800 bg-[#111827]">
          <div className="flex justify-between items-start mb-4">
            <History className="w-5 h-5 text-orange-400" />
            <span className="text-[10px] text-orange-400/80 font-bold flex items-center gap-1">Streak Peak <span>🔥</span></span>
          </div>
          <p className="text-slate-400 text-sm mb-1">Current Streak</p>
          <h3 className="text-4xl font-bold text-slate-100 mb-4">{highestHabitStreak} <span className="text-xl text-slate-500 font-medium">/ 22</span></h3>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-orange-400 rounded-full" style={{ width: `${Math.min(100, (highestHabitStreak / 22) * 100)}%` }} />
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
              <h4 className="text-lg font-bold text-slate-100 mb-2">You perform best on Mondays</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Data shows a 94% completion rate on the start of the week. Consider scheduling your "Heavy Quests" for this window to maximize XP.
              </p>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#111827] flex gap-5">
            <div className="w-14 h-14 rounded-xl bg-[#0B1120] border border-slate-800 flex items-center justify-center shrink-0">
              <Lightbulb className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/20 mb-2 inline-block">Correlation Found</span>
              <h4 className="text-lg font-bold text-slate-100 mb-2">Morning Sunlight x Deep Work</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                When you log 'Morning Sunlight' before 9 AM, your 'Deep Work' habit completion increases by 22% later in the day.
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
