import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  Settings, LogOut, Tags, ArrowLeft, Menu, X
} from 'lucide-react';

export default function AdminLayout() {
  const isAdmin = useStore(state => state.isAdmin);
  const logout = useStore(state => state.logout);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Products & Live Stock', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: Tags, label: 'Categories', path: '/admin/categories' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const NavLinks = ({ onClick }) => (
    <>
      {navItems.map(item => {
        const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
        return (
          <Link
            key={item.label}
            to={item.path}
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        )
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar (Desktop) */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-xl text-slate-900 tracking-tight">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <NavLinks />
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 -ml-2 text-slate-600">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h2 className="font-bold text-lg text-slate-900">Admin</h2>
          </div>
          <button onClick={handleLogout} className="p-2 text-slate-500"><LogOut className="w-5 h-5" /></button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-white z-30 p-4 overflow-y-auto">
            <nav className="space-y-2 mb-8">
              <NavLinks onClick={() => setMobileMenuOpen(false)} />
            </nav>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Store
            </Link>
          </div>
        )}

        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
