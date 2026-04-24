import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Check, Flame, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Simple hook to get window size for confetti
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default function Home() {
  const { habits, toggleHabit, addHabit } = useOutletContext();
  const [newHabitName, setNewHabitName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const completedCount = habits.filter(h => h.completed).length;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit(newHabitName);
    setNewHabitName('');
  };

  const handleToggleHabit = (id) => {
    const habit = habits.find(h => h.id === id);
    if (!habit.completed) {
      // Trigger confetti only when marking as complete
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
    toggleHabit(id);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {showConfetti && (
        <Confetti 
          width={width} 
          height={height} 
          recycle={false}
          numberOfPieces={400}
          gravity={0.15}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 100, pointerEvents: 'none' }}
        />
      )}
      
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
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!newHabitName.trim()}
          className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/25"
        >
          <Plus className="w-5 h-5" />
          <span>Add</span>
        </motion.button>
      </form>

      <div className="grid gap-4">
        <AnimatePresence>
          {habits.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 text-center border border-dashed border-slate-800 rounded-2xl text-slate-500"
            >
              No habits yet. Add one above to get started!
            </motion.div>
          ) : (
            habits.map((habit) => (
              <motion.button
                key={habit.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleToggleHabit(habit.id)}
                className={cn(
                  "group relative w-full flex items-center justify-between p-4 rounded-2xl border transition-colors duration-300 ease-out",
                  "hover:shadow-lg hover:shadow-purple-500/10",
                  habit.completed 
                    ? "bg-slate-900/50 border-purple-500/40" 
                    : "bg-slate-900 border-slate-800 hover:border-slate-700"
                )}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    initial={false}
                    animate={{
                      scale: habit.completed ? [1, 1.3, 1] : 1,
                      rotate: habit.completed ? [0, 10, -10, 0] : 0
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-md border transition-all duration-300",
                      habit.completed
                        ? "bg-purple-500 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                        : "bg-slate-950 border-slate-700 text-transparent group-hover:border-purple-400/50"
                    )}
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
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
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
