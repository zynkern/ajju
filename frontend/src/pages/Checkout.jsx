import { useState } from 'react';
import { useStore } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, CheckCircle2, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const cart = useStore(state => state.cart);
  const getCartTotal = useStore(state => state.getCartTotal);
  const placeOrder = useStore(state => state.placeOrder);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    fullName: 'Rahul Sharma',
    phone: '9876543210',
    address: '42 Aquatics Avenue, Sector 15',
    city: 'Mumbai',
    pincode: '400001',
  });
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const subtotal = getCartTotal();
  const shippingFee = subtotal > 999 ? 0 : 99;
  const grandTotal = subtotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="p-8 max-w-md mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Your Cart is Empty</h1>
        <p className="text-slate-500 text-sm">Add live stock or equipment to proceed to checkout.</p>
        <Link to="/" className="inline-block px-6 py-3 bg-[var(--color-brand-primary)] text-white font-bold rounded-xl text-sm">
          Browse Store
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const order = placeOrder(shipping, paymentMethod);
    navigate(`/order-success/${order.id}`);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      {/* Step Indicators */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-[var(--color-brand-primary)]' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-[var(--color-brand-primary)] text-white' : 'bg-slate-100 text-slate-500'}`}>1</span>
          Shipping
        </div>
        <div className="w-12 h-0.5 bg-slate-200" />
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-[var(--color-brand-primary)]' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-[var(--color-brand-primary)] text-white' : 'bg-slate-100 text-slate-500'}`}>2</span>
          Payment
        </div>
        <div className="w-12 h-0.5 bg-slate-200" />
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 3 ? 'text-[var(--color-brand-primary)]' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-[var(--color-brand-primary)] text-white' : 'bg-slate-100 text-slate-500'}`}>3</span>
          Review
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Steps Form */}
        <div className="md:col-span-2 space-y-6">
          {step === 1 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[var(--color-brand-primary)]" /> Delivery Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shipping.fullName}
                    onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={shipping.phone}
                    onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={shipping.pincode}
                    onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-[var(--color-brand-primary)] text-white font-bold rounded-xl text-sm hover:bg-teal-700 transition-colors shadow-sm"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[var(--color-brand-primary)]" /> Select Payment Method
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'UPI', label: 'UPI / Google Pay / PhonePe', desc: 'Instant 1-click payment via QR or App' },
                  { id: 'Card', label: 'Credit / Debit Card', desc: 'Visa, MasterCard, RuPay supported' },
                  { id: 'COD', label: 'Cash on Delivery', desc: 'Pay when your live stock or order arrives' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                      paymentMethod === pm.id
                        ? 'border-[var(--color-brand-primary)] bg-teal-50/50 ring-2 ring-[var(--color-brand-primary)]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <input type="radio" checked={paymentMethod === pm.id} readOnly className="mt-1 accent-[var(--color-brand-primary)]" />
                    <div>
                      <div className="font-bold text-sm text-slate-900">{pm.label}</div>
                      <div className="text-xs text-slate-500">{pm.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="w-1/3 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-sm">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="w-2/3 py-3 bg-[var(--color-brand-primary)] text-white font-bold rounded-xl text-sm">
                  Review Order
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--color-brand-primary)]" /> Review & Confirm
              </h2>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs text-slate-600 border border-slate-100">
                <div className="font-bold text-slate-900">Shipping To:</div>
                <div>{shipping.fullName} ({shipping.phone})</div>
                <div>{shipping.address}, {shipping.city} - {shipping.pincode}</div>
                <div className="pt-2 border-t border-slate-200 font-bold text-slate-900">Payment: {paymentMethod}</div>
              </div>

              {/* Items Summary */}
              <div className="space-y-3">
                <div className="font-bold text-xs uppercase text-slate-500 tracking-wider">Order Items</div>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <div className="font-medium text-slate-900">{item.name} <span className="text-slate-400">x{item.qty}</span></div>
                    <div className="font-bold text-slate-900">₹{(item.price * item.qty).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(2)} className="w-1/3 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-sm">
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="w-2/3 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-sm shadow-md transition-colors"
                >
                  Confirm & Place Order (₹{grandTotal.toLocaleString()})
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Price Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-4">
          <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">Order Summary</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Total ({cart.length})</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Express Insured Delivery</span>
              <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-slate-900">
            <span>Grand Total</span>
            <span className="text-base text-[var(--color-brand-primary)]">₹{grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
