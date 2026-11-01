import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Truck, Stethoscope, ChevronRight, Heart, 
  Flame, Clock, ShoppingBag, Star, Sparkles, Check, Waves, Camera
} from 'lucide-react';
import { useStore } from '../store';

const TRUST_ITEMS = [
  { icon: ShieldCheck, title: "Live Arrival Guarantee", desc: "100% Refund or replacement" },
  { icon: Truck, title: "Free Shipping ₹999+", desc: "Insured express delivery" },
  { icon: Stethoscope, title: "7-Day Health Support", desc: "Expert aquarist advice" }
];

const CATEGORIES = [
  { name: 'Fish', image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=200&auto=format&fit=crop' },
  { name: 'Tanks', image: 'https://images.unsplash.com/photo-1523490919018-8fec002221ba?q=80&w=200&auto=format&fit=crop' },
  { name: 'Plants', image: 'https://images.unsplash.com/photo-1620603774883-93d39580b037?q=80&w=200&auto=format&fit=crop' },
  { name: 'Filters & Equipment', image: 'https://images.unsplash.com/photo-1582528723389-9fc31fb08796?q=80&w=200&auto=format&fit=crop' },
  { name: 'Decor', image: 'https://images.unsplash.com/photo-1596700755913-91a56667520e?q=80&w=200&auto=format&fit=crop' }
];

const HABITAT_PILLS = [
  { id: 'All', label: '🌟 All Featured' },
  { id: 'Beginner', label: '🟢 Beginner Friendly' },
  { id: 'Low-Tech', label: '🌿 Low-Tech Plants' },
  { id: 'Schooling', label: '🐠 Peaceful Schooling' },
];

const CUSTOMER_SHOWCASE = [
  {
    name: "Dr. Ankit V.",
    location: "Mumbai",
    tank: "20-Gallon Rimless Aquascape",
    comment: "Neon Tetras arrived super healthy and active. Packed with heat packs and insulation!",
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=400&auto=format&fit=crop",
    rating: 5
  },
  {
    name: "Priya Sharma",
    location: "Bengaluru",
    tank: "10G Nano Shrimp Sanctuary",
    comment: "Bucephalandra and Anubias tissue cultures were 100% pest-free. Stunning green colors!",
    image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=400&auto=format&fit=crop",
    rating: 5
  }
];

export default function Home() {
  const products = useStore(state => state.products);
  const addToCart = useStore(state => state.addToCart);
  const toggleWishlist = useStore(state => state.toggleWishlist);
  const isInWishlist = useStore(state => state.isInWishlist);
  const getAverageRating = useStore(state => state.getAverageRating);

  const [activePill, setActivePill] = useState('All');
  const [addedId, setAddedId] = useState(null);

  // Live Flash Sale Countdown
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  // Filter products based on habitat pill selection
  const displayedProducts = products.filter(p => {
    if (activePill === 'All') return true;
    if (activePill === 'Beginner') return p.difficulty === 'Easy' || p.category === 'Plants';
    if (activePill === 'Low-Tech') return p.category === 'Plants';
    if (activePill === 'Schooling') return p.category === 'Fish';
    return true;
  });

  return (
    <div className="pb-12 space-y-8">
      {/* 1. Animated Live Arrival Announcement Ticker */}
      <div className="bg-slate-900 text-white text-xs font-semibold py-2 px-4 flex items-center justify-between overflow-hidden -mx-4 md:mx-0 md:rounded-2xl">
        <div className="flex items-center gap-2 animate-pulse text-teal-400">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>✨ Fresh Shipment: Healthy Live Fish & Tissue Plants Nationwide</span>
        </div>
        <Link to="/calculator" className="hidden sm:flex items-center gap-1 text-[11px] text-teal-300 hover:underline">
          <Waves className="w-3.5 h-3.5" /> Tank Calculator
        </Link>
      </div>

      {/* 2. Hero Section */}
      <section className="relative h-[60vh] md:h-[65vh] rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img 
          src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1600&auto=format&fit=crop" 
          alt="Beautiful planted aquarium" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-teal-300 border border-teal-400/20 w-fit">
            🐠 Insured Live Arrival Nationwide
          </div>
          <h1 className="text-white font-extrabold text-3xl md:text-5xl leading-tight max-w-lg tracking-tight">
            Bring Nature’s Underwater Magic Home
          </h1>
          <p className="text-slate-200 text-xs md:text-sm max-w-md">
            Hand-picked healthy aquatic livestock, ultra-clear rimless glass tanks, and premium aquascaping gear.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link 
              to="/catalog" 
              className="bg-[var(--color-brand-primary)] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:bg-teal-700 transition-colors text-xs md:text-sm"
            >
              Browse Catalog
            </Link>
            <Link 
              to="/calculator" 
              className="bg-white/20 backdrop-blur-md text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-white/30 transition-colors text-xs md:text-sm border border-white/20"
            >
              Tank Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Flash Sale / Deal of the Day Banner */}
      <section className="bg-gradient-to-r from-amber-500 via-rose-500 to-orange-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-md">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-200 fill-amber-200" /> Flash Deal of the Day
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Neon Tetra Schooling Pack (Set of 10)</h2>
            <p className="text-xs text-amber-100">Super active neon blue & red colors. Perfect for planted aquariums.</p>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-2xl font-black">₹499</span>
              <span className="text-sm line-through text-amber-200 font-semibold">₹899</span>
              <span className="bg-white text-rose-600 text-xs font-black px-2 py-0.5 rounded-md">Save 44%</span>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center space-y-2 min-w-[220px]">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-200 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Ends In
            </div>
            <div className="flex justify-center items-center gap-2 font-mono text-xl md:text-2xl font-black">
              <span className="bg-slate-900/80 px-2.5 py-1.5 rounded-lg">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span className="bg-slate-900/80 px-2.5 py-1.5 rounded-lg">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span className="bg-slate-900/80 px-2.5 py-1.5 rounded-lg">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-300 h-full w-[82%]" />
            </div>
            <div className="text-[10px] text-amber-100 font-bold">82% Claimed — Only 4 Packs Left!</div>
          </div>
        </div>
      </section>

      {/* 4. Trust Assurance Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        {TRUST_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-2">
            <div className="p-3 rounded-2xl bg-teal-50 text-[var(--color-brand-primary)] shrink-0">
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-xs md:text-sm text-slate-900">{item.title}</div>
              <div className="text-[11px] text-slate-500">{item.desc}</div>
            </div>
          </div>
        ))}
      </section>

      {/* 5. Shop by Category */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Shop by Category</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x">
          {CATEGORIES.map((cat, i) => (
            <Link key={i} to={`/categories?filter=${cat.name}`} className="flex flex-col items-center gap-2 snap-start min-w-[85px] group">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-semibold text-slate-700 text-center line-clamp-1">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Interactive Habitat Filter Pills & Featured Products */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900">Popular Live Stock & Gear</h2>
          
          {/* Habitat Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
            {HABITAT_PILLS.map(pill => (
              <button
                key={pill.id}
                onClick={() => setActivePill(pill.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  activePill === pill.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with Quick Add Button */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayedProducts.slice(0, 8).map(product => {
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
                    
                    {/* Instant Quick Add Button */}
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
      </section>

      {/* 7. Customer Aquascapes Showcase (Social Proof) */}
      <section className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-[var(--color-brand-primary)]" /> Customer Aquascape Showcase
            </h2>
            <p className="text-xs text-slate-500">Real aquariums stocked & built by Ajju Aquarium hobbyists.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CUSTOMER_SHOWCASE.map((showcase, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-4 items-center">
              <img src={showcase.image} alt={showcase.name} className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100" />
              <div className="space-y-1 text-xs">
                <div className="flex text-amber-400 text-xs">
                  {'★'.repeat(showcase.rating)}
                </div>
                <p className="text-slate-700 italic font-medium line-clamp-2">"{showcase.comment}"</p>
                <div className="font-bold text-slate-900 pt-0.5">{showcase.name} • <span className="text-[10px] text-slate-400 font-normal">{showcase.tank}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
