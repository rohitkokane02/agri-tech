# KisanLog

KisanLog is an agriculture monitoring platform that helps farmers keep useful field records in one place. It combines weather logging with soil health reports so farmers can build a clearer picture of the conditions affecting their crops.

## The Problem

Farm decisions are often made using scattered notes, memory, or general weather information that does not describe a specific field. This makes it difficult to answer practical questions such as:

- What were the recent temperature, humidity, and weather conditions at a field location?
- How have the soil's nitrogen, phosphorus, potassium, and pH values changed over time?
- Where can a farmer review previous observations before deciding what to do next?

Without an organized record, valuable field observations are easy to lose and comparisons are difficult. KisanLog addresses this problem with a simple authenticated dashboard for storing and reviewing localized weather data and soil reports.

## What The Project Provides

- Secure registration and login with password hashing and JWT authentication.
- A dashboard showing the number of saved weather logs and soil health reports.
- Weather records containing location, temperature, humidity, and conditions.
- Soil reports containing nitrogen, phosphorus, potassium, pH level, and a recommendation.
- Recent-record lists for reviewing data entered by the signed-in user.
- A responsive React interface backed by an Express and MongoDB API.

KisanLog is a record-keeping and monitoring tool. It does not currently fetch live weather data, automatically test soil, or replace advice from an agronomist.

## Technology Stack

- **Frontend:** React 19, Vite, Axios, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** bcryptjs and JSON Web Tokens

## Project Structure

```text
Agri-Tech/
├── backend/
│   ├── controllers/     # Authentication, weather, and soil logic
│   ├── middleware/      # JWT verification
│   ├── models/          # MongoDB schemas
│   ├── routes/          # Express API routes
│   └── server.js        # API and database entry point
└── frontend/
    └── src/
        ├── components/  # Login, registration, and dashboard UI
        └── services/    # Axios API client
```

## Requirements

- Node.js 18 or newer
- npm
- A running MongoDB instance or MongoDB Atlas database

## Installation And Setup

Clone the repository, then install dependencies in both applications:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Create `backend/.env` with the database connection and JWT signing secret:

```env
MONGO_URI=mongodb://127.0.0.1:27017/kisanlog
JWT_SECRET=replace-with-a-long-random-secret
PORT=5000
```

The frontend currently expects the backend at `http://localhost:5000/api`.

## Running Locally

Start the backend in one terminal:

```bash
cd backend
npm start
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## API Overview

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | No | Create a user account |
| `POST` | `/api/auth/login` | No | Sign in and receive a JWT |
| `GET` | `/api/weather` | JWT | List the user's weather logs |
| `POST` | `/api/weather` | JWT | Save a weather log |
| `GET` | `/api/soil` | JWT | List the user's soil reports |
| `POST` | `/api/soil` | JWT | Save a soil report |

The frontend stores the login token in local storage and attaches it to protected API requests as a Bearer token.

## Useful Commands

From `frontend/`:

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build
```

From `backend/`:

```bash
npm start        # Start the Express server
npm run dev      # Start the Express server in development mode
```
