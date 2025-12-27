
import React, { useState, useMemo } from 'react';
// Added Navigate to imports to fix the "Cannot find name 'Navigate'" error
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../App';
import { PaymentMethod } from '../types';

const CheckoutSummaryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cart, notify, addresses, paymentMethods, setPaymentMethods, user } = useApp();
  
  // Datos de Envío
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: addresses.find(a => a.isDefault)?.street || '',
    city: addresses.find(a => a.isDefault)?.city || '',
    postalCode: ''
  });

  // Datos de Pago
  const [selectedMethodId, setSelectedMethodId] = useState(paymentMethods.find(m => m.isDefault)?.id || paymentMethods[0]?.id || '');
  const [altMethod, setAltMethod] = useState<'transfer' | 'crypto' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAddingNewCard, setIsAddingNewCard] = useState(false);
  const [newCard, setNewCard] = useState({ type: 'visa' as 'visa' | 'mastercard', lastFour: '', expiry: '' });

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);
  const shippingCost = 5.00;
  const total = subtotal + shippingCost;
  const orderId = useMemo(() => `WO-${Math.floor(1000 + Math.random() * 9000)}-2025`, []);

  const handleFinalize = () => {
    if (!formData.name || !formData.address || !formData.email) {
      notify("⚠️ Por favor completa los datos de envío");
      return;
    }

    if (!selectedMethodId && !altMethod) {
      notify("⚠️ Selecciona un método de pago");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      if (altMethod === 'transfer') {
        const msg = encodeURIComponent(`¡Hola Wear One! 👋 Pedido #${orderId}. Cliente: ${formData.name}. Total: $${total.toFixed(2)}. Solicito datos para Nequi/Daviplata.`);
        window.open(`https://wa.me/573000000000?text=${msg}`, '_blank');
      }
      navigate('/checkout-success');
      setIsProcessing(false);
    }, 2500);
  };

  const handleAddCard = () => {
    if (newCard.lastFour.length !== 4 || !newCard.expiry.includes('/')) {
      notify("Datos de tarjeta inválidos");
      return;
    }
    const id = Date.now().toString();
    const newMethod: PaymentMethod = { ...newCard, id, isDefault: false };
    setPaymentMethods([...paymentMethods, newMethod]);
    setSelectedMethodId(id);
    setIsAddingNewCard(false);
    setAltMethod(null);
    notify("Tarjeta vinculada");
  };

  // Fixed the error: Cannot find name 'Navigate' by adding it to imports
  if (cart.length === 0) return <Navigate to="/cart" />;

  return (
    <div className="bg-background-dark min-h-screen flex flex-col relative text-white">
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-10 text-center animate-in fade-in">
          <div className="size-20 rounded-full border-4 border-primary-purple/20 border-t-primary-purple animate-spin mb-6"></div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">Procesando Orden...</h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Seguridad encriptada activa</p>
        </div>
      )}

      <header className="flex items-center justify-between p-4 sticky top-0 bg-background-dark/95 backdrop-blur-xl z-50 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-white/10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xs font-black uppercase tracking-[0.4em] italic text-primary-purple">Checkout Seguro</h1>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 px-6 py-6 space-y-10 overflow-y-auto pb-48 no-scrollbar">
        {/* SECCIÓN 1: DATOS DE ENVÍO */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
             <span className="size-8 rounded-lg bg-primary-purple/20 flex items-center justify-center text-primary-purple">
               <span className="material-symbols-outlined text-sm">local_shipping</span>
             </span>
             <h2 className="text-xl font-black italic uppercase tracking-tighter">Datos de Entrega</h2>
          </div>
          
          <div className="space-y-3">
             <input 
              placeholder="Nombre Completo" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full h-14 bg-surface-dark border border-white/5 rounded-2xl px-5 text-sm outline-none focus:border-primary-purple transition-all"
             />
             <input 
              placeholder="Dirección de Envío" 
              value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
              className="w-full h-14 bg-surface-dark border border-white/5 rounded-2xl px-5 text-sm outline-none focus:border-primary-purple transition-all"
             />
             <div className="grid grid-cols-2 gap-3">
               <input 
                placeholder="Ciudad" 
                value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
                className="w-full h-14 bg-surface-dark border border-white/5 rounded-2xl px-5 text-sm outline-none focus:border-primary-purple transition-all"
               />
               <input 
                placeholder="Teléfono" 
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full h-14 bg-surface-dark border border-white/5 rounded-2xl px-5 text-sm outline-none focus:border-primary-purple transition-all"
               />
             </div>
          </div>
        </section>

        {/* SECCIÓN 2: MÉTODOS DE PAGO */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
             <span className="size-8 rounded-lg bg-halloween-orange/20 flex items-center justify-center text-halloween-orange">
               <span className="material-symbols-outlined text-sm">payments</span>
             </span>
             <h2 className="text-xl font-black italic uppercase tracking-tighter">Método de Pago</h2>
          </div>

          <div className="space-y-4">
            {paymentMethods.map(method => (
              <div 
                key={method.id}
                onClick={() => { setSelectedMethodId(method.id); setAltMethod(null); setIsAddingNewCard(false); }}
                className={`p-5 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between ${selectedMethodId === method.id && !altMethod ? 'bg-surface-dark border-primary-purple' : 'bg-black/20 border-white/5 opacity-60'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary-purple">{method.type === 'visa' ? 'credit_card' : 'payments'}</span>
                  <div>
                    <p className="text-xs font-black uppercase italic text-white">{method.type} •••• {method.lastFour}</p>
                    <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Vence {method.expiry}</p>
                  </div>
                </div>
                {selectedMethodId === method.id && !altMethod && <span className="material-symbols-outlined text-primary-purple">check_circle</span>}
              </div>
            ))}

            {!isAddingNewCard ? (
              <button 
                onClick={() => setIsAddingNewCard(true)}
                className="w-full py-5 rounded-[2rem] border border-dashed border-white/10 text-gray-500 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">add_card</span> Nueva Tarjeta
              </button>
            ) : (
              <div className="p-6 bg-surface-dark rounded-[2.5rem] border border-primary-purple space-y-4 animate-in zoom-in-95">
                <input maxLength={4} placeholder="Últimos 4" value={newCard.lastFour} onChange={e => setNewCard({...newCard, lastFour: e.target.value})} className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-xs" />
                <input placeholder="MM/YY" value={newCard.expiry} onChange={e => setNewCard({...newCard, expiry: e.target.value})} className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-xs" />
                <div className="flex gap-2">
                  <button onClick={() => setIsAddingNewCard(false)} className="flex-1 py-3 bg-white/5 rounded-xl text-[9px] font-black uppercase">Cancelar</button>
                  <button onClick={handleAddCard} className="flex-[2] py-3 bg-primary-purple rounded-xl text-[9px] font-black uppercase">Vincular</button>
                </div>
              </div>
            )}

            <div 
              onClick={() => { setAltMethod('transfer'); setSelectedMethodId(''); setIsAddingNewCard(false); }}
              className={`p-5 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between ${altMethod === 'transfer' ? 'bg-[#25D366]/10 border-[#25D366]' : 'bg-black/20 border-white/5 opacity-60'}`}
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#25D366]">send_to_mobile</span>
                <div>
                  <p className="text-xs font-black uppercase italic text-white">Transferencia WhatsApp</p>
                  <p className="text-[8px] text-[#25D366] font-bold uppercase tracking-widest">Nequi / Daviplata</p>
                </div>
              </div>
              {altMethod === 'transfer' && <span className="material-symbols-outlined text-[#25D366]">check_circle</span>}
            </div>
            
            {altMethod === 'transfer' && (
              <div className="bg-[#25D366]/5 border border-[#25D366]/20 p-4 rounded-2xl text-[10px] text-gray-400 italic">
                Se enviará un link de WhatsApp para confirmar dirección y realizar el pago vía Nequi/Daviplata.
              </div>
            )}
          </div>
        </section>

        {/* SECCIÓN 3: RESUMEN DE COSTO */}
        <section className="bg-surface-dark/40 p-6 rounded-[2rem] border border-white/5 space-y-3">
          <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500 tracking-widest">
            <span>Subtotal Bolsa</span>
            <span className="text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500 tracking-widest">
            <span>Envío FedEx</span>
            <span className="text-white">$5.00</span>
          </div>
          <div className="h-px bg-white/5 my-2"></div>
          <div className="flex justify-between items-end">
            <span className="text-[11px] font-black uppercase italic text-primary-purple tracking-widest">Inversión Final</span>
            <span className="text-3xl font-black italic text-white tracking-tighter">${total.toFixed(2)}</span>
          </div>
        </section>
      </main>

      {/* FOOTER ACTION */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-8 bg-background-dark/95 backdrop-blur-xl border-t border-white/5 z-40">
        <button 
          onClick={handleFinalize}
          disabled={isProcessing}
          className={`w-full h-20 rounded-[2.5rem] flex items-center justify-between px-10 active:scale-95 transition-all shadow-2xl font-black uppercase tracking-[0.2em] text-sm ${altMethod === 'transfer' ? 'bg-[#25D366] text-white' : 'bg-white text-black'}`}
        >
          <span>{altMethod === 'transfer' ? 'Abrir WhatsApp' : 'Completar Compra'}</span>
          <span className="material-symbols-outlined text-2xl">{altMethod === 'transfer' ? 'chat' : 'bolt'}</span>
        </button>
      </div>
    </div>
  );
};

export default CheckoutSummaryScreen;
