import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(cart);

    const handleStorage = () => {
      setItems(JSON.parse(localStorage.getItem('cart') || '[]'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const removeItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
    window.dispatchEvent(new Event('storage'));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutClick = () => {
    if (!auth.currentUser) {
      navigate('/auth');
      return;
    }
    setShowConfirm(true);
  };

  const proceedToPayment = () => {
    setShowConfirm(false);
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-24 h-24 text-slate-800 mx-auto mb-8" />
        <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-slate-400 mb-8">Looks like you haven't added anything yet.</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-bold transition-all"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 relative">
      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl"
            >
              <button
                onClick={() => setShowConfirm(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-8">
                <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Proceed to Payment?</h2>
                <p className="text-slate-400">
                  You are about to be redirected to our secure payment gateway to complete your purchase of <span className="text-purple-400 font-bold">{formatPrice(total)}</span>.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={proceedToPayment}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02]"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl font-bold transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center space-x-6"
            >
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{item.category}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-slate-800 rounded-lg p-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-purple-400">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-purple-400">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{formatPrice(item.price * item.quantity)}</p>
                <p className="text-slate-500 text-sm">{formatPrice(item.price)} each</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-green-400 font-bold">FREE</span>
              </div>
              <div className="border-t border-slate-800 pt-4 flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="text-purple-400">{formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckoutClick}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02]"
            >
              <CreditCard className="w-5 h-5" />
              <span>Checkout Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

