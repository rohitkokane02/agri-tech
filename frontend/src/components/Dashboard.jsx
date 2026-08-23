// UI: converted to responsive multi-card dashboard layout with NPK stat cards, weather widgets, visual icons, and micro-interactions
import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { 
    Sprout, 
    LogOut, 
    CloudSun, 
    FlaskConical, 
    MapPin, 
    Thermometer, 
    Droplets, 
    Sun, 
    Activity, 
    Sparkles, 
    PlusCircle, 
    CheckCircle2, 
    CloudOff, 
    TestTube2, 
    Calendar,
    BarChart3
} from 'lucide-react';

export default function Dashboard({ user, onLogout }) {
    const [weatherList, setWeatherList] = useState([]);
    const [soilList, setSoilList] = useState([]);
    
    // Form states
    const [location, setLocation] = useState('');
    const [temp, setTemp] = useState('');
    const [humidity, setHumidity] = useState('');
    const [condition, setCondition] = useState('');

    const [nitrogen, setNitrogen] = useState('');
    const [phosphorus, setPhosphorus] = useState('');
    const [potassium, setPotassium] = useState('');
    const [ph, setPh] = useState('');
    const [recommendation, setRecommendation] = useState('');

    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const weatherRes = await API.get('/weather');
            const soilRes = await API.get('/soil');
            setWeatherList(weatherRes.data);
            setSoilList(soilRes.data);
        } catch (err) {
            console.error('Error fetching dashboard data', err);
        }
    };

    const handleAddWeather = async (e) => {
        e.preventDefault();
        try {
            await API.post('/weather', { location, temperature: temp, humidity, condition });
            setMessage('Weather record added successfully!');
            setLocation(''); setTemp(''); setHumidity(''); setCondition('');
            fetchData();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Failed to add weather record.');
        }
    };

    const handleAddSoil = async (e) => {
        e.preventDefault();
        try {
            await API.post('/soil', { nitrogen, phosphorus, potassium, phLevel: ph, recommendation });
            setMessage('Soil report saved successfully!');
            setNitrogen(''); setPhosphorus(''); setPotassium(''); setPh(''); setRecommendation('');
            fetchData();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Failed to save soil report.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-12">
            {/* Top Navbar */}
            <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-50 shadow-lg shadow-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 shadow-inner">
                            <Sprout className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-black text-white tracking-tight">KisanLog</h1>
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                            </div>
                            <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400/80">Agri-Tech Platform</p>
                        </div>
                    </div>

                    {/* User Profile & Actions */}
                    <div className="flex items-center gap-3 sm:gap-5">
                        <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/70 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 shadow-xs">
                            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'F'}
                            </div>
                            <span className="hidden sm:inline text-slate-400">Welcome,</span>
                            <span className="text-emerald-400 font-bold max-w-[120px] truncate">{user.name}</span>
                        </div>

                        <button 
                            onClick={onLogout} 
                            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold hover:border-rose-500/50 transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                
                {/* Notification Banner */}
                {message && (
                    <div className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-semibold shadow-lg transition-all animate-fade-in ${
                        message.toLowerCase().includes('success') || message.toLowerCase().includes('saved') || message.toLowerCase().includes('added')
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}>
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>{message}</span>
                    </div>
                )}

                {/* Dashboard Header Summary Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-xs">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Weather Logs</p>
                            <p className="text-2xl font-black text-white mt-0.5">{weatherList.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                            <CloudSun className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-xs">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Soil Health Reports</p>
                            <p className="text-2xl font-black text-white mt-0.5">{soilList.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <FlaskConical className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between shadow-xs">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Analytics Status</p>
                            <p className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                                <Activity className="w-4 h-4" /> Active Monitoring
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Main 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* WEATHER MODULE */}
                    <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 sm:p-7 shadow-xl shadow-black/30 flex flex-col justify-between hover:border-slate-700/60 transition-all duration-300">
                        <div>
                            {/* Section Header */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                                        <CloudSun className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-white tracking-tight">Weather Forecasting</h2>
                                        <p className="text-xs text-slate-400">Log localized climate data</p>
                                    </div>
                                </div>
                                <span className="text-[11px] bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Real-time
                                </span>
                            </div>
                            
                            {/* Weather Input Form */}
                            <form onSubmit={handleAddWeather} className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="e.g., Kolhapur" 
                                            value={location} 
                                            onChange={(e) => setLocation(e.target.value)} 
                                            required 
                                            className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none transition" 
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                            Temperature (°C)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                <Thermometer className="w-4 h-4" />
                                            </div>
                                            <input 
                                                type="number" 
                                                placeholder="e.g., 28" 
                                                value={temp} 
                                                onChange={(e) => setTemp(e.target.value)} 
                                                required 
                                                className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none transition" 
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                            Humidity (%)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                <Droplets className="w-4 h-4" />
                                            </div>
                                            <input 
                                                type="number" 
                                                placeholder="e.g., 65" 
                                                value={humidity} 
                                                onChange={(e) => setHumidity(e.target.value)} 
                                                required 
                                                className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none transition" 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Condition
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Sun className="w-4 h-4" />
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="e.g., Sunny, Partly Cloudy" 
                                            value={condition} 
                                            onChange={(e) => setCondition(e.target.value)} 
                                            className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none transition" 
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full mt-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-teal-950/50 hover:shadow-teal-600/30 text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    <span>Log Weather Data</span>
                                </button>
                            </form>
                        </div>

                        {/* Recent Weather Records List */}
                        <div className="pt-4 border-t border-slate-800">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Weather Logs</h3>
                                <span className="text-[11px] text-slate-500">{weatherList.length} Entries</span>
                            </div>

                            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                                {weatherList.length === 0 ? (
                                    <div className="bg-slate-800/40 border border-dashed border-slate-800 p-6 rounded-2xl text-center space-y-2">
                                        <CloudOff className="w-8 h-8 text-slate-600 mx-auto" />
                                        <p className="text-xs text-slate-400">No weather logs recorded yet.</p>
                                    </div>
                                ) : (
                                    weatherList.map((w) => (
                                        <div key={w._id} className="bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 p-3.5 rounded-2xl flex justify-between items-center transition duration-200">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-slate-100 text-sm">{w.location}</p>
                                                    <span className="text-[10px] bg-slate-700/80 text-teal-300 font-semibold px-2 py-0.5 rounded-full border border-slate-600">
                                                        {w.condition || 'Clear'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-400 flex items-center gap-3">
                                                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                                                        <Thermometer className="w-3.5 h-3.5" /> {w.temperature}°C
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1 text-cyan-400 font-medium">
                                                        <Droplets className="w-3.5 h-3.5" /> {w.humidity}%
                                                    </span>
                                                </p>
                                            </div>
                                            <span className="text-[11px] text-slate-400 flex items-center gap-1 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
                                                <Calendar className="w-3 h-3 text-slate-500" />
                                                {new Date(w.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SOIL HEALTH MODULE */}
                    <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 sm:p-7 shadow-xl shadow-black/30 flex flex-col justify-between hover:border-slate-700/60 transition-all duration-300">
                        <div>
                            {/* Section Header */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        <FlaskConical className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-white tracking-tight">Soil Health Analysis</h2>
                                        <p className="text-xs text-slate-400">NPK ratio & pH level recommendations</p>
                                    </div>
                                </div>
                                <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    NPK Tracking
                                </span>
                            </div>
                            
                            {/* Soil Form */}
                            <form onSubmit={handleAddSoil} className="space-y-4 mb-6">
                                {/* NPK Stat Input Cards */}
                                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                    <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60">
                                        <label className="block text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                                            Nitrogen (N)
                                        </label>
                                        <input 
                                            type="number" 
                                            placeholder="mg/kg" 
                                            value={nitrogen} 
                                            onChange={(e) => setNitrogen(e.target.value)} 
                                            required 
                                            className="w-full px-2.5 py-1.5 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition" 
                                        />
                                    </div>

                                    <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60">
                                        <label className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                                            Phosphorus (P)
                                        </label>
                                        <input 
                                            type="number" 
                                            placeholder="mg/kg" 
                                            value={phosphorus} 
                                            onChange={(e) => setPhosphorus(e.target.value)} 
                                            required 
                                            className="w-full px-2.5 py-1.5 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition" 
                                        />
                                    </div>

                                    <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/60">
                                        <label className="block text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">
                                            Potassium (K)
                                        </label>
                                        <input 
                                            type="number" 
                                            placeholder="mg/kg" 
                                            value={potassium} 
                                            onChange={(e) => setPotassium(e.target.value)} 
                                            required 
                                            className="w-full px-2.5 py-1.5 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition" 
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                            pH Level
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                <Activity className="w-4 h-4" />
                                            </div>
                                            <input 
                                                type="number" 
                                                step="0.1" 
                                                placeholder="e.g., 6.5" 
                                                value={ph} 
                                                onChange={(e) => setPh(e.target.value)} 
                                                required 
                                                className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition" 
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                            <Sparkles className="w-3.5 h-3.5" /> AI Recommendation
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g., Add Urea" 
                                            value={recommendation} 
                                            onChange={(e) => setRecommendation(e.target.value)} 
                                            className="w-full px-3 py-2.5 bg-slate-800/80 border border-amber-500/40 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition" 
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-emerald-950/50 hover:shadow-emerald-600/30 text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    <span>Save Soil Report</span>
                                </button>
                            </form>
                        </div>

                        {/* Saved Soil Reports List */}
                        <div className="pt-4 border-t border-slate-800">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saved Soil Reports</h3>
                                <span className="text-[11px] text-slate-500">{soilList.length} Reports</span>
                            </div>

                            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                                {soilList.length === 0 ? (
                                    <div className="bg-slate-800/40 border border-dashed border-slate-800 p-6 rounded-2xl text-center space-y-2">
                                        <TestTube2 className="w-8 h-8 text-slate-600 mx-auto" />
                                        <p className="text-xs text-slate-400">No soil health reports added yet.</p>
                                    </div>
                                ) : (
                                    soilList.map((s) => (
                                        <div key={s._id} className="bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 p-4 rounded-2xl space-y-2 transition duration-200">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold px-2 py-0.5 rounded-lg">
                                                        N: {s.nitrogen}
                                                    </span>
                                                    <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold px-2 py-0.5 rounded-lg">
                                                        P: {s.phosphorus}
                                                    </span>
                                                    <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/30 font-semibold px-2 py-0.5 rounded-lg">
                                                        K: {s.potassium}
                                                    </span>
                                                    <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold px-2 py-0.5 rounded-lg">
                                                        pH: {s.phLevel}
                                                    </span>
                                                </div>
                                                <span className="text-[11px] text-slate-400 flex items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded-lg border border-slate-800 shrink-0">
                                                    <Calendar className="w-3 h-3 text-slate-500" />
                                                    {new Date(s.date).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl flex items-start gap-2">
                                                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                                <p className="text-xs text-amber-200/90 font-medium leading-relaxed">
                                                    <strong className="text-amber-400">Advice:</strong> {s.recommendation || 'Balanced soil profile'}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}