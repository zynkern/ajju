import { useState, useMemo } from 'react';
import { useStore } from '../store';
import { Search as SearchIcon, SlidersHorizontal, Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Fish', 'Tanks', 'Plants', 'Filters & Equipment', 'Decor'];
const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Advanced'];

export default function Search() {
  const products = useStore(state => state.products);
  const addToCart = useStore(state => state.addToCart);
  const toggleWishlist = useStore(state => state.toggleWishlist);
  const isInWishlist = useStore(state => state.isInWishlist);
  const getAverageRating = useStore(state => state.getAverageRating);

  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedDiff, setSelectedDiff] = useState('All');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || 
                             p.desc.toLowerCase().includes(query.toLowerCase()) ||
                             (p.category && p.category.toLowerCase().includes(query.toLowerCase()));
        const matchesCat = selectedCat === 'All' || p.category === selectedCat;
        const matchesDiff = selectedDiff === 'All' || p.difficulty === selectedDiff;
        const matchesPrice = p.price <= maxPrice;
        return matchesQuery && matchesCat && matchesDiff && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, query, selectedCat, selectedDiff, maxPrice, sortBy]);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[var(--color-brand-primary)]" /> Store Search & Catalog
            </h1>
            <p className="text-sm text-slate-500">Search aquarium live stock, rimless tanks, plants, and high-performance equipment.</p>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search fish species, plants, filters, tanks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 shadow-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] text-sm transition-all"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Col: Filters */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-5 h-fit">
          <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-100 pb-3">
            <SlidersHorizontal className="w-4 h-4 text-[var(--color-brand-primary)]" /> Filters & Options
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Category</label>
            <div className="flex flex-wrap md:flex-col gap-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`text-left text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${
                    selectedCat === cat
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Care Difficulty</label>
            <div className="flex flex-wrap md:flex-col gap-1.5">
              {DIFFICULTIES.map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDiff(diff)}
                  className={`text-left text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${
                    selectedDiff === diff
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider">Max Price</span>
              <span className="font-bold text-[var(--color-brand-primary)]">₹{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="200"
              max="15000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--color-brand-primary)] cursor-pointer"
            />
          </div>

          {/* Sort By */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Product Name</option>
            </select>
          </div>
        </div>

        {/* Right Col: Product Grid */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Showing {filteredProducts.length} results</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <p className="text-slate-500 font-semibold">No products match your search criteria.</p>
              <button
                onClick={() => { setQuery(''); setSelectedCat('All'); setSelectedDiff('All'); setMaxPrice(15000); }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(p => {
                const inWishlist = isInWishlist(p.id);
                const avgRating = getAverageRating(p.id);
                return (
                  <div key={p.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
                    {/* Image & Wishlist Button */}
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <Link to={`/product/${p.id}`}>
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </Link>
                      <button
                        onClick={() => toggleWishlist(p)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-colors ${
                          inWishlist ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-600 hover:bg-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
                      </button>
                      <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
                        {p.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                          <span>{avgRating}</span>
                        </div>
                        <Link to={`/product/${p.id}`} className="font-bold text-slate-900 hover:text-[var(--color-brand-primary)] text-sm line-clamp-1">
                          {p.name}
                        </Link>
                        <p className="text-slate-500 text-xs line-clamp-2 mt-1">{p.desc}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="font-extrabold text-base text-slate-900">₹{p.price.toLocaleString()}</span>
                        <button
                          onClick={() => addToCart(p)}
                          className="px-3 py-1.5 bg-[var(--color-brand-primary)] hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
