import { UserProfile } from '../types';
import { motion } from 'motion/react';
import { User, Mail, Calendar, Shield, Settings, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  user: UserProfile | null;
}

export default function Profile({ user }: ProfileProps) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
        <button
          onClick={() => navigate('/auth')}
          className="bg-purple-600 px-6 py-2 rounded-lg"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-6">
              <img
                src={user.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                alt="Profile"
                className="w-24 h-24 rounded-2xl border-4 border-slate-900 shadow-xl"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-1">{user.displayName}</h1>
                <p className="text-slate-400">{user.email}</p>
              </div>
              <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition-colors flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <User className="w-5 h-5 text-purple-500" />
              <span>Account Details</span>
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-slate-800">
                <span className="text-slate-500">Member Since</span>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-800">
                <span className="text-slate-500">Role</span>
                <span className="capitalize text-purple-400 font-bold">{user.role}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-800">
                <span className="text-slate-500">Verified</span>
                <span className="text-green-400">Yes</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-purple-500" />
              <span>Security</span>
            </h2>
            <div className="space-y-4">
              <button className="w-full text-left py-3 border-b border-slate-800 hover:text-purple-400 transition-colors">
                Change Password
              </button>
              <button className="w-full text-left py-3 border-b border-slate-800 hover:text-purple-400 transition-colors">
                Two-Factor Authentication
              </button>
              <button
                onClick={() => signOut(auth)}
                className="w-full text-left py-3 text-red-400 hover:text-red-300 transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
