import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { UserProfile } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  user: UserProfile | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              LuxeGlow
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-slate-300 hover:text-purple-400 transition-colors">Shop</Link>
            <Link to="/about" className="text-slate-300 hover:text-purple-400 transition-colors">About</Link>
            <Link to="/cart" className="relative text-slate-300 hover:text-purple-400 transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-slate-300 hover:text-purple-400 transition-colors">
                  <img src={user.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'} alt="Profile" className="w-8 h-8 rounded-full border border-slate-700" />
                </Link>
                <button onClick={handleLogout} className="text-slate-300 hover:text-red-400 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-4"
          >
            <Link to="/shop" onClick={() => setIsOpen(false)} className="block text-slate-300">Shop</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block text-slate-300">About</Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="block text-slate-300">Cart</Link>
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block text-slate-300">Profile</Link>
                <Link to="/orders" onClick={() => setIsOpen(false)} className="block text-slate-300">Orders</Link>
                <button onClick={handleLogout} className="block text-red-400">Logout</button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)} className="block text-purple-400">Login</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
