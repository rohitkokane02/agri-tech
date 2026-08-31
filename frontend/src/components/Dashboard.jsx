import React, { useState, useEffect } from 'react';
import API from '../services/api';
import WeatherForecast from './WeatherForecast';
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
    Calendar,
    BarChart3,
    Tractor,
    Wheat,
    BookOpen,
    ShoppingBag,
    ClipboardList,
    Trash2,
    Search,
    ShieldAlert,
    Users,
    MessageSquare,
    ThumbsUp,
    Send,
    Edit3,
    ArrowRight,
    ArrowLeft,
    Home,
    Check,
    CheckCircle,
    Flame,
    DollarSign
} from 'lucide-react';

export default function Dashboard({ user, onLogout }) {
    // User flow tabs: home -> farm -> crop -> cropinfo -> weather -> buy
    const [activeTab, setActiveTab] = useState('home');
    const [message, setMessage] = useState('');

    // Data lists
    const [farms, setFarms] = useState([]);
    const [crops, setCrops] = useState([]);
    const [weatherList, setWeatherList] = useState([]);
    const [soilList, setSoilList] = useState([]);
    const [products, setProducts] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [pestAlerts, setPestAlerts] = useState([]);

    // Farm creation/edit state
    const [editingFarmId, setEditingFarmId] = useState(null);
    const [farmName, setFarmName] = useState('');
    const [farmSize, setFarmSize] = useState('');
    const [farmLocation, setFarmLocation] = useState('');

    // Crop creation/edit state
    const [editingCropId, setEditingCropId] = useState(null);
    const [selectedFarmId, setSelectedFarmId] = useState('');
    const [cropName, setCropName] = useState('');
    const [cropType, setCropType] = useState('Kharif');
    const [sowingTime, setSowingTime] = useState('');
    const [harvestingTime, setHarvestingTime] = useState('');
    const [cropStatus, setCropStatus] = useState('Active');

    // Weather form state
    const [location, setLocation] = useState('');
    const [temp, setTemp] = useState('');
    const [humidity, setHumidity] = useState('');
    const [condition, setCondition] = useState('');

    // Soil form state
    const [nitrogen, setNitrogen] = useState('');
    const [phosphorus, setPhosphorus] = useState('');
    const [potassium, setPotassium] = useState('');
    const [ph, setPh] = useState('');
    const [recommendation, setRecommendation] = useState('');

    // Search query for crop info
    const [cropSearch, setCropSearch] = useState('');

    // Detailed Crop Info Catalog
    const cropGuideCatalog = [
        {
            name: 'Wheat (Gehun)',
            type: 'Rabi',
            sowing: 'Nov - Dec',
            harvest: 'Mar - Apr',
            growthStages: 'Germination (1-2 wks) → Crown Rooting (3 wks) → Tillering (5 wks) → Flowering (10 wks) → Grain Filling (14 wks)',
            healthStatus: 'Optimal Temperature: 15-25°C. Requires nitrogen top-dressing at tillering.',
            care: 'Requires 4-6 irrigations at critical growth stages.',
            pests: 'Yellow Rust & Aphids. Spray Propiconazole 25% EC @ 1ml/L of water.'
        },
        {
            name: 'Rice (Chawal / Paddy)',
            type: 'Kharif',
            sowing: 'June - July',
            harvest: 'Oct - Nov',
            growthStages: 'Nursery Bed (25 days) → Transplanting → Tillering → Panicle Initiation → Flowering → Harvesting',
            healthStatus: 'High moisture requirement. Keep 2-5 cm standing water during initial tiller growth.',
            care: 'Apply Zinc Sulphate in zinc-deficient soils.',
            pests: 'Stem Borer & Leaf Folder. Use Neem seed kernel extract or Chlorantraniliprole.'
        },
        {
            name: 'Sugarcane (Ganna)',
            type: 'Cash Crop',
            sowing: 'Oct - Feb',
            harvest: 'Dec - Mar',
            growthStages: 'Germination (30-45 days) → Formative Phase (60-120 days) → Grand Growth → Ripening (270-360 days)',
            healthStatus: 'Heavy feeder crop. Requires balanced NPK and split nitrogen applications.',
            care: 'Earthing up at 45-60 days prevents plant lodging.',
            pests: 'Early shoot borer & Pyrilla. Release Trichogramma parasitoids.'
        },
        {
            name: 'Cotton (Kapas)',
            type: 'Kharif',
            sowing: 'May - June',
            harvest: 'Nov - Jan',
            growthStages: 'Seedling → Squaring (45 days) → Flowering (65 days) → Boll Development → Boll Opening (120+ days)',
            healthStatus: 'Sensitive to waterlogging. Prefers deep black cotton soil (Vertisols).',
            care: 'Apply split doses of Potassium during boll formation.',
            pests: 'Pink Bollworm & Whitefly. Install Pheromone traps (5-8 traps/acre).'
        }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [farmRes, cropRes, weatherRes, soilRes, prodRes, bookRes, pestRes] = await Promise.all([
                API.get(`/farm?userId=${user.id}`),
                API.get(`/crops?userId=${user.id}`),
                API.get('/weather'),
                API.get('/soil'),
                API.get('/products'),
                API.get(`/bookings?userId=${user.id}`),
                API.get('/pests')
            ]);

            setFarms(farmRes.data);
            setCrops(cropRes.data);
            setWeatherList(weatherRes.data);
            setSoilList(soilRes.data);
            setProducts(prodRes.data);
            setBookings(bookRes.data);
            setPestAlerts(pestRes.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    const showNotification = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 4000);
    };

    // Farm CRUD handlers
    const handleSaveFarm = async (e) => {
        e.preventDefault();
        try {
            if (editingFarmId) {
                await API.put(`/farm/${editingFarmId}`, { farmName, farmSize, location: farmLocation });
                showNotification('Farm details updated successfully! 🌾');
                setEditingFarmId(null);
            } else {
                await API.post('/farm', { userId: user.id, farmName, farmSize, location: farmLocation });
                showNotification('Farm added successfully! 🌾');
            }
            setFarmName(''); setFarmSize(''); setFarmLocation('');
            fetchData();
        } catch (err) {
            showNotification('Failed to save farm.');
        }
    };

    const handleEditFarmClick = (f) => {
        setEditingFarmId(f._id);
        setFarmName(f.farmName);
        setFarmSize(f.farmSize);
        setFarmLocation(f.location || '');
    };

    const handleDeleteFarm = async (id) => {
        try {
            await API.delete(`/farm/${id}`);
            showNotification('Farm removed.');
            fetchData();
        } catch (err) {
            showNotification('Failed to delete farm.');
        }
    };

    // Crop CRUD handlers
    const handleSaveCrop = async (e) => {
        e.preventDefault();
        try {
            if (editingCropId) {
                await API.put(`/crops/${editingCropId}`, {
                    cropName,
                    cropType,
                    sowingTime,
                    harvestingTime,
                    status: cropStatus
                });
                showNotification('Crop cycle updated! 🌱');
                setEditingCropId(null);
            } else {
                await API.post('/crops', {
                    userId: user.id,
                    farmId: selectedFarmId || undefined,
                    cropName,
                    cropType,
                    sowingTime,
                    harvestingTime,
                    status: cropStatus
                });
                showNotification('Crop cycle recorded! 🌱');
            }
            setCropName(''); setSowingTime(''); setHarvestingTime(''); setCropStatus('Active');
            fetchData();
        } catch (err) {
            showNotification('Failed to save crop record.');
        }
    };

    const handleEditCropClick = (c) => {
        setEditingCropId(c._id);
        setCropName(c.cropName);
        setCropType(c.cropType);
        setSowingTime(c.sowingTime ? c.sowingTime.substring(0, 10) : '');
        setHarvestingTime(c.harvestingTime ? c.harvestingTime.substring(0, 10) : '');
        setCropStatus(c.status || 'Active');
    };

    const handleDeleteCrop = async (id) => {
        try {
            await API.delete(`/crops/${id}`);
            showNotification('Crop record deleted.');
            fetchData();
        } catch (err) {
            showNotification('Failed to delete crop.');
        }
    };

    // Weather handler
    const handleAddWeather = async (e) => {
        e.preventDefault();
        try {
            await API.post('/weather', { location, temperature: temp, humidity, condition, userId: user.id });
            showNotification('Weather data logged successfully! ☀️');
            setLocation(''); setTemp(''); setHumidity(''); setCondition('');
            fetchData();
        } catch (err) {
            showNotification('Failed to log weather data.');
        }
    };

    // Buy resource handler
    const handleBuyResource = async (product) => {
        try {
            await API.post('/bookings', {
                userId: user.id,
                productId: product._id,
                quantity: 1,
                totalAmount: product.price
            });
            showNotification(`Ordered ${product.name}! 🛍️`);
            fetchData();
        } catch (err) {
            showNotification('Failed to place order.');
        }
    };

    const filteredCropGuides = cropGuideCatalog.filter(c => 
        c.name.toLowerCase().includes(cropSearch.toLowerCase()) || 
        c.type.toLowerCase().includes(cropSearch.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-16">
            {/* Top Navbar */}
            <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 shadow-inner">
                            <Sprout className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-black text-white tracking-tight">Agri-Tech</h1>
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                            </div>
                            <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400/80">Farmer Web Portal</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5">
                        <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/70 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300">
                            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'F'}
                            </div>
                            <span className="hidden sm:inline text-slate-400">Welcome,</span>
                            <span className="text-emerald-400 font-bold max-w-[120px] truncate">{user.name}</span>
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

            {/* Main Container */}
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

                {/* User Flow Navigation Stepper */}
                <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 flex items-center justify-between overflow-x-auto scrollbar-none gap-2">
                    {[
                        { id: 'home', label: 'Home Page', icon: Home, step: 'Start' },
                        { id: 'farm', label: 'Farm Management', icon: Tractor, step: 'Step 1' },
                        { id: 'crop', label: 'Crop Management', icon: Wheat, step: 'Step 2' },
                        { id: 'cropinfo', label: 'Crop Info Guide', icon: BookOpen, step: 'Step 3' },
                        { id: 'weather', label: 'Weather Forecasting', icon: CloudSun, step: 'Step 4' },
                        { id: 'buy', label: 'Buy Resources', icon: ShoppingBag, step: 'Step 5 / End' }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                                    isActive
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                                        : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
                                }`}
                            >
                                <span className="text-[10px] opacity-70 uppercase">{tab.step}:</span>
                                <Icon className="w-3.5 h-3.5" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* USER FLOW STAGE 1: HOME PAGE */}
                {activeTab === 'home' && (
                    <div className="space-y-8">
                        {/* Hero Section */}
                        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/20 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                            
                            <div className="max-w-2xl space-y-4 relative z-10">
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                                    Agri-Tech User Flow Journey
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                                    Welcome to KisanLog Smart Farming Web App 🌾
                                </h2>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    Manage your farm land, track crop growth cycles, receive real-time localized weather updates, and buy certified agricultural resources in one seamless platform.
                                </p>

                                <div className="pt-2 flex flex-wrap gap-3">
                                    <button 
                                        onClick={() => setActiveTab('farm')} 
                                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
                                    >
                                        <span>Start Journey: Manage Farms</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>

                                    <button 
                                        onClick={() => setActiveTab('weather')} 
                                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-3 rounded-xl transition border border-slate-700 flex items-center gap-2 cursor-pointer"
                                    >
                                        <CloudSun className="w-4 h-4 text-teal-400" />
                                        <span>Check Weather Forecast</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Stage Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div 
                                onClick={() => setActiveTab('farm')}
                                className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-amber-500/50 transition cursor-pointer group shadow-xl"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                                    <Tractor className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">1. Farm Management</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">Add, view, edit, or delete information about your farms including location, size, and acreage.</p>
                                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">Manage Farms ({farms.length}) <ArrowRight className="w-3.5 h-3.5" /></span>
                            </div>

                            <div 
                                onClick={() => setActiveTab('crop')}
                                className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-emerald-500/50 transition cursor-pointer group shadow-xl"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                                    <Wheat className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">2. Crop Management</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">Record and update crop cycles, sowing dates, crop types, and expected harvesting timelines.</p>
                                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">Manage Crops ({crops.length}) <ArrowRight className="w-3.5 h-3.5" /></span>
                            </div>

                            <div 
                                onClick={() => setActiveTab('cropinfo')}
                                className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-blue-500/50 transition cursor-pointer group shadow-xl"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">3. Crop Info Guide</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">Access detailed growth stages, health status, and pest control care instructions for your crops.</p>
                                <span className="text-xs font-bold text-blue-400 flex items-center gap-1">View Guides <ArrowRight className="w-3.5 h-3.5" /></span>
                            </div>

                            <div 
                                onClick={() => setActiveTab('weather')}
                                className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-teal-500/50 transition cursor-pointer group shadow-xl"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                                    <CloudSun className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">4. Weather Forecasting</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">View real-time climate updates, temperature, and humidity forecasts tailored to your location.</p>
                                <span className="text-xs font-bold text-teal-400 flex items-center gap-1">Check Weather <ArrowRight className="w-3.5 h-3.5" /></span>
                            </div>

                            <div 
                                onClick={() => setActiveTab('buy')}
                                className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-purple-500/50 transition cursor-pointer group shadow-xl"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                                    <ShoppingBag className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">5. Buy Resources</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">Browse and purchase certified seeds, bio-fertilizers, pesticides, and irrigation equipment.</p>
                                <span className="text-xs font-bold text-purple-400 flex items-center gap-1">Browse Store ({products.length}) <ArrowRight className="w-3.5 h-3.5" /></span>
                            </div>
                        </div>
                    </div>
                )}

                {/* USER FLOW STAGE 2: FARM MANAGEMENT */}
                {activeTab === 'farm' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Form Card */}
                        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                        <Tractor className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-white">
                                            {editingFarmId ? 'Edit Farm Details' : 'Add New Farm'}
                                        </h2>
                                        <p className="text-xs text-slate-400">Register and manage farm properties</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSaveFarm} className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Farm Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g., Sunrise Valley Farm" 
                                        value={farmName} 
                                        onChange={(e) => setFarmName(e.target.value)} 
                                        required 
                                        className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Farm Size</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g., 10 Acres" 
                                        value={farmSize} 
                                        onChange={(e) => setFarmSize(e.target.value)} 
                                        required 
                                        className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Location / District</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g., Nashik, MH" 
                                        value={farmLocation} 
                                        onChange={(e) => setFarmLocation(e.target.value)} 
                                        className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    <span>{editingFarmId ? 'Update Farm Information' : 'Save Farm Information'}</span>
                                </button>

                                {editingFarmId && (
                                    <button 
                                        type="button" 
                                        onClick={() => { setEditingFarmId(null); setFarmName(''); setFarmSize(''); setFarmLocation(''); }} 
                                        className="w-full bg-slate-800 text-slate-300 py-2 rounded-xl text-xs"
                                    >
                                        Cancel Editing
                                    </button>
                                )}
                            </form>

                            <div className="pt-2 border-t border-slate-800">
                                <button 
                                    onClick={() => setActiveTab('crop')} 
                                    className="w-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                                >
                                    <span>Proceed to Crop Management</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* List & Edit/Delete Card */}
                        <div className="lg:col-span-2 bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
                            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Registered Farm Records ({farms.length})</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {farms.map((f) => (
                                    <div key={f._id} className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl space-y-3">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-amber-400 text-base">{f.farmName}</h4>
                                            <span className="text-xs bg-amber-500/10 text-amber-300 px-2.5 py-0.5 rounded-full font-bold border border-amber-500/20">
                                                {f.farmSize}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5 text-slate-500" /> Location: {f.location || 'N/A'}
                                        </p>

                                        <div className="pt-2 border-t border-slate-700/50 flex justify-between items-center">
                                            <button 
                                                onClick={() => handleEditFarmClick(f)} 
                                                className="text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" /> Edit Details
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteFarm(f._id)} 
                                                className="text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* USER FLOW STAGE 3: CROP MANAGEMENT */}
                {activeTab === 'crop' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Crop Form */}
                        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        <Wheat className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-white">
                                            {editingCropId ? 'Edit Crop Details' : 'Add Crop Cycle'}
                                        </h2>
                                        <p className="text-xs text-slate-400">Record planting & harvest schedules</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSaveCrop} className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Crop Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g., Wheat / Cotton / Rice" 
                                        value={cropName} 
                                        onChange={(e) => setCropName(e.target.value)} 
                                        required 
                                        className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Season / Type</label>
                                    <select 
                                        value={cropType} 
                                        onChange={(e) => setCropType(e.target.value)} 
                                        className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                    >
                                        <option value="Kharif">Kharif (Monsoon)</option>
                                        <option value="Rabi">Rabi (Winter)</option>
                                        <option value="Zaid">Zaid (Summer)</option>
                                        <option value="Cash Crop">Cash Crop</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Planting Date</label>
                                        <input 
                                            type="date" 
                                            value={sowingTime} 
                                            onChange={(e) => setSowingTime(e.target.value)} 
                                            required 
                                            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Harvest Date</label>
                                        <input 
                                            type="date" 
                                            value={harvestingTime} 
                                            onChange={(e) => setHarvestingTime(e.target.value)} 
                                            required 
                                            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-100"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    <span>{editingCropId ? 'Update Crop Record' : 'Save Crop Record'}</span>
                                </button>

                                {editingCropId && (
                                    <button 
                                        type="button" 
                                        onClick={() => { setEditingCropId(null); setCropName(''); setSowingTime(''); setHarvestingTime(''); }} 
                                        className="w-full bg-slate-800 text-slate-300 py-2 rounded-xl text-xs"
                                    >
                                        Cancel Editing
                                    </button>
                                )}
                            </form>

                            <div className="pt-2 border-t border-slate-800">
                                <button 
                                    onClick={() => setActiveTab('cropinfo')} 
                                    className="w-full bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                                >
                                    <span>Proceed to Crop Info Guide</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* List Card */}
                        <div className="lg:col-span-2 bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
                            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Monitored Crop Cycles ({crops.length})</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {crops.map((c) => (
                                    <div key={c._id} className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-white text-base">{c.cropName}</h4>
                                                <p className="text-xs text-emerald-400 font-medium">Type: {c.cropType}</p>
                                            </div>
                                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/20">
                                                {c.status || 'Active'}
                                            </span>
                                        </div>

                                        <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1">
                                            <p><strong className="text-slate-400">Planting Date:</strong> {new Date(c.sowingTime).toLocaleDateString()}</p>
                                            <p><strong className="text-slate-400">Expected Harvest:</strong> {new Date(c.harvestingTime).toLocaleDateString()}</p>
                                        </div>

                                        <div className="pt-2 border-t border-slate-700/50 flex justify-between items-center">
                                            <button 
                                                onClick={() => handleEditCropClick(c)} 
                                                className="text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" /> Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteCrop(c._id)} 
                                                className="text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* USER FLOW STAGE 4: CROP INFO */}
                {activeTab === 'cropinfo' && (
                    <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Comprehensive Crop Info & Growth Advisory</h2>
                                    <p className="text-xs text-slate-400">Growth stages, health status & pest control recommendations</p>
                                </div>
                            </div>

                            <div className="relative w-full sm:w-64">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                <input 
                                    type="text" 
                                    placeholder="Search crop guides..." 
                                    value={cropSearch} 
                                    onChange={(e) => setCropSearch(e.target.value)} 
                                    className="w-full pl-9 pr-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredCropGuides.map((item, idx) => (
                                <div key={idx} className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-3">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-black text-emerald-400">{item.name}</h3>
                                        <span className="text-xs bg-blue-500/10 text-blue-300 font-bold px-2.5 py-0.5 rounded-full border border-blue-500/20">
                                            {item.type}
                                        </span>
                                    </div>

                                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
                                        <p><strong className="text-slate-400">Growth Stages:</strong> {item.growthStages}</p>
                                        <p><strong className="text-slate-400">Health Status:</strong> {item.healthStatus}</p>
                                    </div>

                                    <div className="space-y-1.5 text-xs text-slate-300">
                                        <p className="flex items-start gap-1.5">
                                            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                            <span><strong>Care Advice:</strong> {item.care}</span>
                                        </p>
                                        <p className="flex items-start gap-1.5">
                                            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                            <span><strong>Pest Control:</strong> {item.pests}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex justify-end">
                            <button 
                                onClick={() => setActiveTab('weather')} 
                                className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
                            >
                                <span>Proceed to Weather Forecasting</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* USER FLOW STAGE 5: WEATHER FORECASTING */}
                {activeTab === 'weather' && (
                    <div className="space-y-6">
                        <WeatherForecast userId={user.id} />

                        <div className="bg-slate-900/80 p-4 rounded-3xl border border-slate-800 flex justify-between items-center">
                            <button 
                                onClick={() => setActiveTab('cropinfo')} 
                                className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Crop Info</span>
                            </button>

                            <button 
                                onClick={() => setActiveTab('buy')} 
                                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg"
                            >
                                <span>Proceed to Buy Resources</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* USER FLOW STAGE 6: BUY RESOURCES (END OF FLOW) */}
                {activeTab === 'buy' && (
                    <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    <ShoppingBag className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Buy Resources Marketplace</h2>
                                    <p className="text-xs text-slate-400">Purchase seeds, fertilizers, pesticides & farm equipment</p>
                                </div>
                            </div>

                            <span className="text-xs font-bold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" /> End of Core User Flow
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {products.map((prod) => (
                                <div key={prod._id} className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                                    <div>
                                        <span className="text-[10px] font-bold bg-purple-500/10 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                                            {prod.category}
                                        </span>
                                        <h3 className="font-bold text-white text-base mt-2">{prod.name}</h3>
                                        <p className="text-xs text-slate-400 mt-1">{prod.description}</p>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-slate-700/40">
                                        <span className="text-base font-black text-amber-400">₹{prod.price.toLocaleString()}</span>
                                        <button 
                                            onClick={() => handleBuyResource(prod)} 
                                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl cursor-pointer"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}