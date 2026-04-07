import { motion } from 'motion/react';
import { Sparkles, Heart, Globe, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            LuxeGlow was founded on the belief that beauty, elegance, and joy should be accessible to everyone. 
            We curate the world's finest cosmetics, jewelry, and toys to bring a touch of magic to your everyday life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <img
            src="https://picsum.photos/seed/about1/800/600"
            alt="Our Workshop"
            className="rounded-3xl shadow-2xl"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Craftsmanship & Quality</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Every piece in our jewelry collection is handcrafted by master artisans using ethically sourced materials. 
              Our cosmetics are formulated with the purest ingredients, ensuring both performance and skin health.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Heart className="text-pink-500 w-6 h-6" />
                <span className="font-bold">Ethically Sourced</span>
              </div>
              <div className="flex items-center space-x-3">
                <Sparkles className="text-purple-500 w-6 h-6" />
                <span className="font-bold">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-12 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Global Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <Globe className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">50+</h3>
              <p className="text-slate-400">Countries Served</p>
            </div>
            <div>
              <Users className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">1M+</h3>
              <p className="text-slate-400">Happy Customers</p>
            </div>
            <div>
              <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">10k+</h3>
              <p className="text-slate-400">Unique Products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
