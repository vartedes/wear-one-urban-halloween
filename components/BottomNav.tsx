
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../App';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { user, cart } = useApp();

  const getClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `flex flex-col items-center justify-center gap-1 w-16 transition-colors ${isActive ? 'text-primary-purple' : 'text-gray-500'}`;
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#150d1c] border-t border-white/5 pb-6 pt-3 px-6 z-50">
      <ul className="flex justify-between items-center">
        <li>
          <Link to="/home" className={getClasses('/home')}>
            <span className="material-symbols-outlined text-2xl">home</span>
            <span className="text-[10px] font-medium">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/search" className={getClasses('/search')}>
            <span className="material-symbols-outlined text-2xl">search</span>
            <span className="text-[10px] font-medium">Search</span>
          </Link>
        </li>
        <li className="-mt-8">
          <Link to="/loyalty" className="flex items-center justify-center size-14 rounded-full bg-primary-purple shadow-[0_0_15px_rgba(127,19,236,0.5)] text-white hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-3xl">star</span>
          </Link>
        </li>
        <li>
          <Link to="/cart" className={`${getClasses('/cart')} relative`}>
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            {cart.length > 0 && (
              <span className="absolute top-0 right-3 size-4 bg-halloween-orange text-[10px] text-white flex items-center justify-center rounded-full font-bold">
                {cart.length}
              </span>
            )}
            <span className="text-[10px] font-medium">Bag</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className={getClasses('/profile')}>
            <div className="size-6 rounded-full bg-slate-700 overflow-hidden">
              <img className="w-full h-full object-cover" src={user?.avatar || "https://picsum.photos/100"} alt="Profile" />
            </div>
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
