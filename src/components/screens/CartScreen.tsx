
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity } = useApp();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = subtotal > 150 ? 25 : 0;
  const total = subtotal - discount;

  return (
    <div className="bg-background-dark min-h-screen flex flex-col pb-32">
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background-dark/95 backdrop-blur-xl px-6 py-6 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="text-white hover:text-halloween-orange transition-colors">
          <span className="material-symbols-outlined font-bold">arrow_back_ios</span>
        </button>
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white italic">
          Bolsa <span className="text-primary-purple ml-1">[{cart.reduce((s,i)=>s+i.quantity,0)}]</span>
        </h2>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 px-6 py-6 space-y-8 overflow-y-auto no-scrollbar">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
            <div className="size-28 rounded-[2rem] bg-surface-dark flex items-center justify-center border border-white/5 animate-pulse shadow-2xl">
              <span className="material-symbols-outlined text-6xl text-gray-700">shopping_cart_off</span>
            </div>
            <div className="space-y-2">
              <p className="text-white font-black text-2xl uppercase italic tracking-tighter">Bolsa Vacía</p>
              <p className="text-gray-500 text-xs max-w-[220px] mx-auto leading-relaxed">Parece que tu estilo aún no ha encontrado su media naranja urbana.</p>
            </div>
            <button 
              onClick={() => navigate('/home')}
              className="px-10 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] active:scale-95 transition-all shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
            >
              Explorar Drops
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.selectedSize}-${idx}`} className="flex gap-5 rounded-[2rem] bg-surface-dark p-5 border border-white/5 shadow-xl animate-in slide-in-from-left duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="size-24 rounded-2xl overflow-hidden bg-black shrink-0 border border-white/5">
                    <img src={item.image} className="h-full w-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xs font-bold text-white leading-tight uppercase tracking-tight">{item.name}</h3>
                        <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.2em] mt-2 bg-white/5 px-2 py-1 rounded w-fit">{item.selectedSize} • {item.selectedColor}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-lg">delete_sweep</span>
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-lg font-black text-white italic tracking-tighter">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 bg-black/50 rounded-2xl px-4 py-2 border border-white/10">
                        <button onClick={() => updateCartQuantity(item.id, -1)} className="text-white font-black opacity-40 hover:opacity-100 transition-opacity">－</button>
                        <span className="text-xs font-black text-white min-w-[2ch] text-center">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, 1)} className="text-white font-black opacity-40 hover:opacity-100 transition-opacity">＋</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[2.5rem] bg-surface-dark p-8 flex flex-col gap-5 border border-white/5 shadow-2xl relative overflow-hidden mb-12">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-halloween-orange via-primary-purple to-halloween-orange"></div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 italic">Resumen de Orden</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-400">Logística Prioritaria</span>
                  <span className="text-green-500 uppercase text-[9px] font-black tracking-widest">Gratis</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs font-black text-halloween-orange pt-2">
                    <span className="uppercase tracking-widest">Descuento VIP</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-end pt-6 border-t border-white/10 mt-2">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Total Final</span>
                <span className="text-3xl font-black text-white italic tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">${total.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </main>

      {cart.length > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 z-40">
          <button 
            onClick={() => navigate('/checkout-summary')}
            className="w-full bg-gradient-to-r from-primary-purple via-halloween-purple to-primary-purple text-white font-black h-20 rounded-[2.5rem] shadow-[0_15px_40px_rgba(127,19,236,0.4)] flex items-center justify-between px-10 active:scale-95 transition-all group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]"></div>
            <span className="uppercase tracking-[0.3em] text-[11px] italic font-black">Proceder al Pago</span>
            <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">bolt</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
