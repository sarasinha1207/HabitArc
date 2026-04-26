import { useOutletContext } from 'react-router-dom';
import { Trophy, Medal, Hexagon, Crown, Shield } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Generates 50 dummy top-tier players
const generateLeaderboard = () => {
  const names = [
    'Aria Prime', 'Neon Vector', 'Cypher 9', 'Nova Core', 'Xenon Flux',
    'Trinity Sync', 'Vortex Protocol', 'Atlas Node', 'Lyra Quantum', 'Orion Pulse',
    'Echo Command', 'Delta Shift', 'Sigma Protocol', 'Kaelen Void', 'Nyx Cipher',
    'Zephyr Core', 'Hyperion', 'Nexus Ghost', 'Solstice', 'Raven Synth',
    'Lumina', 'Helix Prime', 'Vector Alpha', 'Cipher Trace', 'Zero Day',
    'Omni Sync', 'Kira Voltage', 'Titan Forge', 'Aether Node', 'Chronos',
    'Nova Blast', 'Quasar', 'Stellar Shift', 'Matrix Null', 'Infinity',
    'Apex Protocol', 'Nebula', 'Pulsar', 'Cosmic Ray', 'Zenith',
    'Solaris', 'Lunar Eclipse', 'Gravity', 'Velocity', 'Quantum Leap',
    'Dark Matter', 'Event Horizon', 'Supernova', 'Singularity', 'Photon'
  ];

  let currentXP = 950000;
  return names.map((name, index) => {
    const rank = index + 1;
    const xp = currentXP - Math.floor(Math.random() * 15000) - 5000;
    currentXP = xp;
    return {
      rank,
      name,
      xp,
      level: Math.floor(xp / 1000) + 28,
      badges: Math.floor(Math.random() * 200) + 100,
      isUser: false
    };
  });
};

const topPlayers = generateLeaderboard();

export default function Ranks() {
  const { totalXP, levelInfo, badges } = useOutletContext();
  
  const userStats = {
    rank: 1204,
    name: 'Architect (You)',
    xp: totalXP,
    level: levelInfo.level,
    badges: badges.length,
    isUser: true
  };

  const renderRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-700" />;
    if (rank <= 10) return <Hexagon className="w-4 h-4 text-cyan-400" />;
    return <span className="text-slate-500 font-mono font-bold text-sm">#{rank}</span>;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      
      <header className="space-y-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-100 tracking-tight">Global Ranks</h1>
            <p className="text-slate-400 mt-1 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" /> Season 4 Active // Global Synchronization
            </p>
          </div>
        </div>
      </header>

      {/* Current User Fixed Card */}
      <div className="p-6 rounded-2xl border-2 border-cyan-500/40 bg-cyan-900/10 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex items-center justify-between sticky top-[88px] z-30 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 flex items-center justify-center shrink-0 text-cyan-400 font-mono font-bold text-xl drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
            #{userStats.rank}
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400 p-0.5 shrink-0 bg-[#0B1120]">
            <img src="https://i.pravatar.cc/150?img=47" alt="Avatar" className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              {userStats.name}
              <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] uppercase font-bold rounded">
                Your Signal
              </span>
            </h3>
            <p className="text-xs font-semibold text-cyan-400/80">Level {userStats.level} Architect</p>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Badges</p>
            <p className="text-lg font-bold text-slate-200">{userStats.badges}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Total XP</p>
            <p className="text-2xl font-bold text-cyan-400 font-mono">{(userStats.xp / 1000).toFixed(1)}k</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
        <div className="w-12 text-center">Rank</div>
        <div className="flex-1 pl-4">Architect</div>
        <div className="w-24 text-right">Badges</div>
        <div className="w-32 text-right">Experience</div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2">
        {topPlayers.map((player) => (
          <div 
            key={player.rank}
            className={cn(
              "p-4 rounded-xl flex items-center border transition-colors hover:bg-slate-800/30",
              player.rank <= 3 ? "bg-[#111827] border-slate-700" : "bg-[#0B1120] border-transparent"
            )}
          >
            <div className="w-12 flex items-center justify-center shrink-0">
              {renderRankIcon(player.rank)}
            </div>
            
            <div className="flex-1 pl-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 overflow-hidden shrink-0">
                <img src={`https://i.pravatar.cc/150?u=${player.name}`} alt="" className="w-full h-full object-cover opacity-80" />
              </div>
              <div>
                <h4 className={cn("font-bold text-sm", player.rank <= 3 ? "text-slate-100" : "text-slate-300")}>
                  {player.name}
                </h4>
                <p className="text-xs text-slate-500">Level {player.level}</p>
              </div>
            </div>

            <div className="w-24 text-right text-sm font-semibold text-slate-400">
              {player.badges}
            </div>

            <div className="w-32 text-right">
              <span className={cn(
                "font-mono font-bold",
                player.rank === 1 ? "text-yellow-400" :
                player.rank === 2 ? "text-slate-300" :
                player.rank === 3 ? "text-amber-700" : "text-cyan-500/80"
              )}>
                {(player.xp / 1000).toFixed(1)}k
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
