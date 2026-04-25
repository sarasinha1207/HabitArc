import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, Target } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const INITIAL_HABITS = [
  { id: 1, name: 'Drink 2L of Water', completed: false, streak: 3 },
  { id: 2, name: 'Read for 30 minutes', completed: false, streak: 12 },
  { id: 3, name: 'Workout', completed: false, streak: 5 },
];

const getTodayDateString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export default function Layout() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habitarc_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
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
    // Generate sample data for roughly Jan to April (past 120 days)
    for(let i = 120; i >= 1; i--) {
      if (Math.random() > 0.3) { // 70% chance to have a habit completed
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

  useEffect(() => {
    localStorage.setItem('habitarc_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('habitarc_dates_v2', JSON.stringify(completedDates));
  }, [completedDates]);

  const toggleHabit = (id) => {
    setHabits(prevHabits => {
      const newHabits = prevHabits.map(h => 
        h.id === id ? { ...h, completed: !h.completed } : h
      );
      
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
          if (index >= 0) {
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
      completed: false,
      streak: 0
    };
    setHabits([...habits, newHabit]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xl tracking-tight">
            <Target className="w-6 h-6" />
            <span>HabitArc</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium">
            <NavLink 
              to="/" 
              className={({isActive}) => cn(
                "flex items-center gap-2 transition-colors hover:text-purple-300",
                isActive ? "text-purple-400" : "text-slate-400"
              )}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className={({isActive}) => cn(
                "flex items-center gap-2 transition-colors hover:text-purple-300",
                isActive ? "text-purple-400" : "text-slate-400"
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8">
        <Outlet context={{ habits, toggleHabit, addHabit, completedDates }} />
      </main>
    </div>
  );
}
