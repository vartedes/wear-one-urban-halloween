
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useApp } from '../App';

const SearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, searchQuery, setSearchQuery, searchCategory, setSearchCategory } = useApp();

  const categories = ['All', 'Halloween 🎃', 'Sneakers', 'Hoodies', 'Outerwear', 'Accessories'];

  const searchResults = useMemo(() => {
    let filtered = PRODUCTS;
    
    if (searchCategory === 'Halloween 🎃') {
      filtered = filtered.filter(p => p.category === 'Halloween');
    } else if (searchCategory !== 'All') {
      filtered = filtered.filter(p => p.category === searchCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, searchCategory]);

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
    <div className="bg-background-dark min-h-screen flex flex-col pb-24">
      <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-xl border-b border-white/5 p-4">
        <div className="flex items-center rounded-2xl h-14 bg-surface-dark px-4 border border-white/5 focus-within:border-primary-blue transition-all duration-300 shadow-xl">
          <span className="material-symbols-outlined text-gray-500">search</span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none focus:ring-0 text-white ml-2 text-sm placeholder:text-gray-600 outline-none font-medium" 
            placeholder="Buscar en el vacío urbano..." 
          />
          {searchQuery && <button onClick={() => setSearchQuery('')} className="text-gray-500"><span className="material-symbols-outlined">cancel</span></button>}
          <span className="material-symbols-outlined text-gray-500 cursor-pointer hover:text-white transition-colors ml-2">photo_camera</span>
        </div>
      </header>

      <div className="px-4 py-4 overflow-x-auto no-scrollbar flex gap-2 bg-background-dark/50 sticky top-[72px] z-40 border-b border-white/5">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSearchCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${searchCategory === cat ? 'bg-primary-purple border-primary-purple text-white shadow-lg' : 'bg-surface-dark text-gray-500 border-white/5'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <main className="px-5 flex-1 mt-6">
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {searchResults.map(product => (
              <div 
                key={product.id} 
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-surface-dark rounded-3xl overflow-hidden group border border-white/5 shadow-lg flex flex-col relative"
              >
                <div className="aspect-[3/3.8] relative overflow-hidden">
                   <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={product.name} />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button 
                        onClick={(e) => handleDirectBuy(e, product)}
                        className="bg-white text-black px-4 py-2 rounded-lg font-black uppercase text-[8px] tracking-widest active:scale-90 transition-all"
                      >
                        Comprar
                      </button>
                      <button 
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="text-white text-[8px] font-bold uppercase tracking-widest underline underline-offset-4"
                      >
                        + Bolsa
                      </button>
                   </div>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="text-[11px] font-bold text-white truncate uppercase tracking-tight">{product.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-xs font-black italic tracking-tighter">${product.price.toFixed(2)}</span>
                    <span className="text-[8px] text-primary-purple font-black tracking-widest uppercase">Select</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
            <span className="material-symbols-outlined text-6xl mb-4 animate-pulse">ghost</span>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-white/50">El vacío no responde</p>
            <p className="text-[10px] mt-2 max-w-[200px]">Intenta buscar algo más terrenal como "Hoodie" o explora Sneakers.</p>
          </div>
        )}

        {/* Explora Secciones fallbacks */}
        {!searchQuery && (
          <div className="mt-12 space-y-6 pb-12">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3">
              MÁS BUSCADOS <div className="h-px flex-1 bg-white/5"></div>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 bg-surface-dark rounded-3xl relative overflow-hidden group cursor-pointer border border-white/5" onClick={() => setSearchCategory('Sneakers')}>
                <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=400" className="absolute w-full h-full object-cover opacity-20 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60" alt="Sneakers" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <span className="text-white font-black text-xl uppercase tracking-tighter italic leading-none">Kicks<br/><span className="text-primary-purple text-xs tracking-[0.3em] font-black">ELITE</span></span>
                </div>
              </div>
              <div className="h-48 bg-surface-dark rounded-3xl relative overflow-hidden group cursor-pointer border border-white/5" onClick={() => setSearchCategory('Accessories')}>
                <img src="https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=400" className="absolute w-full h-full object-cover opacity-20 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60" alt="Accessories" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <span className="text-white font-black text-xl uppercase tracking-tighter italic leading-none">Gear<br/><span className="text-halloween-orange text-xs tracking-[0.3em] font-black">CORE</span></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchScreen;
