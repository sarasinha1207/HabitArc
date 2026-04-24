import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Check, Flame, Plus } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const { habits, toggleHabit, addHabit } = useOutletContext();
  const [newHabitName, setNewHabitName] = useState('');

  const completedCount = habits.filter(h => h.completed).length;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit(newHabitName);
    setNewHabitName('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-50 tracking-tight">Today's Habits</h1>
        <p className="text-slate-400">
          You've completed <span className="text-purple-400 font-semibold">{completedCount}</span> out of {habits.length} habits today.
        </p>
      </header>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          placeholder="What new habit do you want to start?"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
        />
        <button 
          type="submit"
          disabled={!newHabitName.trim()}
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/25"
        >
          <Plus className="w-5 h-5" />
          <span>Add</span>
        </button>
      </form>

      <div className="grid gap-4">
        {habits.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl text-slate-500">
            No habits yet. Add one above to get started!
          </div>
        ) : (
          habits.map((habit) => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={cn(
                "group relative w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ease-out",
                "hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-0.5",
                habit.completed 
                  ? "bg-slate-900/50 border-purple-500/30" 
                  : "bg-slate-900 border-slate-800 hover:border-slate-700"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-md border transition-colors duration-300",
                  habit.completed
                    ? "bg-purple-500 border-purple-500 text-white"
                    : "bg-slate-950 border-slate-700 text-transparent group-hover:border-purple-400/50"
                )}>
                  <Check className="w-4 h-4" />
                </div>
                <span className={cn(
                  "font-medium text-lg transition-colors duration-300 text-left",
                  habit.completed ? "text-slate-500 line-through decoration-purple-500/40" : "text-slate-100"
                )}>
                  {habit.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-sm font-medium shrink-0 ml-4">
                <Flame className={cn(
                  "w-4 h-4 transition-colors",
                  habit.completed ? "text-orange-400" : "text-slate-600"
                )} />
                <span className={cn(
                  habit.completed ? "text-orange-400/90" : "text-slate-500"
                )}>
                  {habit.streak}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
