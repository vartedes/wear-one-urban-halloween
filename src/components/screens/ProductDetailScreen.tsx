
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { PRODUCTS } from '../constants';
import { getStyleAdvice } from '../services/geminiService';

const ProductDetailScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const product = PRODUCTS.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [isTryOnActive, setIsTryOnActive] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      
      const fetchAdvice = async () => {
        setLoadingAdvice(true);
        const advice = await getStyleAdvice(product.name, product.description);
        setAiAdvice(advice);
        setLoadingAdvice(false);
      };
      fetchAdvice();
    }
  }, [product]);

  if (!product) return <div className="p-10 text-center">Producto no encontrado</div>;

  const handleAddToCart = () => {
    // Activar animación de feedback
    setIsAnimating(true);
    
    addToCart({
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor
    });

    // Resetear animación y mostrar modal con un ligero delay para fluidez
    setTimeout(() => {
      setIsAnimating(false);
      setShowSuccessModal(true);
    }, 200);
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor
    });
    navigate('/cart');
  };

  return (
    <div className="bg-background-dark min-h-screen flex flex-col relative pb-32">
      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowSuccessModal(false)}></div>
          <div className="relative w-full max-w-sm bg-surface-dark border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="size-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <span className="material-symbols-outlined text-4xl filled">check_circle</span>
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">¡Añadido al Vacío!</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-8">
                {product.name} ahora es parte de tu bolsa. ¿Cuál es tu siguiente movimiento?
              </p>
              
              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
                >
                  Seguir Explorando
                </button>
                <button 
                  onClick={() => navigate('/cart')}
                  className="w-full py-4 rounded-2xl bg-primary-purple text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary-purple/20 transition-all active:scale-95"
                >
                  Ir a la Bolsa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AR TRY-ON OVERLAY */}
      {isTryOnActive && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
          <div className="absolute top-10 left-6 z-[110]">
            <button onClick={() => setIsTryOnActive(false)} className="size-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-halloween-purple/20 via-transparent to-halloween-orange/20 animate-pulse"></div>
            <div className="size-80 rounded-3xl border-2 border-dashed border-white/30 relative overflow-hidden flex items-center justify-center">
              <img src={product.image} alt="Overlay" className="w-full h-full object-cover scale-110 opacity-60" />
              <div className="absolute inset-0 border-4 border-primary-purple/50 animate-pulse"></div>
            </div>
            <p className="absolute bottom-40 text-white font-bold text-center w-full uppercase tracking-widest text-sm drop-shadow-md">Escaneando cuerpo...</p>
          </div>
          <div className="p-10 bg-surface-dark border-t border-white/10 flex flex-col items-center">
            <p className="text-gray-400 text-xs mb-4 text-center">Posiciona el outfit en el cuadro para la vista previa IA</p>
            <button className="size-20 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <div className="size-14 rounded-full bg-white"></div>
            </button>
          </div>
        </div>
      )}

      {/* Media Header */}
      <div className="relative h-[60vh] w-full shrink-0">
        <div className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex size-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10 hover:bg-white/10"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button 
            onClick={() => setIsTryOnActive(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-purple text-white border border-white/10 font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-lg">view_in_ar</span> Try On
          </button>
        </div>
        <img className="h-full w-full object-cover object-top" src={product.image} alt={product.name} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative -mt-12 flex flex-1 flex-col rounded-t-[2.5rem] bg-background-dark px-6 pt-10 ring-1 ring-white/5">
        <div className="flex flex-col gap-3 mb-6">
          {product.category === 'Halloween' && (
            <span className="inline-flex items-center px-3 py-1 w-fit rounded-full bg-halloween-orange/10 border border-halloween-orange/20 text-halloween-orange text-[10px] font-bold tracking-widest uppercase animate-bounce">
              <span className="material-symbols-outlined text-sm mr-1">dark_mode</span>Halloween Edition
            </span>
          )}
          <h1 className="text-3xl font-bold leading-none text-white tracking-tight italic uppercase">{product.name}</h1>
          <div className="flex items-center justify-between">
            <span className="text-white text-2xl font-bold">${product.price.toFixed(2)}</span>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg">
              <span className="material-symbols-outlined text-halloween-orange text-lg filled">star</span>
              <span className="text-sm font-bold">4.8</span>
            </div>
          </div>
        </div>

        {/* AI Tip */}
        <div className="mb-8 p-4 bg-primary-purple/10 border border-primary-purple/20 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-2 -top-2 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl text-primary-purple">auto_awesome</span>
          </div>
          <div className="flex items-center gap-2 mb-2 text-primary-purple">
            <span className="material-symbols-outlined text-sm">psychology</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Ghost Stylist Advice</span>
          </div>
          <p className="text-sm text-gray-300 italic leading-relaxed">
            {loadingAdvice ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin size-3 border-2 border-primary-purple border-t-transparent rounded-full"></span>
                Invocando consejos...
              </span>
            ) : `"${aiAdvice}"`}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-8 mb-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-white/90 text-sm font-bold uppercase tracking-widest">Color</p>
            </div>
            <div className="flex gap-4">
              {product.colors.map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`size-12 rounded-full ring-offset-4 ring-offset-background-dark flex items-center justify-center transition-all duration-300 ${selectedColor === color ? 'ring-2 ring-primary-purple scale-110 shadow-[0_0_15px_rgba(127,19,236,0.5)]' : 'ring-1 ring-white/10 opacity-60'}`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && <span className="material-symbols-outlined text-white text-sm">check</span>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-white/90 text-sm font-bold uppercase tracking-widest">Tamaño</p>
              <button className="text-[10px] text-primary-purple font-bold hover:underline">Guía de Tallas</button>
            </div>
            <div className="flex gap-3">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-14 w-14 rounded-2xl border-2 font-black transition-all duration-300 ${selectedSize === size ? 'bg-primary-purple text-white border-primary-purple shadow-lg scale-105' : 'border-white/5 bg-surface-dark text-white/40 hover:border-white/20'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
            <p className="text-white/90 text-xs font-bold mb-3 uppercase tracking-widest">Descripción</p>
            <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Dual Floating Action Bar */}
      <div className="fixed bottom-0 left-0 w-full max-w-[480px] bg-background-dark/95 backdrop-blur-xl border-t border-white/5 p-5 z-50 flex gap-3">
        <button 
          onClick={handleAddToCart}
          className={`flex-1 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-200 border border-white/10 bg-surface-dark text-white shadow-lg ${isAnimating ? 'scale-90 opacity-80' : 'scale-100 active:scale-95'}`}
        >
          <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
          <span>Añadir</span>
        </button>
        <button 
          onClick={handleBuyNow}
          className="flex-[2] bg-gradient-to-r from-primary-purple to-halloween-purple py-5 rounded-2xl text-white font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(127,19,236,0.4)] active:scale-95 transition-all group"
        >
          <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">bolt</span> 
          <span>Comprar Ahora</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
