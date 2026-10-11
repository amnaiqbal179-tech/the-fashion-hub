'use client';

import { useState } from 'react';
import { Lock, Mail, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Admin Credentials Verification
    if (email === 'admin@thefashionhub.com' && password === 'admin123') {
      // 🟢 CRITICAL FIX: Middleware check ke liye admin_token cookie set karein
      document.cookie = 'admin_token=true; path=/; max-age=86400'; // 1 Day Session

      // Dashboard par redirect
      window.location.href = '/admin/dashboard';
    } else {
      setError('Invalid Email or Password! Use: admin@thefashionhub.com / admin123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-full min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-white">
        
        {/* Brand Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 flex items-center justify-center text-slate-950 font-black text-2xl mx-auto shadow-lg shadow-amber-500/20">
            F
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" /> The Fashion Hub
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@thefashionhub.com"
                required
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition placeholder:text-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition placeholder:text-slate-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm mt-6 cursor-pointer"
          >
            Login to Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400">
            Demo Email: <span className="text-amber-400 font-mono">admin@thefashionhub.com</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Demo Password: <span className="text-amber-400 font-mono">admin123</span>
          </p>
        </div>

      </div>
    </div>
  );
}