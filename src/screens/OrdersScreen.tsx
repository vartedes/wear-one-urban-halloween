
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const OrdersScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  return (
    <div className="bg-background-dark min-h-screen flex flex-col pb-24 font-display">
      <header className="flex items-center justify-between p-4 border-b border-white/5 bg-background-dark/95 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-purple text-2xl">token</span>
          <h1 className="font-bold text-white text-xl uppercase tracking-widest">Wear One</h1>
        </div>
        <div className="px-3 py-1 bg-surface-dark rounded-full border border-primary-purple/30 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nivel 3</div>
      </header>

      <main className="flex-1 p-5 overflow-y-auto">
        <h2 className="text-white text-[32px] font-black italic uppercase tracking-tighter mb-4 leading-none">Mis Pedidos</h2>
        
        <div className="mb-8">
          <div className="flex justify-between text-white text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            <span>Progreso Drop Nivel 4</span>
            <span className="text-primary-purple">{user?.xp}/2000 XP</span>
          </div>
          <div className="h-3 rounded-full bg-surface-dark overflow-hidden border border-white/5">
            <div className="h-full w-[62%] bg-gradient-to-r from-primary-purple to-halloween-orange shadow-[0_0_10px_rgba(255,107,0,0.3)]"></div>
          </div>
        </div>

        <div className="flex gap-6 border-b border-white/5 mb-6 overflow-x-auto no-scrollbar">
          <button className="border-b-2 border-primary-purple text-white pb-3 font-black text-[10px] uppercase tracking-widest">Todos</button>
          <button className="text-gray-500 pb-3 font-black text-[10px] uppercase tracking-widest">En Proceso</button>
          <button className="text-gray-500 pb-3 font-black text-[10px] uppercase tracking-widest">Entregados</button>
        </div>

        <div className="flex flex-col gap-4">
          <div onClick={() => navigate('/order/9921')} className="bg-surface-dark border border-primary-purple/40 rounded-2xl p-4 flex gap-4 cursor-pointer active:scale-95 transition-transform">
            <div className="h-20 w-20 rounded-xl bg-cover bg-center border border-white/10 shrink-0" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBs_p-izVYCMV1aTBJU-0fK9-wANAm11waZ5QsnAlIvpGMW18toxo9-icezCUKrY1smi0kxNhTUqxGKMi0oFpg0W911rQk10u-QzoDirufsAKhwc6mZuWkFm7syxhiQqXbGYOb_eb7I2Wk-IR61VVJn2mJGD5sNOKAFEcgGF0phqFX1hHQ-_O1KAY1tT5ZcEGjQnaUKd91mUGbWAVI0hjfZg_3MbQ8lJqJ8waGRdRGTsOrVDMi0TViuFcIh50emKL7DFf4u68RIPmNU")'}}></div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <p className="text-white font-black uppercase tracking-tighter">#WO-9921</p>
                  <span className="bg-primary-purple/20 text-primary-purple text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-primary-purple/30">Procesando</span>
                </div>
                <p className="text-[10px] text-gray-500 font-bold mt-1">31 OCT • 2 ARTÍCULOS</p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-white font-bold">$1,450.00</p>
                <span className="text-halloween-orange text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">local_fire_department</span>+150 XP
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-dark border border-white/5 rounded-2xl p-4 flex gap-4 opacity-70">
            <div className="h-20 w-20 rounded-xl bg-cover bg-center border border-white/10 shrink-0 grayscale" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDw6jszagdBPMYib-Nwk2dZTM47dXqI5GUE4VS_jw4qNnvyeThRAMhppY8KydsgSlOWDPlwZvYA2-x3XEySyj2UneK83gI0ZekmVOPfRD2Fr3wdJ9a725QmxtrENmtft7oTxhvMxqb61LsE7dZhuijohE4UxYuY1EOYTGrX9mrnpUzGlE-8qIZllAZuEPnb2lOi-k6UK1EH6p7EmwL7vVU9mP9g08qkWu6Gjd1zva7alDtDwmd0x5PmDQb8KAJrb_93-a1WhRXoqFet")'}}></div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <p className="text-white font-black uppercase tracking-tighter">#WO-8842</p>
                  <span className="bg-green-500/10 text-green-500 text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-green-500/30">Entregado</span>
                </div>
                <p className="text-[10px] text-gray-500 font-bold mt-1">20 OCT • 1 ARTÍCULO</p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-white font-bold">$890.00</p>
                <span className="text-gray-500 text-[9px] font-black uppercase tracking-widest">+50 XP</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdersScreen;
