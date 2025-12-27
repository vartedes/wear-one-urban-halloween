
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const CheckoutSuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  const { clearCart } = useApp();

  useEffect(() => {
    // Limpiamos el carrito inmediatamente al entrar
    clearCart();
  }, []);

  const handleReturnHome = () => {
    navigate('/home');
  };

  const handleSeeOrders = () => {
    navigate('/orders');
  };

  return (
    <div className="bg-background-dark min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="relative w-36 h-36 mb-12">
        <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping"></div>
        <div className="relative w-full h-full rounded-full bg-surface-dark border-4 border-green-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.2)]">
          <span className="material-symbols-outlined text-8xl text-green-500 filled animate-in zoom-in duration-500">check_circle</span>
        </div>
      </div>

      <h2 className="text-4xl font-black mb-4 text-white uppercase italic tracking-tighter animate-in slide-in-from-bottom-4">¡Orden Confirmada!</h2>
      <p className="text-gray-500 mb-10 max-w-[280px] text-xs font-medium leading-relaxed">
        Tu estilo está en camino. Los espíritus urbanos han recibido tu pago con éxito.
      </p>
      
      <div className="w-full max-w-xs bg-surface-dark/50 p-6 rounded-[2rem] border border-dashed border-white/10 mb-12">
        <p className="text-[10px] uppercase text-gray-500 font-black tracking-[0.3em] mb-1 italic">Tracking ID</p>
        <p className="text-white font-mono font-bold text-lg tracking-widest">#WO-{Math.floor(1000 + Math.random() * 9000)}-2025</p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-4">
        <button 
          onClick={handleReturnHome}
          className="w-full h-16 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-[1.8rem] shadow-[0_15px_30px_rgba(255,255,255,0.1)] active:scale-95 transition-all"
        >
          Volver al Inicio
        </button>
        <button 
          onClick={handleSeeOrders}
          className="w-full h-16 bg-surface-dark border border-white/5 text-gray-400 font-black uppercase tracking-[0.2em] text-[11px] rounded-[1.8rem] hover:text-white transition-colors active:scale-95"
        >
          Ver Mis Pedidos
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccessScreen;
