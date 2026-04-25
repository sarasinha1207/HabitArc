import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, TrendingUp, User, Plus, Settings, HelpCircle, Bell, Award, Zap } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const INITIAL_HABITS = [
  { id: 1, name: 'Hydration Protocol', description: '3L Spring Water + Electrolytes', completed: false, streak: 14, xp: 25 },
  { id: 2, name: 'Strength Conditioning', description: '45min Hypertrophy Session', completed: false, streak: 8, xp: 50 },
  { id: 3, name: 'Mental Clarity', description: '20min Deep Meditation', completed: false, streak: 22, xp: 15, isDanger: true },
  { id: 4, name: 'Neural Expansion', description: 'Read 20 Pages Non-Fiction', completed: false, streak: 3, xp: 15 },
];

const getTodayDateString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export default function Layout() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habitarc_habits_v2');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  const [totalXP, setTotalXP] = useState(() => {
    const saved = localStorage.getItem('habitarc_xp');
    return saved ? parseInt(saved, 10) : 14200;
  });

  const [completedDates, setCompletedDates] = useState(() => {
    const saved = localStorage.getItem('habitarc_dates_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0 && typeof parsed[0] === 'string') {
        return parsed.map(date => ({ date, count: 1 }));
      }
      return parsed;
    }
    
    const d = new Date();
    const pastDates = [];
    for(let i = 120; i >= 1; i--) {
      if (Math.random() > 0.3) {
        const past = new Date(d);
        past.setDate(past.getDate() - i);
        pastDates.push({
          date: `${past.getFullYear()}-${String(past.getMonth() + 1).padStart(2, '0')}-${String(past.getDate()).padStart(2, '0')}`,
          count: Math.floor(Math.random() * 4) + 1
        });
      }
    }
    return pastDates;
  });

  const [mercySkips, setMercySkips] = useState(() => {
    const saved = localStorage.getItem('habitarc_skips');
    return saved !== null ? parseInt(saved, 10) : 2;
  });

  useEffect(() => {
    localStorage.setItem('habitarc_habits_v2', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('habitarc_dates_v2', JSON.stringify(completedDates));
  }, [completedDates]);

  useEffect(() => {
    localStorage.setItem('habitarc_skips', mercySkips.toString());
  }, [mercySkips]);

  useEffect(() => {
    localStorage.setItem('habitarc_xp', totalXP.toString());
  }, [totalXP]);

  const useSkipDay = () => {
    if (mercySkips <= 0) return;
    
    const today = getTodayDateString();
    
    setCompletedDates(prevDates => {
      let newDates = [...prevDates];
      const index = newDates.findIndex(d => (typeof d === 'string' ? d : d.date) === today);
      if (index === -1) {
        newDates.push({ date: today, count: 0, isSkip: true });
        setMercySkips(prev => prev - 1);
        return newDates.sort((a, b) => (typeof a === 'string' ? a : a.date).localeCompare((typeof b === 'string' ? b : b.date)));
      }
      return prevDates;
    });
  };

  const toggleHabit = (id) => {
    setHabits(prevHabits => {
      const newHabits = prevHabits.map(h => {
        if (h.id === id) {
          const isNowCompleted = !h.completed;
          const xpGained = h.xp || 15;
          setTotalXP(prev => prev + (isNowCompleted ? xpGained : -xpGained));
          return {
            ...h,
            completed: isNowCompleted,
            streak: isNowCompleted ? h.streak + 1 : Math.max(0, h.streak - 1)
          };
        }
        return h;
      });
      
      const today = getTodayDateString();
      const completedCount = newHabits.filter(h => h.completed).length;
      
      setCompletedDates(prevDates => {
        let newDates = [...prevDates];
        const index = newDates.findIndex(d => (typeof d === 'string' ? d : d.date) === today);
        if (completedCount > 0) {
          if (index >= 0) {
            newDates[index] = { date: today, count: completedCount };
          } else {
            newDates.push({ date: today, count: completedCount });
          }
        } else {
          if (index >= 0 && !newDates[index].isSkip) {
            newDates = newDates.filter(d => (typeof d === 'string' ? d : d.date) !== today);
          }
        }
        return newDates.sort((a, b) => (typeof a === 'string' ? a : a.date).localeCompare((typeof b === 'string' ? b : b.date)));
      });

      return newHabits;
    });
  };

  const addHabit = (name) => {
    if (!name.trim()) return;
    const newHabit = {
      id: Date.now(),
      name: name.trim(),
      description: 'New Neural Pathway',
      completed: false,
      streak: 0,
      xp: 10
    };
    setHabits([...habits, newHabit]);
  };

  const currentStreakVal = completedDates.length > 0 ? 12 : 0; // Simulated for header
  const level = Math.floor(totalXP / 1000) + 28; // Dummy calculation for level

  return (
    <div className="min-h-screen flex bg-[#0B1120] text-slate-100 font-sans selection:bg-cyan-500/30">
      
      {/* Left Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 bg-[#060B14] border-r border-slate-800/60 flex flex-col items-center py-8 z-50">
        <div className="flex flex-col items-center gap-3 mb-10 w-full px-6">
          <div className="w-16 h-16 rounded-full bg-slate-800 p-1 border-2 border-emerald-500 relative">
            <img src="https://i.pravatar.cc/150?img=47" alt="Avatar" className="w-full h-full rounded-full object-cover" />
            <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-[#060B14] text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#060B14]">
              {level}
            </span>
          </div>
          <div className="text-center w-full">
            <h2 className="text-xl font-bold text-teal-400 italic mb-0.5">HabitArc</h2>
            <p className="text-xs text-slate-200 font-semibold">Level {level} Architect</p>
            <p className="text-[10px] text-slate-500 font-medium">Elite Tier</p>
          </div>
          <div className="w-full mt-4">
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[78%]" />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-slate-500 font-medium tracking-wide">
              <span>XP: {totalXP.toLocaleString()} / {(totalXP + 3800).toLocaleString()}</span>
              <span>78%</span>
            </div>
          </div>
        </div>

        <nav className="w-full flex-1 px-4 space-y-1.5">
          <NavLink to="/" className={({isActive}) => cn("flex items-center gap-4 px-4 py-3 rounded-xl transition-all", isActive ? "bg-slate-800/50 text-emerald-400 border-r-2 border-emerald-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30")}>
            <Home className="w-5 h-5" /> <span className="font-medium text-sm">Home</span>
          </NavLink>
          <NavLink to="/dashboard" className={({isActive}) => cn("flex items-center gap-4 px-4 py-3 rounded-xl transition-all", isActive ? "bg-slate-800/50 text-emerald-400 border-r-2 border-emerald-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30")}>
            <LayoutDashboard className="w-5 h-5" /> <span className="font-medium text-sm">Dashboard</span>
          </NavLink>
          <NavLink to="/heatmap" className={({isActive}) => cn("flex items-center gap-4 px-4 py-3 rounded-xl transition-all", isActive ? "bg-slate-800/50 text-emerald-400 border-r-2 border-emerald-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30")}>
            <TrendingUp className="w-5 h-5" /> <span className="font-medium text-sm">Heatmap</span>
          </NavLink>
          <NavLink to="/profile" className={({isActive}) => cn("flex items-center gap-4 px-4 py-3 rounded-xl transition-all", isActive ? "bg-slate-800/50 text-emerald-400 border-r-2 border-emerald-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30")}>
            <User className="w-5 h-5" /> <span className="font-medium text-sm">Profile</span>
          </NavLink>
        </nav>

        <div className="w-full px-4 mt-auto space-y-4">
          <button onClick={() => addHabit('Custom Protocol')} className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-[#0B1120] rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)] flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" /> Start New Quest
          </button>
          <div className="pt-4 border-t border-slate-800/60 space-y-1">
            <div className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-slate-300 cursor-pointer transition-all text-xs font-medium">
              <Settings className="w-4 h-4" /> Settings
            </div>
            <NavLink to="/help" className={({isActive}) => cn("flex items-center gap-3 px-4 py-2 transition-all text-xs font-medium", isActive ? "text-emerald-400" : "text-slate-500 hover:text-slate-300")}>
              <HelpCircle className="w-4 h-4" /> Help
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/60 px-8 flex items-center justify-between sticky top-0 z-40 bg-[#0B1120]/80 backdrop-blur-md">
          <div className="flex items-center gap-6 text-sm font-semibold text-slate-300">
            <span className="text-cyan-400 cursor-pointer">Daily Log</span>
            <span className="cursor-pointer hover:text-slate-100 transition-colors">Global Ranks</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 w-64">
              <input type="text" placeholder="Search data..." className="bg-transparent border-none outline-none text-sm text-slate-300 w-full placeholder:text-slate-600" />
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <Bell className="w-5 h-5 cursor-pointer hover:text-slate-200 transition-colors" />
              <Award className="w-5 h-5 cursor-pointer hover:text-slate-200 transition-colors" />
              <div className="flex items-center gap-1.5 bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
                <Zap className="w-3.5 h-3.5" />
                {currentStreakVal} Day Streak
              </div>
            </div>
            <button className="px-4 py-1.5 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 rounded-full text-sm font-semibold transition-all">
              Sync Data
            </button>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto px-8 py-8">
          <Outlet context={{ habits, toggleHabit, addHabit, completedDates, mercySkips, useSkipDay, totalXP }} />
        </main>
      </div>
    </div>
  );
}
