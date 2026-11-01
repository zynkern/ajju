import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore } from '../store';
import { Filter, SlidersHorizontal, Heart, Star, ShoppingBag, Check, X, ArrowUpDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Category() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'All';

  const products = useStore(state => state.products);
  const addToCart = useStore(state => state.addToCart);
  const toggleWishlist = useStore(state => state.toggleWishlist);
  const isInWishlist = useStore(state => state.isInWishlist);
  const getAverageRating = useStore(state => state.getAverageRating);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(initialFilter);
  const [sortBy, setSortBy] = useState('featured');
  const [addedId, setAddedId] = useState(null);

  // Filter Drawer state
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const categories = ['All', 'Fish', 'Tanks', 'Plants', 'Equipment', 'Decor'];

  const handleQuickAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  // Filter products
  let filtered = products.filter(p => {
    // Live Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = p.name.toLowerCase().includes(q);
      const descMatch = p.desc ? p.desc.toLowerCase().includes(q) : false;
      const categoryMatch = p.category.toLowerCase().includes(q);
      const speciesMatch = p.species ? p.species.toLowerCase().includes(q) : false;
      if (!nameMatch && !descMatch && !categoryMatch && !speciesMatch) return false;
    }
    // Category match
    if (activeCategory !== 'All' && !p.category.toLowerCase().includes(activeCategory.toLowerCase())) {
      return false;
    }
    // Min Price
    if (minPrice && p.price < Number(minPrice)) return false;
    // Max Price
    if (maxPrice && p.price > Number(maxPrice)) return false;
    // Difficulty
    if (selectedDifficulty && p.difficulty !== selectedDifficulty) return false;
    return true;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => getAverageRating(b.id) - getAverageRating(a.id));
  }

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setSelectedDifficulty('');
    setSortBy('featured');
  };

  const hasActiveFilters = searchQuery || activeCategory !== 'All' || minPrice || maxPrice || selectedDifficulty;

  return (
    <div className="pb-16 min-h-screen flex flex-col relative space-y-4 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">Ajju Aquarium Store</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Product Catalog</h1>
          <p className="text-xs text-slate-500">{filtered.length} product(s) available</p>
        </div>

        {/* Sort & Filter Trigger Buttons */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs">
            <ArrowUpDown className="w-4 h-4 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs shadow-sm hover:bg-slate-800 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-teal-400" />}
          </button>
        </div>
      </div>

      {/* Live Search Input Box (Catalog Only) */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search fish, plants, tanks, food, filters..."
          className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-10 py-3.5 text-xs font-semibold text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Chips Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[var(--color-brand-primary)] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-2 rounded-xl text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 flex items-center gap-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Clear Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 space-y-3">
            <p className="text-sm font-bold text-slate-700">No products match your active search or filters.</p>
            <button onClick={clearFilters} className="px-5 py-2 bg-[var(--color-brand-primary)] text-white font-bold text-xs rounded-xl">
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filtered.map(product => {
              const inWishlist = isInWishlist(product.id);
              const isAdded = addedId === product.id;
              const avgRating = getAverageRating(product.id);
              return (
                <div key={product.id} className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <div className="relative aspect-square bg-slate-100 overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </Link>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md shadow-sm transition-colors ${
                        inWishlist ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-500 hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-white' : ''}`} />
                    </button>

                    {/* Category Tag */}
                    <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-3.5 flex flex-col flex-1 justify-between space-y-2">
                    <div>
                      <div className="flex items-center gap-1 text-amber-500 text-[11px] font-bold mb-0.5">
                        <Star className="w-3 h-3 fill-amber-400 stroke-none" />
                        <span>{avgRating}</span>
                      </div>
                      <Link to={`/product/${product.id}`} className="font-bold text-xs md:text-sm leading-tight text-slate-900 hover:text-[var(--color-brand-primary)] line-clamp-1">
                        {product.name}
                      </Link>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-extrabold text-sm md:text-base text-slate-900">₹{product.price.toLocaleString()}</span>
                      
                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                          isAdded 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-[var(--color-brand-primary)] hover:bg-teal-700 text-white shadow-sm'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Slide-Up Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white rounded-t-3xl z-50 p-6 flex flex-col shadow-2xl pb-safe h-[75vh]"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4"></div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-extrabold text-lg text-slate-900">Refine Catalog</h3>
                <button onClick={() => setIsFilterOpen(false)} className="text-xs font-bold text-[var(--color-brand-primary)]">Done</button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-6 text-xs">
                {/* Price Filter */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Price Range (₹)</h4>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min ₹"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                    />
                    <span className="text-slate-400 font-bold">-</span>
                    <input
                      type="number"
                      placeholder="Max ₹"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                    />
                  </div>
                </div>

                {/* Care Difficulty Filter */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Care Difficulty Level</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['Easy', 'Moderate', 'Advanced'].map(diff => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? '' : diff)}
                        className={`p-2.5 rounded-xl font-bold border transition-colors ${
                          selectedDifficulty === diff
                            ? 'bg-teal-50 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)]'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-3 mt-4">
                <button
                  onClick={clearFilters}
                  className="w-1/3 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-2/3 py-3 bg-slate-900 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Apply Filters ({filtered.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
