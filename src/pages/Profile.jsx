import { useOutletContext, useNavigate } from 'react-router-dom';
import { Star, BarChart2, Award, ExternalLink, Flame, CheckCircle2, HeartPulse, CalendarX2, RefreshCcw, History } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Profile() {
  const { totalXP, mercySkips, useSkipDay, completedDates, badges, levelInfo, skipHistory } = useOutletContext();
  const navigate = useNavigate();

  const { level, progress, currentThreshold, nextThreshold } = levelInfo;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      
      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Profile Card */}
        <div className="lg:col-span-2 p-8 rounded-2xl border border-slate-800 bg-[#111827] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start gap-6 relative z-10">
            <div className="w-24 h-24 rounded-full border-4 border-cyan-400 p-1 relative bg-[#0B1120]">
              <img src="https://i.pravatar.cc/150?img=47" alt="Avatar" className="w-full h-full rounded-full object-cover" />
              <span className="absolute -bottom-2 right-0 bg-cyan-400 text-[#0B1120] text-xs font-bold px-2 py-0.5 rounded-full border-2 border-[#111827]">
                LVL {level}
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-100 tracking-tight">Architect</h1>
              <p className="text-lg text-slate-400 mt-1">Level {level} Master Crafter</p>
            </div>
          </div>
          
          <div className="mt-12 relative z-10">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                Progression to Level {level + 1}
              </span>
              <span className="text-cyan-400 font-bold">
                <span className="text-lg">{totalXP.toLocaleString()}</span> 
                {` / ${nextThreshold.toLocaleString()} `}
                <span className="text-[10px] font-normal uppercase tracking-wider text-cyan-400/80">XP</span>
              </span>
            </div>
            <div className="w-full h-3 bg-[#0B1120] rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-cyan-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          
          {/* Faint Background Icon */}
          <div className="absolute top-8 right-8 text-slate-800/30 opacity-50 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>

        {/* Small Stat Cards Grid */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-800 bg-[#111827] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium text-slate-400">Total XP</span>
            </div>
            <span className="text-xl font-bold text-slate-100">{(totalXP / 1000).toFixed(1)}k</span>
          </div>
          <div className="p-5 rounded-2xl border border-slate-800 bg-[#111827] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart2 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-slate-400">Global Rank</span>
            </div>
            <span className="text-xl font-bold text-slate-100">#1,204</span>
          </div>
          <div className="p-5 rounded-2xl border border-slate-800 bg-[#111827] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-medium text-slate-400">Total Badges</span>
            </div>
            <span className="text-xl font-bold text-slate-100">{badges.length}</span>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recovery Mode */}
        <div className="lg:col-span-2 p-8 rounded-2xl border border-orange-500/20 bg-[#111827] relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Recovery Mode</h2>
          </div>
          <p className="text-slate-400 text-lg max-w-xl mb-8 leading-relaxed">
            "Consistency isn't perfection. Let's rebuild." Your streak is in danger, but the Mercy System is active.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={useSkipDay}
              disabled={mercySkips <= 0}
              className="p-6 rounded-xl border border-slate-800 bg-[#0B1120] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all flex flex-col items-center justify-center text-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CalendarX2 className="w-6 h-6 text-orange-400 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg font-bold text-slate-100">Skip Day</h4>
              <p className="text-sm text-slate-500 mt-1">{mercySkips} uses remaining</p>
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all flex flex-col items-center justify-center text-center group"
            >
              <RefreshCcw className="w-6 h-6 text-emerald-400 mb-3 group-hover:rotate-180 transition-transform duration-500" />
              <h4 className="text-lg font-bold text-slate-100">Start Again</h4>
              <p className="text-sm text-emerald-400/70 mt-1">Reset with 15% XP Boost</p>
            </button>
          </div>
        </div>

        {/* Recent Badges */}
        <div className="lg:col-span-1 p-6 rounded-2xl border border-slate-800 bg-[#111827] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-100">Recent Badges</h3>
            <ExternalLink className="w-4 h-4 text-slate-500 hover:text-slate-300 cursor-pointer" />
          </div>
          
          <div className="space-y-4 flex-1">
            {badges.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Award className="w-8 h-8 text-slate-600 mb-3" />
                <p className="text-slate-500 text-sm">No badges unlocked yet.</p>
                <p className="text-slate-600 text-xs mt-1">Keep synchronizing pathways!</p>
              </div>
            ) : (
              badges.slice(-4).reverse().map((badge) => (
                <div key={badge.id} className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl border flex items-center justify-center shrink-0",
                    badge.id === 'streak_7' ? "bg-orange-500/10 border-orange-500/20" : "bg-cyan-500/10 border-cyan-500/20"
                  )}>
                    {badge.id === 'streak_7' ? <Flame className="w-5 h-5 text-orange-400" /> : <Star className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">{badge.title}</h4>
                    <p className="text-xs text-slate-500">{badge.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <button className="w-full mt-6 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:bg-slate-800 transition-colors">
            View All Achievements
          </button>
        </div>

      </div>

      {/* Skip History Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 p-8 rounded-2xl border border-slate-800 bg-[#111827] relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center">
              <History className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Mercy Skip Log</h3>
          </div>
          
          {skipHistory && skipHistory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {skipHistory.map(skip => {
                const dateObj = new Date(skip.date);
                const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                return (
                  <div key={skip.id} className="p-4 rounded-xl border border-slate-700 bg-[#0B1120] flex flex-col">
                    <span className="text-xs text-emerald-400 font-bold tracking-wider mb-1">{formattedDate}</span>
                    <span className="text-sm text-slate-300 font-medium">{skip.reason || 'Tactical Rest'}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No skips used yet. Your consistency is ironclad!</p>
          )}
        </div>
      </div>

      {/* Momentum Bottom Visual */}
      <div className="pt-16 pb-8 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[600px] h-[600px] rounded-full border-[20px] border-cyan-500 blur-3xl opacity-20 translate-y-32"></div>
        </div>
        <p className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase mb-4 z-10">Current Momentum</p>
        <div className="flex items-end gap-2 z-10">
          <span className="text-7xl font-light text-cyan-400 tracking-tighter">88%</span>
          <span className="text-slate-400 text-sm mb-3">Daily Arc</span>
        </div>
      </div>

    </div>
  );
}
