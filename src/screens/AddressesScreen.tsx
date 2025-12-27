
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const AddressesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addresses, setAddresses, notify } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: '', street: '', city: '' });

  const handleSetDefault = (id: string) => {
    const updated = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    setAddresses(updated);
    notify("Dirección predeterminada actualizada");
  };

  const handleDelete = (id: string) => {
    if (addresses.length <= 1) {
      notify("Debes tener al menos una dirección");
      return;
    }
    const updated = addresses.filter(addr => addr.id !== id);
    if (!updated.find(a => a.isDefault)) updated[0].isDefault = true;
    setAddresses(updated);
    notify("Dirección eliminada");
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.label || !newAddr.street || !newAddr.city) {
      notify("Por favor completa todos los campos");
      return;
    }

    const nextId = (Math.max(0, ...addresses.map(a => parseInt(a.id))) + 1).toString();
    const addressToAdd = {
      id: nextId,
      label: newAddr.label,
      street: newAddr.street,
      city: newAddr.city,
      isDefault: addresses.length === 0
    };

    setAddresses([...addresses, addressToAdd]);
    setNewAddr({ label: '', street: '', city: '' });
    setShowAddForm(false);
    notify("Nueva dirección guardada");
  };

  return (
    <div className="bg-background-dark min-h-screen flex flex-col pb-24 text-white">
      <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-xl border-b border-white/5 flex items-center p-4">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-white/10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center font-black uppercase tracking-widest text-sm">Mis Direcciones</h2>
        <div className="size-10"></div>
      </header>

      <main className="p-6 space-y-6 flex-1 overflow-y-auto">
        {showAddForm ? (
          <div className="bg-surface-dark p-8 rounded-[2rem] border border-primary-purple shadow-xl animate-in zoom-in-95 duration-300">
            <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6 text-primary-purple">Nueva Ubicación</h3>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Etiqueta (ej. Trabajo)</label>
                <input 
                  value={newAddr.label}
                  onChange={e => setNewAddr({...newAddr, label: e.target.value})}
                  className="w-full h-14 bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-purple transition-all"
                  placeholder="Etiqueta"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Calle y Número</label>
                <input 
                  value={newAddr.street}
                  onChange={e => setNewAddr({...newAddr, street: e.target.value})}
                  className="w-full h-14 bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-purple transition-all"
                  placeholder="Av. Principal #123"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Ciudad / Estado</label>
                <input 
                  value={newAddr.city}
                  onChange={e => setNewAddr({...newAddr, city: e.target.value})}
                  className="w-full h-14 bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-purple transition-all"
                  placeholder="CDMX"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-4 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 rounded-xl bg-primary-purple text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-purple/30 active:scale-95 transition-all"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div 
                  key={addr.id}
                  onClick={() => handleSetDefault(addr.id)}
                  className={`p-6 rounded-[2rem] border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    addr.isDefault 
                    ? 'bg-surface-dark border-primary-purple shadow-[0_10px_30px_rgba(127,19,236,0.2)]' 
                    : 'bg-black/20 border-white/5 opacity-60 hover:opacity-100'
                  }`}
                >
                  {addr.isDefault && (
                    <div className="absolute -right-4 -top-4 size-16 bg-primary-purple/20 rounded-full blur-2xl"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-xl flex items-center justify-center ${addr.isDefault ? 'bg-primary-purple text-white' : 'bg-surface-dark text-gray-500'}`}>
                        <span className="material-symbols-outlined text-xl">
                          {addr.label === 'Casa' ? 'home' : addr.label === 'Estudio' ? 'work' : 'location_on'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold uppercase tracking-widest text-xs">{addr.label}</h3>
                        {addr.isDefault && <span className="text-[8px] font-black uppercase text-primary-purple tracking-widest">Predeterminada</span>}
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(addr.id); }}
                      className="size-8 rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white/90">{addr.street}</p>
                    <p className="text-xs text-gray-500">{addr.city}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowAddForm(true)}
              className="w-full py-10 rounded-[2.5rem] border border-dashed border-white/10 text-gray-500 flex flex-col items-center justify-center gap-3 hover:border-white/30 hover:text-white transition-all group animate-in slide-in-from-bottom-5 duration-500"
            >
              <div className="size-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary-purple/20 group-hover:text-primary-purple transition-all">
                <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">add_location_alt</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Añadir Nueva Ubicación</span>
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default AddressesScreen;
