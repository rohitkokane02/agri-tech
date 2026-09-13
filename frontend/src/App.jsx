import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import WeatherForecast from './components/WeatherForecast';

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        user ? (
                            user.role === 'Admin' ? (
                                <Navigate to="/admin" replace />
                            ) : (
                                <Navigate to="/dashboard" replace />
                            )
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    } 
                />

                <Route 
                    path="/login" 
                    element={
                        user ? (
                            <Navigate to="/" replace />
                        ) : (
                            <Login 
                                onLoginSuccess={(u) => setUser(u)} 
                                onSwitchToRegister={() => window.location.href = '/register'} 
                            />
                        )
                    } 
                />

                <Route 
                    path="/register" 
                    element={
                        <Register 
                            onSwitchToLogin={() => window.location.href = '/login'} 
                        />
                    } 
                />

                <Route 
                    path="/dashboard" 
                    element={
                        user ? (
                            <Dashboard user={user} onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    } 
                />

                <Route 
                    path="/weather" 
                    element={
                        user ? (
                            <div className="min-h-screen bg-slate-950 p-6">
                                <div className="max-w-6xl mx-auto">
                                    <WeatherForecast userId={user.id} />
                                </div>
                            </div>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    } 
                />

                <Route 
                    path="/admin" 
                    element={
                        user && user.role === 'Admin' ? (
                            <AdminDashboard user={user} onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    } 
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}