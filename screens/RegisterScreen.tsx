
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../App';
import { MOCK_USER } from '../constants';

const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.password) {
      setUser({ ...MOCK_USER, name: form.name, email: form.email });
      navigate('/home');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      <div className="w-full h-[200px] relative overflow-hidden bg-background-dark shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background-dark"></div>
        <div className="absolute bottom-4 left-0 w-full px-6 flex flex-col items-center">
          <h1 className="text-white text-3xl font-extrabold uppercase italic tracking-tighter">Crear Cuenta</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 pb-8 pt-2">
        <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-[480px] mx-auto">
          <input 
            className="w-full h-14 rounded-xl bg-surface-dark border-transparent text-white placeholder:text-gray-500 p-4 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none" 
            placeholder="Nombre de usuario" 
            type="text" 
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
          />
          <input 
            className="w-full h-14 rounded-xl bg-surface-dark border-transparent text-white placeholder:text-gray-500 p-4 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none" 
            placeholder="Correo electrónico" 
            type="email" 
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
          />
          <input 
            className="w-full h-14 rounded-xl bg-surface-dark border-transparent text-white placeholder:text-gray-500 p-4 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none" 
            placeholder="Contraseña" 
            type="password" 
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
          />
          <button type="submit" className="w-full h-14 bg-primary-blue hover:bg-blue-600 rounded-xl text-white font-bold uppercase mt-4 transition-colors">
            Registrarme
          </button>
          <Link to="/" className="text-center text-sm text-gray-500 hover:text-white mt-4 underline decoration-gray-700">¿Ya tienes cuenta? Iniciar Sesión</Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
