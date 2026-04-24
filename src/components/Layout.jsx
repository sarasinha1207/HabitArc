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

export default function Layout() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habitarc_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  useEffect(() => {
    localStorage.setItem('habitarc_habits', JSON.stringify(habits));
  }, [habits]);

  const toggleHabit = (id) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
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
        <Outlet context={{ habits, toggleHabit, addHabit }} />
      </main>
    </div>
  );
}
