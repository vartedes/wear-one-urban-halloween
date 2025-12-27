
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { CartItem, Product, User, Address, PaymentMethod } from './types';
import { MOCK_USER, PRODUCTS } from './constants';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import CheckoutSummaryScreen from './screens/CheckoutSummaryScreen';
import CheckoutPaymentScreen from './screens/CheckoutPaymentScreen';
import CheckoutSuccessScreen from './screens/CheckoutSuccessScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoyaltyScreen from './screens/LoyaltyScreen';
import SearchScreen from './screens/SearchScreen';
import OrdersScreen from './screens/OrdersScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import AddressesScreen from './screens/AddressesScreen';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';

// Components
import BottomNav from './components/BottomNav';
import StyleBot from './components/StyleBot';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  notification: string | null;
  notify: (msg: string) => void;
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  paymentMethods: PaymentMethod[];
  setPaymentMethods: (methods: PaymentMethod[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchCategory: string;
  setSearchCategory: (category: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp debe usarse dentro de AppProvider");
  return context;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(() => {
    const saved = localStorage.getItem('wo_user');
    try { return saved ? JSON.parse(saved) : null; } catch { return null; }
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('wo_cart');
    try { return saved ? JSON.parse(saved) : []; } catch { return []; }
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('wo_addresses');
    try { if (saved) return JSON.parse(saved); } catch {}
    return [
      { id: '1', label: 'Casa', street: 'Av. Reforma 222, Int 402', city: 'Ciudad de México', isDefault: true },
      { id: '2', label: 'Estudio', street: 'Calle Colima 124, Roma Norte', city: 'Ciudad de México', isDefault: false }
    ];
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    const saved = localStorage.getItem('wo_payment_methods');
    try { if (saved) return JSON.parse(saved); } catch {}
    return [
      { id: '1', type: 'visa', lastFour: '4242', expiry: '12/26', isDefault: true },
      { id: '2', type: 'mastercard', lastFour: '8812', expiry: '05/25', isDefault: false }
    ];
  });

  const [searchQuery, setSearchQuery] = useState<string>(() => localStorage.getItem('wo_search_query') || '');
  const [searchCategory, setSearchCategory] = useState<string>(() => localStorage.getItem('wo_search_category') || 'All');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => { localStorage.setItem('wo_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wo_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('wo_addresses', JSON.stringify(addresses)); }, [addresses]);
  useEffect(() => { localStorage.setItem('wo_payment_methods', JSON.stringify(paymentMethods)); }, [paymentMethods]);
  useEffect(() => { localStorage.setItem('wo_search_query', searchQuery); }, [searchQuery]);
  useEffect(() => { localStorage.setItem('wo_search_category', searchCategory); }, [searchCategory]);

  const setUser = (u: User | null) => setUserState(u);
  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id && i.selectedSize === item.selectedSize);
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += item.quantity;
        return newCart;
      }
      return [...prev, item];
    });
    notify(`¡${item.name} añadido!`);
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('wo_cart');
  };

  return (
    <AppContext.Provider value={{
      user, setUser, cart, addToCart, removeFromCart, updateCartQuantity, clearCart, notification, notify,
      addresses, setAddresses, paymentMethods, setPaymentMethods,
      searchQuery, setSearchQuery, searchCategory, setSearchCategory
    }}>
      {children}
    </AppContext.Provider>
  );
};

const MainLayout: React.FC = () => {
  const location = useLocation();
  const { notification } = useApp();
  
  const authPaths = ['/', '/register', '/forgot-password'];
  // Added /checkout-payment to excluded navigation paths
  const showNav = !authPaths.includes(location.pathname) && !location.pathname.startsWith('/checkout-success') && !location.pathname.startsWith('/checkout-summary') && !location.pathname.startsWith('/checkout-payment');

  return (
    <div className="flex flex-col min-h-screen max-w-[480px] mx-auto bg-background-dark overflow-x-hidden relative border-x border-white/5 shadow-2xl">
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px]">
          <div className="bg-primary-purple text-white px-6 py-4 rounded-2xl font-bold shadow-[0_10px_30px_rgba(127,19,236,0.4)] animate-in fade-in zoom-in slide-in-from-top-10 duration-500 flex items-center gap-3">
            <span className="material-symbols-outlined">info</span>
            <span className="text-sm">{notification}</span>
          </div>
        </div>
      )}

      <div className={`flex-1 ${showNav ? 'pb-24' : ''}`}>
        <Outlet />
      </div>
      
      {showNav && (
        <>
          <BottomNav />
          <StyleBot />
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductDetailScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/checkout-summary" element={<CheckoutSummaryScreen />} />
            {/* Added missing CheckoutPaymentScreen route */}
            <Route path="/checkout-payment" element={<CheckoutPaymentScreen />} />
            <Route path="/checkout-success" element={<CheckoutSuccessScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/loyalty" element={<LoyaltyScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/orders" element={<OrdersScreen />} />
            <Route path="/order/:id" element={<OrderDetailScreen />} />
            <Route path="/addresses" element={<AddressesScreen />} />
            <Route path="/payment-methods" element={<PaymentMethodsScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
