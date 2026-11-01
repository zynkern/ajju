# Ajju Aquarium - Fullstack E-Commerce Application

An e-commerce web application for aquarium supplies, featuring a React frontend and Express backend.

## Workspace Architecture

```
ajju/
├── frontend/             # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── layouts/      # Customer & Admin Layouts
│   │   ├── pages/        # Store & Admin Page Views
│   │   ├── App.jsx       # App component & Router
│   │   ├── store.js      # Zustand store (state & API)
│   │   └── main.jsx      # Entry point
│   ├── index.html        # Frontend HTML template
│   ├── vite.config.js    # Vite configuration & proxy settings
│   └── package.json      # Frontend package configuration
│
├── backend/              # Node.js + Express Backend Service
│   ├── controllers/      # Route controllers (authController, productController)
│   ├── routes/           # Express router endpoints (auth, products)
│   ├── data.js           # Seed product dataset
│   ├── index.js          # Express server entry point
│   └── package.json      # Backend package configuration
│
└── package.json          # Monorepo runner & orchestration scripts
```

## Quick Start

### Install Dependencies
```bash
# Install dependencies for both frontend and backend
npm run install:all
```

### Development
```bash
# Run both Frontend (Vite) and Backend (Express) concurrently
npm run dev

# Or run separately:
npm run dev:frontend  # Port 5173 (or assigned port)
npm run dev:backend   # Port 5000
```

### Production Build
```bash
# Build frontend bundle
npm run build

# Start backend server (serves API & static frontend)
npm run start --prefix backend
```
