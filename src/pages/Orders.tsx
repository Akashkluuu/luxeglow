import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile, Order } from '../types';
import { motion } from 'motion/react';
import { formatPrice } from '../lib/utils';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';

interface OrdersProps {
  user: UserProfile | null;
}

export default function Orders({ user }: OrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (loading) return <div className="p-12 text-center">Loading orders...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Order History</h1>
      
      <div className="space-y-8">
        {orders.length === 0 ? (
          <div className="text-center py-24 bg-slate-900 border border-slate-800 rounded-3xl">
            <Package className="w-16 h-16 text-slate-800 mx-auto mb-4" />
            <p className="text-slate-400">No orders found.</p>
          </div>
        ) : (
          orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-800 flex flex-wrap justify-between items-center gap-4 bg-slate-800/30">
                <div className="flex space-x-8">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Order ID</p>
                    <p className="text-sm font-mono">{order.id.slice(0, 8)}...</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Placed On</p>
                    <p className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total</p>
                    <p className="text-sm font-bold text-purple-400">{formatPrice(order.total)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-sm font-bold border border-green-500/20">
                  <CheckCircle className="w-4 h-4" />
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
