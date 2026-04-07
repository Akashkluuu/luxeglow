import { Link } from 'react-router-dom';
import { Sparkles, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                LuxeGlow
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium cosmetics, exquisite jewelry, and magical toys curated for those who appreciate the finer things in life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-purple-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/shop" className="hover:text-purple-400 transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="hover:text-purple-400 transition-colors">Our Story</Link></li>
              <li><Link to="/orders" className="hover:text-purple-400 transition-colors">Track Order</Link></li>
              <li><Link to="/auth" className="hover:text-purple-400 transition-colors">My Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/shop?cat=cosmetics" className="hover:text-purple-400 transition-colors">Cosmetics</Link></li>
              <li><Link to="/shop?cat=jewelry" className="hover:text-purple-400 transition-colors">Jewelry</Link></li>
              <li><Link to="/shop?cat=toys" className="hover:text-purple-400 transition-colors">Toys & Games</Link></li>
              <li><Link to="/shop" className="hover:text-purple-400 transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-500 shrink-0" />
                <span>123 Luxury Ave, Mumbai, Maharashtra 400001, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-500 shrink-0" />
                <span>+91 22 1234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-500 shrink-0" />
                <span>support@luxeglow.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 LuxeGlow E-Commerce. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
