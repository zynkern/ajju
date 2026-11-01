import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useStore } from './store';
import { useEffect } from 'react';
import { Heart, ChevronRight, ShoppingBag, Package } from 'lucide-react';

import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Search from './pages/Search';
import TankCalculator from './pages/TankCalculator';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Wishlist from './pages/Wishlist';
import Guides from './pages/Guides';

import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';

const Account = () => {
  const orders = useStore(state => state.orders);
  const wishlist = useStore(state => state.wishlist);

  return (
    <div className="p-4 md:p-6 max-w-xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Account</h1>
      
      {/* Account Profile Summary */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-1">
        <h2 className="font-bold text-base text-slate-900">Welcome Back!</h2>
        <p className="text-slate-500 text-xs">Manage your saved wishlist items, orders, and aquatic preferences.</p>
      </div>

      {/* Wishlist Link inside Account */}
      <Link 
        to="/wishlist" 
        className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-500">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900">My Saved Wishlist</div>
            <div className="text-xs text-slate-400">{wishlist.length} saved item(s)</div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
      </Link>

      {/* Recent Orders */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Package className="w-4 h-4 text-[var(--color-brand-primary)]" /> Recent Orders ({orders.length})
        </h2>
        {orders.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No orders placed yet.</p>
        ) : (
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="p-3.5 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-slate-100">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{o.id}</span>
                  <span className="text-[var(--color-brand-primary)]">₹{o.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[10px]">
                  <span>Date: {o.date}</span>
                  <span className="bg-teal-50 text-[var(--color-brand-primary)] px-2 py-0.5 rounded-md font-bold">{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const fetchProducts = useStore(state => state.fetchProducts);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Routes>
      {/* Customer Storefront Routes */}
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Category />} />
        <Route path="catalog" element={<Category />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="search" element={<Search />} />
        <Route path="calculator" element={<TankCalculator />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success/:id" element={<OrderSuccess />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="guides" element={<Guides />} />
        <Route path="account" element={<Account />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
      </Route>
    </Routes>
  );
}
