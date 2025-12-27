
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { PaymentMethod } from '../types';

const PaymentMethodsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { paymentMethods, setPaymentMethods, notify, cart } = useApp();
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState<Partial<PaymentMethod>>({
    type: 'visa',
    lastFour: '',
    expiry: '',
    isDefault: false
  });

  const handleEditClick = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData(method);
    setIsAdding(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lastFour || !formData.expiry) {
      notify("Completa todos los datos de seguridad");
      return;
    }

    if (editingMethod) {
      const updated = paymentMethods.map(m => m.id === editingMethod.id ? { ...m, ...formData } as PaymentMethod : m);
      setPaymentMethods(updated);
      notify("Método de pago actualizado");
    } else {
      const nextId = (Math.max(0, ...paymentMethods.map(m => parseInt(m.id))) + 1).toString();
      const newMethod = { ...formData, id: nextId, isDefault: paymentMethods.length === 0 } as PaymentMethod;
      setPaymentMethods([...paymentMethods, newMethod]);
      notify("Nuevo método vinculado");
    }
    
    setEditingMethod(null);
    setIsAdding(false);
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(m => ({ ...m, isDefault: m.id === id })));
    notify("Método seleccionado");
  };

  const hasPaymentMethods = paymentMethods.length > 0;
  const showContinueButton = cart.length > 0 && hasPaymentMethods && !isAdding && !editingMethod;

  return (
    <div className="bg-background-dark min-h-screen flex flex-col pb-40 text-white font-display">
      <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-xl border-b border-white/5 flex items-center p-4">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center font-black uppercase tracking-widest text-sm italic">Gestión de Pagos</h2>
        <div className="size-10"></div>
      </header>

      <main className="p-6 space-y-8 flex-1 overflow-y-auto no-scrollbar">
        {/* FORMULARIO DE EDICIÓN / ADICIÓN */}
        {(editingMethod || isAdding) ? (
          <div className="bg-surface-dark p-8 rounded-[2.5rem] border border-primary-purple shadow-2xl animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary-purple">
                {editingMethod ? 'edit_square' : 'add_card'}
              </span>
              <h3 className="text-lg font-black italic uppercase tracking-tighter">
                {editingMethod ? 'Editar Tarjeta' : 'Nueva Tarjeta'}
              </h3>
            </div>
            
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'visa'})}
                  className={`py-4 rounded-xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${formData.type === 'visa' ? 'border-primary-purple bg-primary-purple/10' : 'border-white/5 bg-black/20 text-gray-500'}`}
                >
                  Visa
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'mastercard'})}
                  className={`py-4 rounded-xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${formData.type === 'mastercard' ? 'border-primary-purple bg-primary-purple/10' : 'border-white/5 bg-black/20 text-gray-500'}`}
                >
                  Mastercard
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1">Últimos 4 Dígitos</label>
                <input 
                  maxLength={4}
                  value={formData.lastFour}
                  onChange={e => setFormData({...formData, lastFour: e.target.value.replace(/\D/g, '')})}
                  className="w-full h-14 bg-black/40 border border-white/10 rounded-xl px-5 text-sm text-white outline-none focus:border-primary-purple font-mono"
                  placeholder="0000"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1">Vencimiento (MM/YY)</label>
                <input 
                  maxLength={5}
                  value={formData.expiry}
                  onChange={e => setFormData({...formData, expiry: e.target.value})}
                  className="w-full h-14 bg-black/40 border border-white/10 rounded-xl px-5 text-sm text-white outline-none focus:border-primary-purple font-mono"
                  placeholder="12/26"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => { setEditingMethod(null); setIsAdding(false); }}
                  className="flex-1 py-4 rounded-xl bg-white/5 text-gray-400 font-black uppercase text-[10px] tracking-widest"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 rounded-xl bg-primary-purple text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary-purple/30"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* BOTÓN PROMINENTE 'ADD NEW PAYMENT METHOD' */}
            <button 
              onClick={() => setIsAdding(true)}
              className="w-full h-16 bg-white/5 border border-white/10 text-white rounded-[1.5rem] flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all shadow-xl active:scale-[0.98] mb-8"
            >
              <span className="material-symbols-outlined text-xl">add_card</span>
              Add New Payment Method
            </button>

            {/* LISTADO DE TARJETAS */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] italic">Métodos Vinculados</h4>
                {paymentMethods.length > 0 && <span className="text-[9px] text-primary-purple font-bold uppercase tracking-widest">Toca para seleccionar</span>}
              </div>
              
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    onClick={() => handleSetDefault(method.id)}
                    className={`group relative p-6 rounded-[2.2rem] border transition-all duration-500 cursor-pointer overflow-hidden ${
                      method.isDefault 
                      ? 'bg-surface-dark border-primary-purple shadow-2xl scale-[1.02]' 
                      : 'bg-black/40 border-white/5 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex justify-between items-start relative z-10">
                      <div className="flex gap-4">
                        <div className={`size-12 rounded-xl flex items-center justify-center border transition-colors ${method.isDefault ? 'bg-primary-purple border-white/10 text-white' : 'bg-surface-dark border-white/5 text-gray-600'}`}>
                          <span className="material-symbols-outlined text-2xl">
                            {method.type === 'visa' ? 'credit_card' : 'payments'}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-black italic tracking-tighter uppercase">{method.type} •••• {method.lastFour}</p>
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Expira: {method.expiry}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {method.isDefault && (
                          <div className="size-8 rounded-full bg-primary-purple/20 flex items-center justify-center text-primary-purple border border-primary-purple/30">
                            <span className="material-symbols-outlined text-sm font-black">check</span>
                          </div>
                        )}
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleEditClick(method); }}
                          className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:text-primary-purple hover:bg-white/10 transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center opacity-40">
                  <span className="material-symbols-outlined text-6xl mb-4">account_balance_wallet</span>
                  <p className="text-[10px] font-black uppercase tracking-widest">No hay tarjetas vinculadas</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* OTROS CANALES */}
        {!editingMethod && !isAdding && (
          <div className="space-y-4 pt-4">
            <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] ml-2 italic">Próximamente</h4>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 rounded-[2rem] bg-surface-dark border border-white/5 flex flex-col items-center gap-3 opacity-30 grayscale cursor-not-allowed">
                  <span className="material-symbols-outlined text-blue-400 text-3xl">payments</span>
                  <span className="text-[9px] font-black uppercase text-white tracking-widest">PayPal</span>
               </div>
               <div className="p-6 rounded-[2rem] bg-surface-dark border border-white/5 flex flex-col items-center gap-3 opacity-30 grayscale cursor-not-allowed">
                  <span className="material-symbols-outlined text-halloween-orange text-3xl">currency_bitcoin</span>
                  <span className="text-[9px] font-black uppercase text-white tracking-widest">Crypto</span>
               </div>
            </div>
          </div>
        )}
      </main>

      {/* BOTÓN PARA CONTINUAR COMPRA - ULTRA PROMINENTE */}
      {showContinueButton && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-8 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent z-50 animate-in slide-in-from-bottom-10 duration-700">
          <button 
            onClick={() => navigate('/checkout-payment')}
            className="w-full h-20 bg-white text-black font-black rounded-[2.5rem] shadow-[0_25px_60px_rgba(255,255,255,0.15)] flex items-center justify-between px-10 active:scale-95 transition-all group overflow-hidden border-[6px] border-black"
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase tracking-[0.3em] italic leading-tight text-gray-400">Seleccionado</span>
              <span className="text-[16px] uppercase tracking-[0.2em] font-black">Continuar al Pago</span>
            </div>
            <div className="size-12 rounded-full bg-primary-purple text-white flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-lg shadow-primary-purple/20">
              <span className="material-symbols-outlined text-2xl font-black">arrow_forward</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsScreen;
