import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_REVIEWS = {
  1: [
    { id: 'r1', author: 'Rahul M.', rating: 5, date: '2 days ago', comment: 'Super healthy schooling fish! Bright neon colors and very active.' },
    { id: 'r2', author: 'Priya S.', rating: 4, date: '1 week ago', comment: 'Arrived safely. Settled into my 20-gallon planted tank quickly.' }
  ],
  2: [
    { id: 'r3', author: 'Ankit Sharma', rating: 5, date: '3 days ago', comment: 'Beautiful active clownfish pair! Eating pellets from day 1.' }
  ],
  3: [
    { id: 'r4', author: 'Vikram R.', rating: 5, date: '5 days ago', comment: 'High quality tissue culture. Lush green leaves with zero snails.' }
  ]
};

const INITIAL_ORDERS = [
  {
    id: 'AJJU-849201',
    date: '22 Aug 2026',
    items: [
      { id: 1, name: 'Neon Tetras (School of 6)', price: 450, qty: 1 },
      { id: 6, name: 'Anubias Nana Petite (Tissue Culture)', price: 350, qty: 2 }
    ],
    total: 1150,
    shippingInfo: { fullName: 'Rahul Sharma', address: '42 Aquatics Ave', city: 'Mumbai' },
    paymentMethod: 'UPI',
    status: 'Delivered'
  },
  {
    id: 'AJJU-730194',
    date: '18 Aug 2026',
    items: [
      { id: 9, name: 'Rimless Optiwhite 60P Glass Tank (17 Gal)', price: 6500, qty: 1 }
    ],
    total: 6500,
    shippingInfo: { fullName: 'Rahul Sharma', address: '42 Aquatics Ave', city: 'Mumbai' },
    paymentMethod: 'Card',
    status: 'In Transit'
  }
];

export const useStore = create(persist((set, get) => ({
  // Product State
  products: [],
  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      set({ products: data });
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  },
  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({ products: [...state.products, { ...product, id: Date.now() }] })),
  updateProduct: (id, updated) => set((state) => ({
    products: state.products.map(p => p.id === id ? { ...p, ...updated } : p)
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id),
    cart: state.cart.filter(c => c.id !== id)
  })),

  // Cart State
  cart: [],
  addToCart: (product, qty = 1) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.qty + qty > product.stock) return state;
      return { cart: state.cart.map(item => item.id === product.id ? { ...item, qty: item.qty + qty } : item) };
    }
    if (qty > product.stock) return state;
    return { cart: [...state.cart, { ...product, qty }] };
  }),
  updateCartQty: (id, delta) => set((state) => {
    return { cart: state.cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        if (newQty > item.stock) return item;
        if (newQty < 1) return null;
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(Boolean) };
  }),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    return get().cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  },
  getCartCount: () => {
    return get().cart.reduce((sum, item) => sum + item.qty, 0);
  },

  // Wishlist State
  wishlist: [
    { 
      id: 2, 
      name: 'Ocellaris Clownfish Pair', 
      category: 'Fish', 
      price: 2500, 
      stock: 8, 
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=600&auto=format&fit=crop' 
    }
  ],
  toggleWishlist: (product) => set((state) => {
    const exists = state.wishlist.some(p => p.id === product.id);
    if (exists) {
      return { wishlist: state.wishlist.filter(p => p.id !== product.id) };
    }
    return { wishlist: [...state.wishlist, product] };
  }),
  isInWishlist: (productId) => {
    return get().wishlist.some(p => p.id === productId);
  },

  // Reviews State
  reviews: INITIAL_REVIEWS,
  addReview: (productId, review) => set((state) => {
    const existingReviews = state.reviews[productId] || [];
    const newReview = {
      id: `r-${Date.now()}`,
      date: 'Just now',
      ...review
    };
    return {
      reviews: {
        ...state.reviews,
        [productId]: [newReview, ...existingReviews]
      }
    };
  }),
  getReviews: (productId) => {
    return get().reviews[productId] || [];
  },
  getAverageRating: (productId) => {
    const revs = get().reviews[productId] || [];
    if (revs.length === 0) return 4.8;
    const sum = revs.reduce((acc, r) => acc + r.rating, 0);
    return Number((sum / revs.length).toFixed(1));
  },

  // Orders State
  orders: INITIAL_ORDERS,
  placeOrder: (shippingInfo, paymentMethod) => {
    const cart = get().cart;
    const total = get().getCartTotal();
    const orderId = `AJJU-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cart,
      total: total + (total > 999 ? 0 : 99),
      shippingInfo,
      paymentMethod,
      status: 'Processing'
    };

    set((state) => ({
      orders: [newOrder, ...state.orders],
      cart: []
    }));

    return newOrder;
  },

  // Auth State
  isAdmin: false,
  login: async (username, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        set({ isAdmin: true });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  },
  logout: () => set({ isAdmin: false }),
}), { name: 'ajju-store-v2' }));
