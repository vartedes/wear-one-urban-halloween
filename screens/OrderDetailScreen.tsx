
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetailScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-background-dark min-h-screen flex flex-col">
      <header className="flex items-center px-4 py-4 sticky top-0 bg-background-dark/90 backdrop-blur-xl z-20 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold uppercase tracking-widest text-white">Orden #{id}</h2>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 p-5 flex flex-col gap-8 overflow-y-auto">
        {/* Tracker Card */}
        <div className="rounded-3xl bg-surface-dark shadow-xl border border-white/5 overflow-hidden">
          <div className="h-36 bg-gray-700 relative flex items-end p-6">
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage: 'url("https://picsum.photos/seed/map/500/300")'}}></div>
            <div className="relative z-10 w-full">
              <span className="bg-primary-purple/20 text-primary-purple text-[9px] font-black px-3 py-1 rounded-full border border-primary-purple/30 uppercase tracking-[0.2em]">En Tránsito</span>
              <p className="text-white font-black text-2xl mt-2 italic uppercase tracking-tighter">Llega el 31 de OCT</p>
            </div>
          </div>
          <div className="p-6">
            <div className="relative h-2 w-full bg-[#1a2632] rounded-full mb-6 p-0.5 border border-white/5">
              <div className="h-full bg-primary-purple w-[65%] rounded-full shadow-[0_0_10px_rgba(127,19,236,0.5)]"></div>
              {/* Checkpoints */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 size-4 rounded-full bg-primary-purple border-2 border-surface-dark"></div>
              <div className="absolute top-1/2 left-[33%] -translate-y-1/2 size-4 rounded-full bg-primary-purple border-2 border-surface-dark"></div>
              <div className="absolute top-1/2 left-[66%] -translate-y-1/2 size-4 rounded-full bg-primary-purple/50 border-2 border-surface-dark"></div>
              <div className="absolute top-1/2 left-full -translate-x-full -translate-y-1/2 size-4 rounded-full bg-gray-700 border-2 border-surface-dark"></div>
            </div>
            
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">local_shipping</span> FedEx: 891239123</span>
              <button className="text-primary-purple hover:underline">Copiar ID</button>
            </div>
            
            <button className="w-full mt-6 bg-primary-purple text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest text-xs active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-sm">map</span> Rastrear en Vivo
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-4">
          <h3 className="text-lg font-black uppercase italic tracking-tighter text-white">Artículos del Pedido</h3>
          <div className="space-y-3">
            <div className="flex gap-4 p-4 bg-surface-dark rounded-2xl border border-white/5">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrLrGDlNb0q_c0g_q25jJIeQ0C59jlyjW6RIpa_ioyK05erEbeNbsy4axeTxm6aLrbm8uaVjskQCBgLHz0TbW0i5p_uVjAOL_XsxulMsdSyZCiZNjhDhT2GJVOGYtOXOEzOkZaKOYfJ8DivJ9JED6HrbZRsF6r5OK89_LlCYGmo2oHISxfv7jqC6mnJLTBQvykMpsv-AkFcwTfaStcJrF7akm81Fj-VfaBpkYcHx9RJgPssPnGlv6veKx1eyigbUmog6poEpcFFQ-g" className="h-20 w-20 rounded-xl object-cover shrink-0" alt="Item" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <p className="font-bold text-white text-sm">Skeleton Hoodie</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Talla: L | Cantidad: 1</p>
                </div>
                <p className="font-bold text-primary-purple">$1,450.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-surface-dark rounded-3xl p-6 border border-white/5 text-sm space-y-4 mb-10">
          <div className="flex justify-between">
            <span className="text-gray-500 uppercase font-black text-[10px] tracking-widest">Fecha</span>
            <span className="text-white font-bold">31 de Octubre, 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 uppercase font-black text-[10px] tracking-widest">Método de Pago</span>
            <span className="text-white font-bold">Visa •••• 4242</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 uppercase font-black text-[10px] tracking-widest">Envío</span>
            <span className="text-white font-bold text-right">Av. Reforma 222, CDMX</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailScreen;
