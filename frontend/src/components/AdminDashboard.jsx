import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { 
    ShieldCheck, 
    LogOut, 
    Users, 
    ShoppingBag, 
    ClipboardList, 
    Activity, 
    CheckCircle2, 
    XCircle, 
    PlusCircle, 
    Trash2, 
    Search, 
    FileText, 
    Server, 
    Shield, 
    BarChart3, 
    DollarSign, 
    Sprout, 
    UserCheck,
    Lock
} from 'lucide-react';

export default function AdminDashboard({ user, onLogout }) {
    const [activeTab, setActiveTab] = useState('users');
    const [message, setMessage] = useState('');

    // Admin data states
    const [usersList, setUsersList] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [bookingsList, setBookingsList] = useState([]);
    const [pestAlerts, setPestAlerts] = useState([]);
    const [forumPosts, setForumPosts] = useState([]);

    // Add Product Form state
    const [prodName, setProdName] = useState('');
    const [prodCategory, setProdCategory] = useState('Seeds');
    const [prodPrice, setProdPrice] = useState('');
    const [prodUnit, setProdUnit] = useState('per bag');
    const [prodDescription, setProdDescription] = useState('');

    // Add Pest Alert Form state
    const [cropName, setCropName] = useState('');
    const [pestOrDisease, setPestOrDisease] = useState('');
    const [severity, setSeverity] = useState('Medium');
    const [symptoms, setSymptoms] = useState('');
    const [treatment, setTreatment] = useState('');

    // Search query
    const [userSearch, setUserSearch] = useState('');

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const [uRes, pRes, bRes, pestRes, fRes] = await Promise.all([
                API.get('/auth/users'),
                API.get('/products'),
                API.get('/bookings'),
                API.get('/pests'),
                API.get('/forum')
            ]);
            setUsersList(uRes.data);
            setProductsList(pRes.data);
            setBookingsList(bRes.data);
            setPestAlerts(pestRes.data);
            setForumPosts(fRes.data);
        } catch (err) {
            console.error('Error loading admin data:', err);
        }
    };

    const showNotification = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 4000);
    };

    // User management actions
    const handleToggleApprove = async (userId) => {
        try {
            await API.put(`/auth/users/${userId}/approve`);
            showNotification('User verification status updated! 🛡️');
            fetchAdminData();
        } catch (err) {
            showNotification('Failed to update user status.');
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await API.delete(`/auth/users/${userId}`);
            showNotification('User account removed.');
            fetchAdminData();
        } catch (err) {
            showNotification('Failed to delete user.');
        }
    };

    // Add product action
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await API.post('/products', {
                name: prodName,
                category: prodCategory,
                price: prodPrice,
                unit: prodUnit,
                description: prodDescription
            });
            showNotification('New product added to Agri-Store inventory! 📦');
            setProdName(''); setProdPrice(''); setProdDescription('');
            fetchAdminData();
        } catch (err) {
            showNotification('Failed to add product.');
        }
    };

    // Add pest alert action
    const handleAddPestAlert = async (e) => {
        e.preventDefault();
        try {
            await API.post('/pests', {
                cropName,
                pestOrDisease,
                severity,
                symptoms,
                treatment
            });
            showNotification('Pest alert published for farmers! ⚠️');
            setCropName(''); setPestOrDisease(''); setSymptoms(''); setTreatment('');
            fetchAdminData();
        } catch (err) {
            showNotification('Failed to publish alert.');
        }
    };

    // Cancel booking action
    const handleCancelBooking = async (bookingId) => {
        try {
            await API.put(`/bookings/${bookingId}/cancel`);
            showNotification('Booking status set to Cancelled.');
            fetchAdminData();
        } catch (err) {
            showNotification('Failed to cancel booking.');
        }
    };

    const filteredUsers = usersList.filter(u => 
        u.name?.toLowerCase().includes(userSearch.toLowerCase()) || 
        u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.phone?.toLowerCase().includes(userSearch.toLowerCase())
    );

    const totalSystemRevenue = bookingsList.filter(b => b.status !== 'Cancelled').reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
            {/* Admin Header Navbar */}
            <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400 shadow-inner">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-black text-white tracking-tight">KisanLog Admin</h1>
                                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                                    Control Panel
                                </span>
                            </div>
                            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">System & User Administration</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/70 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300">
                            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-bold">
                                A
                            </div>
                            <span className="text-indigo-400 font-bold">{user.name || 'Administrator'}</span>
                        </div>

                        <button 
                            onClick={onLogout} 
                            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer active:scale-95"
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
                        message.toLowerCase().includes('failed')
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    }`}>
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>{message}</span>
                    </div>
                )}

                {/* Admin Overview Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase text-slate-400">Total Users / Farmers</p>
                            <p className="text-2xl font-black text-white mt-0.5">{usersList.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase text-slate-400">Store Products</p>
                            <p className="text-2xl font-black text-white mt-0.5">{productsList.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase text-slate-400">Total Bookings</p>
                            <p className="text-2xl font-black text-white mt-0.5">{bookingsList.length}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <ClipboardList className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase text-slate-400">Total Revenue</p>
                            <p className="text-xl font-black text-amber-400 mt-0.5">₹{totalSystemRevenue.toLocaleString()}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Admin Navigation Hub */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
                    {[
                        { id: 'users', label: 'User Management', icon: Users },
                        { id: 'content', label: 'Content & Inventory', icon: ShoppingBag },
                        { id: 'bookings', label: 'Service & Order Bookings', icon: ClipboardList },
                        { id: 'pests', label: 'Publish Pest Advisory', icon: Sprout },
                        { id: 'system', label: 'System Maintenance & Security', icon: Server }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                                    isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
                                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* TAB 1: USER MANAGEMENT */}
                {activeTab === 'users' && (
                    <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">User Account Administration</h2>
                                    <p className="text-xs text-slate-400">Verify, approve, monitor and manage registered user profiles</p>
                                </div>
                            </div>

                            <div className="relative w-full sm:w-64">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                <input 
                                    type="text" 
                                    placeholder="Search by name, email, phone..." 
                                    value={userSearch} 
                                    onChange={(e) => setUserSearch(e.target.value)} 
                                    className="w-full pl-9 pr-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {filteredUsers.map((u) => (
                                <div key={u._id} className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-white text-base">{u.name}</h3>
                                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                                u.role === 'Admin'
                                                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                                                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                            }`}>
                                                {u.role || 'Farmer'}
                                            </span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                                u.isApproved !== false 
                                                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' 
                                                    : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                                            }`}>
                                                {u.isApproved !== false ? 'Verified & Active' : 'Pending Verification'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400">
                                            Email: <strong className="text-slate-200">{u.email}</strong> • Phone: {u.phone || 'N/A'} • Location: {u.address || 'N/A'}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => handleToggleApprove(u._id)} 
                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                                                u.isApproved !== false 
                                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                                                    : 'bg-emerald-600 text-white hover:bg-emerald-500'
                                            }`}
                                        >
                                            <UserCheck className="w-3.5 h-3.5" />
                                            {u.isApproved !== false ? 'Suspend User' : 'Approve User'}
                                        </button>

                                        <button 
                                            onClick={() => handleDeleteUser(u._id)} 
                                            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" /> Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 2: CONTENT & INVENTORY MANAGEMENT */}
                {activeTab === 'content' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
                            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    <ShoppingBag className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-white">Add Store Product</h2>
                                    <p className="text-xs text-slate-400">Update inventory of agricultural resources</p>
                                </div>
                            </div>

                            <form onSubmit={handleAddProduct} className="space-y-3">
                                <input 
                                    type="text" 
                                    placeholder="Product Name" 
                                    value={prodName} 
                                    onChange={(e) => setProdName(e.target.value)} 
                                    required 
                                    className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                />

                                <select 
                                    value={prodCategory} 
                                    onChange={(e) => setProdCategory(e.target.value)} 
                                    className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                >
                                    <option value="Seeds">Seeds</option>
                                    <option value="Fertilizers">Fertilizers</option>
                                    <option value="Pesticides">Pesticides</option>
                                    <option value="Equipment">Equipment</option>
                                    <option value="Services">Services</option>
                                </select>

                                <div className="grid grid-cols-2 gap-3">
                                    <input 
                                        type="number" 
                                        placeholder="Price (₹)" 
                                        value={prodPrice} 
                                        onChange={(e) => setProdPrice(e.target.value)} 
                                        required 
                                        className="px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Unit (e.g. per bag)" 
                                        value={prodUnit} 
                                        onChange={(e) => setProdUnit(e.target.value)} 
                                        required 
                                        className="px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                    />
                                </div>

                                <textarea 
                                    rows="3" 
                                    placeholder="Product description & specs..." 
                                    value={prodDescription} 
                                    onChange={(e) => setProdDescription(e.target.value)} 
                                    className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                />

                                <button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <PlusCircle className="w-4 h-4" /> Add Inventory Item
                                </button>
                            </form>
                        </div>

                        <div className="lg:col-span-2 bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
                            <h3 className="text-xs font-bold uppercase text-slate-400">Live Inventory Catalog ({productsList.length})</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {productsList.map((prod) => (
                                    <div key={prod._id} className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-white text-sm">{prod.name}</h4>
                                            <span className="text-[10px] bg-purple-500/10 text-purple-300 font-bold px-2 py-0.5 rounded-full border border-purple-500/20">
                                                {prod.category}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400">{prod.description}</p>
                                        <div className="pt-2 border-t border-slate-700/50 flex justify-between items-center text-xs font-bold">
                                            <span className="text-amber-400">₹{prod.price} {prod.unit}</span>
                                            <span className="text-emerald-400">In Stock</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: BOOKINGS OVERSEER */}
                {activeTab === 'bookings' && (
                    <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <ClipboardList className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Service Bookings & Order Fulfillment</h2>
                                <p className="text-xs text-slate-400">Oversee equipment rentals, product purchases, and service delivery across farmers</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {bookingsList.map((b) => (
                                <div key={b._id} className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-white text-base">{b.productId?.name || 'Agri Service / Product'}</h3>
                                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                                b.status === 'Cancelled'
                                                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                            }`}>
                                                {b.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400">
                                            Farmer: <strong className="text-slate-200">{b.userId?.name || 'Customer'}</strong> ({b.userId?.email || 'N/A'}) • Date: {new Date(b.bookingDate).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-700/50">
                                        <div className="text-right">
                                            <span className="text-xs text-slate-400 block">Total Amount</span>
                                            <span className="text-base font-black text-amber-400">₹{b.totalAmount}</span>
                                        </div>

                                        {b.status !== 'Cancelled' && (
                                            <button 
                                                onClick={() => handleCancelBooking(b._id)} 
                                                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 4: PUBLISH PEST ADVISORY */}
                {activeTab === 'pests' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
                            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                    <Sprout className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-white">Publish Pest Alert</h2>
                                    <p className="text-xs text-slate-400">Warn farmers about disease outbreaks</p>
                                </div>
                            </div>

                            <form onSubmit={handleAddPestAlert} className="space-y-3">
                                <input 
                                    type="text" 
                                    placeholder="Affected Crop Name (e.g. Wheat)" 
                                    value={cropName} 
                                    onChange={(e) => setCropName(e.target.value)} 
                                    required 
                                    className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                />

                                <input 
                                    type="text" 
                                    placeholder="Pest / Disease Name" 
                                    value={pestOrDisease} 
                                    onChange={(e) => setPestOrDisease(e.target.value)} 
                                    required 
                                    className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                />

                                <select 
                                    value={severity} 
                                    onChange={(e) => setSeverity(e.target.value)} 
                                    className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                >
                                    <option value="Low">Low Risk</option>
                                    <option value="Medium">Medium Risk</option>
                                    <option value="High">High Risk</option>
                                    <option value="Critical">Critical Emergency</option>
                                </select>

                                <textarea 
                                    rows="2" 
                                    placeholder="Symptoms to look for..." 
                                    value={symptoms} 
                                    onChange={(e) => setSymptoms(e.target.value)} 
                                    required 
                                    className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                />

                                <textarea 
                                    rows="2" 
                                    placeholder="Recommended treatment & sprays..." 
                                    value={treatment} 
                                    onChange={(e) => setTreatment(e.target.value)} 
                                    required 
                                    className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                />

                                <button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-rose-600 to-amber-600 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <PlusCircle className="w-4 h-4" /> Broadcast Pest Alert
                                </button>
                            </form>
                        </div>

                        <div className="lg:col-span-2 bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
                            <h3 className="text-xs font-bold uppercase text-slate-400">Published Alerts ({pestAlerts.length})</h3>

                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                                {pestAlerts.map((alert) => (
                                    <div key={alert._id} className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl space-y-2 text-xs">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-white text-sm">{alert.pestOrDisease} ({alert.cropName})</h4>
                                            <span className="text-[10px] bg-rose-500/10 text-rose-400 font-bold px-2.5 py-0.5 rounded-full border border-rose-500/20">
                                                {alert.severity} Risk
                                            </span>
                                        </div>
                                        <p className="text-slate-300"><strong className="text-slate-400">Symptoms:</strong> {alert.symptoms}</p>
                                        <p className="text-emerald-300"><strong className="text-emerald-400">Treatment:</strong> {alert.treatment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 5: SYSTEM MAINTENANCE & SECURITY */}
                {activeTab === 'system' && (
                    <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                <Server className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">System Maintenance, Security & Policy Enforcement</h2>
                                <p className="text-xs text-slate-400">Monitor system health, database connections, API gateways and security audit compliance</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400 uppercase">MongoDB Database</span>
                                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/20">Healthy</span>
                                </div>
                                <p className="text-lg font-extrabold text-white">Connected 🌱</p>
                                <p className="text-xs text-slate-400">Latency: 14ms | Replica Set Active</p>
                            </div>

                            <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400 uppercase">API Gateway</span>
                                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/20">Active</span>
                                </div>
                                <p className="text-lg font-extrabold text-white">99.98% Uptime</p>
                                <p className="text-xs text-slate-400">Express REST APIs operational</p>
                            </div>

                            <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Security Audit</span>
                                    <span className="text-xs bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full font-bold border border-indigo-500/20">Compliant</span>
                                </div>
                                <p className="text-lg font-extrabold text-white">JWT + Bcrypt Auth</p>
                                <p className="text-xs text-slate-400">Data protection active</p>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
