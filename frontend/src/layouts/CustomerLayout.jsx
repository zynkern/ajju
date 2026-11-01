import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User, Heart, Waves, BookOpen, LayoutGrid } from 'lucide-react';
import { useStore } from '../store';

export default function CustomerLayout() {
  const cartCount = useStore(state => state.getCartCount());
  const wishlist = useStore(state => state.wishlist);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutGrid, label: 'Catalog', path: '/catalog' },
    { icon: ShoppingBag, label: 'Cart', path: '/cart', badge: cartCount },
    { icon: User, label: 'Account', path: '/account' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] pb-20 md:pb-0">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-40 bg-[var(--color-brand-bg)]/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Ajju Aquarium" className="h-8 w-8 object-contain" />
            <span className="font-bold text-xl tracking-tight text-[var(--color-brand-text-primary)]">
              Ajju Aquarium
            </span>
          </Link>
          
          <div className="flex items-center gap-3 md:gap-5">
            <Link to="/calculator" className="hidden md:flex text-xs font-semibold text-slate-600 hover:text-[var(--color-brand-primary)] items-center gap-1.5 transition-colors">
              <Waves className="w-4 h-4 text-teal-600" /> Tank Calculator
            </Link>
            <Link to="/guides" className="hidden md:flex text-xs font-semibold text-slate-600 hover:text-[var(--color-brand-primary)] items-center gap-1.5 transition-colors">
              <BookOpen className="w-4 h-4 text-teal-600" /> Care Guides
            </Link>

            {/* Top Right Search Icon */}
            <Link to="/search" className="text-slate-600 hover:text-[var(--color-brand-primary)] p-2 rounded-full hover:bg-slate-100 transition-colors" title="Search Store">
              <Search className="w-5 h-5" />
            </Link>

            <Link to="/wishlist" className="hidden md:flex text-slate-500 hover:text-rose-500 relative transition-colors">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="hidden md:flex text-slate-500 hover:text-[var(--color-brand-primary)] relative transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-brand-secondary)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="hidden md:flex text-slate-500 hover:text-[var(--color-brand-primary)] transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto md:px-4">
        <Outlet />
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 z-50 px-1 py-1 flex justify-between items-center pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link 
              key={item.label} 
              to={item.path}
              className={`flex flex-col items-center justify-center w-full py-1 gap-0.5 transition-colors ${isActive ? 'text-[var(--color-brand-primary)]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <div className="relative">
                <item.icon className={`w-5 h-5 ${isActive ? 'fill-[var(--color-brand-primary)]/10 stroke-2' : 'stroke-[1.5]'}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[var(--color-brand-secondary)] text-white text-[9px] font-bold px-1 py-0.2 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-medium leading-none">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  );
}
