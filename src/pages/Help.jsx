import { HelpCircle, ChevronRight, Zap, Target, Shield, Flame, ShieldAlert } from 'lucide-react';

export default function Help() {
  const faqs = [
    {
      question: "How is XP calculated?",
      answer: "Experience Points (XP) are fixed based on the difficulty of your neural pathways. Beginner tasks grant 15 XP, Intermediate tasks grant 30 XP, and Advanced tasks (like 'Heavy Quests') grant 50 XP. Completing these daily or weekly synchronizations levels up your Architect profile."
    },
    {
      question: "What happens when my streak breaks?",
      answer: "If you fail to synchronize any pathways on a given day, your streak will break. However, HabitArc enters 'Recovery Mode' to support you rather than punish you. You also have a limited number of 'Shields' (Mercy Skips) to preserve your streak if you know you'll be unavailable."
    },
    {
      question: "How do I get more Shields?",
      answer: "You are granted a set number of Shields at the beginning of each month based on your Architect Level. Reaching new Mastery Tiers also grants bonus shields."
    },
    {
      question: "Can I sync data across devices?",
      answer: "Currently, your data is stored locally within your browser's secure cache. Cloud synchronization is an upcoming module in the next HabitArc system update."
    }
  ];

  const tips = [
    {
      icon: Zap,
      title: "Morning Momentum",
      desc: "Synchronizing at least one pathway before 9 AM increases your chances of completing your entire daily arc by 40%."
    },
    {
      icon: Target,
      title: "Micro-Targeting",
      desc: "Break large goals into micro-habits. Instead of 'Read a book', set your pathway to 'Read 2 pages'. Lower friction leads to higher consistency."
    },
    {
      icon: Flame,
      title: "Protect the Flame",
      desc: "Your streak multiplier starts granting bonus XP after day 7. If you're feeling burnt out, use a Shield rather than letting the flame die."
    },
    {
      icon: Shield,
      title: "Recovery Mode",
      desc: "If you do break a streak, don't panic. The 'Start Again' feature grants a 15% XP boost for the first 3 days to help you get back on track quickly."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl pb-20">
      
      <header className="space-y-4 mb-10">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
          <HelpCircle className="w-8 h-8 text-cyan-400" />
        </div>
        <h1 className="text-4xl font-bold text-slate-100 tracking-tight">System Support</h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
          Access the HabitArc knowledge base to understand core mechanics, troubleshoot issues, and learn strategies to maximize your architectural growth.
        </p>
      </header>

      <div className="space-y-12">
        {/* System Mechanics */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-400 rounded-full inline-block" />
            Category & Experience Distribution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#111827] hover:border-cyan-500/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                <span className="text-cyan-400 font-bold">PHY</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">Physical Fortress</h3>
              <p className="text-sm text-slate-400 mb-6">Movement, strength, and physical conditioning tasks.</p>
              <ul className="text-sm space-y-3 text-slate-300">
                <li className="flex justify-between items-center"><span className="text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded">Beginner</span><span className="font-mono font-bold">15 XP</span></li>
                <li className="flex justify-between items-center"><span className="text-cyan-400 text-xs font-bold uppercase tracking-widest bg-cyan-400/10 px-2 py-1 rounded">Intermediate</span><span className="font-mono font-bold">30 XP</span></li>
                <li className="flex justify-between items-center"><span className="text-orange-400 text-xs font-bold uppercase tracking-widest bg-orange-400/10 px-2 py-1 rounded">Advanced</span><span className="font-mono font-bold">50 XP</span></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800 bg-[#111827] hover:border-purple-500/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                <span className="text-purple-400 font-bold">COG</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">Cognitive Shield</h3>
              <p className="text-sm text-slate-400 mb-6">Learning, meditation, and mental clarity tasks.</p>
              <ul className="text-sm space-y-3 text-slate-300">
                <li className="flex justify-between items-center"><span className="text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded">Beginner</span><span className="font-mono font-bold">15 XP</span></li>
                <li className="flex justify-between items-center"><span className="text-cyan-400 text-xs font-bold uppercase tracking-widest bg-cyan-400/10 px-2 py-1 rounded">Intermediate</span><span className="font-mono font-bold">30 XP</span></li>
                <li className="flex justify-between items-center"><span className="text-orange-400 text-xs font-bold uppercase tracking-widest bg-orange-400/10 px-2 py-1 rounded">Advanced</span><span className="font-mono font-bold">50 XP</span></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800 bg-[#111827] hover:border-emerald-500/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                <span className="text-emerald-400 font-bold">MET</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">Metabolic Sync</h3>
              <p className="text-sm text-slate-400 mb-6">Nutrition, hydration, and recovery tasks.</p>
              <ul className="text-sm space-y-3 text-slate-300">
                <li className="flex justify-between items-center"><span className="text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded">Beginner</span><span className="font-mono font-bold">15 XP</span></li>
                <li className="flex justify-between items-center"><span className="text-cyan-400 text-xs font-bold uppercase tracking-widest bg-cyan-400/10 px-2 py-1 rounded">Intermediate</span><span className="font-mono font-bold">30 XP</span></li>
                <li className="flex justify-between items-center"><span className="text-orange-400 text-xs font-bold uppercase tracking-widest bg-orange-400/10 px-2 py-1 rounded">Advanced</span><span className="font-mono font-bold">50 XP</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mercy System Mechanics */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-rose-400 rounded-full inline-block" />
            The Mercy System
          </h2>
          <div className="p-8 rounded-2xl border border-rose-500/20 bg-rose-500/5 hover:border-rose-500/40 transition-colors">
            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-400" /> What is a Shield?
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              The Mercy System is your safety net. Life is unpredictable, and punishing a broken streak due to an emergency or burnout goes against the core philosophy of HabitArc. A <strong>Shield</strong> allows you to skip a day of habits without losing your active streak multiplier.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B1120] p-5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-400 mb-2">When to use it:</h4>
                <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                  <li>Sudden illness or physical burnout</li>
                  <li>Unplanned emergencies preventing access</li>
                  <li>Strategic rest days for heavy physical quests</li>
                </ul>
              </div>
              <div className="bg-[#0B1120] p-5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-rose-400 mb-2">How to use it:</h4>
                <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                  <li>Navigate to the <strong>Heatmap</strong> page</li>
                  <li>Click the <strong>"Use Shield"</strong> button under the Mercy System active module</li>
                  <li>The current day will be marked as skipped, protecting your streak count.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-cyan-400 rounded-full inline-block" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-800 bg-[#111827] hover:border-slate-700 transition-colors group cursor-pointer">
                <h3 className="text-lg font-semibold text-slate-200 flex items-start justify-between mb-3">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 mt-0.5" />
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-400 rounded-full inline-block" />
            Architectural Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {tips.map((tip, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-800 bg-[#0B1120] flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center shrink-0">
                  <tip.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 mb-1">{tip.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 text-center">
            <h4 className="font-bold text-slate-200 mb-2">Need direct assistance?</h4>
            <p className="text-sm text-slate-400 mb-4">Contact the HabitArc engineering team for technical support.</p>
            <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl font-semibold transition-colors text-sm w-full border border-slate-700">
              Open Support Ticket
            </button>
          </div>
        </section>

      </div>
      </div>
    </div>
  );
}
