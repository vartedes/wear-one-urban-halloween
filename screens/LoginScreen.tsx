
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../App';
import { MOCK_USER } from '../constants';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, user } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setUser(MOCK_USER);
      navigate('/home');
    } else {
      alert("Por favor completa los campos.");
    }
  };

  const handleGuest = () => {
    setUser(MOCK_USER);
    navigate('/home');
  };

  // Obtenemos el primer nombre si el usuario ya existe en el estado (persistido en App.tsx)
  const firstName = user ? user.name.split(' ')[0] : '';

  return (
    <div className="relative flex flex-col min-h-screen bg-background-dark">
      <div className="w-full h-[320px] relative overflow-hidden shrink-0">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover" 
          style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA8ED7Sltzn8pO3ur2j71y0qhZwEHi5QJf8OqqnIoovPC_IKpn2gFbXL6abkeofbeZrwc7cCTTEFKcs7FxZjKYBgZMu1XdzQGlBbAx_6ERnDboQCG0iBj0v8XqY4wrpskPj35b3sL4p8V1zVMi5cHZ0dLoxGjpDXUE9wDTvql6OmF5UvMi8uVA4LoBFs-XRaA4KZvVVbPF4Y4VftX9HL0R4yp9ZptKk1F1CAo8xKKLudAzbd4DCY3MEbZlt96x5LSFmPnSmYUBC_Cff")'}}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background-dark"></div>
        <div className="absolute bottom-4 left-0 w-full px-6 flex flex-col items-center">
          <h1 className="text-white text-5xl font-extrabold tracking-tighter uppercase italic drop-shadow-lg text-glow">WEAR ONE</h1>
          <p className="text-primary-blue font-bold tracking-widest text-xs uppercase mt-1 mb-2">Urban Halloween Collection</p>
        </div>
      </div>

      <div className="flex-1 px-6 pt-2 pb-8">
        <div className="mb-8 text-center">
          <h2 className="text-white text-[28px] font-black italic uppercase tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-2 duration-700">
            {user ? `Bienvenido, ${firstName}` : 'Bienvenido'}
          </h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
            {user ? 'Listo para el siguiente drop urbano' : 'Inicia sesión para desbloquear el vacío'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="CORREO ELECTRÓNICO"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 p-4 rounded-xl bg-surface-dark text-white border border-transparent focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all text-xs font-bold tracking-widest"
          />
          <input
            type="password"
            placeholder="CONTRASEÑA"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 p-4 rounded-xl bg-surface-dark text-white border border-transparent focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all text-xs font-bold tracking-widest"
          />
          <button type="submit" className="w-full h-14 bg-primary-blue hover:bg-blue-600 rounded-xl text-white font-black uppercase tracking-[0.2em] text-[11px] transition-all active:scale-95 shadow-xl shadow-primary-blue/10">
            Entrar al Vacío
          </button>
        </form>

        <button 
          onClick={handleGuest}
          className="w-full h-14 mt-4 bg-surface-dark border border-white/5 text-gray-400 rounded-xl hover:bg-white/5 transition-all max-w-sm mx-auto flex items-center justify-center font-black uppercase tracking-widest text-[10px]"
        >
          Invitado Anónimo
        </button>

        <div className="mt-10 text-center flex flex-col gap-3">
          <Link to="/register" className="text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">¿No tienes cuenta? Regístrate</Link>
          <Link to="/forgot-password" title="Olvidé mi contraseña" className="text-primary-blue text-[9px] font-black uppercase tracking-[0.3em] italic">Recuperar Acceso</Link>
        </div>

        <p className="text-center text-gray-700 text-[8px] font-black uppercase tracking-[0.4em] mt-12 opacity-50">
          WEAR ONE SOCIETY © 2025
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
