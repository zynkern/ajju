import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ChevronDown, ChevronUp, CheckCircle, Info, Heart, ArrowLeft, Star, MessageSquarePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-200">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between py-4 font-semibold text-slate-900"
      >
        {title}
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-slate-600 space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useStore(state => state.products.find(p => p.id === parseInt(id)));
  const addToCart = useStore(state => state.addToCart);
  const toggleWishlist = useStore(state => state.toggleWishlist);
  const isInWishlist = useStore(state => state.isInWishlist);
  const getReviews = useStore(state => state.getReviews);
  const addReview = useStore(state => state.addReview);
  const getAverageRating = useStore(state => state.getAverageRating);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!product) return <div className="p-8 text-center text-slate-500">Product not found.</div>;

  const inWishlist = isInWishlist(product.id);
  const reviews = getReviews(product.id);
  const avgRating = getAverageRating(product.id);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    addReview(product.id, {
      author: newReviewAuthor,
      rating: newReviewRating,
      comment: newReviewComment
    });
    setNewReviewAuthor('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-32">
      {/* Mobile Back Button */}
      <div className="md:hidden absolute top-4 left-4 z-10">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/80 backdrop-blur rounded-full shadow-sm text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Image Gallery */}
      <div className="w-full aspect-[4/3] md:aspect-[21/9] bg-slate-100 relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-primary)] mb-1 block">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center text-amber-500 text-sm font-bold gap-1">
                <Star className="w-4 h-4 fill-amber-400 stroke-none" />
                <span>{avgRating}</span>
              </div>
              <span className="text-xs text-slate-400">({reviews.length} customer reviews)</span>
            </div>
          </div>
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2.5 rounded-full shadow-sm transition-colors ${
              inWishlist ? 'bg-rose-500 text-white' : 'bg-slate-50 text-slate-400 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-2xl font-bold text-slate-900">₹{product.price.toLocaleString()}</span>
          {product.stock > 0 ? (
             <span className="text-xs font-semibold text-[var(--color-brand-success)] bg-[#4CAF93]/10 px-2.5 py-1 rounded-full">In Stock ({product.stock})</span>
          ) : (
             <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">Out of Stock</span>
          )}
        </div>

        {/* Fish-specific specs */}
        {product.category === 'Fish' && (
          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            {product.species && <div><span className="text-[10px] text-slate-500 block">Species</span><span className="text-xs font-semibold">{product.species}</span></div>}
            {product.size && <div><span className="text-[10px] text-slate-500 block">Adult Size</span><span className="text-xs font-semibold">{product.size}</span></div>}
            {product.temp && <div><span className="text-[10px] text-slate-500 block">Temp Range</span><span className="text-xs font-semibold">{product.temp}</span></div>}
            {product.tankSize && <div><span className="text-[10px] text-slate-500 block">Min Tank</span><span className="text-xs font-semibold">{product.tankSize}</span></div>}
            {product.difficulty && (
              <div className="col-span-2">
                <span className="text-[10px] text-slate-500 block">Care Level</span>
                <span className="text-xs font-bold text-[var(--color-brand-secondary)]">{product.difficulty}</span>
              </div>
            )}
          </div>
        )}

        <Accordion title="Description" defaultOpen>
          <p>{product.desc}</p>
        </Accordion>

        <Accordion title="Care & Maintenance Guide">
          <p>Provide a well-established aquarium with stable water parameters.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Regular 20% water changes weekly using dechlorinated water.</li>
            <li>Feed high-quality pellets, flakes, or live/frozen foods.</li>
            <li>Maintain proper biological filtration and aeration.</li>
          </ul>
        </Accordion>

        <Accordion title="Live Arrival Guarantee">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
            <p>We guarantee 100% live arrival on all fish shipments. If an animal arrives DOA, please submit a photo in the unopened bag within 2 hours of delivery for a full refund or replacement credit.</p>
          </div>
        </Accordion>

        {/* Reviews Section */}
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Customer Reviews ({reviews.length})</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="text-xs font-bold text-[var(--color-brand-primary)] flex items-center gap-1.5 hover:underline"
            >
              <MessageSquarePlus className="w-4 h-4" /> Write a Review
            </button>
          </div>

          {/* Add Review Form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-xs text-slate-900">Submit Your Review</h3>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs"
                  placeholder="e.g. Ankit"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1">Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-amber-500"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5 Good)</option>
                  <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1">Comment</label>
                <textarea
                  required
                  rows="2"
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs"
                  placeholder="Share details of your experience..."
                />
              </div>
              <button type="submit" className="w-full py-2 bg-[var(--color-brand-primary)] text-white text-xs font-bold rounded-lg">
                Submit Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-3">
            {reviews.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No reviews yet. Be the first to review this product!</p>
            ) : (
              reviews.map(r => (
                <div key={r.id} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{r.author}</span>
                    <span className="text-[10px] text-slate-400">{r.date}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  </div>
                  <p className="text-slate-600 mt-1">{r.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 md:bottom-auto md:sticky left-0 right-0 p-4 bg-white border-t border-slate-200 z-40 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto flex gap-3">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-1">
            <button 
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-10 h-10 flex items-center justify-center text-slate-600 font-medium"
            >-</button>
            <span className="w-8 text-center font-semibold text-sm">{qty}</span>
            <button 
              onClick={() => setQty(Math.min(product.stock, qty + 1))}
              className="w-10 h-10 flex items-center justify-center text-slate-600 font-medium"
            >+</button>
          </div>
          <button 
            disabled={product.stock === 0}
            onClick={handleAdd}
            className="flex-1 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 overflow-hidden relative"
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="added" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Added
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                  Add to Cart — ₹{(product.price * qty).toLocaleString()}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}
