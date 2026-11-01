import { useStore } from '../../store';
import { Package, TrendingUp, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const products = useStore(state => state.products);
  const lowStock = products.filter(p => p.stock <= 5);
  const inventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <Package className="w-5 h-5" />
            <span className="font-semibold text-sm">Total Products</span>
          </div>
          <span className="text-3xl font-bold text-slate-900">{products.length}</span>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold text-sm">Inventory Value</span>
          </div>
          <span className="text-3xl font-bold text-[var(--color-brand-primary)]">₹{inventoryValue.toLocaleString()}</span>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold text-sm">Low Stock Alerts</span>
          </div>
          <span className="text-3xl font-bold text-rose-500">{lowStock.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
           <h2 className="font-bold text-lg mb-4">Recent Orders (Mock)</h2>
           <p className="text-slate-500 text-sm">No recent orders found.</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
           <h2 className="font-bold text-lg mb-4">Low Stock Items</h2>
           {lowStock.length === 0 ? (
             <p className="text-slate-500 text-sm">Inventory levels are healthy.</p>
           ) : (
             <ul className="space-y-3">
               {lowStock.map(p => (
                 <li key={p.id} className="flex justify-between items-center text-sm">
                   <span className="font-medium text-slate-900">{p.name}</span>
                   <span className="text-rose-500 font-bold bg-rose-50 px-2 py-0.5 rounded">{p.stock} left</span>
                 </li>
               ))}
             </ul>
           )}
        </div>
      </div>
    </div>
  );
}
