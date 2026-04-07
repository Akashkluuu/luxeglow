import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ShoppingCart, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../constants';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<{ show: boolean; name: string } | null>(null);

  const filteredProducts = products.filter(p => {
    const matchesCategory = category === 'all' || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    
    setToast({ show: true, name: product.name });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] bg-slate-900 border border-purple-500/50 px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 min-w-[320px]"
          >
            <div className="bg-green-500/20 p-2 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">{toast.name} added!</p>
              <p className="text-xs text-slate-400">Item is now in your cart.</p>
            </div>
            <Link
              to="/cart"
              className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 text-sm font-bold bg-purple-500/10 px-3 py-2 rounded-lg transition-colors"
            >
              <span>View Cart</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <h1 className="text-4xl font-bold">Our Collection</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none w-full sm:w-64"
            />
          </div>
          
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            {['all', 'cosmetics', 'jewelry', 'toys'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                  category === cat ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-purple-500/50 transition-all"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold">4.8</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-xs text-purple-400 font-bold uppercase tracking-wider mb-2">
                  {product.category}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-slate-800 hover:bg-purple-600 p-3 rounded-xl transition-all group/btn"
                  >
                    <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
