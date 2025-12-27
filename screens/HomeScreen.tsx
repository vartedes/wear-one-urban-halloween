
import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useApp } from '../App';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, cart, user, setUser } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    if (activeCategory === 'Halloween 🎃') return PRODUCTS.filter(p => p.category === 'Halloween');
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const categories = ['All', 'Halloween 🎃', 'Hoodies', 'Sneakers', 'Tees', 'Outerwear', 'Pants', 'Accessories'];

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0]
    });
  };

  const handleDirectBuy = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0]
    });
    navigate('/cart');
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pb-24 animate-in fade-in duration-700 relative overflow-x-hidden">
      {/* SIDE DRAWER MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative w-[280px] h-full bg-background-dark border-r border-white/10 shadow-2xl animate-in slide-in-from-left duration-500 p-8 flex flex-col">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-xl font-black italic tracking-tighter text-primary-purple">WEAR ONE</h2>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <nav className="flex-1 space-y-6">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-gray-600 tracking-[0.3em]">Explorar</p>
                {['Home', 'Novedades', 'Bestsellers', 'Colección Halloween'].map(item => (
                  <button key={item} className="block text-lg font-bold hover:text-primary-purple transition-colors text-left w-full uppercase tracking-tighter">
                    {item}
                  </button>
                ))}
              </div>
              
              <div className="h-px bg-white/5 w-full my-8"></div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-gray-600 tracking-[0.3em]">Cuenta</p>
                <button onClick={() => { navigate('/profile'); setIsMenuOpen(false); }} className="flex items-center gap-3 text-sm font-bold text-gray-300 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-primary-purple">person</span> Perfil Shadow
                </button>
                <button onClick={() => { navigate('/orders'); setIsMenuOpen(false); }} className="flex items-center gap-3 text-sm font-bold text-gray-300 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-primary-purple">package_2</span> Mis Pedidos
                </button>
                <button onClick={() => { navigate('/loyalty'); setIsMenuOpen(false); }} className="flex items-center gap-3 text-sm font-bold text-gray-300 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-halloween-orange">stars</span> Loyalty Hub
                </button>
              </div>
            </nav>
            
            <button 
              onClick={() => { setUser(null); navigate('/'); setIsMenuOpen(false); }}
              className="mt-auto py-4 rounded-xl border border-red-500/20 text-red-500 font-black uppercase tracking-widest text-[9px] hover:bg-red-500/5 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">logout</span> Cerrar Sesión
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-5 h-16">
          <button onClick={() => setIsMenuOpen(true)} className="text-white p-2 -ml-2 hover:text-primary-purple transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[28px]">menu</span>
          </button>
          <h1 className="text-xl font-display font-black tracking-widest text-center flex-1 uppercase text-white italic">
            WEAR ONE
          </h1>
          <Link to="/cart" className="text-white p-2 -mr-2 relative active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[28px]">shopping_bag</span>
            {cart.length > 0 && (
              <span className="absolute top-1 right-0 h-5 w-5 rounded-full bg-halloween-orange text-[10px] flex items-center justify-center font-bold shadow-[0_0_10px_#ff6b00] animate-bounce">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="px-5 pt-6 space-y-8">
        {/* Featured Hero */}
        <div 
          onClick={() => navigate('/product/5')}
          className="relative w-full rounded-[2.5rem] overflow-hidden aspect-[16/11] shadow-2xl border border-white/10 group cursor-pointer"
        >
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs_p-izVYCMV1aTBJU-0fK9-wANAm11waZ5QsnAlIvpGMW18toxo9-icezCUKrY1smi0kxNhTUqxGKMi0oFpg0W911rQk10u-QzoDirufsAKhwc6mZuWkFm7syxhiQqXbGYOb_eb7I2Wk-IR61VVJn2mJGD5sNOKAFEcgGF0phqFX1hHQ-_O1KAY1tT5ZcEGjQnaUKd91mUGbWAVI0hjfZg_3MbQ8lJqJ8waGRdRGTsOrVDMi0TViuFcIh50emKL7DFf4u68RIPmNU" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/95 via-background-dark/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div className="flex flex-col items-start gap-2">
              <span className="px-3 py-1 bg-primary-purple text-white text-[9px] font-black uppercase rounded-full tracking-widest shadow-lg">New Drop</span>
              <h2 className="text-4xl font-black italic uppercase text-white leading-[0.85] tracking-tighter">Void<br/>Runner X1</h2>
              <p className="text-xs text-gray-400 font-medium">Limited Edition Carbon Soles</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); handleDirectBuy(e, PRODUCTS.find(p => p.id === '5')); }}
              className="bg-white text-black h-12 px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-halloween-orange hover:text-white transition-all active:scale-95"
            >
              Comprar
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 -mx-5 px-5">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex h-12 shrink-0 items-center justify-center px-6 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em] border ${activeCategory === cat ? 'bg-primary-purple border-primary-purple text-white shadow-[0_10px_20px_rgba(127,19,236,0.3)] scale-105' : 'bg-surface-dark border-white/5 text-gray-500 hover:border-white/20'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic text-white flex items-center gap-3">
              <span className="h-8 w-1.5 bg-halloween-orange rounded-full"></span>
              {activeCategory === 'All' ? 'Latest Drops' : activeCategory}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-x-5 gap-y-12">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex flex-col gap-4 group relative cursor-pointer"
              >
                <div className="relative w-full aspect-[3/4.2] rounded-[2rem] overflow-hidden bg-surface-dark border border-white/5 shadow-xl transition-all duration-500 group-hover:shadow-primary-purple/10 group-hover:-translate-y-1">
                  {product.isHot && <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-halloween-orange text-black text-[9px] font-black uppercase rounded-lg">Hot</div>}
                  <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={product.name} />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <button 
                      onClick={(e) => handleDirectBuy(e, product)}
                      className="w-full bg-white text-black py-3 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-xs">bolt</span>
                      Comprar Ya
                    </button>
                  </div>
                  
                  <button 
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="absolute top-4 right-4 z-20 size-10 bg-black/40 backdrop-blur-md text-white rounded-full shadow-2xl flex items-center justify-center border border-white/10 hover:bg-primary-purple"
                  >
                    <span className="material-symbols-outlined font-black text-lg">add</span>
                  </button>
                </div>
                <div className="px-2">
                  <h3 className="text-white text-xs font-bold truncate tracking-tight uppercase">{product.name}</h3>
                  <p className="text-white text-base font-black italic tracking-tighter mt-1">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeScreen;
