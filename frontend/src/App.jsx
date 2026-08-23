import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

export default function App() {
    const [user, setUser] = useState(null);
    const [view, setView] = useState('login');

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

    if (user) {
        return <Dashboard user={user} onLogout={handleLogout} />;
    }

    return (
        <div>
            {view === 'login' ? (
                <Login onLoginSuccess={(u) => setUser(u)} onSwitchToRegister={() => setView('register')} />
            ) : (
                <Register onSwitchToLogin={() => setView('login')} />
            )}
        </div>
    );
}