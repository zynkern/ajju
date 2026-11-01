import { useState } from 'react';
import { useStore } from '../../store';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Products() {
  const products = useStore(state => state.products);
  const addProduct = useStore(state => state.addProduct);
  const updateProduct = useStore(state => state.updateProduct);
  const deleteProduct = useStore(state => state.deleteProduct);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newProduct = {
      name: fd.get('name'),
      category: fd.get('category'),
      price: Number(fd.get('price')),
      stock: Number(fd.get('stock')),
      desc: fd.get('desc'),
      image: fd.get('image') || 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=600&auto=format&fit=crop'
    };
    
    if (editingId) {
      updateProduct(editingId, newProduct);
    } else {
      addProduct(newProduct);
    }
    setFormOpen(false);
    setEditingId(null);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setFormOpen(true);
  };

  const editingProduct = products.find(p => p.id === editingId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Products & Live Stock</h1>
        <button 
          onClick={() => { setEditingId(null); setFormOpen(true); }}
          className="bg-[var(--color-brand-primary)] hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold hidden md:table-cell">Category</th>
                <th className="px-6 py-4 font-semibold hidden md:table-cell">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3 min-w-[150px]">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100 hidden sm:block" />
                    <div>
                      <div className="font-semibold text-slate-900 truncate max-w-[120px] sm:max-w-xs">{p.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-medium">{p.category}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700 hidden md:table-cell">₹{p.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.stock <= 5 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => openEdit(p)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors bg-white hover:bg-slate-100 rounded-lg border border-slate-200 shadow-sm">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors bg-white hover:bg-rose-50 rounded-lg border border-slate-200 shadow-sm">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {formOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50" onClick={() => setFormOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl p-6 z-50 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Product' : 'Add Product'}</h2>
                <button onClick={() => setFormOpen(false)} className="text-slate-400 hover:text-slate-900"><X className="w-5 h-5"/></button>
              </div>
              
              <form onSubmit={handleSave} className="space-y-4 text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Name</label>
                  <input name="name" type="text" required defaultValue={editingProduct?.name} className="w-full border border-slate-200 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select name="category" defaultValue={editingProduct?.category || 'Fish'} className="w-full border border-slate-200 rounded-lg px-3 py-2">
                    {['Fish', 'Tanks', 'Plants', 'Filters & Equipment', 'Decor'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Price (₹)</label>
                    <input name="price" type="number" required defaultValue={editingProduct?.price} className="w-full border border-slate-200 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Stock</label>
                    <input name="stock" type="number" required defaultValue={editingProduct?.stock} className="w-full border border-slate-200 rounded-lg px-3 py-2" />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description</label>
                  <textarea name="desc" rows="3" defaultValue={editingProduct?.desc} className="w-full border border-slate-200 rounded-lg px-3 py-2"></textarea>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setFormOpen(false)} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors">Save Product</button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
