# Ajju Frontend Application

React + Vite frontend application for Ajju Aquarium e-commerce store.

## Directory Structure

```
frontend/
├── public/           # Static assets (favicons, etc.)
├── src/
│   ├── assets/       # Media and static files
│   ├── components/   # Reusable UI components
│   ├── layouts/      # Customer and Admin layouts
│   ├── pages/        # Main route pages (Home, Category, Product, Cart, Admin)
│   ├── App.jsx       # Main App component & router configuration
│   ├── store.js      # Zustand store for state management & API interaction
│   └── main.jsx      # Entry point
├── index.html        # HTML template
├── vite.config.js    # Vite setup with proxy for backend `/api` calls
└── package.json      # Dependencies and scripts
```

## Running Frontend

```bash
# Install dependencies
npm install

# Start development server (Vite dev server)
npm run dev

# Build for production
npm run build
```
