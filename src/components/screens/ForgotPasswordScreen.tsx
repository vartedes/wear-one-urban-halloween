
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background-dark">
      <header className="flex items-center justify-between px-4 py-3 z-20">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full text-white">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
      </header>
      <main className="flex-1 flex flex-col px-6 pt-6 z-10 w-full max-w-lg mx-auto">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-3xl bg-surface-dark border border-white/5 text-primary-blue shadow-lg shadow-blue-500/10">
            <span className="material-symbols-outlined text-[36px]">lock_reset</span>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-white mb-3 tracking-tighter uppercase italic">Recuperar Acceso</h1>
          <p className="text-gray-500 text-sm">Ingresa tu correo registrado para recibir un enlace de restauración.</p>
        </div>
        <div className="space-y-6 w-full">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Email</label>
            <input 
              className="block w-full rounded-xl border-none py-4 pl-4 bg-surface-dark text-white placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-primary-blue" 
              placeholder="ejemplo@correo.com" 
              type="email"
            />
          </div>
          <button 
            onClick={() => alert("Enlace enviado")}
            className="w-full rounded-xl bg-primary-blue h-14 text-white font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            Enviar Enlace
          </button>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordScreen;
