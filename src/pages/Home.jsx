import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Check, Plus, Droplets, Dumbbell, Brain, BookOpen, AlertTriangle, Sparkles, Edit2, Trash2, X } from 'lucide-react';
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

const QuestModal = ({ isOpen, onClose, onSave, initialData, isWeekly }) => {
  const [formData, setFormData] = useState(
    initialData || { name: '', description: '', category: 'Physical', difficulty: 'Beginner' }
  );

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || { name: '', description: '', category: 'Physical', difficulty: 'Beginner' });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#060B14]/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-[#111827] border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-100">{initialData ? 'Edit Pathway' : 'Initialize New Pathway'}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Pathway Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="e.g., Hydration Protocol"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description</label>
            <input 
              type="text" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="e.g., 3L Spring Water + Electrolytes"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors appearance-none"
              >
                <option value="Physical">Physical</option>
                <option value="Cognitive">Cognitive</option>
                <option value="Metabolic">Metabolic</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Difficulty</label>
              <select 
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors appearance-none"
              >
                <option value="Beginner">Beginner (15 XP)</option>
                <option value="Intermediate">Intermediate (30 XP)</option>
                <option value="Advanced">Advanced (50 XP)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-slate-800 bg-[#0B1120] flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-slate-400 font-semibold hover:text-slate-200">Cancel</button>
          <button 
            onClick={() => {
              if (!formData.name.trim()) return;
              onSave(formData, isWeekly ? 'weekly' : 'daily', !!initialData);
              onClose();
            }}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#0B1120] rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)]"
          >
            {initialData ? 'Save Changes' : 'Initialize'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { 
    habits, weeklyHabits, toggleHabit, toggleWeeklyHabit, 
    addOrUpdateHabit, deleteHabit, mercySkips,
    isQuestModalOpen, setIsQuestModalOpen
  } = useOutletContext();
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [viewMode, setViewMode] = useState('daily');
  const [editingHabit, setEditingHabit] = useState(null);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const { width, height } = useWindowSize();

  const currentList = viewMode === 'daily' ? habits : weeklyHabits;
  const completedCount = currentList.filter(h => h.completed).length;
  const totalCount = currentList.length;
  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const handleToggleHabit = (id) => {
    const habit = currentList.find(h => h.id === id);
    if (!habit.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
    if (viewMode === 'daily') toggleHabit(id);
    else toggleWeeklyHabit(id);
  };

  const confirmDelete = () => {
    if (habitToDelete) {
      deleteHabit(habitToDelete, viewMode);
      setHabitToDelete(null);
    }
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setIsQuestModalOpen(true);
  };

  const getIconForHabit = (category, name) => {
    const n = (name || '').toLowerCase();
    if (category === 'Physical' || n.includes('strength')) return <Dumbbell className="w-5 h-5 text-cyan-400" />;
    if (category === 'Cognitive' || n.includes('mental')) return <Brain className="w-5 h-5 text-purple-400" />;
    if (category === 'Metabolic' || n.includes('hydrat')) return <Droplets className="w-5 h-5 text-emerald-400" />;
    return <BookOpen className="w-5 h-5 text-orange-400" />;
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

      <QuestModal 
        isOpen={isQuestModalOpen} 
        onClose={() => { setIsQuestModalOpen(false); setEditingHabit(null); }}
        onSave={addOrUpdateHabit}
        initialData={editingHabit}
        isWeekly={viewMode === 'weekly'}
      />

      {/* Delete Confirmation Modal */}
      {habitToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#060B14]/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-[#111827] border border-red-500/30 rounded-2xl w-full max-w-sm shadow-[0_0_40px_rgba(239,68,68,0.15)] overflow-hidden relative">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-slate-100">Confirm Deletion</h2>
            </div>
            <div className="p-6">
              <p className="text-slate-300 text-sm leading-relaxed">
                Warning: Deleting this pathway will permanently remove its streak and XP contributions from your profile. Are you sure?
              </p>
            </div>
            <div className="p-6 border-t border-slate-800 bg-[#0B1120] flex justify-end gap-3">
              <button onClick={() => setHabitToDelete(null)} className="px-5 py-2.5 rounded-xl text-slate-400 font-semibold hover:text-slate-200">Cancel</button>
              <button 
                onClick={confirmDelete}
                className="px-6 py-2.5 bg-red-500/10 border border-red-500/50 hover:bg-red-500 hover:text-[#0B1120] text-red-400 rounded-xl font-bold transition-all"
              >
                Delete Pathway
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Top Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily Prime Status */}
        <div className="lg:col-span-2 p-8 rounded-2xl border border-slate-800 bg-[#111827] flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-100 tracking-tight">{viewMode === 'daily' ? 'Daily Prime' : 'Weekly Prime'}</h1>
            <h2 className="text-4xl font-bold text-emerald-400 tracking-tight mb-2">Status: Synchronized</h2>
            <p className="text-slate-400 text-sm mt-4">
              You've completed {completedCount} of {totalCount} active neural pathways.
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
        <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700/50 relative z-10">
          <button 
            onClick={() => setViewMode('daily')}
            className={cn("px-4 py-1.5 text-xs font-bold rounded-md shadow-sm transition-colors", viewMode === 'daily' ? "text-slate-200 bg-slate-700" : "text-slate-500 hover:text-slate-300")}
          >
            Daily
          </button>
          <button 
            onClick={() => setViewMode('weekly')}
            className={cn("px-4 py-1.5 text-xs font-bold rounded-md shadow-sm transition-colors", viewMode === 'weekly' ? "text-slate-200 bg-slate-700" : "text-slate-500 hover:text-slate-300")}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* Habit List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {currentList.map((habit) => {
            const isCompleted = habit.completed;
            const isDanger = habit.isDanger && !isCompleted;
            
            return (
              <motion.div
                key={habit.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={cn(
                  "group relative w-full flex items-center p-5 rounded-xl border bg-[#111827] transition-all duration-300 text-left overflow-hidden",
                  isCompleted ? "border-slate-800" : isDanger ? "border-orange-500/30" : "border-slate-700 hover:border-cyan-500/50"
                )}
              >
                {/* Left Border Accent */}
                <div className={cn(
                  "absolute left-0 top-0 bottom-0 w-1 transition-colors",
                  isCompleted ? "bg-emerald-400" : isDanger ? "bg-orange-500" : "bg-cyan-500"
                )} />

                <div className="flex items-center gap-5 flex-1 pl-2">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1120] border border-slate-800 flex items-center justify-center shrink-0">
                    {getIconForHabit(habit.category, habit.name)}
                  </div>
                  <div>
                    <h3 className={cn("text-lg font-semibold transition-colors flex items-center gap-2", isCompleted ? "text-slate-500" : "text-slate-200")}>
                      {habit.name}
                      <span className={cn("px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded border", 
                        habit.difficulty === 'Advanced' ? "bg-orange-500/10 border-orange-500/20 text-orange-400" : 
                        habit.difficulty === 'Intermediate' ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : 
                        "bg-emerald-500/10 border-emerald-500/20 text-emerald-400")}
                      >
                        {habit.difficulty}
                      </span>
                    </h3>
                    <p className={cn("text-xs mt-1", isCompleted ? "text-slate-600" : "text-slate-400")}>
                      {habit.description || "Neural Pathway"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 pr-2 shrink-0">
                  {/* Action Icons (Hover) */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 mr-2">
                    <button onClick={() => handleEdit(habit)} className="p-2 text-slate-500 hover:text-cyan-400 transition-colors bg-[#0B1120] rounded-lg border border-slate-800 hover:border-cyan-500/50">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setHabitToDelete(habit.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors bg-[#0B1120] rounded-lg border border-slate-800 hover:border-red-500/50 z-20 relative">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Streak</span>
                    <span className={cn("text-xl font-bold font-mono", isDanger ? "text-orange-400" : isCompleted ? "text-emerald-400" : "text-cyan-400")}>
                      {String(habit.streak).padStart(2, '0')}
                    </span>
                  </div>

                  {!isDanger && (
                    <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold w-16 text-center">
                      +{habit.xp || 15} XP
                    </div>
                  )}

                  <button 
                    onClick={() => handleToggleHabit(habit.id)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 active:scale-90",
                      isCompleted 
                        ? "bg-emerald-400 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]" 
                        : isDanger ? "border-orange-500/50" : "border-slate-600 hover:border-cyan-400/50"
                    )}
                  >
                    {isCompleted && <Check className="w-5 h-5 text-[#0B1120] font-bold" />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <button 
          onClick={() => { setEditingHabit(null); setIsQuestModalOpen(true); }}
          className="w-full mt-6 py-5 rounded-xl border border-dashed border-cyan-500/30 text-cyan-500/70 font-semibold hover:bg-cyan-500/5 hover:text-cyan-400 hover:border-cyan-400 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Initialize New Pathway
        </button>
      </div>
    </div>
  );
}
