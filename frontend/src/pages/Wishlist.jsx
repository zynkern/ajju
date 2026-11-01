import { useStore } from '../store';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const wishlist = useStore(state => state.wishlist);
  const toggleWishlist = useStore(state => state.toggleWishlist);
  const addToCart = useStore(state => state.addToCart);

  if (wishlist.length === 0) {
    return (
      <div className="p-8 max-w-md mx-auto text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Your Wishlist is Empty</h1>
        <p className="text-xs text-slate-500">Save your favorite fish, plants, and aquascaping gear by clicking the heart icon on any item.</p>
        <Link to="/" className="inline-block px-6 py-2.5 bg-[var(--color-brand-primary)] text-white font-bold rounded-xl text-xs">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> My Saved Wishlist
          </h1>
          <p className="text-xs text-slate-500">{wishlist.length} saved item(s)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {wishlist.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group">
            <div className="relative h-44 bg-slate-100 overflow-hidden">
              <Link to={`/product/${p.id}`}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </Link>
              <button
                onClick={() => toggleWishlist(p)}
                className="absolute top-3 right-3 p-2 rounded-full bg-rose-500 text-white shadow-sm hover:bg-rose-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{p.category}</span>
                <Link to={`/product/${p.id}`} className="font-bold text-sm text-slate-900 hover:text-[var(--color-brand-primary)] block truncate">
                  {p.name}
                </Link>
                <div className="font-extrabold text-base text-slate-900 mt-1">₹{p.price.toLocaleString()}</div>
              </div>

              <button
                onClick={() => addToCart(p)}
                className="w-full py-2.5 bg-[var(--color-brand-primary)] hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
