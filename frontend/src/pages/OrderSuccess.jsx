import { useParams, Link } from 'react-router-dom';
import { CheckCircle, PackageCheck, Home, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../store';

export default function OrderSuccess() {
  const { id } = useParams();
  const orders = useStore(state => state.orders);
  const order = orders.find(o => o.id === id) || orders[0];

  return (
    <div className="p-4 md:p-8 max-w-xl mx-auto space-y-6 text-center">
      {/* Animated Success Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-5">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Order Confirmed
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Thank You For Your Order!</h1>
          <p className="text-xs text-slate-500">Order ID: <strong className="text-slate-900 font-mono">{id || 'AJJU-849201'}</strong></p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left text-xs space-y-2">
          <div className="flex justify-between text-slate-600">
            <span>Estimated Delivery:</span>
            <strong className="text-slate-900">2-4 Business Days</strong>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Payment Method:</span>
            <strong className="text-slate-900">{order?.paymentMethod || 'UPI'}</strong>
          </div>
          {order?.shippingInfo && (
            <div className="pt-2 border-t border-slate-200 text-slate-600">
              Deliver to: <strong>{order.shippingInfo.fullName}</strong>, {order.shippingInfo.address}, {order.shippingInfo.city}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/"
            className="flex-1 py-3 bg-[var(--color-brand-primary)] hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4" /> Return to Store
          </Link>
          <Link
            to="/categories"
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            Browse More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
