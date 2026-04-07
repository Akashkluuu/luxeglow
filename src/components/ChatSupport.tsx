import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile, ChatMessage } from '../types';

interface ChatSupportProps {
  user: UserProfile | null;
}

export default function ChatSupport({ user }: ChatSupportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || !isOpen) return;

    const q = query(
      collection(db, `chats/${user.uid}/messages`),
      orderBy('timestamp', 'asc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage));
      setMessages(msgs);
      setTimeout(() => scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight), 100);
    });

    return () => unsubscribe();
  }, [user, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const msgData = {
      chatId: user.uid,
      senderId: user.uid,
      text: message,
      timestamp: new Date().toISOString(),
    };

    await addDoc(collection(db, `chats/${user.uid}/messages`), msgData);
    setMessage('');
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col h-[500px]"
          >
            <div className="bg-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-white">LuxeSupport</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
              {messages.length === 0 && (
                <div className="text-center text-slate-500 mt-10">
                  <p>How can we help you today?</p>
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === user.uid ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.senderId === user.uid
                        ? 'bg-purple-600 text-white rounded-tr-none'
                        : 'bg-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-slate-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <button type="submit" className="bg-purple-600 p-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Send className="w-5 h-5 text-white" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-purple-600 p-4 rounded-full shadow-lg text-white hover:bg-purple-700 transition-colors"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
