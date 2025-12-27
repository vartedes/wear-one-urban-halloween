
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const LoyaltyScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, notify } = useApp();
  const [claimed, setClaimed] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);

  if (!user) return null;

  const handleDailyClaim = () => {
    setIsCollecting(true);
    setTimeout(() => {
      setClaimed(true);
      setIsCollecting(false);
      notify("+50 XP Recolectados con éxito!");
    }, 1500);
  };

  return (
    <div className="bg-background-dark min-h-screen flex flex-col pb-24 text-white font-display">
      <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-white/5 flex items-center p-4 justify-between">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-white/10"><span className="material-symbols-outlined">arrow_back</span></button>
        <h2 className="text-lg font-bold uppercase tracking-widest">Loyalty Hub</h2>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 flex flex-col p-6 animate-in fade-in duration-700">
        <div className="relative flex flex-col items-center mb-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-purple/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative p-[4px] rounded-full bg-gradient-to-tr from-halloween-purple via-primary-purple to-halloween-orange mb-6 shadow-[0_0_40px_rgba(127,19,236,0.4)] hover:scale-110 transition-transform duration-500">
            <div className="bg-[#101922] p-1 rounded-full">
              <div className="h-32 w-32 rounded-full bg-cover bg-center border-4 border-surface-dark" style={{backgroundImage: `url("${user.avatar}")`}}></div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-halloween-orange text-black size-10 rounded-full flex items-center justify-center font-black border-4 border-background-dark shadow-xl">
              {user.level}
            </div>
          </div>
          
          <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter text-center">
            {user.level >= 3 ? 'Elite Rider' : 'Street Walker'}
          </h1>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.3em] mt-1">The Shadow Society Member</p>
        </div>

        {/* Progress Card */}
        <div className="bg-surface-dark rounded-[2rem] p-8 shadow-2xl border border-white/5 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-8xl">military_tech</span>
          </div>
          
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">local_fire_department</span> Experiencia
              </span>
              <div className="text-4xl font-black text-primary-purple drop-shadow-[0_0_10px_rgba(127,19,236,0.5)]">
                {claimed ? user.xp + 50 : user.xp} XP
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest italic">Siguiente Nivel</span>
              <div className="text-sm font-bold text-white flex items-center justify-end gap-1">
                 2,000 <span className="material-symbols-outlined text-xs">lock</span>
              </div>
            </div>
          </div>

          <div className="h-4 w-full bg-black/40 rounded-full overflow-hidden p-1 border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-halloween-purple via-primary-purple to-halloween-orange rounded-full shadow-[0_0_15px_rgba(127,19,236,0.6)] transition-all duration-[1500ms] cubic-bezier(0.4, 0, 0.2, 1)" 
              style={{width: `${((claimed ? user.xp + 50 : user.xp) / 2000) * 100}%`}}
            ></div>
          </div>
          
          <div className="mt-6">
            <button 
              onClick={handleDailyClaim}
              disabled={claimed || isCollecting}
              className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 ${claimed ? 'bg-green-500/10 text-green-500 border border-green-500/30' : 'bg-white text-black hover:bg-halloween-orange hover:shadow-lg active:scale-95'}`}
            >
              {isCollecting ? (
                <span className="flex items-center gap-2">
                   <span className="animate-spin size-4 border-2 border-black border-t-transparent rounded-full"></span>
                   Recolectando...
                </span>
              ) : claimed ? (
                <><span className="material-symbols-outlined">check_circle</span> Recompensa del día lista</>
              ) : (
                <><span className="material-symbols-outlined">stars</span> Reclamar +50 XP Diario</>
              )}
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter italic flex items-center gap-2">
          Perks Desbloqueados <div className="h-px flex-1 bg-white/5"></div>
        </h2>
        
        <div className="flex overflow-x-auto gap-4 no-scrollbar pb-6">
          <div className="shrink-0 w-[280px] bg-surface-dark rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary-purple/50 transition-colors shadow-lg">
            <div className="h-40 bg-cover bg-center relative" style={{backgroundImage: 'url("https://picsum.photos/seed/vip/400/300")'}}>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
              <span className="absolute top-4 left-4 bg-halloween-orange text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">Activo</span>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-white text-lg leading-tight">Priority Shipping</h3>
              <p className="text-xs text-gray-500 mt-2">Tus pedidos cruzan el vacío primero. Sin costo extra.</p>
              <button className="mt-5 w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Ver Detalles</button>
            </div>
          </div>

          <div className="shrink-0 w-[280px] bg-surface-dark rounded-[2rem] overflow-hidden border border-white/5 opacity-50 grayscale">
            <div className="h-40 bg-cover bg-center relative" style={{backgroundImage: 'url("https://picsum.photos/seed/hood/400/300")'}}>
               <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-4xl mb-2">lock</span>
                  <span className="text-[10px] font-black uppercase">Level 4 Required</span>
               </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-400 text-lg leading-tight">Secret Hoodie Drop</h3>
              <p className="text-xs text-gray-600 mt-2">Acceso exclusivo a la prenda más buscada de la temporada.</p>
              <button disabled className="mt-5 w-full py-3 bg-white/5 border border-white/5 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Bloqueado</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoyaltyScreen;
