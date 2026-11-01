# Ajju Backend API

Express Node.js Backend Service for Ajju Aquarium application.

## Directory Structure

```
backend/
├── controllers/      # Request handlers (auth, products)
│   ├── authController.js
│   └── productController.js
├── routes/           # Express router definitions
│   ├── auth.js
│   └── products.js
├── data.js           # Seed data
├── index.js          # Express server entry point
└── package.json      # Dependencies and scripts
```

## Running Backend

```bash
# Install dependencies
npm install

# Start development server (with nodemon)
npm run dev

# Start production server
npm start
```

## Endpoints

- `GET /api/health` - Server health check
- `GET /api/products` - List all aquarium products
- `GET /api/products/:id` - Get details of a single product
- `POST /api/auth/login` - Admin login endpoint
