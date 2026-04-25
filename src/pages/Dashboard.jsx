import { useOutletContext } from 'react-router-dom';
import { Trophy, CheckCircle2, Flame, TrendingUp } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Dashboard() {
  const { habits, completedDates } = useOutletContext();
  
  const total = habits.length;
  const completed = habits.filter(h => h.completed).length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
  
  const calculateStreaks = (dates) => {
    if (!dates || dates.length === 0) return { current: 0, longest: 0 };
    
    const sorted = [...dates].sort();
    let current = 1;
    let longest = 1;
    let streak = 1;
    
    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(sorted[i-1]);
      const currDate = new Date(sorted[i]);
      const diffTime = Math.abs(currDate - prevDate);
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
        longest = Math.max(longest, streak);
      } else if (diffDays > 1) {
        streak = 1;
      }
    }
    
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const lastDate = new Date(sorted[sorted.length - 1]);
    const todayObj = new Date(todayStr);
    const diffDaysFromToday = Math.round((todayObj - lastDate) / (1000 * 60 * 60 * 24));
    
    if (diffDaysFromToday <= 1) {
      current = streak;
    } else {
      current = 0;
    }
    
    return { current, longest };
  };

  const { current: currentStreak, longest: longestStreak } = calculateStreaks(completedDates);

  const STATS = [
    {
      name: 'Current Streak',
      value: `${currentStreak} Days`,
      icon: Flame,
      color: 'text-orange-500',
      bg: currentStreak > 0 ? 'bg-orange-500/20' : 'bg-slate-800',
      border: currentStreak > 0 ? 'border-orange-500/50 shadow-[0_0_25px_rgba(249,115,22,0.25)]' : 'border-slate-800',
      isHighlight: currentStreak > 0
    },
    {
      name: 'Completed Today',
      value: `${completed}/${total}`,
      icon: CheckCircle2,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      border: 'border-purple-400/20'
    },
    {
      name: 'Completion Rate',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20'
    },
    {
      name: 'Longest Streak',
      value: `${longestStreak} Days`,
      icon: Trophy,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'border-amber-400/20'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-50 tracking-tight">Dashboard</h1>
        <p className="text-slate-400">
          Your progress and statistics at a glance.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STATS.map((stat) => (
          <div 
            key={stat.name}
            className={cn(
              "p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden",
              stat.isHighlight ? "bg-orange-950/20" : "bg-slate-900/50 hover:bg-slate-900",
              stat.border
            )}
          >
            {stat.isHighlight && (
              <div className="absolute -right-6 -top-6 p-4 opacity-10 rotate-12">
                <Flame className="w-32 h-32 text-orange-500" />
              </div>
            )}
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className={cn("font-medium text-sm mb-1", stat.isHighlight ? "text-orange-200/70" : "text-slate-400")}>{stat.name}</p>
                <h3 className={cn("text-3xl font-bold tracking-tight", stat.isHighlight ? "text-orange-400" : "text-slate-50")}>{stat.value}</h3>
              </div>
              <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/30 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 text-orange-400 mb-2">
          {currentStreak > 0 ? <Flame className="w-8 h-8" /> : <Trophy className="w-8 h-8" />}
        </div>
        <h2 className="text-xl font-bold text-slate-50">
          {currentStreak > 0 ? `🔥 You're on a ${currentStreak}-day streak!` : "Keep up the great work!"}
        </h2>
        <p className="text-slate-400 max-w-md mx-auto">
          {currentStreak > 0 
            ? `Fantastic job! Complete your remaining habits today to keep the fire alive.`
            : "Start building your streak today! Complete your first habit to get started."}
        </p>
      </div>
    </div>
  );
}
