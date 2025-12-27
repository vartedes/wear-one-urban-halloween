
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { PaymentMethod } from '../types';

const CheckoutPaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cart, notify, paymentMethods, setPaymentMethods, user, clearCart } = useApp();
  
  // Estados de UI y Selección
  const [selectedMethodId, setSelectedMethodId] = useState(paymentMethods.find(m => m.isDefault)?.id || paymentMethods[0]?.id || '');
  const [altMethod, setAltMethod] = useState<'transfer' | 'crypto' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAddingNewCard, setIsAddingNewCard] = useState(false);

  // Formulario Inline para Nueva Tarjeta
  const [newCardData, setNewCardData] = useState({
    type: 'visa' as 'visa' | 'mastercard',
    lastFour: '',
    expiry: ''
  });

  // Cálculos de la Orden vinculados al Carrito
  const subtotal = useMemo(() => cart.reduce((a, b) => a + (b.price * b.quantity), 0), [cart]);
  const shipping = 5.00;
  const total = subtotal + shipping;
  const orderId = useMemo(() => `WO-${Math.floor(1000 + Math.random() * 9000)}-2025`, []);

  const handleAddNewCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCardData.lastFour.length !== 4 || !newCardData.expiry.includes('/')) {
      notify("⚠️ Datos de tarjeta incompletos");
      return;
    }

    const nextId = (Math.max(0, ...paymentMethods.map(m => parseInt(m.id))) + 1).toString();
    const newMethod: PaymentMethod = {
      id: nextId,
      type: newCardData.type,
      lastFour: newCardData.lastFour,
      expiry: newCardData.expiry,
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setSelectedMethodId(nextId);
    setAltMethod(null);
    setIsAddingNewCard(false);
    setNewCardData({ type: 'visa', lastFour: '', expiry: '' });
    notify("✅ Tarjeta vinculada con éxito");
  };

  const handleFinalizePurchase = () => {
    const finalMethod = altMethod || selectedMethodId;
    if (!finalMethod && !isAddingNewCard) {
      notify("❌ Selecciona un método de pago");
      return;
    }

    setIsProcessing(true);
    
    // Simulación de pasarela de pago real
    setTimeout(() => {
      if (altMethod === 'transfer') {
        const message = encodeURIComponent(`¡Hola Wear One! 👋 Orden #${orderId}. Cliente: ${user?.name || 'Invitado'}. Solicito datos para Nequi/Daviplata por un total de $${total.toFixed(2)}.`);
        const whatsappUrl = `https://wa.me/573000000000?text=${message}`;
        window.open(whatsappUrl, '_blank');
      }
      
      // La limpieza del carrito ocurre en el SuccessScreen, pero aseguramos la navegación
      navigate('/checkout-success');
      setIsProcessing(false);
      notify("🔥 ¡Transacción Procesada!");
    }, 2800);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-background-dark min-h-screen flex flex-col items-center justify-center p-10 text-center">
        <span className="material-symbols-outlined text-6xl text-gray-700 mb-4">shopping_cart_off</span>
        <h2 className="text-xl font-black uppercase italic text-white">Tu bolsa se desvaneció</h2>
        <button onClick={() => navigate('/home')} className="mt-6 px-8 py-3 bg-primary-purple rounded-xl font-bold uppercase text-[10px] tracking-widest">Volver a la tienda</button>
      </div>
    );
  }

  return (
    <div className="bg-background-dark min-h-screen flex flex-col relative text-white font-display">
      {/* OVERLAY DE CARGA AGRESIVO */}
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-10 animate-in fade-in duration-300">
          <div className="relative mb-8">
            <div className="size-24 rounded-full border-4 border-primary-purple/10 border-t-primary-purple animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-purple text-3xl animate-pulse">security</span>
            </div>
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Validando Pago</h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Cifrado de grado militar activo</p>
        </div>
      )}

      <header className="flex items-center justify-between px-6 py-5 sticky top-0 bg-background-dark/90 backdrop-blur-xl z-30 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xs font-black uppercase tracking-[0.4em] italic text-primary-purple">Pasarela de Pago</h1>
        <div className="size-10"></div>
      </header>

      <main className="px-6 flex-1 overflow-y-auto pb-48 no-scrollbar pt-8">
        {/* RESUMEN DE COMPRA RÁPIDO */}
        <div className="mb-10 bg-surface-dark/40 p-6 rounded-[2.5rem] border border-white/5">
           <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Total a Liquidar</p>
                <h2 className="text-4xl font-black italic tracking-tighter text-white">${total.toFixed(2)}</h2>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-bold text-primary-purple uppercase tracking-widest">{cart.length} Productos</p>
                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">ID: {orderId}</p>
              </div>
           </div>
           <div className="flex -space-x-3 overflow-hidden">
              {cart.map((item, i) => (
                <img key={i} src={item.image} className="size-10 rounded-full border-2 border-background-dark object-cover" alt="item" />
              ))}
           </div>
        </div>

        <h3 className="text-[11px] font-black uppercase text-gray-500 tracking-[0.3em] mb-6 px-1">Selecciona tu método</h3>

        {/* MÉTODOS DE PAGO: TARJETAS */}
        <section className="space-y-4 mb-10">
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              onClick={() => { setSelectedMethodId(method.id); setAltMethod(null); setIsAddingNewCard(false); }}
              className={`group p-6 rounded-[2.2rem] border transition-all duration-300 flex items-center justify-between cursor-pointer ${selectedMethodId === method.id && !altMethod && !isAddingNewCard ? 'bg-surface-dark border-primary-purple shadow-[0_20px_40px_rgba(127,19,236,0.15)] scale-[1.02]' : 'bg-black/20 border-white/5 opacity-50'}`}
            >
              <div className="flex items-center gap-5">
                <div className={`size-12 rounded-xl flex items-center justify-center transition-colors ${selectedMethodId === method.id && !altMethod ? 'bg-primary-purple text-white' : 'bg-surface-dark text-gray-700'}`}>
                  <span className="material-symbols-outlined text-2xl">
                    {method.type === 'visa' ? 'credit_card' : 'payments'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-black uppercase italic tracking-tighter text-white">{method.type} •••• {method.lastFour}</p>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Vence: {method.expiry}</p>
                </div>
              </div>
              <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedMethodId === method.id && !altMethod ? 'border-primary-purple bg-primary-purple' : 'border-white/10'}`}>
                {selectedMethodId === method.id && !altMethod && <span className="material-symbols-outlined text-black text-[14px] font-black">check</span>}
              </div>
            </div>
          ))}

          {/* FORMULARIO INLINE PARA NUEVA TARJETA */}
          {!isAddingNewCard ? (
            <button 
              onClick={() => { setIsAddingNewCard(true); setAltMethod(null); setSelectedMethodId(''); }}
              className="w-full py-6 rounded-[2.2rem] border border-dashed border-white/10 text-gray-600 flex items-center justify-center gap-3 hover:text-white hover:border-white/20 transition-all bg-white/0"
            >
              <span className="material-symbols-outlined">add_card</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Usar otra tarjeta</span>
            </button>
          ) : (
            <div className="p-8 rounded-[2.5rem] border border-primary-purple bg-surface-dark animate-in zoom-in-95 duration-500 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary-purple">lock</span>
                <h4 className="text-[11px] font-black uppercase text-white tracking-widest italic">Nueva Conexión Bancaria</h4>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button 
                  onClick={() => setNewCardData({...newCardData, type: 'visa'})}
                  className={`py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${newCardData.type === 'visa' ? 'bg-primary-purple border-primary-purple text-white shadow-lg shadow-primary-purple/20' : 'border-white/5 bg-black/20 text-gray-600'}`}
                >Visa</button>
                <button 
                  onClick={() => setNewCardData({...newCardData, type: 'mastercard'})}
                  className={`py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${newCardData.type === 'mastercard' ? 'bg-primary-purple border-primary-purple text-white shadow-lg shadow-primary-purple/20' : 'border-white/5 bg-black/20 text-gray-600'}`}
                >Mastercard</button>
              </div>
              <div className="space-y-4">
                <input 
                  maxLength={4}
                  placeholder="ÚLTIMOS 4 DÍGITOS"
                  value={newCardData.lastFour}
                  onChange={e => setNewCardData({...newCardData, lastFour: e.target.value.replace(/\D/g, '')})}
                  className="w-full h-14 bg-black/60 border border-white/10 rounded-2xl px-5 text-sm font-mono focus:border-primary-purple outline-none transition-all"
                />
                <input 
                  placeholder="EXPIRACIÓN (MM/YY)"
                  value={newCardData.expiry}
                  onChange={e => setNewCardData({...newCardData, expiry: e.target.value})}
                  className="w-full h-14 bg-black/60 border border-white/10 rounded-2xl px-5 text-sm font-mono focus:border-primary-purple outline-none transition-all"
                />
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setIsAddingNewCard(false)} className="flex-1 py-4 bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-gray-500">Cerrar</button>
                <button onClick={handleAddNewCard} className="flex-[2] py-4 bg-primary-purple rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl shadow-primary-purple/20">Vincular Ahora</button>
              </div>
            </div>
          )}
        </section>

        {/* ALTERNATIVAS DE PAGO (TRANSFERENCIA / CRYPTO) */}
        <section className="space-y-4 pt-4">
          <h3 className="text-[11px] font-black uppercase text-gray-500 tracking-[0.3em] px-1">Alternativas Directas</h3>
          
          <div 
            onClick={() => { setAltMethod('transfer'); setSelectedMethodId(''); setIsAddingNewCard(false); }}
            className={`p-6 rounded-[2.2rem] border transition-all duration-300 cursor-pointer flex items-center justify-between ${altMethod === 'transfer' ? 'bg-[#25D366]/10 border-[#25D366] shadow-[0_15px_30px_rgba(37,211,102,0.1)]' : 'bg-black/20 border-white/5 opacity-50'}`}
          >
            <div className="flex items-center gap-5">
              <div className={`size-12 rounded-xl flex items-center justify-center transition-colors ${altMethod === 'transfer' ? 'bg-[#25D366] text-white' : 'bg-surface-dark text-gray-700'}`}>
                <span className="material-symbols-outlined text-2xl font-black">send_to_mobile</span>
              </div>
              <div>
                <p className="text-sm font-black uppercase italic tracking-tighter text-white">Transferencia Instantánea</p>
                <p className="text-[9px] text-[#25D366] font-bold uppercase mt-0.5 tracking-widest">Nequi / Daviplata / WhatsApp</p>
              </div>
            </div>
            {altMethod === 'transfer' && <div className="size-6 rounded-full bg-[#25D366] flex items-center justify-center"><span className="material-symbols-outlined text-black text-[14px] font-black">check</span></div>}
          </div>

          {altMethod === 'transfer' && (
            <div className="bg-[#25D366]/5 border border-[#25D366]/20 p-5 rounded-[1.5rem] animate-in slide-in-from-top-4 duration-500">
              <p className="text-[11px] leading-relaxed text-gray-300">
                <span className="text-[#25D366] font-black uppercase tracking-widest block mb-1">Pasos para Transferencia:</span>
                Al confirmar, se abrirá un chat de WhatsApp con los detalles de tu orden. Allí recibirás el número de cuenta de <span className="text-white font-bold">Nequi</span> o <span className="text-white font-bold">Daviplata</span> para completar el pago.
              </p>
            </div>
          )}

          <div 
            onClick={() => { setAltMethod('crypto'); setSelectedMethodId(''); setIsAddingNewCard(false); }}
            className={`p-6 rounded-[2.2rem] border transition-all duration-300 cursor-pointer flex items-center justify-between ${altMethod === 'crypto' ? 'bg-halloween-orange/10 border-halloween-orange shadow-[0_15px_30px_rgba(255,107,0,0.1)]' : 'bg-black/20 border-white/5 opacity-50'}`}
          >
            <div className="flex items-center gap-5">
              <div className={`size-12 rounded-xl flex items-center justify-center transition-colors ${altMethod === 'crypto' ? 'bg-halloween-orange text-white' : 'bg-surface-dark text-gray-700'}`}>
                <span className="material-symbols-outlined text-2xl">currency_bitcoin</span>
              </div>
              <div>
                <p className="text-sm font-black uppercase italic tracking-tighter text-white">Criptoactivos (Web3)</p>
                <p className="text-[9px] text-halloween-orange font-bold uppercase mt-0.5 tracking-widest">USDT / BTC / ETH</p>
              </div>
            </div>
            {altMethod === 'crypto' && <div className="size-6 rounded-full bg-halloween-orange flex items-center justify-center"><span className="material-symbols-outlined text-black text-[14px] font-black">check</span></div>}
          </div>
        </section>
      </main>

      {/* BOTÓN DE ACCIÓN FINAL - PEGAJOSO Y GIGANTE */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-background-dark/95 backdrop-blur-2xl p-8 border-t border-white/5 z-40">
        <button 
          onClick={handleFinalizePurchase}
          disabled={isProcessing || isAddingNewCard}
          className={`w-full h-20 rounded-[2.5rem] flex items-center justify-between px-10 active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden border-[6px] border-black ${
            altMethod === 'transfer' ? 'bg-[#25D366] text-white shadow-[#25D366]/20' : 
            isAddingNewCard ? 'bg-gray-800 text-gray-600 cursor-not-allowed border-gray-900' :
            'bg-white text-black shadow-white/10'
          }`}
        >
          <div className="flex flex-col items-start">
            <span className="text-[9px] uppercase tracking-[0.4em] font-black italic opacity-60 leading-none mb-1">Confirmar Orden</span>
            <span className="text-[18px] font-black uppercase tracking-tighter italic">
              {altMethod === 'transfer' ? 'Abrir WhatsApp' : 'Completar Pago'}
            </span>
          </div>
          <div className={`size-12 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-2 ${altMethod === 'transfer' ? 'bg-white text-[#25D366]' : 'bg-primary-purple text-white'}`}>
            <span className="material-symbols-outlined text-2xl font-black">
              {altMethod === 'transfer' ? 'chat' : 'bolt'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CheckoutPaymentScreen;
