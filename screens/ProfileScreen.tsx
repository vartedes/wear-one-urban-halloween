
import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../App';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useApp();

  if (!user) return <Navigate to="/" replace />;

  const menuItems = [
    { label: 'Mis Pedidos', icon: 'inventory_2', path: '/orders', color: 'text-halloween-orange' },
    { label: 'Loyalty Hub', icon: 'loyalty', path: '/loyalty', color: 'text-halloween-purple' },
    { label: 'Direcciones', icon: 'location_on', path: '/addresses', color: 'text-primary-blue' },
    { label: 'Pagos', icon: 'credit_card', path: '/payment-methods', color: 'text-green-400' },
  ];

  return (
    <div className="bg-background-dark min-h-screen flex flex-col pb-24 text-white">
      <header className="p-6 border-b border-white/5 flex items-center justify-between">
        <h1 className="text-2xl font-black italic uppercase tracking-tighter">Shadow Profile</h1>
        <button className="text-gray-500 hover:text-white transition-colors"><span className="material-symbols-outlined">settings</span></button>
      </header>

      <main className="px-6 pt-8 space-y-8">
        {/* User Card */}
        <div className="bg-surface-dark p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col items-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 size-40 bg-primary-purple/10 blur-3xl"></div>
          <div className="size-24 rounded-full p-1 bg-gradient-to-tr from-primary-purple to-halloween-orange mb-4 shadow-xl">
            <img className="size-full rounded-full object-cover border-4 border-surface-dark" src={user.avatar} alt={user.name} />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-tight">{user.name}</h2>
          <p className="text-xs text-gray-500 font-medium tracking-widest uppercase mt-1">Nivel {user.level} Society Member</p>
          
          <div className="grid grid-cols-2 gap-4 w-full mt-8">
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5 text-center">
              <p className="text-[10px] uppercase font-black text-gray-600 tracking-widest mb-1">Puntos</p>
              <p className="text-xl font-black italic">{user.points}</p>
            </div>
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5 text-center">
              <p className="text-[10px] uppercase font-black text-gray-600 tracking-widest mb-1">XP</p>
              <p className="text-xl font-black italic text-primary-purple">{user.xp}</p>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => navigate(item.path)}
              className="p-6 rounded-[2rem] bg-surface-dark border border-white/5 flex flex-col gap-3 hover:border-white/20 transition-all active:scale-95 group shadow-lg"
            >
              <span className={`material-symbols-outlined text-3xl ${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</span>
              <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => { setUser(null); navigate('/'); }}
          className="w-full py-6 rounded-[2rem] border border-red-500/20 text-red-500 font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-red-500/10 transition-all mt-4"
        >
          <span className="material-symbols-outlined">logout</span>
          Cerrar Sesión
        </button>
      </main>
    </div>
  );
};

export default ProfileScreen;
