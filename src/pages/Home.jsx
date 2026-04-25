import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Check, Plus, Droplets, Dumbbell, Brain, BookOpen, AlertTriangle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined });
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export default function Home() {
  const { habits, toggleHabit, addHabit, mercySkips } = useOutletContext();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const handleToggleHabit = (id) => {
    const habit = habits.find(h => h.id === id);
    if (!habit.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
    toggleHabit(id);
  };

  const getIconForHabit = (name) => {
    const n = name.toLowerCase();
    if (n.includes('hydrat') || n.includes('water')) return <Droplets className="w-5 h-5 text-emerald-400" />;
    if (n.includes('strength') || n.includes('workout')) return <Dumbbell className="w-5 h-5 text-cyan-400" />;
    if (n.includes('mental') || n.includes('meditat')) return <Brain className="w-5 h-5 text-orange-400" />;
    return <BookOpen className="w-5 h-5 text-emerald-400" />;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
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
      
      {/* Top Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily Prime Status */}
        <div className="lg:col-span-2 p-8 rounded-2xl border border-slate-800 bg-[#111827] flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-100 tracking-tight">Daily Prime</h1>
            <h2 className="text-4xl font-bold text-emerald-400 tracking-tight mb-2">Status: Synchronized</h2>
            <p className="text-slate-400 text-sm mt-4">
              You've completed {completedCount} of {totalCount} active neural pathways today.
            </p>
          </div>
          <div className="w-28 h-28 shrink-0 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">
            <CircularProgressbar
              value={completionRate}
              text={`${completionRate}%`}
              strokeWidth={8}
              styles={buildStyles({
                pathColor: '#34d399',
                textColor: '#f8fafc',
                trailColor: '#1e293b',
                textSize: '24px',
              })}
            />
          </div>
        </div>

        {/* Mercy System Status */}
        <div className="lg:col-span-1 p-8 rounded-2xl border border-slate-800 bg-[#111827] flex flex-col items-center justify-center text-center">
          <Sparkles className="w-8 h-8 text-emerald-400 mb-4" />
          <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Mercy System</p>
          <h3 className="text-xl font-bold text-slate-100 mb-4">Status: Active</h3>
          <p className="text-xs text-emerald-400/80 max-w-[200px]">
            {mercySkips} streak protection shield{mercySkips !== 1 ? 's' : ''} remaining
          </p>
        </div>
      </div>

      {/* Pathways Header */}
      <div className="flex items-center justify-between pt-4">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Active Neural Pathways
        </h2>
        <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
          <button className="px-4 py-1.5 text-xs font-bold text-slate-200 bg-slate-700 rounded-md shadow-sm">Daily</button>
          <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-300">Weekly</button>
        </div>
      </div>

      {/* Habit List */}
      <div className="space-y-4">
        <AnimatePresence>
          {habits.map((habit) => {
            const isCompleted = habit.completed;
            const isDanger = habit.isDanger && !isCompleted;
            
            return (
              <motion.button
                key={habit.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleToggleHabit(habit.id)}
                className={cn(
                  "group relative w-full flex items-center p-5 rounded-xl border bg-[#111827] transition-all duration-300 text-left overflow-hidden",
                  isCompleted ? "border-slate-800" : isDanger ? "border-orange-500/30" : "border-slate-700 hover:border-cyan-500/50"
                )}
              >
                {/* Left Border Accent */}
                <div className={cn(
                  "absolute left-0 top-0 bottom-0 w-1",
                  isCompleted ? "bg-emerald-400" : isDanger ? "bg-orange-500" : "bg-cyan-500"
                )} />

                <div className="flex items-center gap-5 flex-1 pl-2">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1120] border border-slate-800 flex items-center justify-center shrink-0">
                    {getIconForHabit(habit.name)}
                  </div>
                  <div>
                    <h3 className={cn("text-lg font-semibold transition-colors", isCompleted ? "text-slate-500" : "text-slate-200")}>
                      {habit.name}
                    </h3>
                    <p className={cn("text-xs mt-1", isCompleted ? "text-slate-600" : "text-slate-400")}>
                      {habit.description || "Neural Pathway"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 pr-2 shrink-0">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Streak</span>
                    <span className={cn("text-xl font-bold font-mono", isDanger ? "text-orange-400" : isCompleted ? "text-emerald-400" : "text-cyan-400")}>
                      {String(habit.streak).padStart(2, '0')}
                    </span>
                  </div>

                  {isDanger && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded text-[10px] font-bold">
                      <AlertTriangle className="w-3 h-3" /> DANGER
                    </div>
                  )}

                  {!isDanger && (
                    <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">
                      +{habit.xp || 15} XP
                    </div>
                  )}

                  <div className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                    isCompleted 
                      ? "bg-emerald-400 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]" 
                      : isDanger ? "border-orange-500/50" : "border-slate-600 group-hover:border-cyan-400/50"
                  )}>
                    {isCompleted && <Check className="w-5 h-5 text-[#0B1120] font-bold" />}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>

        <button 
          onClick={() => addHabit('New Neural Pathway')}
          className="w-full mt-6 py-5 rounded-xl border border-dashed border-cyan-500/30 text-cyan-500/70 font-semibold hover:bg-cyan-500/5 hover:text-cyan-400 hover:border-cyan-400 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Initialize New Pathway
        </button>
      </div>
    </div>
  );
}
