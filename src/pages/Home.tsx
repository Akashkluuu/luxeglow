import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 100, 200]} scale={2}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0}
          />
        </Sphere>
      </Float>
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[3, 2, -2]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial color="#ec4899" factor={1} speed={2} />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} />
    </>
  );
}

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Scene />
          </Canvas>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6">
              Elegance in <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Every Detail
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-lg">
              Discover our curated collection of premium cosmetics, exquisite jewelry, and magical toys designed to inspire.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/shop"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-bold flex items-center space-x-2 transition-all transform hover:scale-105"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="border border-slate-700 hover:border-purple-500 px-8 py-4 rounded-full font-bold transition-all"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Star, title: 'Premium Quality', desc: 'Handpicked items from the finest artisans.' },
              { icon: Shield, title: 'Secure Payments', desc: 'Your transactions are protected with Stripe.' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Global shipping with real-time tracking.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-colors group"
              >
                <feature.icon className="w-12 h-12 text-purple-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-slate-400">Explore our diverse range of products</p>
            </div>
            <Link to="/shop" className="text-purple-400 hover:text-purple-300 flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Cosmetics', img: 'https://picsum.photos/seed/cosmetics/600/800', color: 'from-pink-500/20' },
              { name: 'Jewelry', img: 'https://picsum.photos/seed/jewelry/600/800', color: 'from-purple-500/20' },
              { name: 'Toys', img: 'https://picsum.photos/seed/toys/600/800', color: 'from-blue-500/20' },
            ].map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-60`} />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-white/80">Explore Collection</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
