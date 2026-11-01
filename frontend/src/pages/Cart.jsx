import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Trash2, ChevronLeft, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const cart = useStore(state => state.cart);
  const updateCartQty = useStore(state => state.updateCartQty);
  const removeFromCart = useStore(state => state.removeFromCart);
  const getCartTotal = useStore(state => state.getCartTotal);
  const clearCart = useStore(state => state.clearCart);
  const navigate = useNavigate();

  const total = getCartTotal();
  const shipping = total > 999 ? 0 : 150;

  const handleCheckout = () => {
    navigate('/checkout');
  };


  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added any aquatic life or supplies yet.</p>
        <Link to="/categories" className="bg-[var(--color-brand-primary)] text-white px-8 py-4 rounded-xl font-bold shadow-md hover:bg-teal-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-32 md:pb-10 min-h-screen bg-slate-50 md:bg-transparent">
      <div className="md:hidden flex items-center gap-3 px-4 py-4 bg-white border-b border-slate-200 sticky top-16 z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-500">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Shopping Cart</h1>
      </div>

      <div className="max-w-4xl mx-auto md:py-8 md:px-4 grid md:grid-cols-[1fr_350px] gap-8">
        
        {/* Cart Items */}
        <div className="bg-white md:rounded-3xl md:shadow-sm md:border md:border-slate-200 overflow-hidden divide-y divide-slate-100">
          <div className="hidden md:block p-6 bg-slate-50 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
          </div>
          <AnimatePresence>
            {cart.map(item => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 md:p-6 flex gap-4"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 block">{item.category}</span>
                      <h3 className="font-semibold text-sm leading-tight text-slate-900 line-clamp-2">{item.name}</h3>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors -mr-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg">
                      <button onClick={() => updateCartQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-slate-600 font-medium">-</button>
                      <span className="w-6 text-center font-semibold text-xs">{item.qty}</span>
                      <button onClick={() => updateCartQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-slate-600 font-medium">+</button>
                    </div>
                    <span className="font-bold text-slate-900">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary (Sticky on mobile bottom, side on desktop) */}
        <div className="fixed bottom-0 md:bottom-auto md:sticky md:top-24 left-0 right-0 p-4 md:p-6 bg-white border-t md:border border-slate-200 md:rounded-3xl z-30 pb-safe md:shadow-sm">
          <h2 className="font-bold text-lg mb-4 hidden md:block">Order Summary</h2>
          
          <div className="space-y-3 mb-6 hidden md:block">
            <div className="flex justify-between text-sm text-slate-500">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="text-[var(--color-brand-success)] font-medium">Free</span> : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <div className="text-[10px] text-slate-400 text-right">Add ₹{(999 - total).toLocaleString()} more for free shipping!</div>
            )}
            <div className="pt-3 border-t border-slate-100 flex justify-between font-bold text-lg text-slate-900">
              <span>Total</span>
              <span>₹{(total + shipping).toLocaleString()}</span>
            </div>
          </div>
          
          {/* Mobile concise summary */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-medium">Total ({cart.length} items)</span>
              <span className="text-xl font-bold text-slate-900">₹{(total + shipping).toLocaleString()}</span>
            </div>
            {shipping === 0 && <span className="text-[10px] font-bold text-[var(--color-brand-success)] bg-[#4CAF93]/10 px-2 py-1 rounded">Free Shipping</span>}
          </div>

          <button onClick={handleCheckout} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition-colors">
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}
