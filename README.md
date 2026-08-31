# KisanLog 🌱 Agri-Tech Web Platform

An end-to-end, full-stack **Agri-Tech Web Application** designed to empower farmers with real-time farm management tools, localized climate telemetry, crop growth tracking, pest outbreak advisories, resource purchasing, and expert consultation—backed by a comprehensive **Admin Control Panel** for platform administration.

---

## 🏗️ Technical Architecture & Stack

### Frontend Stack (`/frontend`)
- **Core Framework**: React 19 (Single Page Application via `react-router-dom`)
- **Styling**: Tailwind CSS & Lucide Icons
- **HTTP Client**: Axios
- **External Integration**: OpenWeatherMap REST API (Auto GPS Geolocation & City Search)
- **Utilities**: `moment` (date/time formatting), `recharts` (data visualization)

### Backend Stack (`/backend`)
- **Runtime**: Node.js & Express.js API Framework
- **Database**: MongoDB with Mongoose ODM
- **Security & Authentication**: JSON Web Tokens (JWT) & bcryptjs password hashing
- **Environment**: `dotenv` & CORS middleware

---

## 🔄 User Flow Journey

```
[Start]
   │
   ▼
[Home Page / Landing View]
   │
   ├──► 1. [Farm Management] (Add, View, Edit, Delete Farm Land Records)
   │
   ├──► 2. [Crop Management] (Add, View, Edit, Delete Crop Cycles & Schedules)
   │
   ├──► 3. [Crop Info Guide] (Growth Stages, Health Status, Care Tips & Pest Control)
   │
   ├──► 4. [Weather Forecasting] (OpenWeatherMap Live GPS Telemetry & City Search)
   │
   └──► 5. [Buy Resources] (Marketplace for Seeds, Fertilizers, Pesticides & Equipment)
   │
   ▼
[End / Order Confirmation]
```

---

## 👥 Role-Based Portals & Core Modules

### 🌾 1. Farmer Portal
* **Farm Management Dashboard**: Centralized management to add, view, edit, or delete farm details (farm size in acres/hectares, village location).
* **Crop Management**: Monitor crop growth stages, record planting and expected harvest dates, and update crop statuses.
* **Crop Info Library**: Access detailed growth stages, optimal care schedules, and pest management guides.
* **OpenWeatherMap Weather Forecasting**:
  * **Auto-GPS Detection**: Uses browser Geolocation API (`navigator.geolocation`) to fetch live weather at user coordinates.
  * **Manual Search**: Search current weather telemetry by city name.
  * **Metrics**: Temperature (°C), Humidity (%), Wind Speed (m/s), Atmospheric Pressure (hPa), Sunrise/Sunset times, and Weather condition icons.
* **Soil Health Monitoring**: Analyzes NPK (Nitrogen, Phosphorus, Potassium) ratios and pH levels with AI recommendations.
* **Pest & Disease Advisory Alerts**: Early outbreak warnings, symptom identification, risk severity levels (Low to Critical), and chemical/organic treatments.
* **Resource Usage Management**: Track quantity, costs, and consumption history for water irrigation, fertilizers, pesticides, seeds, and fuel.
* **Expert Consultation**: Book agricultural experts and soil scientists for 1-on-1 personalized advice.
* **Community Forum**: Peer-to-peer farmer Q&A discussion platform to ask questions, share advice, like, and reply to posts.
* **Crop & Field Tracking**: Estimated yield predictions (quintals/acre) and field status tracking.
* **Buy Resources Marketplace**: Purchase certified seeds, bio-fertilizers, pesticides, solar pumps, and service rentals.

---

### 🛠️ 2. Admin Control Panel
* **User Account Administration**: View all user registrations, verify/approve new user accounts, or suspend user access.
* **Inventory & Product Catalog**: Add new items to the marketplace catalog, update prices, stock status, and product categories.
* **Service & Order Bookings Overseer**: Oversee equipment rentals and purchase orders across all farmers.
* **Broadcast Pest Advisories**: Create and publish regional pest alerts with symptoms and treatment guidelines.
* **System Maintenance & Security**: Monitor MongoDB connection health, API Gateway uptime, and JWT security audit compliance.
* **Platform Analytics & Reports**: Platform-wide metrics on total registered farmers, active products, total bookings, and system revenue.

---

## 📁 Project Directory Structure

```
Agri-Tech/
├── backend/
│   ├── index.js             # Root backend server entry point
│   ├── package.json         # Express, Mongoose, CORS, Dotenv, JWT dependencies
│   ├── db/
│   │   ├── config.js        # MongoDB connection using Mongoose
│   │   └── crops.json       # Preloaded static crop reference metadata
│   ├── controllers/
│   │   ├── adminController.js   # Admin verification & system analytics
│   │   ├── bookingController.js # Equipment rental & resource order logic
│   │   ├── cropController.js    # Crop management CRUD operations
│   │   ├── farmController.js    # Farm management CRUD operations
│   │   ├── productController.js # Store product catalog & inventory
│   │   └── userController.js    # User registration, login & profile update
│   ├── models/
│   │   ├── User.js          # User schema (name, email, password, phone, address, role, isApproved)
│   │   ├── Admin.js         # Admin schema
│   │   ├── Farm.js          # Farm land schema
│   │   ├── Crop.js          # Crop cycle schema
│   │   ├── Product.js       # Store resource schema (name, category, price, imgUrl)
│   │   ├── Booking.js       # Order & service booking schema
│   │   ├── PestAlert.js     # Pest alert advisory schema
│   │   ├── ResourceUsage.js # Water & fertilizer usage tracking schema
│   │   └── ForumPost.js     # Community forum discussion schema
│   ├── routes/
│   │   ├── index.js         # Master router aggregating all sub-routes
│   │   ├── user.js          # /api/users endpoints
│   │   ├── admin.js         # /api/admin endpoints
│   │   ├── farm.js          # /api/farms endpoints
│   │   ├── crop.js          # /api/crops endpoints
│   │   ├── product.js       # /api/products endpoints
│   │   └── booking.js       # /api/bookings endpoints
│   └── middleware/
│       └── authMiddleware.js # JWT Bearer authentication & Admin access protection
│
└── frontend/
    ├── package.json         # React 19, Axios, React Router, Tailwind, Lucide
    ├── vite.config.js       # Vite bundler configuration
    └── src/
        ├── App.jsx          # SPA React Router configuration
        ├── services/
        │   └── api.js       # Axios base configuration (http://localhost:5000/api)
        └── components/
            ├── Login.jsx            # User Authentication Login Form
            ├── Register.jsx         # User Registration Form (Farmer / Admin role)
            ├── Dashboard.jsx        # Farmer Portal & User Journey Stepper
            ├── AdminDashboard.jsx   # Admin Control Panel
            └── WeatherForecast.jsx  # OpenWeatherMap GPS & City Search Weather Component
```

---

## ⚡ Quick Start & Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
node index.js
```
*Backend server runs at `http://localhost:5000`.*

#### Backend Environment Variables (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/agritech
JWT_SECRET=agri_tech_secret_key_2026
```

---

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend dev server runs at `http://localhost:5173`.*

---

## 🧪 Verification & Build Commands

- **Backend Syntax Check**:
  ```bash
  cd backend && node -c index.js
  ```
- **Frontend Production Build**:
  ```bash
  cd frontend && npm run build
  ```

---

## 📄 License
Licensed under the ISC License.
