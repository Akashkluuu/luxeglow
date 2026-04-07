import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { formatPrice } from '../lib/utils';
import { ShieldCheck, Lock, CreditCard, ArrowLeft } from 'lucide-react';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_placeholder');

function CheckoutForm({ total, items }: { total: number; items: any[] }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    // In a real app, you'd call your backend to create a PaymentIntent
    // and then confirm the payment here.
    // For this demo, we'll simulate a successful payment after a delay.
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderData = {
        userId: auth.currentUser?.uid,
        items,
        total,
        status: 'paid',
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'orders'), orderData);
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));
      navigate('/orders');
    } catch (err: any) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <label className="block text-sm font-medium text-slate-400 mb-4">Card Details</label>
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#f8fafc',
                  '::placeholder': {
                    color: '#64748b',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02]"
      >
        {processing ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            <span>Pay {formatPrice(total)}</span>
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-500 flex items-center justify-center space-x-1">
        <ShieldCheck className="w-4 h-4" />
        <span>Secure SSL Encrypted Payment</span>
      </p>
    </form>
  );
}

export default function Checkout() {
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
      navigate('/shop');
      return;
    }
    setItems(cart);
  }, [navigate]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/cart')}
        className="flex items-center space-x-2 text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Cart</span>
      </button>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-4">Checkout</h1>
            <p className="text-slate-400">Complete your purchase securely.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-purple-500" />
              <span>Payment Method</span>
            </h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm total={total} items={items} />
            </Elements>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-800 pt-6 space-y-2">
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Shipping</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2">
                <span>Total</span>
                <span className="text-purple-400">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
