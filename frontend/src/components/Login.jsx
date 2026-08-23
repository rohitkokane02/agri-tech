// UI: converted to responsive agri-tech card layout with glassmorphism, visual icons, and micro-interactions
import React, { useState } from 'react';
import API from '../services/api';
import { Sprout, Mail, Lock, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token); // Save JWT token securely
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setMessage('Logged in successfully!');
            onLoginSuccess(res.data.user); // Update parent app state
        } catch (err) {
            setMessage(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/60 via-slate-900 to-slate-950 flex justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-emerald-500 selection:text-white">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-emerald-500/20 shadow-2xl shadow-emerald-950/50 w-full max-w-md transition-all duration-300">
                {/* Header Badge & Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mb-4 text-emerald-400 shadow-inner">
                        <Sprout className="w-7 h-7" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">
                        Welcome Back 🌱
                    </h2>
                    <p className="text-sm font-medium text-emerald-400/80 mt-1 flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" /> KisanLog Agri-Tech Portal
                    </p>
                </div>

                {/* Status Notification Message */}
                {message && (
                    <div className={`mb-6 p-3.5 rounded-xl border text-sm font-medium text-center transition-all animate-fade-in ${
                        message.toLowerCase().includes('success')
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                            : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                    }`}>
                        {message}
                    </div>
                )}
                
                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                placeholder="farmer@kisanlog.com"
                                className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all duration-200 hover:border-slate-600" 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all duration-200 hover:border-slate-600" 
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-950/50 hover:shadow-emerald-600/30 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 group cursor-pointer"
                    >
                        <span>Login to Portal</span>
                        <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </form>

                {/* Footer Switch */}
                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <p className="text-sm text-slate-400">
                        Don't have an account?{' '}
                        <button 
                            onClick={onSwitchToRegister} 
                            className="inline-flex items-center gap-1 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors underline-offset-4 hover:underline cursor-pointer"
                        >
                            Register here
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}