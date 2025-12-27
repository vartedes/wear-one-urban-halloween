
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatWithStylist } from '../services/geminiService';
import { PRODUCTS } from '../constants';
import { useApp } from '../App';

const StyleBot: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string, productId?: string }[]>([
    { role: 'model', text: '¿Qué onda? Soy Ghost. ¿Buscas el outfit perfecto para dominar la noche?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const response = await chatWithStylist(history, userMsg);
    
    // IA inteligente: detecta intención de compra o productos específicos
    let productId;
    if (userMsg.toLowerCase().includes('sneaker') || response.toLowerCase().includes('sneaker')) productId = '5';
    if (userMsg.toLowerCase().includes('hoodie') || response.toLowerCase().includes('hoodie')) productId = '1';
    
    setMessages(prev => [...prev, { role: 'model', text: response, productId: productId }]);
    setIsTyping(false);
  };

  const handleBuyFromBot = (id: string) => {
    const product = PRODUCTS.find(p => p.id === id);
    if (product) {
      addToCart({ ...product, quantity: 1, selectedSize: product.sizes[0], selectedColor: product.colors[0] });
      navigate('/cart');
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 size-14 bg-halloween-purple text-white rounded-full shadow-[0_0_20px_rgba(157,0,255,0.6)] z-[60] flex items-center justify-center animate-bounce hover:scale-110 transition-transform"
      >
        <span className="material-symbols-outlined text-3xl">smart_toy</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-40 right-6 w-80 max-h-[500px] bg-surface-dark border border-white/10 rounded-[2rem] shadow-2xl z-[60] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-halloween-purple flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-white">skull</span>
              <span className="font-bold text-xs tracking-widest uppercase">GHOST STYLIST</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform"><span className="material-symbols-outlined">close</span></button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar min-h-[300px] bg-background-dark/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] leading-relaxed ${m.role === 'user' ? 'bg-primary-purple text-white rounded-tr-none' : 'bg-surface-dark text-gray-300 rounded-tl-none border border-white/5'}`}>
                  {m.text}
                </div>
                {m.productId && (
                  <button 
                    onClick={() => handleBuyFromBot(m.productId!)}
                    className="mt-3 bg-white text-black px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] shadow-lg flex items-center gap-2 hover:bg-halloween-orange hover:text-white transition-all"
                  >
                    <span className="material-symbols-outlined text-xs">shopping_bag</span>
                    Comprar Look
                  </button>
                )}
              </div>
            ))}
            {isTyping && <div className="text-[10px] text-primary-purple italic animate-pulse ml-1">Ghost está canalizando el estilo...</div>}
          </div>

          <div className="p-4 bg-surface-dark border-t border-white/5 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Habla con el más allá..."
              className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-halloween-purple transition-all"
            />
            <button onClick={handleSend} className="bg-white text-black size-11 rounded-xl flex items-center justify-center hover:bg-halloween-purple hover:text-white transition-all shadow-lg">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StyleBot;
